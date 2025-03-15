import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

const API_KEY = '6c31a3ab'; // Replace with your OMDb API key
const API_URL = `https://www.omdbapi.com/?s=Avengers&apikey=${API_KEY}`;

const App = () => {
  interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Movie List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.Poster }} style={styles.poster} />
              <Text style={styles.movieTitle}>{item.Title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginVertical: 10 },
  card: { backgroundColor: '#333', borderRadius: 10, padding: 10, marginVertical: 5, alignItems: 'center' },
  poster: { width: 100, height: 150, borderRadius: 5 },
  movieTitle: { color: '#fff', fontSize: 16, marginTop: 5, fontWeight: 'bold' },
});

export default App;
