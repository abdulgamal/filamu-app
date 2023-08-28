import {
  View,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import instance from "../requests";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../components/Avatar";

const { width, height } = Dimensions.get("screen");
const Details = ({ route }) => {
  const { id } = route.params;
  const [movieDetails, setMovieDetails] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [credits, setCredits] = useState([]);
  const navigation = useNavigation();

  const fetchDetails = async () => {
    let { data } = await instance.get(`${id}`);
    setMovieDetails(data);
  };

  const fetchSimilar = async () => {
    let {
      data: { results },
    } = await instance.get(`${id}/similar`);
    setSimilar(results);
  };

  const fetchCredits = async () => {
    let {
      data: { cast },
    } = await instance.get(`${id}/credits`);
    setCredits(cast);
  };

  useEffect(() => {
    fetchDetails();
    fetchSimilar();
    fetchCredits();
  }, []);

  let url = `https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`;
  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: url }}
          style={{ width: width, height: height * 0.5 }}
          resizeMode="cover"
        />
        <SafeAreaView className="absolute right-0 left-0 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="ml-3 bg-black p-3 rounded-3xl justify-center items-center"
          >
            <Ionicons name="chevron-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 bg-black p-3 rounded-3xl justify-center items-center">
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
        <Text className="text-white text-center font-bold text-2xl">
          {movieDetails?.title}
        </Text>
        <View className="flex-row justify-center items-center mt-2">
          <Text className="text-white font-semibold">
            {movieDetails?.status}•
          </Text>
          <Text className="text-white font-semibold">
            {movieDetails?.release_date?.split("-")[0]}•
          </Text>
          <Text className="text-white font-semibold">
            {movieDetails?.runtime} min
          </Text>
        </View>
        <View className="flex-row justify-center items-center mt-2">
          {movieDetails?.genres?.map((genre, i) => (
            <Text key={i} className="text-white font-semibold">
              {genre?.name}•
            </Text>
          ))}
        </View>
        <Text className="text-white mt-2">{movieDetails?.overview}</Text>
        <View className="mt-2 mb-5">
          <Text className="text-white font-bold text-lg">Top Casts</Text>
          <FlatList
            data={credits}
            renderItem={({ item }) => <Avatar cast={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              gap: 20,
              marginTop: 15,
            }}
          />
        </View>
        <View className="mt-2 mb-5">
          <Text className="text-white font-bold text-lg">Similar Movies</Text>
          <FlatList
            data={similar}
            renderItem={({ item }) => <Card movie={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              gap: 20,
              marginTop: 15,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;
