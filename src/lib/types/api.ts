export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: string;
};

export interface User {
  id: number;
  full_name: string;
  email: string;
  email_verified_at: string;
  otp: string | null;
  address?: any;
  city?: string;
  profile?: string;
  role?: string;
}
interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  // Add more fields if needed
}
export interface Order {
  id: number;
  order_id: string;
  seller_id: number;
  user_id: number;
  user: User;

  delivery_address: string;
  delivery_status: string;
  order_status: string;
  payment_status: string;

  total_price: number;
  created_at: string;
  updated_at: string;
  items: Item[];
}

// src/types.ts

// Type for the filter parameters passed to the API hook
// src/types.ts

// The single, complete source of truth for your API data shapes

export interface FilterParams {
  search?: string;
  dietary_info?: string[];
  min_price?: number;
  max_price?: number;
  rating?: number;
  listing_by_seller?: number;
  listing_by_buyer?: number;
  sort_by?: string;
  per_page?: number;
  page?: number;
  pickup_time?: any;
}
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

// The complete FoodItem type, matching the API response
export interface FoodItem {
  id: number;
  category_id: number;
  user_id: number;
  title: string;
  slug: string;
  request_food_status: number;
  ingredients: string; // Added
  description: string;
  dietary_info: string;
  price: number;
  quantity: number;
  images: string; // This is a JSON string from your API
  delivery_option: "both" | "pickup" | "delivery";
  delivery_time: string;
  rating: number;
  review_count: number;
  status: number; // Added (1 for active, 0 for inactive)
  created_at: string;
  updated_at: string;
  category: Category;
  user: User;
}

export interface PaginatedFoods {
  current_page: number;
  data: FoodItem[];
  last_page: number;
  total: number;
}

export interface FoodApiResponse {
  success: boolean;
  message: string;
  data: {
    foods: PaginatedFoods;
    locations: any[];
  };
}
// The main FoodItem type
export interface FoodItem {
  id: number;
  title: string;
  price: number;
  description: string;
  dietary_info: string;
  quantity: number;
  // The images field is a JSON string, so we type it as a string
  images: string;
  rating: number;
  review_count: number;
  category: Category;
  user: User;
  // Add other food fields if needed
}

// The structure of the paginated food data
export interface PaginatedFoods {
  current_page: number;
  data: FoodItem[];
  last_page: number;
  total: number;
  // Add other pagination fields if needed (e.g., per_page, from, to)
}

// The overall API response structure
export interface foodapiResponse {
  success: boolean;
  message: string;
  data: {
    foods: PaginatedFoods;
    locations: any[]; // Define a proper type for locations if you use them
  };
}

// src/types.ts (add this new interface)

export interface FoodDetailsResponse {
  success: boolean;
  message: string;
  data: {
    food: FoodItem;
    similar_foods: FoodItem[];
  };
}
