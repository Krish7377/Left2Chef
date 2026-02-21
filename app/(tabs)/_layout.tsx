import React from "react";
import { Tabs } from "expo-router";
import { Platform, Image } from "react-native";
import { theme } from "../../constants/theme";

/**
 * TabsLayout Component
 * Defines the main navigation structure and visual styling
 * for the bottom tab bar across the application.
 */

function TabIcon({ source, focused }: { source: any; focused: boolean }) {
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={{
        width: 22,
        height: 22,
        tintColor: focused ? theme.colors.primary : theme.colors.textMuted,
        opacity: focused ? 1 : 0.8,
      }}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 80 : 64,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 8,
          shadowColor: "#8B4513",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
          color: theme.colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={require("../../assets/homeTab.png")}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerTitle: "Explore Recipes",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={require("../../assets/exploreTab.png")}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "CookBook",
          headerTitle: "CookBook",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={require("../../assets/cookbookTab.png")}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
