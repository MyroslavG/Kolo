import { Alert, Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { ExternalLink, Heart, Pin } from "lucide-react-native";

import { robobroCampaign, robobroCopy } from "../../../shared/robobro";
import { trackMobileAnalyticsEvent } from "../analytics";
import type { Locale } from "../types";

export function RoboBroCampaignCard({
  isDarkMode,
  locale,
  placement,
}: {
  isDarkMode: boolean;
  locale: Locale;
  placement: "home" | "feed";
}) {
  if (!robobroCampaign.enabled) return null;

  const labels = robobroCopy[locale];
  const isPost = placement === "feed";
  const foreground = isDarkMode ? "#F5F5F7" : "#111111";
  const muted = isDarkMode ? "#B9B9C0" : "#62626A";
  const BadgeIcon = isPost ? Pin : Heart;

  async function openFundraiser() {
    void trackMobileAnalyticsEvent({
      eventType: "contact_click",
      contactType: "link",
      metadata: {
        campaign: robobroCampaign.id,
        action: "donate",
        surface: `${placement}_campaign`,
        destination: robobroCampaign.url,
      },
    });

    try {
      await Linking.openURL(robobroCampaign.url);
    } catch {
      Alert.alert(
        labels.openErrorTitle,
        `${labels.openErrorBody}\n${robobroCampaign.url}`,
      );
    }
  }

  return (
    <View
      style={[styles.card, isDarkMode && styles.darkCard]}
      testID={`robobro-${placement}`}
    >
      <View style={styles.badgeRow}>
        <BadgeIcon accessible={false} color={muted} size={14} />
        <Text style={[styles.badge, { color: muted }]}>
          {isPost ? `${labels.pinned} · Kolo` : labels.badge}
        </Text>
      </View>
      <View style={styles.imageFrame}>
        <Image
          accessibilityLabel={labels.imageAlt}
          accessible
          resizeMode="contain"
          source={require("../../assets/robobro.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.body}>
        <Text accessibilityRole="header" style={[styles.title, { color: foreground }]}>
          {labels.title}
        </Text>
        <Text style={[styles.description, { color: muted }]}>
          {isPost ? labels.post : labels.summary}
        </Text>
        <Pressable
          accessibilityLabel={labels.donateLabel}
          accessibilityRole="link"
          onPress={() => void openFundraiser()}
          style={({ pressed }) => [
            styles.button,
            isDarkMode && styles.darkButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
            {labels.donate}
          </Text>
          <ExternalLink accessible={false} color={isDarkMode ? "#111111" : "#FFFFFF"} size={17} />
        </Pressable>
        <Text style={[styles.destination, { color: muted }]}>{labels.destination}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E9D8A4",
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  darkCard: { backgroundColor: "#1C1C1E", borderColor: "#675631" },
  badgeRow: { alignItems: "center", flexDirection: "row", gap: 7, padding: 14 },
  badge: { flexShrink: 1, fontSize: 12, fontWeight: "700" },
  imageFrame: { backgroundColor: "#F3F1E9", height: 150, padding: 12 },
  image: { height: "100%", width: "100%" },
  body: { gap: 10, padding: 18 },
  title: { fontSize: 23, fontWeight: "900", lineHeight: 29 },
  description: { fontSize: 14, lineHeight: 22 },
  button: {
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 10,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 4,
    minHeight: 48,
    padding: 12,
  },
  darkButton: { backgroundColor: "#F5F5F7" },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  darkButtonText: { color: "#111111" },
  pressed: { opacity: 0.75 },
  destination: { fontSize: 11, lineHeight: 16, textAlign: "center" },
});
