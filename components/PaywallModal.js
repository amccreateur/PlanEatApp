import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { purchaseService } from "../services/purchaseService";
import { THEMES } from "../utils/theme";

export default function PaywallModal({
  visible,
  onClose,
  themeMode = "dark",
  onSuccess
}) {
  const insets = useSafeAreaInsets();
  const theme = THEMES[themeMode] || THEMES.dark;

  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    if (visible) {
      loadOfferings();
    }
  }, [visible]);

  const loadOfferings = async () => {
    setLoading(true);
    try {
      const offering = await purchaseService.getOfferings();
      if (offering && offering.availablePackages && offering.availablePackages.length > 0) {
        setPackages(offering.availablePackages);
        // Default to annual or first package
        const annual = offering.availablePackages.find(
          (p) => p.packageType === "ANNUAL" || p.identifier.includes("yearly") || p.identifier.includes("annual")
        );
        setSelectedPackage(annual || offering.availablePackages[0]);
      } else {
        // Mock fallback if offerings not yet propagated or in development
        setPackages([
          {
            identifier: "planeat_premium_yearly",
            packageType: "ANNUAL",
            product: {
              title: "PlanEat Pro Annuel",
              priceString: "9,99 €",
              price: 9.99,
              description: "Facturé 9,99 € par an (~0,83 € / mois)"
            }
          },
          {
            identifier: "planeat_premium_monthly",
            packageType: "MONTHLY",
            product: {
              title: "PlanEat Pro Mensuel",
              priceString: "0,99 €",
              price: 0.99,
              description: "Facturé 0,99 € par mois"
            }
          }
        ]);
        setSelectedPackage({
          identifier: "planeat_premium_yearly",
          packageType: "ANNUAL",
          product: {
            title: "PlanEat Pro Annuel",
            priceString: "9,99 €",
            price: 9.99,
            description: "Facturé 9,99 € par an (~0,83 € / mois)"
          }
        });
      }
    } catch (e) {
      console.warn("Could not load offerings:", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    setLoading(true);
    try {
      const isPro = await purchaseService.purchasePackage(selectedPackage);
      if (isPro) {
        Alert.alert("🎉 Bienvenue dans PlanEat Pro !", "Votre abonnement est actif. Profitez de toutes les fonctionnalités illimitées !");
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      if (!err.userCancelled) {
        Alert.alert("Erreur", err.message || "Une erreur est survenue lors de l'achat.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setRestoring(true);
    try {
      const isPro = await purchaseService.restorePurchases();
      if (isPro) {
        Alert.alert("✅ Achats restaurés", "Votre statut PlanEat Pro a été restauré avec succès !");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        Alert.alert("Information", "Aucun abonnement actif n'a été trouvé pour ce compte.");
      }
    } catch (err) {
      Alert.alert("Erreur", "Impossible de restaurer les achats pour le moment.");
    } finally {
      setRestoring(false);
    }
  };

  const features = [
    {
      icon: "calendar",
      color: "#10b981",
      title: "Menus 7j/7 illimités midi & soir",
      desc: "Planifiez jusqu'à 14 repas par semaine adaptés à votre foyer"
    },
    {
      icon: "cart",
      color: "#0284c7",
      title: "Assistant Drive 100% automatisé",
      desc: "Remplissez vos paniers Leclerc, Carrefour, Auchan, U & Intermarché"
    },
    {
      icon: "hardware-chip",
      color: "#f59e0b",
      title: "Modes Thermomix, Airfryer & Cookeo",
      desc: "Recettes et programmes pas-à-pas optimisés pour vos robots"
    },
    {
      icon: "sparkles",
      color: "#a855f7",
      title: "Génération IA Mistral sur-mesure",
      desc: "Menus ultra-personnalisés selon vos régimes, goûts et budget"
    },
    {
      icon: "document-text",
      color: "#ec4899",
      title: "Export PDF & Impression",
      desc: "Imprimez votre menu de la semaine et votre liste de courses"
    },
    {
      icon: "shield-checkmark",
      color: "#06b6d4",
      title: "Zéro publicité & Données privées",
      desc: "Expérience fluide, rapide et respect total de votre vie privée"
    }
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: "#0b1329" }]}>
        {/* Top Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons name="close" size={24} color="#94a3b8" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.restoreHeaderBtn}
            onPress={handleRestore}
            disabled={restoring}
          >
            {restoring ? (
              <ActivityIndicator size="small" color="#38bdf8" />
            ) : (
              <Text style={styles.restoreHeaderText}>Restaurer</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner */}
          <View style={styles.heroBox}>
            <LinearGradient
              colors={["#f59e0b", "#d97706"]}
              style={styles.crownCircle}
            >
              <Ionicons name="crown" size={32} color="#ffffff" />
            </LinearGradient>
            <Text style={styles.heroTitle}>PlanEat Pro</Text>
            <Text style={styles.heroSubtitle}>
              Cuisinez sans stress, gagnez du temps et maîtrisez votre budget chaque semaine
            </Text>
          </View>

          {/* Features List */}
          <View style={styles.featuresCard}>
            {features.map((item, idx) => (
              <View key={idx} style={[styles.featureRow, idx < features.length - 1 && styles.featureRowBorder]}>
                <View style={[styles.featureIconBox, { backgroundColor: item.color + "22" }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <View style={styles.featureTextBox}>
                  <Text style={styles.featureTitle}>{item.title}</Text>
                  <Text style={styles.featureDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Pricing Plans */}
          <Text style={styles.plansSectionTitle}>Choisissez votre formule :</Text>
          <View style={styles.plansContainer}>
            {packages.map((pkg) => {
              const isSelected = selectedPackage?.identifier === pkg.identifier;
              const isAnnual =
                pkg.packageType === "ANNUAL" ||
                pkg.identifier.includes("yearly") ||
                pkg.identifier.includes("annual");

              const priceStr = pkg.product?.priceString || (isAnnual ? "9,99 € / an" : "0,99 € / mois");

              return (
                <TouchableOpacity
                  key={pkg.identifier}
                  style={[
                    styles.planCard,
                    isSelected && styles.planCardSelected,
                    isAnnual && styles.planCardAnnualHighlight
                  ]}
                  onPress={() => setSelectedPackage(pkg)}
                  activeOpacity={0.85}
                >
                  {isAnnual && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularBadgeText}>🌟 MEILLEURE OFFRE</Text>
                    </View>
                  )}

                  <View style={styles.planContentRow}>
                    <View style={styles.planRadio}>
                      {isSelected ? (
                        <View style={styles.radioChecked}>
                          <View style={styles.radioInnerDot} />
                        </View>
                      ) : (
                        <View style={styles.radioUnchecked} />
                      )}
                    </View>

                    <View style={styles.planInfo}>
                      <Text style={styles.planName}>
                        {isAnnual ? "Abonnement Annuel" : "Abonnement Mensuel"}
                      </Text>
                      <Text style={styles.planSubDesc}>
                        {isAnnual ? "7 jours d'essai gratuit, puis 9,99 € / an" : "0,99 € / mois • Sans engagement"}
                      </Text>
                    </View>

                    <View style={styles.planPriceBox}>
                      <Text style={styles.planPriceText}>{priceStr}</Text>
                      {isAnnual && <Text style={styles.planPerMonthText}>soit 0,83 €/mois</Text>}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.mainCtaBtn}
            onPress={handlePurchase}
            disabled={loading}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={styles.mainCtaGradient}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="sparkles" size={20} color="#ffffff" style={{ marginRight: 8 }} />
                  <Text style={styles.mainCtaText}>
                    {selectedPackage?.packageType === "ANNUAL" || selectedPackage?.identifier?.includes("yearly")
                      ? "Démarrer mes 7 jours d'essai gratuit"
                      : "Débloquer PlanEat Pro"}
                  </Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.guaranteeText}>
            🔒 Annulation facile à tout moment en 1 clic dans les réglages de votre compte
          </Text>

          {/* Legal Footers (Apple & Google Compliant) */}
          <View style={styles.legalSection}>
            <Text style={styles.legalText}>
              Le paiement sera débité de votre compte Apple ou Google Play à la confirmation de l'achat ou après la fin de la période d'essai gratuit. L'abonnement se renouvelle automatiquement sauf résiliation au moins 24h avant la fin de la période en cours.
            </Text>

            <View style={styles.legalLinksRow}>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://www.apple.com/legal/itunes/appstore/dev/stdeula/")}
              >
                <Text style={styles.legalLink}>Conditions d'utilisation (EULA)</Text>
              </TouchableOpacity>
              <Text style={styles.legalSeparator}>•</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://amccreateur.github.io/PlanEatApp/privacy-policy.html")}
              >
                <Text style={styles.legalLink}>Confidentialité</Text>
              </TouchableOpacity>
              <Text style={styles.legalSeparator}>•</Text>
              <TouchableOpacity onPress={handleRestore}>
                <Text style={styles.legalLink}>Restaurer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center"
  },
  restoreHeaderBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  restoreHeaderText: {
    color: "#38bdf8",
    fontSize: 14,
    fontWeight: "600"
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8
  },
  heroBox: {
    alignItems: "center",
    marginBottom: 20
  },
  crownCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#f59e0b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#f8fafc",
    marginBottom: 6,
    letterSpacing: 0.5
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16
  },
  featuresCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155"
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12
  },
  featureRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#33415555"
  },
  featureIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14
  },
  featureTextBox: {
    flex: 1
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 2
  },
  featureDesc: {
    fontSize: 12,
    color: "#94a3b8",
    lineHeight: 16
  },
  plansSectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 12,
    paddingLeft: 4
  },
  plansContainer: {
    gap: 12,
    marginBottom: 18
  },
  planCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#334155",
    position: "relative"
  },
  planCardSelected: {
    borderColor: "#10b981",
    backgroundColor: "#132338"
  },
  planCardAnnualHighlight: {
    borderColor: "#10b981"
  },
  popularBadge: {
    position: "absolute",
    top: -11,
    right: 16,
    backgroundColor: "#10b981",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12
  },
  popularBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.3
  },
  planContentRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  planRadio: {
    marginRight: 12
  },
  radioUnchecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#64748b"
  },
  radioChecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#10b981",
    alignItems: "center",
    justifyContent: "center"
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10b981"
  },
  planInfo: {
    flex: 1
  },
  planName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 2
  },
  planSubDesc: {
    fontSize: 12,
    color: "#94a3b8"
  },
  planPriceBox: {
    alignItems: "flex-end"
  },
  planPriceText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#f8fafc"
  },
  planPerMonthText: {
    fontSize: 11,
    color: "#10b981",
    fontWeight: "600",
    marginTop: 2
  },
  mainCtaBtn: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 10
  },
  mainCtaGradient: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  mainCtaText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3
  },
  guaranteeText: {
    fontSize: 11,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 20
  },
  legalSection: {
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    paddingTop: 16,
    alignItems: "center"
  },
  legalText: {
    fontSize: 10,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 14,
    marginBottom: 12
  },
  legalLinksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8
  },
  legalLink: {
    fontSize: 11,
    color: "#38bdf8",
    fontWeight: "500"
  },
  legalSeparator: {
    color: "#64748b",
    fontSize: 11
  }
});
