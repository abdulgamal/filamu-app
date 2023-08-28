import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import Details from "./screens/Details";
import Cast from "./screens/Cast";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "black" } }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <Ionicons name="search-outline" size={24} color="white" />
            ),
            headerLeft: () => (
              <Ionicons name="menu-outline" size={24} color="white" />
            ),
            headerTitle: () => (
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
              >
                Filamu
              </Text>
            ),
            headerStyle: { backgroundColor: "black" },
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cast"
          component={Cast}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
