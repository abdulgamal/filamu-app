import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const Card = ({ movie }) => {
  const navigation = useNavigation();
  let url = `https://image.tmdb.org/t/p/w500/${
    movie?.poster_path || movie?.backdrop_path
  }`;
  return (
    <View style={{ width: width * 0.4 }}>
      <TouchableOpacity
        style={{ width: width * 0.4, height: height * 0.3 }}
        onPress={() => navigation.push("Details", { id: movie?.id })}
      >
        <Image
          source={{ uri: url }}
          resizeMode="cover"
          className="h-full w-full rounded-lg"
        />
      </TouchableOpacity>
      <Text numberOfLines={1} className="text-white mt-1">
        {movie?.title}
      </Text>
    </View>
  );
};

export default Card;
