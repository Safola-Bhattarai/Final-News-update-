import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { healthApi, NewsItem } from '../../api/healthApi';

export default function NewsList() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const news = await healthApi.getNews();
      setNewsData(news);
    } catch (err) {
      console.error('Failed to load news:', err);
      setError('Failed to load news. Please check your connection.');
      // Fallback to static data if API fails
      setNewsData([
        {
          id: '1',
          title: 'Burn Ward of Bir Hospital to Be Fully Operational',
          content: 'Bir Hospital is set to fully open its burn ward next week with upgraded facilities and treatment units.',
          published_at: '2024-07-17T09:21:53Z',
          image: 'https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/birhospital-1200x560_20240717092153.jpeg',
        },
        {
          id: '2',
          title: 'Dengue Spreads Across Koshi Province',
          content: 'Dengue outbreak spreads to all 14 districts of Koshi Province, with 3 fatalities reported so far.',
          published_at: '2024-05-15T10:30:00Z',
          image: 'https://english.makalukhabar.com/wp-content/uploads/2024/05/MOSQUITO-MK-scaled.jpg',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return null;
    // If it's a relative URL from Django, prepend the base URL
    if (imageUrl.startsWith('/media/')) {
      return `http://127.0.0.1:8000${imageUrl}`;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading news...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Latest News</Text>
        <Link href="./Notification">
          <Ionicons name="notifications-outline" size={28} color="black" />
        </Link>
      </View>

      {error && (
        <View style={{ backgroundColor: '#ffebee', padding: 10, borderRadius: 5, marginBottom: 10 }}>
          <Text style={{ color: '#c62828', fontSize: 14 }}>{error}</Text>
          <TouchableOpacity onPress={loadNews} style={{ marginTop: 5 }}>
            <Text style={{ color: '#1976d2', fontSize: 14, fontWeight: 'bold' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`./NewsDetail?id=${item.id}`} asChild>
            <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'flex-start' }}>
              <Image
                source={{ uri: formatImageUrl(item.image) || 'https://via.placeholder.com/100x80?text=No+Image' }}
                style={{ width: 100, height: 80, borderRadius: 6 }}
                defaultSource={{ uri: 'https://via.placeholder.com/100x80?text=Loading' }}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                <Text style={{ marginTop: 4, color: '#555' }} numberOfLines={2}>
                  {item.content || 'No description available'}
                </Text>
                <Text style={{ marginTop: 4, color: '#888', fontSize: 12 }}>
                  {new Date(item.published_at).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        refreshing={loading}
        onRefresh={loadNews}
      />
    </View>
  );
}
