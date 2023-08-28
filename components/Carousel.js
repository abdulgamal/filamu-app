import { View, Text, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import Banner from "./Banner";

const { width } = Dimensions.get("screen");

const MyCarousel = ({ movies }) => {
  return (
    <View>
      <Text className="text-white text-lg font-semibold">Now Playing</Text>
      <Carousel
        data={movies}
        renderItem={({ item }) => <Banner movie={item} />}
        sliderWidth={width}
        itemWidth={width * 0.7}
        slideStyle={{
          display: "flex",
          alignItems: "center",
        }}
        inactiveSlideOpacity={0.6}
        firstItem={2}
      />
    </View>
  );
};

export default MyCarousel;
