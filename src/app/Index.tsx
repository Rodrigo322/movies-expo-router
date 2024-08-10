import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEffect, useState } from "react";
import { api } from "./services/api";
import { useNavigation } from "expo-router";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export default function Index() {
  const [movies, setMovies] = useState<[Movie]>();
  const [discoveryMovies, setDiscoveryMovies] = useState<[Movie]>();
  const [typeMovies, setTypesMovies] = useState("now_playing");
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const loadMoreMoviesPopular = async () => {
    const response = await api.get("/movie/popular", {
      params: { page },
    });
    setMovies(response.data.results);
  };

  const loadMoreMoviesNowPlaying = async () => {
    const response = await api.get(`/movie/${typeMovies}`, {
      params: { page },
    });
    setDiscoveryMovies(response.data.results);
  };

  useEffect(() => {
    loadMoreMoviesPopular();
  }, []);

  useEffect(() => {
    loadMoreMoviesNowPlaying();
  }, [typeMovies]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>O que você quer assistir?</Text>
        <View style={styles.headerInput}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#FFF"
            placeholder="Buscar"
          />
          <FontAwesome6 name="magnifying-glass" size={24} color="#fff" />
        </View>

        <FlatList
          data={movies}
          horizontal
          renderItem={({ item }) => (
            <Pressable onPress={() => {}} style={styles.cardMovies}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.posterPath}
              />
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <ScrollView
          horizontal
          style={styles.options}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable onPress={() => setTypesMovies("now_playing")}>
            <Text
              style={[
                styles.option,
                typeMovies === "now_playing" ? styles.optionSelected : null,
              ]}
            >
              Tocando Agora
            </Text>
          </Pressable>
          <Pressable onPress={() => setTypesMovies("popular")}>
            <Text
              style={[
                styles.option,
                typeMovies === "popular" ? styles.optionSelected : null,
              ]}
            >
              Populares
            </Text>
          </Pressable>

          <Pressable onPress={() => setTypesMovies("top_rated")}>
            <Text
              style={[
                styles.option,
                typeMovies === "top_rated" ? styles.optionSelected : null,
              ]}
            >
              Mais Votados
            </Text>
          </Pressable>
          <Pressable onPress={() => setTypesMovies("upcoming")}>
            <Text
              style={[
                styles.option,
                typeMovies === "upcoming" ? styles.optionSelected : null,
              ]}
            >
              Por vir
            </Text>
          </Pressable>
        </ScrollView>

        <View style={styles.cardMoviesDiscovery}>
          {discoveryMovies?.map((movie) => (
            <Pressable key={movie.id}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
                style={styles.posterPathDiscovery}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242a32",
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },
  headerInput: {
    backgroundColor: "#67686D",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
  },
  cardMovies: {
    flex: 1,
    marginVertical: 10,
  },

  options: {
    flexDirection: "row",
    paddingVertical: 10,
  },

  posterPath: {
    width: 150,
    height: 245,
    borderRadius: 15,
    marginRight: 10,
  },
  posterPathDiscovery: {
    width: 110,
    height: 155,
    borderRadius: 15,
    marginVertical: 5,
  },
  cardMoviesDiscovery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  option: {
    color: "#FFF",
    fontWeight: "bold",
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#67686D",
    paddingBottom: 10,
  },
  optionSelected: {
    borderColor: "#0296e5",
  },
});
