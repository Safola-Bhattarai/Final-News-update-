import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const newsData = [
  {
    id: '1',
    title: 'Burn Ward of Bir Hospital to Be Fully Operational',
    description: 'Bir Hospital is set to fully open its burn ward next week with upgraded facilities and treatment units.',
    url: 'https://myrepublica.nagariknetwork.com/news/burn-ward-of-bir-hospital-to-be-fully-operational-from-next-week/',
    thumbnail: 'https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/birhospital-1200x560_20240717092153.jpeg',
  },
  {
    id: '2',
    title: 'Dengue Spreads Across Koshi Province',
    description: 'Dengue outbreak spreads to all 14 districts of Koshi Province, with 3 fatalities reported so far.',
    url: 'https://english.makalukhabar.com/dengue-spreads-across-all-14-districts-of-koshi-province-3-dead/',
    thumbnail: 'https://english.makalukhabar.com/wp-content/uploads/2024/05/MOSQUITO-MK-scaled.jpg',
  },
  {
    id: '3',
    title: 'Citizen Health Service Expansion Plan',
    description: 'Government plans to expand Citizen Health Service to all 753 local levels, announced by Health Minister.',
    url: 'https://www.janaboli.com/2025/04/government-plans-to-expand-citizen-health-service-to-all-753-local-levels-health-minister/',
    thumbnail: 'https://english.khabarhub.com/wp-content/uploads/2024/06/pradeep.jpg-4-jpg.webp',
  },
  {
    id: '4',
    title: 'Samachar Update',
    description: 'Latest national and local updates from across the country.',
    url: 'https://narimag.com.np/samachar/2024/06/23/1719129797.html',
    thumbnail: 'https://nari-assets-api.ekantipur.com/thumb.php?src=https://nari-assets-cdn.ekantipur.com/uploads/source/news/2024/1719063506529-1719129686.jpg&w=1000&height=600',
  },
];

export default function NewsList() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Latest News</Text>
        <Link href="./Notification">
          <Ionicons name="notifications-outline" size={28} color="black" />
        </Link>
      </View>

      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`./NewsDetail?url=${encodeURIComponent(item.url)}`} asChild>
            <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'flex-start' }}>
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: 100, height: 80, borderRadius: 6 }}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                <Text style={{ marginTop: 4, color: '#555' }} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
