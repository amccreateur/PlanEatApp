import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  Linking,
  TextInput
} from "react-native";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { DRIVE_STORES, DriveService } from "../services/driveService";
import { TRANSLATIONS } from "../i18n/translations";
import { THEMES } from "../utils/theme";

let WebView = null;
if (Platform.OS !== "web") {
  WebView = require("react-native-webview").WebView;
}

export default function DriveCartModal({
  visible,
  onClose,
  groceries = [],
  onToggleItem,
  lang = "fr",
  themeMode = "dark"
}) {
  const insets = useSafeAreaInsets();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const theme = THEMES[themeMode] || THEMES.dark;

  const webViewRef = useRef(null);
  const storeBaseUrlRef = useRef("");
  const [selectedStore, setSelectedStore] = useState(DRIVE_STORES[0]);
  const [currentUrl, setCurrentUrl] = useState(DRIVE_STORES[0].homeUrl);
  const [isLoadingWeb, setIsLoadingWeb] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  // Local store URL custom configuration (for Leclerc Drive exact store links on Web & Mobile)
  const [customStoreUrl, setCustomStoreUrl] = useState("");
  const [isEditingStoreUrl, setIsEditingStoreUrl] = useState(false);
  const [storeUrlInput, setStoreUrlInput] = useState("");

  // Index de l'ingrédient en cours d'assistance
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [isAssistantCollapsed, setIsAssistantCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelectingStore, setIsSelectingStore] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");

  const currentItem = groceries[currentIndex] || groceries[0];

  const getCleanItemName = (item) => {
    if (!item) return "";
    const rawName = item.name?.[lang] || item.name?.fr || item.customName || "";
    return DriveService.cleanSearchQuery(rawName);
  };

  const getRawItemName = (item) => {
    if (!item) return "";
    return item.name?.[lang] || item.name?.fr || item.customName || "";
  };

  // Charger le magasin préféré sauvegardé et l'URL personnalisée de magasin
  useEffect(() => {
    AsyncStorage.getItem("@planeat_preferred_drive_store")
      .then((savedStoreId) => {
        if (savedStoreId) {
          const store = DriveService.getStoreById(savedStoreId);
          if (store) {
            setSelectedStore(store);
            setCurrentUrl(store.homeUrl);
          }
        }
      })
      .catch(() => {});

    AsyncStorage.getItem("@planeat_custom_drive_store_url")
      .then((savedUrl) => {
        if (savedUrl) {
          setCustomStoreUrl(savedUrl);
          setStoreUrlInput(savedUrl);
          storeBaseUrlRef.current = savedUrl;
        }
      })
      .catch(() => {});
  }, []);

  // Sync input query with current item
  useEffect(() => {
    if (currentItem) {
      setSearchQuery(getCleanItemName(currentItem));
    }
  }, [currentItem?.id, currentIndex]);

  const suggestions = currentItem
    ? DriveService.getSearchSuggestions(getRawItemName(currentItem))
    : [];

  const copyToClipboard = async (text, feedbackMsg = "Copié !") => {
    if (!text) return;
    try {
      await Clipboard.setStringAsync(text);
      setIsCopied(true);
      setCopyFeedback(feedbackMsg);
      setTimeout(() => {
        setIsCopied(false);
        setCopyFeedback("");
      }, 2000);
    } catch(e) {}
  };

  // Sauvegarder l'URL du magasin local
  const handleSaveStoreUrl = async () => {
    const trimmed = storeUrlInput.trim();
    if (!trimmed) {
      setCustomStoreUrl("");
      await AsyncStorage.removeItem("@planeat_custom_drive_store_url");
      setIsEditingStoreUrl(false);
      return;
    }
    const match = trimmed.match(/(https?:\/\/[^\/]+\/magasin-[^\/\?#]+)/i);
    const cleanUrl = match ? match[1] : trimmed.replace(/\/+$/, "").replace(/\/recherche\.aspx.*$/i, "").replace(/\/recherche\/.*$/i, "");
    setCustomStoreUrl(cleanUrl);
    setStoreUrlInput(cleanUrl);
    storeBaseUrlRef.current = cleanUrl;
    await AsyncStorage.setItem("@planeat_custom_drive_store_url", cleanUrl);
    setIsEditingStoreUrl(false);
    copyToClipboard("", "✅ Magasin enregistré !");
  };

  // Obtenir le lien direct de recherche
  const getDirectSearchUrl = (query) => {
    const clean = (query || getCleanItemName(currentItem) || "").trim();
    const q = encodeURIComponent(clean);
    if (selectedStore.id === "leclerc") {
      const base = customStoreUrl || storeBaseUrlRef.current;
      if (base && base.includes("magasin-")) {
        const cleanBase = base.replace(/\/+$/, "").replace(/\/recherche\.aspx.*$/i, "").replace(/\/recherche\/.*$/i, "");
        if (cleanBase.includes("m-courses")) {
          return `${cleanBase}/recherche/${q}`;
        }
        return `${cleanBase}/recherche.aspx?TexteRecherche=${q}`;
      }
      return `https://www.e.leclerc/recherche?q=${q}`;
    }
    if (selectedStore.id === "carrefour") return `https://www.carrefour.fr/r?q=${q}`;
    if (selectedStore.id === "auchan") return `https://www.auchan.fr/recherche?text=${q}`;
    if (selectedStore.id === "coursesu") return `https://www.coursesu.com/recherche?q=${q}`;
    if (selectedStore.id === "intermarche") return `https://www.intermarche.com/recherche?q=${q}`;
    return `https://www.google.com/search?q=${encodeURIComponent(selectedStore.name + " " + clean)}`;
  };

  // Ouvrir la recherche dans un nouvel onglet (Web) ou navigateur externe
  const handleOpenSearchWeb = (query) => {
    const targetUrl = getDirectSearchUrl(query || searchQuery);
    const textToCopy = (query || searchQuery || getCleanItemName(currentItem)).trim();
    if (textToCopy) {
      copyToClipboard(textToCopy, "🔍 Mot-clé copié & Recherche ouverte !");
    }
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      } else {
        Linking.openURL(targetUrl);
      }
    } else {
      Linking.openURL(targetUrl);
    }
  };

  // Copier le mot-clé et passer automatiquement à l'article suivant
  const handleCopyAndNext = async () => {
    const textToCopy = (searchQuery || getCleanItemName(currentItem)).trim();
    if (textToCopy) {
      await copyToClipboard(textToCopy, "📋 Copié ! Article suivant");
    }
    if (currentItem && !currentItem.checked) {
      onToggleItem(currentItem.id);
    }
    if (currentIndex < groceries.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextItem = groceries[nextIndex];
      if (nextItem) {
        const nextQuery = getCleanItemName(nextItem);
        setSearchQuery(nextQuery);
        if (Platform.OS !== "web") {
          injectSearchInStore(nextQuery);
        }
      }
    }
  };

  // Copier toute la liste de courses
  const handleCopyAllGroceries = async () => {
    if (!groceries || groceries.length === 0) return;
    const lines = groceries.map((item, idx) => {
      const name = item.name?.[lang] || item.name?.fr || item.customName || "";
      const qty = item.totalQuantity ? ` (${item.totalQuantity} ${item.unit || ""})`.trim() : "";
      const status = item.checked ? "[x]" : "[ ]";
      return `${status} ${name}${qty}`;
    });
    const fullText = `🛒 Liste de courses PlanEat (${selectedStore.name}) :\n` + lines.join("\n");
    await copyToClipboard(fullText, "📄 Toute la liste a été copiée !");
  };

  // Mobile WebView Navigation & Injection
  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);

    const url = navState.url || "";
    if (url) {
      if (url.includes("/404") || url.includes("page-introuvable") || url.includes("/erreur-404")) {
        setCurrentUrl(selectedStore.homeUrl);
        return;
      }
      const match = url.match(/(https?:\/\/[^\/]+\/magasin-[^\/\?#]+)/i);
      if (match && match[1]) {
        storeBaseUrlRef.current = match[1];
        setCustomStoreUrl(match[1]);
        AsyncStorage.setItem("@planeat_custom_drive_store_url", match[1]).catch(() => {});
      }
    }

    if (isSelectingStore && url) {
      const cleanUrl = url.replace(/\/+$/, "").toLowerCase();
      const isInitialHome = (
        cleanUrl === selectedStore.homeUrl.replace(/\/+$/, "").toLowerCase() ||
        cleanUrl === "https://www.carrefour.fr" ||
        cleanUrl === "https://www.carrefour.fr/drive" ||
        cleanUrl === "https://www.leclercdrive.fr" ||
        cleanUrl === "https://m-courses.leclercdrive.fr" ||
        cleanUrl === "https://www.coursesu.com" ||
        cleanUrl === "https://www.coursesu.com/drive/accueil" ||
        cleanUrl === "https://www.auchan.fr" ||
        cleanUrl === "https://www.auchan.fr/drive" ||
        cleanUrl === "https://www.intermarche.com" ||
        cleanUrl === "https://www.intermarche.com/accueil" ||
        cleanUrl === "https://www.intermarche.com/drive"
      );

      if (!isInitialHome) {
        const isStoreSelected =
          url.includes("/magasin-") ||
          url.includes("/magasins/") ||
          url.includes("m-courses.leclercdrive.fr/magasin") ||
          (selectedStore.id === "carrefour" && (url.includes("/magasins/") || url.includes("/drive/") || url.includes("service_point"))) ||
          (selectedStore.id === "coursesu" && (url.includes("/magasin-") || url.includes("/courses-en-ligne/"))) ||
          (selectedStore.id === "auchan" && (url.includes("/magasin") || url.includes("/courses/"))) ||
          (selectedStore.id === "intermarche" && (url.includes("/magasin") || url.includes("/pdv/") || url.includes("/rayons")));

        if (isStoreSelected) {
          setIsSelectingStore(false);
          setTimeout(() => {
            if (currentItem) {
              const q = getCleanItemName(currentItem);
              if (q) {
                setSearchQuery(q);
                injectSearchInStore(q);
              }
            }
          }, 400);
        }
      }
    }
  };

  const injectSearchInStore = (query) => {
    if (Platform.OS === "web") return;
    if (!query) return;
    const cleanQ = query.trim();
    if (!cleanQ) return;

    Clipboard.setStringAsync(cleanQ).catch(() => {});
    const targetUrl = getDirectSearchUrl(cleanQ);

    if (selectedStore.id === "leclerc" || selectedStore.id === "carrefour") {
      setCurrentUrl(targetUrl);
      const js = `
        (function() {
          try {
            var target = ${JSON.stringify(targetUrl)};
            if (window.location.href !== target) {
              window.location.replace(target);
            }
          } catch(e) {}
        })();
        true;
      `;
      webViewRef.current?.injectJavaScript(js);
      return;
    }

    const domSearchJs = `
      (function() {
        try {
          var query = ${JSON.stringify(cleanQ)};
          var targetUrl = ${JSON.stringify(targetUrl)};
          var attempts = 0;

          function trySearch() {
            attempts++;
            var forms = document.querySelectorAll('form');
            for (var f = 0; f < forms.length; f++) {
              var formEl = forms[f];
              var qEl = formEl.querySelector('input[name="q"], input[type="search"], input[name="TexteRecherche"], input[name="text"], input[name="query"], input[name="keyword"], input[name="search"], input[placeholder*="recherch" i], input[placeholder*="produit" i], input[placeholder*="article" i], input.search-input, input#search-input');
              if (qEl) {
                try {
                  qEl.focus();
                  var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value') ? Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set : null;
                  if (nativeSetter) {
                    nativeSetter.call(qEl, query);
                  } else {
                    qEl.value = query;
                  }
                  qEl.dispatchEvent(new Event('input', { bubbles: true }));
                  qEl.dispatchEvent(new Event('change', { bubbles: true }));
                  qEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                  qEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                  var submitBtn = formEl.querySelector('button[type="submit"], input[type="submit"], button.search-button, button.header-search__btn');
                  if (submitBtn) {
                    submitBtn.click();
                    return;
                  }
                  formEl.submit();
                  return;
                } catch(errForm) {}
              }
            }

            var selectors = [
              'input[type="search"]',
              'input[name="q"]',
              'input[name="keyword"]',
              'input[name="search"]',
              'input#search-input',
              'input[name="TexteRecherche"]',
              'input[name="text"]',
              'input[name="query"]',
              'input[placeholder*="recherch" i]'
            ];

            for (var i = 0; i < selectors.length; i++) {
              var input = document.querySelector(selectors[i]);
              if (input) {
                try {
                  input.focus();
                  var nativeSetter2 = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value') ? Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set : null;
                  if (nativeSetter2) {
                    nativeSetter2.call(input, query);
                  } else {
                    input.value = query;
                  }
                  input.dispatchEvent(new Event('input', { bubbles: true }));
                  input.dispatchEvent(new Event('change', { bubbles: true }));
                  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                  input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                  var nearbyBtn = input.parentElement?.querySelector('button') || document.querySelector('button[aria-label*="recherch" i], button.search-button');
                  if (nearbyBtn) nearbyBtn.click();
                  return;
                } catch(errInput) {}
              }
            }

            if (attempts >= 2) {
              if (${JSON.stringify(selectedStore.id)} !== "intermarche") {
                window.location.href = targetUrl;
              }
              return;
            }
            setTimeout(trySearch, 200);
          }
          trySearch();
        } catch(err) {
          if (${JSON.stringify(selectedStore.id)} !== "intermarche") {
            window.location.href = targetUrl;
          }
        }
      })();
      true;
    `;
    webViewRef.current?.injectJavaScript(domSearchJs);
  };

  const handleSelectStore = (store) => {
    setSelectedStore(store);
    setCurrentUrl(store.homeUrl);
    setIsSelectingStore(true);
    AsyncStorage.setItem("@planeat_preferred_drive_store", store.id).catch(() => {});
  };

  const handleStartShopping = () => {
    setIsSelectingStore(false);
    if (currentItem) {
      const q = getCleanItemName(currentItem);
      if (q) {
        setSearchQuery(q);
        injectSearchInStore(q);
      }
    }
  };

  const handleSearchTerm = (term) => {
    const q = (term !== undefined ? term : searchQuery).trim();
    if (!q) return;
    setSearchQuery(q);
    if (Platform.OS === "web") {
      handleOpenSearchWeb(q);
    } else {
      setIsSelectingStore(false);
      injectSearchInStore(q);
    }
  };

  const handleItemAdded = () => {
    if (!currentItem) return;
    onToggleItem(currentItem.id);

    if (currentIndex < groceries.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextItem = groceries[nextIndex];
      if (nextItem) {
        const query = getCleanItemName(nextItem);
        if (query) {
          setSearchQuery(query);
          if (Platform.OS !== "web") {
            injectSearchInStore(query);
          }
        }
      }
    }
  };

  const handleSkipItem = () => {
    if (currentIndex < groceries.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextItem = groceries[nextIndex];
      if (nextItem) {
        const query = getCleanItemName(nextItem);
        if (query) {
          setSearchQuery(query);
          if (Platform.OS !== "web") {
            injectSearchInStore(query);
          }
        }
      }
    }
  };

  const handlePrevItem = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevItem = groceries[prevIndex];
      if (prevItem) {
        const query = getCleanItemName(prevItem);
        if (query) {
          setSearchQuery(query);
          if (Platform.OS !== "web") {
            injectSearchInStore(query);
          }
        }
      }
    }
  };

  const progressPercent = groceries.length > 0
    ? Math.round(((groceries.filter(g => g.checked).length) / groceries.length) * 100)
    : 0;

  // ==========================================
  // RENDER WEB (Optimisé Ordinateur & Navigateur)
  // ==========================================
  if (Platform.OS === "web") {
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent={false}
        onRequestClose={onClose}
      >
        <View style={[styles.webSafeWrapper, { backgroundColor: theme.bg }]}>
          <View style={styles.webContentContainer}>
            {/* Header Web */}
            <View style={[styles.webHeader, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={styles.webHeaderLeft}>
                <Text style={styles.webHeaderEmoji}>{selectedStore.logoEmoji}</Text>
                <View>
                  <Text style={[styles.webHeaderTitle, { color: theme.text }]}>
                    Assistant Drive • {selectedStore.name}
                  </Text>
                  <Text style={[styles.webHeaderSub, { color: theme.textSub }]}>
                    {groceries.filter(g => g.checked).length} / {groceries.length} articles complétés ({progressPercent}%)
                  </Text>
                </View>
              </View>

              <View style={styles.webHeaderRight}>
                <TouchableOpacity
                  style={[styles.webActionPillBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}
                  onPress={handleCopyAllGroceries}
                >
                  <Ionicons name="copy-outline" size={15} color="#38bdf8" />
                  <Text style={[styles.webActionPillText, { color: theme.text }]}>Copier toute la liste</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.webCloseBtn}
                  onPress={onClose}
                >
                  <Ionicons name="close" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Notification flottante Copié */}
            {copyFeedback ? (
              <View style={styles.webToastAlert}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text style={styles.webToastAlertText}>{copyFeedback}</Text>
              </View>
            ) : null}

            <ScrollView contentContainerStyle={styles.webScrollBody} showsVerticalScrollIndicator={false}>
              {/* Store Switcher */}
              <View style={[styles.webStorePickerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                <Text style={[styles.webSectionLabel, { color: theme.textSub }]}>CHOIX DU MAGASIN DRIVE</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storeChipsScroll}>
                  {DRIVE_STORES.map((store) => {
                    const isSelected = selectedStore.id === store.id;
                    return (
                      <TouchableOpacity
                        key={store.id}
                        style={[
                          styles.storeChip,
                          { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                          isSelected && { backgroundColor: store.color, borderColor: "#ffffff" }
                        ]}
                        onPress={() => handleSelectStore(store)}
                      >
                        <Text style={styles.storeChipEmoji}>{store.logoEmoji}</Text>
                        <Text
                          style={[
                            styles.storeChipText,
                            { color: theme.textSub },
                            isSelected && styles.storeChipTextActive
                          ]}
                        >
                          {store.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {/* Configuration Magasin Leclerc Local */}
                {selectedStore.id === "leclerc" && (
                  <View style={[styles.webStoreConfigBox, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
                    <View style={styles.webStoreConfigHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.webStoreConfigTitle, { color: theme.text }]}>
                          🏪 Votre magasin Leclerc Drive :
                        </Text>
                        <Text style={[styles.webStoreConfigSub, { color: customStoreUrl ? "#10b981" : "#94a3b8" }]} numberOfLines={1}>
                          {customStoreUrl ? customStoreUrl : "Non configuré (Recherche globale E.Leclerc)"}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.webEditStoreBtn, { backgroundColor: theme.cardBg }]}
                        onPress={() => setIsEditingStoreUrl(!isEditingStoreUrl)}
                      >
                        <Ionicons name={isEditingStoreUrl ? "close" : "create-outline"} size={14} color="#38bdf8" />
                        <Text style={styles.webEditStoreBtnText}>
                          {isEditingStoreUrl ? "Fermer" : (customStoreUrl ? "Modifier" : "Configurer")}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {isEditingStoreUrl && (
                      <View style={styles.webStoreInputContainer}>
                        <Text style={[styles.webStoreInputHelp, { color: theme.textSub }]}>
                          Ouvrez votre Leclerc Drive habituel dans votre navigateur, copiez son adresse web (ex: https://www.leclercdrive.fr/magasin-XXXXX-nom/) et collez-la ici :
                        </Text>
                        <View style={styles.webStoreInputRow}>
                          <TextInput
                            style={[styles.webStoreTextInput, { backgroundColor: theme.cardBg, color: theme.text, borderColor: theme.border }]}
                            placeholder="https://www.leclercdrive.fr/magasin-087201-bois-d-arcy/"
                            placeholderTextColor="#64748b"
                            value={storeUrlInput}
                            onChangeText={setStoreUrlInput}
                            autoCapitalize="none"
                            autoCorrect={false}
                          />
                          <TouchableOpacity
                            style={styles.webStoreSaveBtn}
                            onPress={handleSaveStoreUrl}
                          >
                            <Ionicons name="checkmark" size={16} color="#ffffff" />
                            <Text style={styles.webStoreSaveBtnText}>Enregistrer</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>

              {/* Progress Bar */}
              <View style={[styles.webProgressCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                <View style={styles.dockProgressRow}>
                  <Text style={[styles.dockProgressLabel, { color: theme.text }]}>
                    🛒 Progression : {groceries.filter(g => g.checked).length} / {groceries.length} articles
                  </Text>
                  <Text style={[styles.dockProgressLabel, { color: "#10b981" }]}>
                    {progressPercent}%
                  </Text>
                </View>
                <View style={[styles.progressBarTrack, { backgroundColor: theme.cardBgAlt }]}>
                  <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                </View>
              </View>

              {/* Current Item Shopping Card */}
              {currentItem ? (
                <View style={[styles.webMainCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                  <View style={styles.itemBadgeRow}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text style={styles.itemIndexBadge}>
                        Article {currentIndex + 1} / {groceries.length}
                      </Text>
                      {currentItem.dept ? (
                        <Text style={[styles.itemDeptBadge, { backgroundColor: theme.cardBgAlt, color: theme.textSub }]}>
                          {t[currentItem.dept] || currentItem.dept}
                        </Text>
                      ) : null}
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.quickCopyChip,
                        { backgroundColor: isCopied ? "#10b981" : theme.cardBgAlt, borderColor: isCopied ? "#10b981" : theme.border }
                      ]}
                      onPress={() => copyToClipboard(searchQuery || getCleanItemName(currentItem))}
                    >
                      <Ionicons name={isCopied ? "checkmark" : "copy-outline"} size={13} color={isCopied ? "#ffffff" : "#38bdf8"} />
                      <Text style={[styles.quickCopyChipText, { color: isCopied ? "#ffffff" : theme.textSub }]}>
                        {isCopied ? "Copié !" : "Copier le mot-clé"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={[styles.webItemTitle, { color: theme.text }]}>
                    {currentItem.name?.[lang] || currentItem.name?.fr || currentItem.customName}
                  </Text>

                  {currentItem.totalQuantity ? (
                    <Text style={styles.currentItemQuantity}>
                      Quantité recette : {currentItem.totalQuantity} {currentItem.unit}
                    </Text>
                  ) : null}

                  {/* Search Query Input */}
                  <View style={styles.webSearchInputWrapper}>
                    <Text style={[styles.webSearchInputLabel, { color: theme.textSub }]}>Mot-clé recherché :</Text>
                    <View style={[styles.webSearchInputRow, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
                      <Ionicons name="search" size={16} color="#94a3b8" />
                      <TextInput
                        style={[styles.webSearchInput, { color: theme.text }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Mot-clé de recherche"
                        placeholderTextColor="#64748b"
                      />
                    </View>
                  </View>

                  {/* Suggestions Chips */}
                  {suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                      <Text style={[styles.suggestionsLabel, { color: theme.textSub }]}>Suggestions :</Text>
                      <View style={styles.webSuggestionsWrap}>
                        {suggestions.map((sug, idx) => {
                          const isActive = searchQuery.toLowerCase() === sug.toLowerCase();
                          return (
                            <TouchableOpacity
                              key={idx}
                              style={[
                                styles.sugChip,
                                { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                                isActive && styles.sugChipActive
                              ]}
                              onPress={() => handleSearchTerm(sug)}
                            >
                              <Ionicons name="sparkles" size={12} color={isActive ? "#ffffff" : "#38bdf8"} />
                              <Text style={[styles.sugChipText, { color: theme.textSub }, isActive && styles.sugChipTextActive]}>
                                {sug}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {/* Action Buttons Row */}
                  <View style={styles.webActionButtonsGrid}>
                    <TouchableOpacity
                      style={[styles.webDirectSearchBtn, { backgroundColor: selectedStore.color }]}
                      onPress={() => handleOpenSearchWeb(searchQuery)}
                    >
                      <Ionicons name="open-outline" size={18} color="#ffffff" />
                      <Text style={styles.webDirectSearchBtnText}>
                        Chercher sur {selectedStore.shortName} ↗
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.webCopyNextBtn}
                      onPress={handleCopyAndNext}
                    >
                      <Ionicons name="copy" size={17} color="#ffffff" />
                      <Text style={styles.webCopyNextBtnText}>
                        Copier & Suivant ➔
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Nav Previous / Next & Checked Toggle */}
                  <View style={styles.webNavFooterRow}>
                    <TouchableOpacity
                      style={[styles.webNavBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }, currentIndex === 0 && styles.btnDisabled]}
                      onPress={handlePrevItem}
                      disabled={currentIndex === 0}
                    >
                      <Ionicons name="arrow-back" size={15} color={theme.text} />
                      <Text style={[styles.webNavBtnText, { color: theme.text }]}>Précédent</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.webToggleAddedBtn,
                        currentItem.checked ? styles.webToggleAddedBtnChecked : { backgroundColor: theme.cardBgAlt, borderColor: theme.border }
                      ]}
                      onPress={handleItemAdded}
                    >
                      <Ionicons
                        name={currentItem.checked ? "checkmark-circle" : "ellipse-outline"}
                        size={17}
                        color={currentItem.checked ? "#ffffff" : "#10b981"}
                      />
                      <Text style={[styles.webToggleAddedBtnText, currentItem.checked && { color: "#ffffff" }]}>
                        {currentItem.checked ? "Ajouté au panier" : "Marquer comme ajouté"}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.webNavBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }, currentIndex >= groceries.length - 1 && styles.btnDisabled]}
                      onPress={handleSkipItem}
                      disabled={currentIndex >= groceries.length - 1}
                    >
                      <Text style={[styles.webNavBtnText, { color: theme.text }]}>Suivant</Text>
                      <Ionicons name="arrow-forward" size={15} color={theme.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={[styles.allDoneBox, { backgroundColor: theme.cardBg, borderColor: theme.border, borderRadius: 16, padding: 24 }]}>
                  <Text style={styles.allDoneEmoji}>🎉</Text>
                  <Text style={styles.allDoneText}>Tous vos articles sont ajoutés au panier !</Text>
                  <TouchableOpacity style={styles.webCloseAllDoneBtn} onPress={onClose}>
                    <Text style={styles.webCloseAllDoneBtnText}>Terminer les courses</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Grocery List Overview */}
              <View style={[styles.webListCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                <View style={styles.webListHeaderRow}>
                  <Text style={[styles.webSectionLabel, { color: theme.textSub, marginBottom: 0 }]}>
                    LISTE COMPLÈTE ({groceries.length} ARTICLES)
                  </Text>
                  <TouchableOpacity onPress={() => setIsListExpanded(!isListExpanded)}>
                    <Text style={{ color: "#38bdf8", fontSize: 12, fontWeight: "700" }}>
                      {isListExpanded ? "Réduire" : "Déplier la liste"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {isListExpanded && (
                  <View style={styles.webListItemsContainer}>
                    {groceries.map((item, idx) => {
                      const itemName = item.name?.[lang] || item.name?.fr || item.customName;
                      const isCurrent = currentItem?.id === item.id;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          style={[
                            styles.drawerItemRow,
                            item.checked && styles.drawerItemChecked,
                            isCurrent && styles.drawerItemActive,
                            { backgroundColor: theme.cardBgAlt, marginBottom: 4 }
                          ]}
                          onPress={() => {
                            setCurrentIndex(idx);
                            const q = getCleanItemName(item);
                            if (q) setSearchQuery(q);
                          }}
                        >
                          <Ionicons
                            name={item.checked ? "checkmark-circle" : "ellipse-outline"}
                            size={18}
                            color={item.checked ? "#10b981" : theme.textMuted}
                          />
                          <Text
                            style={[
                              styles.drawerItemName,
                              { color: theme.text },
                              item.checked && [styles.drawerItemNameChecked, { color: theme.textMuted }]
                            ]}
                            numberOfLines={1}
                          >
                            {itemName}
                          </Text>
                          {item.totalQuantity ? (
                            <Text style={[styles.drawerItemQty, { color: theme.textSub }]}>
                              {item.totalQuantity} {item.unit}
                            </Text>
                          ) : null}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // ==========================================
  // RENDER MOBILE (iOS / Android avec WebView & Dock Impeccable)
  // ==========================================
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.bg }]} edges={["top", "bottom", "left", "right"]}>
        {/* Top Header */}
        <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.border }]}>
          <View style={styles.headerTopRow}>
            <View style={styles.brandTitleBox}>
              <Text style={styles.brandEmoji}>{selectedStore.logoEmoji}</Text>
              <View>
                <Text style={[styles.storeNameText, { color: theme.text }]}>{selectedStore.name}</Text>
                {!isSelectingStore ? (
                  <TouchableOpacity
                    style={styles.changeStoreInlineChip}
                    onPress={() => {
                      setIsSelectingStore(true);
                      setCurrentUrl(selectedStore.homeUrl);
                    }}
                  >
                    <Ionicons name="swap-horizontal" size={11} color="#38bdf8" />
                    <Text style={styles.changeStoreInlineText}>Changer de magasin</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={[styles.subTitleText, { color: theme.textSub }]}>Choix du Drive</Text>
                )}
              </View>
            </View>

            <View style={styles.navControls}>
              <TouchableOpacity
                hitSlop={{ top: 12, bottom: 12, left: 6, right: 6 }}
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }, !canGoBack && styles.btnDisabled]}
                disabled={!canGoBack}
                onPress={() => webViewRef.current?.goBack()}
              >
                <Ionicons name="arrow-back" size={17} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={{ top: 12, bottom: 12, left: 6, right: 6 }}
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }, !canGoForward && styles.btnDisabled]}
                disabled={!canGoForward}
                onPress={() => webViewRef.current?.goForward()}
              >
                <Ionicons name="arrow-forward" size={17} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={{ top: 12, bottom: 12, left: 6, right: 6 }}
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }]}
                onPress={() => webViewRef.current?.reload()}
              >
                <Ionicons name="reload" size={15} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={{ top: 12, bottom: 12, left: 6, right: 6 }}
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }]}
                onPress={() => Linking.openURL(currentUrl)}
              >
                <Ionicons name="open-outline" size={16} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                style={styles.closeBtn}
                onPress={onClose}
              >
                <Ionicons name="close" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Store Switcher Chips */}
          {isSelectingStore && (
            <View style={{ paddingTop: 4, paddingBottom: 4 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storeChipsScroll}
              >
                {DRIVE_STORES.map((store) => {
                  const isSelected = selectedStore.id === store.id;
                  return (
                    <TouchableOpacity
                      key={store.id}
                      style={[
                        styles.storeChip,
                        { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                        isSelected && { backgroundColor: store.color, borderColor: "#ffffff" }
                      ]}
                      onPress={() => handleSelectStore(store)}
                    >
                      <Text style={styles.storeChipEmoji}>{store.logoEmoji}</Text>
                      <Text
                        style={[
                          styles.storeChipText,
                          { color: theme.textSub },
                          isSelected && styles.storeChipTextActive
                        ]}
                      >
                        {store.shortName}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Center : WebView du Drive */}
        <View style={styles.webContainer}>
          {WebView ? (
            <WebView
              ref={webViewRef}
              source={{ uri: currentUrl }}
              onNavigationStateChange={handleNavigationStateChange}
              onLoadStart={() => setIsLoadingWeb(true)}
              onLoadEnd={() => setIsLoadingWeb(false)}
              originWhitelist={["*"]}
              setSupportMultipleWindows={false}
              sharedCookiesEnabled={true}
              thirdPartyCookiesEnabled={true}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              style={styles.webView}
            />
          ) : null}

          {isLoadingWeb && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#10b981" />
              <Text style={styles.loadingText}>Chargement du Drive...</Text>
            </View>
          )}

          {isSelectingStore && (
            <View style={styles.floatingStartBar}>
              <TouchableOpacity
                style={styles.floatingStartBtn}
                onPress={handleStartShopping}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["#10b981", "#059669"]}
                  style={styles.floatingStartGradient}
                >
                  <Ionicons name="checkmark-circle" size={18} color="#ffffff" />
                  <Text style={styles.floatingStartBtnText}>
                    J'ai choisi mon magasin ➔ Commencer
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Assistant Dock */}
        {!isSelectingStore && (
          isAssistantCollapsed ? (
            <View style={[styles.collapsedDock, { backgroundColor: theme.cardBg, borderTopColor: theme.border }]}>
              <TouchableOpacity
                style={styles.collapsedLeftTouch}
                onPress={() => setIsAssistantCollapsed(false)}
                activeOpacity={0.8}
              >
                <View style={styles.collapsedBadge}>
                  <Text style={styles.collapsedBadgeText}>#{currentIndex + 1}</Text>
                </View>
                <Text style={[styles.collapsedItemName, { color: theme.text }]} numberOfLines={1}>
                  {getCleanItemName(currentItem)}
                </Text>
              </TouchableOpacity>

              <View style={styles.collapsedRightActions}>
                <TouchableOpacity style={styles.collapsedAddedBtn} onPress={handleItemAdded}>
                  <Ionicons name="checkmark" size={16} color="#ffffff" />
                  <Text style={styles.collapsedAddedText}>Suivant</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.collapsedExpandBtn, { backgroundColor: theme.cardBgAlt }]}
                  onPress={() => setIsAssistantCollapsed(false)}
                >
                  <Ionicons name="chevron-up" size={18} color="#38bdf8" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[styles.bottomDock, { backgroundColor: theme.cardBg, borderTopColor: theme.border }]}>
              {/* Header Dock : Progression & Actions */}
              <View style={styles.dockProgressRow}>
                <View style={styles.dockProgressLeft}>
                  <Text style={[styles.dockProgressLabel, { color: theme.text }]}>
                    🛒 Progression : {groceries.filter(g => g.checked).length} / {groceries.length}
                  </Text>
                </View>
                <View style={styles.dockProgressRightActions}>
                  <TouchableOpacity
                    style={[styles.collapseBtnSmall, { backgroundColor: theme.cardBgAlt }]}
                    onPress={() => setIsAssistantCollapsed(true)}
                  >
                    <Ionicons name="chevron-down" size={14} color="#94a3b8" />
                    <Text style={styles.collapseBtnSmallText}>Réduire</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.toggleListBtn, { backgroundColor: theme.cardBgAlt }]}
                    onPress={() => setIsListExpanded(!isListExpanded)}
                  >
                    <Ionicons
                      name={isListExpanded ? "chevron-down" : "list"}
                      size={14}
                      color="#38bdf8"
                    />
                    <Text style={styles.toggleListBtnText}>
                      {isListExpanded ? "Fermer" : "Liste"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={[styles.progressBarTrack, { backgroundColor: theme.cardBgAlt }]}>
                <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
              </View>

              {/* Drawer Liste Déroulante Complète */}
              {isListExpanded && (
                <ScrollView style={[styles.expandedListScroll, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]} showsVerticalScrollIndicator={true}>
                  {groceries.map((item, idx) => {
                    const itemName = item.name?.[lang] || item.name?.fr || item.customName;
                    const isCurrent = currentItem?.id === item.id;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.drawerItemRow,
                          item.checked && styles.drawerItemChecked,
                          isCurrent && styles.drawerItemActive
                        ]}
                        onPress={() => {
                          setCurrentIndex(idx);
                          setIsListExpanded(false);
                          const q = getCleanItemName(item);
                          if (q) {
                            setSearchQuery(q);
                            injectSearchInStore(q);
                          }
                        }}
                      >
                        <Ionicons
                          name={item.checked ? "checkmark-circle" : "ellipse-outline"}
                          size={18}
                          color={item.checked ? "#10b981" : theme.textMuted}
                        />
                        <Text
                          style={[
                            styles.drawerItemName,
                            { color: theme.text },
                            item.checked && [styles.drawerItemNameChecked, { color: theme.textMuted }]
                          ]}
                          numberOfLines={1}
                        >
                          {itemName}
                        </Text>
                        {item.totalQuantity ? (
                          <Text style={[styles.drawerItemQty, { color: theme.textSub }]}>
                            {item.totalQuantity} {item.unit}
                          </Text>
                        ) : null}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}

              {/* Card Article Actuel */}
              {currentItem ? (
                <View style={[styles.currentCard, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
                  <View style={styles.currentItemInfo}>
                    <View style={styles.itemBadgeRow}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap", flex: 1 }}>
                        <Text style={styles.itemIndexBadge}>
                          Article {currentIndex + 1} / {groceries.length}
                        </Text>
                        {currentItem.dept ? (
                          <Text style={[styles.itemDeptBadge, { backgroundColor: theme.cardBg, color: theme.textSub }]}>
                            {t[currentItem.dept] || currentItem.dept}
                          </Text>
                        ) : null}
                      </View>

                      <TouchableOpacity
                        style={[
                          styles.quickCopyChip,
                          { backgroundColor: isCopied ? "#10b981" : theme.cardBg, borderColor: isCopied ? "#10b981" : theme.border }
                        ]}
                        onPress={() => copyToClipboard(searchQuery || getCleanItemName(currentItem))}
                      >
                        <Ionicons name={isCopied ? "checkmark" : "copy-outline"} size={12} color={isCopied ? "#ffffff" : "#38bdf8"} />
                        <Text style={[styles.quickCopyChipText, { color: isCopied ? "#ffffff" : theme.textSub }]}>
                          {isCopied ? "Copié !" : "Copier"}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={[styles.currentItemTitle, { color: theme.text }]} numberOfLines={1}>
                      {currentItem.name?.[lang] || currentItem.name?.fr || currentItem.customName}
                    </Text>

                    {currentItem.totalQuantity ? (
                      <Text style={styles.currentItemQuantity}>
                        Quantité recette : {currentItem.totalQuantity} {currentItem.unit}
                      </Text>
                    ) : null}
                  </View>

                  {/* Suggestions Chips */}
                  {suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
                        {suggestions.map((sug, idx) => {
                          const isActive = searchQuery.toLowerCase() === sug.toLowerCase();
                          return (
                            <TouchableOpacity
                              key={idx}
                              style={[
                                styles.sugChip,
                                { backgroundColor: theme.cardBg, borderColor: theme.border },
                                isActive && styles.sugChipActive
                              ]}
                              onPress={() => handleSearchTerm(sug)}
                            >
                              <Ionicons name="sparkles" size={12} color={isActive ? "#ffffff" : "#38bdf8"} />
                              <Text style={[styles.sugChipText, { color: theme.textSub }, isActive && styles.sugChipTextActive]}>
                                {sug}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                    </View>
                  )}

                  {/* Actions Row : Prev, Suivant & Next */}
                  <View style={styles.actionButtonsRow}>
                    <TouchableOpacity
                      style={[styles.skipBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }, currentIndex === 0 && styles.btnDisabled]}
                      onPress={handlePrevItem}
                      disabled={currentIndex === 0}
                    >
                      <Ionicons name="play-back" size={16} color={theme.textSub} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.addedBtn}
                      onPress={handleItemAdded}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="checkmark-circle" size={18} color="#ffffff" />
                      <Text style={styles.addedBtnText}>Article suivant</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.skipBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }, currentIndex >= groceries.length - 1 && styles.btnDisabled]}
                      onPress={handleSkipItem}
                      disabled={currentIndex >= groceries.length - 1}
                    >
                      <Ionicons name="play-forward" size={16} color={theme.textSub} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.allDoneBox}>
                  <Text style={styles.allDoneEmoji}>🎉</Text>
                  <Text style={styles.allDoneText}>Tous vos articles sont ajoutés au panier !</Text>
                </View>
              )}
            </View>
          )
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#0f172a"
  },
  webSafeWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#0f172a"
  },
  webContentContainer: {
    width: "100%",
    maxWidth: 780,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24
  },
  webHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14
  },
  webHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  webHeaderEmoji: {
    fontSize: 26
  },
  webHeaderTitle: {
    fontSize: 16,
    fontWeight: "800"
  },
  webHeaderSub: {
    fontSize: 12,
    marginTop: 2
  },
  webHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  webActionPillBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6
  },
  webActionPillText: {
    fontSize: 12,
    fontWeight: "700"
  },
  webCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center"
  },
  webToastAlert: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "#10b981",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
    gap: 8
  },
  webToastAlertText: {
    color: "#10b981",
    fontSize: 13,
    fontWeight: "700"
  },
  webScrollBody: {
    gap: 14,
    paddingBottom: 30
  },
  webStorePickerCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10
  },
  webSectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8
  },
  webStoreConfigBox: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    gap: 8
  },
  webStoreConfigHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  webStoreConfigTitle: {
    fontSize: 13,
    fontWeight: "700"
  },
  webStoreConfigSub: {
    fontSize: 11,
    marginTop: 2
  },
  webEditStoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4
  },
  webEditStoreBtnText: {
    color: "#38bdf8",
    fontSize: 11,
    fontWeight: "700"
  },
  webStoreInputContainer: {
    marginTop: 6,
    gap: 6
  },
  webStoreInputHelp: {
    fontSize: 11,
    lineHeight: 15
  },
  webStoreInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  webStoreTextInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 12
  },
  webStoreSaveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4
  },
  webStoreSaveBtnText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700"
  },
  webProgressCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8
  },
  webMainCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12
  },
  webItemTitle: {
    fontSize: 20,
    fontWeight: "800"
  },
  webSearchInputWrapper: {
    gap: 4
  },
  webSearchInputLabel: {
    fontSize: 11,
    fontWeight: "700"
  },
  webSearchInputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8
  },
  webSearchInput: {
    flex: 1,
    fontSize: 13,
    padding: 0
  },
  webSuggestionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4
  },
  webActionButtonsGrid: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6
  },
  webDirectSearchBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 8
  },
  webDirectSearchBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800"
  },
  webCopyNextBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0284c7",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 8
  },
  webCopyNextBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800"
  },
  webNavFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    gap: 8
  },
  webNavBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6
  },
  webNavBtnText: {
    fontSize: 12,
    fontWeight: "700"
  },
  webToggleAddedBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6
  },
  webToggleAddedBtnChecked: {
    backgroundColor: "#10b981",
    borderColor: "#10b981"
  },
  webToggleAddedBtnText: {
    color: "#10b981",
    fontSize: 12,
    fontWeight: "800"
  },
  webCloseAllDoneBtn: {
    backgroundColor: "#10b981",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8
  },
  webCloseAllDoneBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800"
  },
  webListCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8
  },
  webListHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  webListItemsContainer: {
    marginTop: 6
  },
  header: {
    backgroundColor: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    paddingVertical: 6
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14
  },
  brandTitleBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  brandEmoji: {
    fontSize: 22
  },
  storeNameText: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "800"
  },
  subTitleText: {
    color: "#94a3b8",
    fontSize: 11
  },
  changeStoreInlineChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
    marginTop: 2
  },
  changeStoreInlineText: {
    color: "#38bdf8",
    fontSize: 10,
    fontWeight: "700"
  },
  navControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  iconNavBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  btnDisabled: {
    opacity: 0.35
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4
  },
  storeChipsScroll: {
    paddingHorizontal: 14,
    gap: 8
  },
  storeChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 6
  },
  storeChipEmoji: {
    fontSize: 14
  },
  storeChipText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700"
  },
  storeChipTextActive: {
    color: "#ffffff"
  },
  webContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative"
  },
  webView: {
    flex: 1
  },
  floatingStartBar: {
    position: "absolute",
    bottom: 16,
    left: 14,
    right: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8
  },
  floatingStartBtn: {
    borderRadius: 16,
    overflow: "hidden"
  },
  floatingStartGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 10
  },
  floatingStartBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center"
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  loadingText: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "600"
  },
  bottomDock: {
    backgroundColor: "#0f172a",
    borderTopWidth: 1,
    borderTopColor: "#334155",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12
  },
  collapsedDock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f172a",
    borderTopWidth: 1,
    borderTopColor: "#334155",
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10
  },
  collapsedLeftTouch: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  collapsedBadge: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6
  },
  collapsedBadgeText: {
    color: "#38bdf8",
    fontSize: 11,
    fontWeight: "800"
  },
  collapsedItemName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700"
  },
  collapsedRightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  collapsedAddedBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4
  },
  collapsedAddedText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800"
  },
  collapsedExpandBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  collapseBtnSmall: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4
  },
  collapseBtnSmallText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600"
  },
  dockProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4
  },
  dockProgressLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  dockProgressLabel: {
    color: "#f8fafc",
    fontSize: 12,
    fontWeight: "700"
  },
  dockProgressRightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  toggleListBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4
  },
  toggleListBtnText: {
    color: "#38bdf8",
    fontSize: 11,
    fontWeight: "700"
  },
  progressBarTrack: {
    height: 3,
    backgroundColor: "#1e293b",
    borderRadius: 2,
    marginBottom: 8,
    overflow: "hidden"
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 2
  },
  expandedListScroll: {
    maxHeight: 160,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#334155"
  },
  drawerItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 8
  },
  drawerItemActive: {
    backgroundColor: "rgba(56, 189, 248, 0.15)"
  },
  drawerItemChecked: {
    opacity: 0.5
  },
  drawerItemName: {
    flex: 1,
    color: "#f8fafc",
    fontSize: 12,
    fontWeight: "600"
  },
  drawerItemNameChecked: {
    textDecorationLine: "line-through",
    color: "#64748b"
  },
  drawerItemQty: {
    color: "#94a3b8",
    fontSize: 11
  },
  currentCard: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#334155"
  },
  currentItemInfo: {
    marginBottom: 6
  },
  itemBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 2
  },
  quickCopyChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4
  },
  quickCopyChipText: {
    fontSize: 10,
    fontWeight: "700"
  },
  itemIndexBadge: {
    color: "#38bdf8",
    fontSize: 11,
    fontWeight: "800"
  },
  itemDeptBadge: {
    backgroundColor: "#0f172a",
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "600",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4
  },
  currentItemTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 1
  },
  currentItemQuantity: {
    color: "#10b981",
    fontSize: 11,
    fontWeight: "600"
  },
  suggestionsContainer: {
    marginBottom: 6
  },
  suggestionsScroll: {
    gap: 6,
    paddingVertical: 1
  },
  sugChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 4
  },
  sugChipActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8"
  },
  sugChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8"
  },
  sugChipTextActive: {
    color: "#ffffff"
  },
  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2
  },
  addedBtn: {
    flex: 1,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6
  },
  addedBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800"
  },
  skipBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#334155"
  },
  allDoneBox: {
    alignItems: "center",
    paddingVertical: 12,
    gap: 6
  },
  allDoneEmoji: {
    fontSize: 32
  },
  allDoneText: {
    color: "#10b981",
    fontSize: 15,
    fontWeight: "800"
  }
});
