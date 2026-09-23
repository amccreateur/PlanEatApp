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
import Constants from "expo-constants";
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
  const storeBaseUrlRef = useRef("");
  const [selectedStore, setSelectedStore] = useState(DRIVE_STORES[0]);
  const [currentUrl, setCurrentUrl] = useState(DRIVE_STORES[0].homeUrl);
  const [isLoadingWeb, setIsLoadingWeb] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  // Index de l'ingrédient en cours d'assistance
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [isAssistantCollapsed, setIsAssistantCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelectingStore, setIsSelectingStore] = useState(true);

  // Utiliser la liste complète des groceries pour un indexage stable et prévisible
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

  // Sync input query with current item
  useEffect(() => {
    if (currentItem) {
      setSearchQuery(getCleanItemName(currentItem));
    }
  }, [currentItem?.id]);

  const suggestions = currentItem
    ? DriveService.getSearchSuggestions(getRawItemName(currentItem))
    : [];

  // Détection automatique de la sélection du magasin dans le WebView
  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);

    const url = navState.url || "";
    if (url) {
      const match = url.match(/(https?:\/\/[^\/]+\/magasin-[^\/\?#]+)/i);
      if (match && match[1]) {
        storeBaseUrlRef.current = match[1];
      }
    }

    if (isSelectingStore && url) {
      const isStorePage =
        url.includes("/magasin-") ||
        url.includes("/drive/magasin") ||
        url.includes("m-courses.leclercdrive.fr/magasin");

      if (isStorePage) {
        console.log("[Drive AutoStart] 🏪 Magasin détecté: " + url);
        sendServerLog("STORE_AUTO_DETECTED", url);
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
  };

  const sendServerLog = (type, text) => {
    try {
      const hostIp =
        Constants.expoConfig?.hostUri?.split(":")[0] ||
        Constants.manifest?.debuggerHost?.split(":")[0] ||
        "10.207.54.118";
      fetch(`http://${hostIp}:8088/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, text })
      }).catch(() => {});
    } catch {}
  };

  const handleWebViewMessage = (event) => {
    try {
      const payload = JSON.parse(event.nativeEvent.data);
      if (payload.type === "drive_search_log") {
        console.log(`[Drive Web] ${payload.text}`);
        sendServerLog("DRIVE_WEB", payload.text);
      } else if (payload.type === "log") {
        console.log(`[Drive Console] ${payload.data}`);
        sendServerLog("WEB_CONSOLE", payload.data);
      } else if (payload.type === "error" || payload.type === "uncaught_error") {
        console.warn(`[Drive Error] ${payload.data}`);
        sendServerLog("WEB_ERROR", payload.data);
      }
    } catch {
      console.log(`[Drive Msg] ${event.nativeEvent.data}`);
      sendServerLog("RAW_MSG", event.nativeEvent.data);
    }
  };

  const getSearchUrlForStore = (cleanQ) => {
    const base = storeBaseUrlRef.current;
    if (selectedStore.id === "leclerc" && base) {
      if (base.includes("m-courses")) {
        return `${base}/recherche/${encodeURIComponent(cleanQ)}`;
      } else {
        return `${base}/recherche.aspx?TexteRecherche=${encodeURIComponent(cleanQ)}`;
      }
    }
    return selectedStore.searchUrl(cleanQ);
  };

  // Injecter la recherche directement dans la session active du magasin
  const injectSearchInStore = (query) => {
    if (!query) return;
    const cleanQ = query.trim();
    if (!cleanQ) return;

    const targetUrl = getSearchUrlForStore(cleanQ);
    const startMsg = `🚀 Démarrage recherche: "${cleanQ}" vers ${targetUrl}`;
    console.log(`[PlanEat Drive] ${startMsg}`);
    sendServerLog("APP_START_SEARCH", startMsg);

    // 1. Navigation native par WebView
    setCurrentUrl(targetUrl);

    // 2. Navigation immédiate dans le DOM pour réactivité maximale
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
  };

  // Quand le magasin change, naviguer vers son accueil en plein écran
  const handleSelectStore = (store) => {
    storeBaseUrlRef.current = "";
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

  // Marquer l'article comme ajouté et passer au suivant
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
          injectSearchInStore(query);
        }
      }
    }
  };

  // Passer à l'article suivant sans cocher
  const handleSkipItem = () => {
    if (currentIndex < groceries.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextItem = groceries[nextIndex];
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
      const prevItem = groceries[prevIndex];
      if (prevItem) {
        const query = getCleanItemName(prevItem);
        if (query) {
          setSearchQuery(query);
          injectSearchInStore(query);
        }
      }
    }
  };

  const progressPercent = groceries.length > 0
    ? Math.round(((groceries.filter(g => g.checked).length) / groceries.length) * 100)
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
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }, !canGoBack && styles.btnDisabled]}
                disabled={!canGoBack}
                onPress={() => webViewRef.current?.goBack()}
              >
                <Ionicons name="arrow-back" size={17} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }, !canGoForward && styles.btnDisabled]}
                disabled={!canGoForward}
                onPress={() => webViewRef.current?.goForward()}
              >
                <Ionicons name="arrow-forward" size={17} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }]}
                onPress={() => webViewRef.current?.reload()}
              >
                <Ionicons name="reload" size={15} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconNavBtn, { backgroundColor: theme.cardBgAlt }]}
                onPress={() => Linking.openURL(currentUrl)}
              >
                <Ionicons name="open-outline" size={16} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Store Switcher Chips & Tips (affichés UNIQUEMENT lors du choix du magasin) */}
          {isSelectingStore && (
            <>
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

              <View style={[styles.storeTipBanner, { backgroundColor: theme.cardBgAlt }]}>
                <Ionicons name="sparkles" size={13} color="#38bdf8" />
                <Text style={[styles.storeTipText, { color: theme.textSub }]}>
                  Choisissez votre magasin sur le site. Les courses démarrent automatiquement !
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Center : WebView du Drive */}
        <View style={styles.webContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: currentUrl }}
            onNavigationStateChange={handleNavigationStateChange}
            onLoadStart={() => setIsLoadingWeb(true)}
            onLoadEnd={() => setIsLoadingWeb(false)}
            onMessage={handleWebViewMessage}
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
        </View>

        {/* Bottom Assistant Dock (affiché UNIQUEMENT pendant les courses) */}
        {!isSelectingStore && (
          isAssistantCollapsed ? (
            /* Mode Réduit : mini-barre flottante élégante */
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
                  <Text style={styles.collapsedAddedText}>Ajouté</Text>
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
            /* Mode Déplié : Carte complète avec suggestions, recherche et actions */
            <View style={[styles.bottomDock, { backgroundColor: theme.cardBg, borderTopColor: theme.border }]}>
              {/* Progress Bar Header */}
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

              {/* Current Ingredient Card & Controls */}
              {currentItem ? (
                <View style={[styles.currentCard, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
                  <View style={styles.currentItemInfo}>
                    <View style={styles.itemBadgeRow}>
                      <Text style={styles.itemIndexBadge}>
                        Article {currentIndex + 1} / {groceries.length}
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4
  },
  collapsedAddedText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800"
  },
  collapsedExpandBtn: {
    width: 30,
    height: 30,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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

