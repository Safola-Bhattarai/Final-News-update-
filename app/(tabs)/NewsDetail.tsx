import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';

export default function NewsDetail() {
  const { url } = useLocalSearchParams<{ url: string }>();

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
