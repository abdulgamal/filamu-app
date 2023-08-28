import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import MyCarousel from "../components/Carousel";
import Card from "../components/Card";
import instance from "../requests";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const fetchPlaying = async () => {
    let {
      data: { results },
    } = await instance.get("now_playing");
    setNowPlaying(results);
  };

  const fetchUpcoming = async () => {
    let {
      data: { results },
    } = await instance.get("upcoming");
    setUpcoming(results);
  };
  const fetchTopRated = async () => {
    let {
      data: { results },
    } = await instance.get("top_rated");
    setTopRated(results);
  };

  useEffect(() => {
    fetchPlaying();
    fetchUpcoming();
    fetchTopRated();
  }, []);
  return (
    <View className="flex-1 bg-black/80">
      <ScrollView className="flex-1 px-3" showsVerticalScrollIndicator={false}>
        {nowPlaying && <MyCarousel movies={nowPlaying} />}
        {upcoming && (
          <View className="mt-3 flex-row justify-between items-center">
            <Text className="text-white text-lg font-semibold">Upcoming</Text>
            <Text className="text-lg font-semibold text-yellow-500">
              See All
            </Text>
          </View>
        )}
        <FlatList
          data={upcoming}
          renderItem={({ item }) => <Card movie={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            gap: 20,
            marginTop: 15,
          }}
        />
        {topRated && (
          <View className="mt-3 flex-row justify-between items-center">
            <Text className="text-white text-lg font-semibold">Top Rated</Text>
            <Text className="text-lg font-semibold text-yellow-500">
              See All
            </Text>
          </View>
        )}
        <FlatList
          data={topRated}
          renderItem={({ item }) => <Card movie={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            gap: 20,
            marginTop: 15,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
