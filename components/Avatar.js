import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const Avatar = ({ cast }) => {
  const navigation = useNavigation();
  let url = `https://image.tmdb.org/t/p/w500/${cast?.profile_path}`;
  return (
    <View style={{ width: width * 0.2 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cast", { id: cast?.id })}
      >
        <Image
          source={{ uri: url }}
          resizeMode="cover"
          className="h-14 w-14 rounded-full"
        />
      </TouchableOpacity>
      <Text className="text-white font-bold mt-1" numberOfLines={1}>
        {cast?.character}
      </Text>
      <Text className="text-gray-200" numberOfLines={1}>
        {cast?.name}
      </Text>
    </View>
  );
};

export default Avatar;
