import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  author: {
    en: string;
    ne: string;
  };
  image: string;
  price: number; // Base price in rupees
  rentalPrice: number; // Price per day for rental (रु. 2 per day)
  deposit: number; // Deposit amount (रु. 200 per book)
  quantity: number;
  rentalPeriod: number; // Days for rental
  isRental: boolean; // true for rental, false for purchase
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'UPDATE_RENTAL_PERIOD'; payload: { id: number; period: number } }
  | { type: 'TOGGLE_RENTAL_TYPE'; payload: { id: number; isRental: boolean } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Update existing item quantity
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice: calculateTotalPrice(updatedItems)
        };
      } else {
        // Add new item
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice: calculateTotalPrice(newItems)
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - (itemToRemove?.quantity || 0),
        totalPrice: calculateTotalPrice(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: calculateTotalPrice(updatedItems)
      };
    }
    
    case 'UPDATE_RENTAL_PERIOD': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, rentalPeriod: action.payload.period }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems)
      };
    }
    
    case 'TOGGLE_RENTAL_TYPE': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, isRental: action.payload.isRental }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    
    default:
      return state;
  }
};

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    if (item.isRental) {
      // For rental: deposit + (daily rate × rental period × quantity)
      return total + (item.deposit * item.quantity) + (item.rentalPrice * item.rentalPeriod * item.quantity);
    } else {
      // For purchase: just the book price × quantity
      return total + (item.price * item.quantity);
    }
  }, 0);
};

interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'quantity' | 'rentalPeriod' | 'isRental' | 'deposit'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateRentalPeriod: (id: number, period: number) => void;
  toggleRentalType: (id: number, isRental: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0
  });

  const addToCart = (item: Omit<CartItem, 'quantity' | 'rentalPeriod' | 'isRental' | 'deposit'>) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...item,
        quantity: 1,
        rentalPeriod: 7, // Default 7 days rental
        isRental: true, // Default to rental
        deposit: 200 // Fixed deposit of रु. 200 per book
      }
    });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const updateRentalPeriod = (id: number, period: number) => {
    dispatch({ type: 'UPDATE_RENTAL_PERIOD', payload: { id, period } });
  };

  const toggleRentalType = (id: number, isRental: boolean) => {
    dispatch({ type: 'TOGGLE_RENTAL_TYPE', payload: { id, isRental } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateRentalPeriod,
    toggleRentalType,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 