import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, Text, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { healthApi, NewsItem } from '../../api/healthApi';

export default function NewsDetail() {
  const { id, url } = useLocalSearchParams<{ id?: string; url?: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadNewsDetail();
    } else if (url) {
      // Fallback for old URL-based navigation
      setLoading(false);
    }
  }, [id, url]);

  const loadNewsDetail = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const news = await healthApi.getNewsById(id);
      setNewsItem(news);
    } catch (err) {
      console.error('Failed to load news detail:', err);
      setError('Failed to load news details.');
    } finally {
      setLoading(false);
    }
  };

  const formatImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('/media/')) {
      return `http://127.0.0.1:8000${imageUrl}`;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading news details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: '#c62828', fontSize: 16, textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  // If we have a URL but no ID (old navigation), use WebView
  if (url && !newsItem) {
    return (
      <View style={{ flex: 1 }}>
        <WebView 
          source={{ uri: url }} 
          startInLoadingState
          renderLoading={() => <ActivityIndicator size="large" style={{ flex: 1 }} />}
        />
      </View>
    );
  }

  // Display news item from API
  if (newsItem) {
    return (
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {newsItem.title}
        </Text>
        
        <Text style={{ color: '#666', fontSize: 14, marginBottom: 15 }}>
          {new Date(newsItem.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>

        {newsItem.image && (
          <Image
            source={{ uri: formatImageUrl(newsItem.image) || undefined }}
            style={{ 
              width: '100%', 
              height: 200, 
              borderRadius: 8, 
              marginBottom: 15,
              resizeMode: 'cover'
            }}
          />
        )}

        {newsItem.category && newsItem.category.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 }}>
            {newsItem.category.map((cat) => (
              <View 
                key={cat.id} 
                style={{ 
                  backgroundColor: '#e3f2fd', 
                  paddingHorizontal: 8, 
                  paddingVertical: 4, 
                  borderRadius: 12, 
                  marginRight: 8, 
                  marginBottom: 4 
                }}
              >
                <Text style={{ color: '#1976d2', fontSize: 12 }}>{cat.name}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
          {newsItem.content || 'No content available for this news item.'}
        </Text>

        {newsItem.tags && newsItem.tags.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Tags:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {newsItem.tags.map((tag) => (
                <View 
                  key={tag.id} 
                  style={{ 
                    backgroundColor: '#f5f5f5', 
                    paddingHorizontal: 8, 
                    paddingVertical: 4, 
                    borderRadius: 8, 
                    marginRight: 8, 
                    marginBottom: 4 
                  }}
                >
                  <Text style={{ color: '#666', fontSize: 12 }}>#{tag.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#666', fontSize: 16 }}>No news details available.</Text>
    </View>
  );
}
