import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
  Platform,
  Linking,
  TextInput
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DRIVE_STORES, DriveService } from "../services/driveService";
import { TRANSLATIONS } from "../i18n/translations";
import { THEMES } from "../utils/theme";

export default function DriveCartModal({
  visible,
  onClose,
  groceries = [],
  onToggleItem,
  lang = "fr",
  themeMode = "dark"
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";
  const theme = THEMES[themeMode] || THEMES.dark;

  const webViewRef = useRef(null);
  const [selectedStore, setSelectedStore] = useState(DRIVE_STORES[0]);
  const [currentUrl, setCurrentUrl] = useState(DRIVE_STORES[0].homeUrl);
  const [isLoadingWeb, setIsLoadingWeb] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  // Index de l'ingrédient en cours d'assistance
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSelectingStore, setIsSelectingStore] = useState(true);

  // Filtrer les articles non cochés en priorité
  const uncheckedItems = groceries.filter(g => !g.checked);
  const activeItems = uncheckedItems.length > 0 ? uncheckedItems : groceries;
  const currentItem = activeItems[currentIndex] || activeItems[0];

  const getCleanItemName = (item) => {
    if (!item) return "";
    const rawName = item.name?.[lang] || item.name?.fr || item.customName || "";
    return DriveService.cleanSearchQuery(rawName);
  };

  const getRawItemName = (item) => {
    if (!item) return "";
    return item.name?.[lang] || item.name?.fr || item.customName || "";
  };

  // Sync input query with current item
  useEffect(() => {
    if (currentItem) {
      setSearchQuery(getCleanItemName(currentItem));
      setIsCopied(false);
    }
  }, [currentItem?.id]);

  const suggestions = currentItem
    ? DriveService.getSearchSuggestions(getRawItemName(currentItem))
    : [];

  // Injecter la recherche directement dans la session active du magasin
  const injectSearchInStore = (query) => {
    if (!query) return;
    const cleanQ = query.trim();
    if (!cleanQ) return;
    const searchFallbackUrl = selectedStore.searchUrl(cleanQ);

    const js = `
      (function() {
        try {
          var q = ${JSON.stringify(cleanQ)};
          var host = (window.location.hostname || '').toLowerCase();
          var href = window.location.href || '';
          
          // 1. Spécifique Leclerc Drive : redirection interne vers la recherche du magasin actif
          if (host.includes('leclercdrive.fr')) {
            var storeMatch = href.match(/(https?:\\/\\/[^\\/]+\\/magasin-[^\\/\\?#]+)/i);
            if (storeMatch && storeMatch[1]) {
              window.location.href = storeMatch[1] + '/recherche.aspx?TexteRecherche=' + encodeURIComponent(q);
              return;
            }
            if (host.includes('-courses.')) {
              var pathSegments = window.location.pathname.split('/').filter(Boolean);
              if (pathSegments.length > 0 && pathSegments[0].startsWith('magasin-')) {
                window.location.href = window.location.origin + '/' + pathSegments[0] + '/recherche.aspx?TexteRecherche=' + encodeURIComponent(q);
                return;
              }
            }
          }

          // 2. Chercher les champs de saisie dans le DOM
          var selectors = [
            'input[type="search"]',
            'input[name*="recherche" i]',
            'input[id*="recherche" i]',
            'input[placeholder*="recherche" i]',
            'input[placeholder*="produit" i]',
            'input[aria-label*="recherche" i]',
            '#txtRecherche',
            '#recherche',
            '#search-input',
            '.search-input',
            '.search-bar input',
            '.header-search input',
            'input[data-testid*="search" i]',
            'input[name="q"]',
            'input[name="query"]'
          ];
          
          var input = null;
          for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i]);
            if (el && el.offsetParent !== null) {
              input = el;
              break;
            }
          }
          if (!input) {
            for (var i = 0; i < selectors.length; i++) {
              var el = document.querySelector(selectors[i]);
              if (el) { input = el; break; }
            }
          }

          if (input) {
            input.focus();
            var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
            if (setter) {
              setter.call(input, q);
            } else {
              input.value = q;
            }
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            
            var enterDown = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13, which: 13 });
            var enterUp = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13, which: 13 });
            input.dispatchEvent(enterDown);
            input.dispatchEvent(enterUp);

            var btnSelectors = [
              'button[type="submit"]',
              'button[aria-label*="recherche" i]',
              'button[title*="recherche" i]',
              '.btn-search',
              '.search-button',
              '#btnRecherche',
              'button.search-submit',
              '.search-bar button'
            ];
            var btn = null;
            for (var j = 0; j < btnSelectors.length; j++) {
              var b = document.querySelector(btnSelectors[j]);
              if (b) { btn = b; break; }
            }
            if (btn) {
              btn.click();
            } else if (input.form) {
              input.form.submit();
            }
          } else {
            window.location.href = ${JSON.stringify(searchFallbackUrl)};
          }
        } catch(e) {
          window.location.href = ${JSON.stringify(searchFallbackUrl)};
        }
      })();
      true;
    `;
    webViewRef.current?.injectJavaScript(js);
  };

  // Quand le magasin change, naviguer vers son accueil en plein écran
  const handleSelectStore = (store) => {
    setSelectedStore(store);
    setCurrentUrl(store.homeUrl);
    setIsSelectingStore(true);
  };

  // Démarrer les courses après sélection du magasin
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

  // Rechercher un mot-clé précis dans le Drive
  const handleSearchTerm = (term) => {
    const q = (term !== undefined ? term : searchQuery).trim();
    if (!q) return;
    setSearchQuery(q);
    setIsSelectingStore(false);
    injectSearchInStore(q);
  };

  // Copier le mot-clé dans le presse-papier
  const handleCopyTerm = async (term) => {
    const q = (term !== undefined ? term : searchQuery).trim();
    if (!q) return;
    try {
      await Clipboard.setStringAsync(q);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {}
  };

  // Marquer l'article comme ajouté et passer au suivant
  const handleItemAdded = () => {
    if (!currentItem) return;
    onToggleItem(currentItem.id);

    // Si d'autres articles non cochés existent, passer au suivant
    if (currentIndex < activeItems.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      // Auto-recherche du prochain article
      const nextItem = activeItems[nextIndex];
      if (nextItem) {
        const query = getCleanItemName(nextItem);
        if (query) {
          setSearchQuery(query);
          injectSearchInStore(query);
        }
      }
    }
  };

  // Passer à l'article suivant sans cocher
  const handleSkipItem = () => {
    if (currentIndex < activeItems.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextItem = activeItems[nextIndex];
      if (nextItem) {
        const query = getCleanItemName(nextItem);
        if (query) {
          setSearchQuery(query);
          injectSearchInStore(query);
        }
      }
    }
  };

  // Revenir à l'article précédent
  const handlePrevItem = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevItem = activeItems[prevIndex];
      if (prevItem) {
        const query = getCleanItemName(prevItem);
        if (query) {
          setSearchQuery(query);
          injectSearchInStore(query);
        }
      }
    }
  };

  const progressPercent = activeItems.length > 0
    ? Math.round(((groceries.filter(g => g.checked).length) / (groceries.length || 1)) * 100)
    : 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.bg }]} edges={["top", "bottom"]}>
        {/* Top Header avec sélecteur de Drive et navigation */}
        <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.border }]}>
          <View style={styles.headerTopRow}>
            <View style={styles.brandTitleBox}>
              <Text style={styles.brandEmoji}>{selectedStore.logoEmoji}</Text>
              <View>
                <Text style={[styles.storeNameText, { color: theme.text }]}>{selectedStore.name}</Text>
                <Text style={[styles.subTitleText, { color: theme.textSub }]}>Assistant Panier Connecté</Text>
              </View>
            </View>

            <View style={styles.navControls}>
              <TouchableOpacity
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }, !canGoBack && styles.btnDisabled]}
                disabled={!canGoBack}
                onPress={() => webViewRef.current?.goBack()}
              >
                <Ionicons name="arrow-back" size={18} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }, !canGoForward && styles.btnDisabled]}
                disabled={!canGoForward}
                onPress={() => webViewRef.current?.goForward()}
              >
                <Ionicons name="arrow-forward" size={18} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }]}
                onPress={() => setCurrentUrl(selectedStore.homeUrl)}
              >
                <Ionicons name="home-outline" size={17} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }]}
                onPress={() => webViewRef.current?.reload()}
              >
                <Ionicons name="reload" size={16} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }]}
                onPress={() => Linking.openURL(currentUrl)}
              >
                <Ionicons name="open-outline" size={17} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Store Switcher Chips */}
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

          {/* Bannière d'aide sélection magasin */}
          <View style={[styles.storeTipBanner, { backgroundColor: theme.cardBgAlt }]}>
            <Ionicons name="information-circle" size={14} color="#38bdf8" />
            <Text style={[styles.storeTipText, { color: theme.textSub }]}>
              Tapez votre code postal sur le site 1 fois pour activer votre Drive alimentaire local.
            </Text>
          </View>
        </View>

        {/* Center : WebView du Drive */}
        <View style={styles.webContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: currentUrl }}
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
              setCanGoForward(navState.canGoForward);
            }}
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

          {isLoadingWeb && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#10b981" />
              <Text style={styles.loadingText}>Chargement du Drive...</Text>
            </View>
          )}

          {/* Bouton Flottant en plein écran pour valider la sélection du magasin */}
          {isSelectingStore && (
            <View style={styles.floatingStartBar}>
              <TouchableOpacity
                style={styles.floatingStartBtn}
                onPress={handleStartShopping}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["#0284c7", "#0369a1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.floatingStartGradient}
                >
                  <Ionicons name="cart" size={20} color="#ffffff" />
                  <Text style={styles.floatingStartBtnText}>
                    Magasin sélectionné ➔ Démarrer mes courses ({groceries.length} articles)
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Assistant Dock (affiché UNIQUEMENT pendant les courses, masqué pendant le choix du magasin) */}
        {!isSelectingStore && (
          <View style={[styles.bottomDock, { backgroundColor: theme.cardBg, borderTopColor: theme.border }]}>
            {/* Progress Bar Header */}
            <View style={styles.dockProgressRow}>
              <View style={styles.dockProgressLeft}>
                <Text style={[styles.dockProgressLabel, { color: theme.text }]}>
                  🛒 Progression : {groceries.filter(g => g.checked).length} / {groceries.length} articles
                </Text>
              </View>
              <View style={styles.dockProgressRightActions}>
                <TouchableOpacity
                  style={[styles.switchStoreSmallBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}
                  onPress={() => {
                    setIsSelectingStore(true);
                    setCurrentUrl(selectedStore.homeUrl);
                  }}
                >
                  <Ionicons name="storefront-outline" size={13} color="#38bdf8" />
                  <Text style={styles.switchStoreSmallText}>Magasin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.toggleListBtn}
                  onPress={() => setIsListExpanded(!isListExpanded)}
                >
                  <Ionicons
                    name={isListExpanded ? "chevron-down" : "list"}
                    size={15}
                    color="#38bdf8"
                  />
                  <Text style={styles.toggleListBtnText}>
                    {isListExpanded ? "Réduire" : "Liste"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Progress Bar Fill */}
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
                        const foundIdx = activeItems.findIndex(g => g.id === item.id);
                        if (foundIdx !== -1) setCurrentIndex(foundIdx);
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

          {/* Current Ingredient Card & Controls */}
          {currentItem ? (
            <View style={[styles.currentCard, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
              <View style={styles.currentItemInfo}>
                <View style={styles.itemBadgeRow}>
                  <Text style={styles.itemIndexBadge}>
                    Article {currentIndex + 1} / {activeItems.length}
                  </Text>
                  {currentItem.dept ? (
                    <Text style={[styles.itemDeptBadge, { backgroundColor: theme.cardBg, color: theme.textSub }]}>
                      {t[currentItem.dept] || currentItem.dept}
                    </Text>
                  ) : null}
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

              {/* Suggestions de mots-clés rapides (ex: Lait d'amande vs demi-écrémé) */}
              {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <Text style={[styles.suggestionsLabel, { color: theme.textMuted }]}>Suggestions :</Text>
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

              {/* Barre de recherche modifiable & bouton copier */}
              <View style={[styles.searchBarRow, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                <Ionicons name="search" size={16} color={theme.textMuted} style={styles.searchBarIcon} />
                <TextInput
                  style={[styles.searchBarInput, { color: theme.text }]}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Modifier la référence..."
                  placeholderTextColor={theme.textMuted}
                  onSubmitEditing={() => handleSearchTerm(searchQuery)}
                  returnKeyType="search"
                />
                <TouchableOpacity
                  style={styles.searchActionBtn}
                  onPress={() => handleSearchTerm(searchQuery)}
                >
                  <Ionicons name="arrow-forward" size={16} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.copyActionBtn, isCopied && styles.copyActionBtnSuccess]}
                  onPress={() => handleCopyTerm(searchQuery)}
                >
                  <Ionicons name={isCopied ? "checkmark" : "copy-outline"} size={15} color={isCopied ? "#10b981" : theme.textSub} />
                  <Text style={[styles.copyActionText, { color: isCopied ? "#10b981" : theme.textSub }]}>
                    {isCopied ? "Copié !" : "Copier"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Action Buttons Row */}
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
                >
                  <Ionicons name="checkmark-circle" size={18} color="#ffffff" />
                  <Text style={styles.addedBtnText}>Ajouté au panier !</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.skipBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }, currentIndex >= activeItems.length - 1 && styles.btnDisabled]}
                  onPress={handleSkipItem}
                  disabled={currentIndex >= activeItems.length - 1}
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
  header: {
    backgroundColor: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    paddingTop: 4,
    paddingBottom: 8
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 8
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
    fontSize: 16,
    fontWeight: "800"
  },
  subTitleText: {
    color: "#94a3b8",
    fontSize: 11
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
  storeTipBanner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 14,
    marginTop: 6,
    borderRadius: 8,
    gap: 6
  },
  storeTipText: {
    flex: 1,
    fontSize: 11,
    fontWeight: "600"
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
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10
  },
  dockProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6
  },
  dockProgressLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  dockProgressLabel: {
    color: "#f8fafc",
    fontSize: 13,
    fontWeight: "700"
  },
  dockProgressRightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  switchStoreSmallBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4
  },
  switchStoreSmallText: {
    color: "#38bdf8",
    fontSize: 11,
    fontWeight: "700"
  },
  toggleListBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  toggleListBtnText: {
    color: "#38bdf8",
    fontSize: 12,
    fontWeight: "700"
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: "#1e293b",
    borderRadius: 2,
    marginBottom: 10,
    overflow: "hidden"
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 2
  },
  expandedListScroll: {
    maxHeight: 180,
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155"
  },
  drawerItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
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
    fontSize: 13,
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
  onboardingBanner: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
    gap: 10
  },
  onboardingTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  onboardingEmoji: {
    fontSize: 24
  },
  onboardingTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 2
  },
  onboardingSub: {
    fontSize: 12,
    lineHeight: 16
  },
  onboardingStartBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0284c7",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8
  },
  onboardingStartBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800"
  },
  currentCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#334155"
  },
  currentItemInfo: {
    marginBottom: 10
  },
  itemBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4
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
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 2
  },
  currentItemQuantity: {
    color: "#10b981",
    fontSize: 12,
    fontWeight: "600"
  },
  suggestionsContainer: {
    marginBottom: 8
  },
  suggestionsLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4
  },
  suggestionsScroll: {
    gap: 6,
    paddingVertical: 2
  },
  sugChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
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
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 10,
    gap: 6
  },
  searchBarIcon: {
    marginLeft: 2
  },
  searchBarInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 4,
    color: "#f8fafc"
  },
  searchActionBtn: {
    backgroundColor: "#0284c7",
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  copyActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4
  },
  copyActionBtnSuccess: {
    backgroundColor: "rgba(16, 185, 129, 0.15)"
  },
  copyActionText: {
    fontSize: 11,
    fontWeight: "700"
  },
  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  addedBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6
  },
  addedBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800"
  },
  skipBtn: {
    width: 38,
    height: 38,
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

