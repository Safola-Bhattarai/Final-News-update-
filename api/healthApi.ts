import { API_CONFIG } from '../config/api';

const BASE_URL = API_CONFIG.BASE_URL;

export interface NewsItem {
  id: string;
  title: string;
  content?: string;
  published_at: string;
  image?: string;
  tags?: Array<{ id: number; name: string }>;
  category?: Array<{ id: number; name: string }>;
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}

class HealthApi {
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // News endpoints
  async getNews(): Promise<NewsItem[]> {
    const response = await this.makeRequest<ApiResponse<NewsItem>>(API_CONFIG.ENDPOINTS.NEWS);
    return response.results || response as any; // Handle both paginated and non-paginated responses
  }

  async getNewsById(id: string): Promise<NewsItem> {
    return this.makeRequest<NewsItem>(`${API_CONFIG.ENDPOINTS.NEWS}${id}/`);
  }

  // Health content endpoints
  async getHealthCategories() {
    return this.makeRequest(API_CONFIG.ENDPOINTS.CATEGORIES);
  }

  async getMediaContent() {
    return this.makeRequest(API_CONFIG.ENDPOINTS.CONTENT);
  }

  // Complaints endpoints
  async getComplaints() {
    return this.makeRequest(API_CONFIG.ENDPOINTS.COMPLAINTS);
  }

  async createComplaint(data: any) {
    return this.makeRequest(API_CONFIG.ENDPOINTS.COMPLAINTS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Notifications (if needed)
  async getNotifications() {
    return this.makeRequest(API_CONFIG.ENDPOINTS.NOTIFICATIONS);
  }
}

export const healthApi = new HealthApi();
export default healthApi;
