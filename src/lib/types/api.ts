export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: string;
};

interface User {
  id: number;
  full_name: string;
  email: string;
  email_verified_at: string;
  otp: string | null;
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
