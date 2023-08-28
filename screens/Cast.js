import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Card from "../components/Card";

const { width, height } = Dimensions.get("screen");

const api_key = "";
const Cast = ({ route }) => {
  const [profile, setProfile] = useState(null);
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  const { id } = route.params;

  const fetchDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}`
    );
    setProfile(data);
  };

  const fetchMovies = async () => {
    const { data: cast } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}`
    );
    setMovies(cast.cast);
  };

  useEffect(() => {
    fetchDetails();
    fetchMovies();
  }, []);

  let url = `https://image.tmdb.org/t/p/w500/${profile?.profile_path}`;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="ml-3 bg-white p-3 rounded-3xl justify-center items-center"
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 bg-white p-3 rounded-3xl justify-center items-center">
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: url }}
          resizeMode="cover"
          style={{ width: width * 0.8, height: height * 0.4 }}
          className="rounded-full self-center"
        />
        <View className="justify-center items-center mt-3">
          <Text className="text-white text-lg font-bold">{profile?.name}</Text>
          <Text className="text-white">{profile?.place_of_birth}</Text>
        </View>
        <View className="flex-row my-4 bg-white/20 p-4 rounded-full justify-between">
          <View className="justify-center items-center">
            <Text className="text-white text-lg font-bold">Gender</Text>
            <Text className="text-white">
              {profile?.gender == 2 ? "Male" : "Female"}
            </Text>
          </View>
          <View className="justify-center items-center">
            <Text className="text-white text-lg font-bold">Birthday</Text>
            <Text className="text-white">{profile?.birthday}</Text>
          </View>
          <View className="justify-center items-center">
            <Text className="text-white text-lg font-bold">Known for</Text>
            <Text className="text-white">{profile?.known_for_department}</Text>
          </View>
          <View className="justify-center items-center">
            <Text className="text-white text-lg font-bold">Popularity</Text>
            <Text className="text-white">{profile?.popularity}</Text>
          </View>
        </View>
        <View className="mt-1 px-1">
          <Text className="text-white">{profile?.biography}</Text>
        </View>
        <View className="mt-2 mb-5">
          <Text className="text-white font-bold text-lg">Movies</Text>
          <FlatList
            data={movies}
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
    </SafeAreaView>
  );
};

export default Cast;
