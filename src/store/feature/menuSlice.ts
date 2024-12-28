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
  menu_item_name: string;
  quantity: number;
  variant: {
    id: number;
    name: string;
    price: string;
  };
  addons: Array<{
    id: number;
    name: string;
    price: string;
  }>;
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
    removeFromCart: (state, action: PayloadAction<{
      menu_item_id: number;
      variant_id: number;
      addons?: Array<{ id: number; name: string; price: string; }>;
    }>) => {
      state.cart = state.cart.filter(item => {
        if (!action.payload.addons) {
          return !(item.menu_item_id === action.payload.menu_item_id && 
                  item.variant.id === action.payload.variant_id);
        }

        const addonsMatch = 
          item.addons.length === action.payload.addons.length &&
          item.addons.every(itemAddon => 
            action.payload.addons?.some(addon => addon.id === itemAddon.id)
          );

        return !(item.menu_item_id === action.payload.menu_item_id && 
                item.variant.id === action.payload.variant_id &&
                addonsMatch);
      });
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ 
      menu_item_id: number; 
      variant: {
        id: number;
        name: string;
        price: string;
      };
      quantity: number 
    }>) => {
      const item = state.cart.find(item => 
        item.menu_item_id === action.payload.menu_item_id && 
        item.variant.id === action.payload.variant.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { setCategories, addToCart, removeFromCart, updateCartItemQuantity } = menuSlice.actions;
export default menuSlice.reducer;
