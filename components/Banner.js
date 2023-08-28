import { Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const Banner = ({ movie }) => {
  const navigation = useNavigation();
  let url = `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`;
  return (
    <TouchableOpacity
      className="mt-5"
      onPress={() => navigation.navigate("Details", { id: movie?.id })}
    >
      <Image
        source={{ uri: url }}
        resizeMode="cover"
        className="rounded-lg"
        style={{ width: width * 0.65, height: height * 0.5 }}
      />
    </TouchableOpacity>
  );
};

export default Banner;
