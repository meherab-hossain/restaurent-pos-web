/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Addon {
  id: number;
  name: string;
  price: string;
  has_variants: null | boolean;
  branch_id: null | number;
}

interface MenuItem {
  id: number;
  name: string;
  price: string;
  quantity: string;
  description: string;
  ingredients: string;
  preparation_time: number;
  serves: number;
  variants: any[];
  addons: Addon[];
  category_id: number;
  // ... other fields
}

interface Category {
  id: any;
  name: string;
  description: null | string;
  branch_id: number;
  total_menu_items_count: number;
  menu_items: MenuItem[];
}

interface CartItem {
  menu_item_id: number;
  quantity: number;
  addons: Array<{
    addon_id: number;
    variant_id: number;
  }>;
  variant_id: number;
}

interface MenuState {
  categories: Category[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  categories: [],
  cart: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.menu_item_id !== action.payload);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ menu_item_id: number; quantity: number }>) => {
      const item = state.cart.find(item => item.menu_item_id === action.payload.menu_item_id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { setCategories, addToCart, removeFromCart, updateCartItemQuantity } = menuSlice.actions;
export default menuSlice.reducer;
