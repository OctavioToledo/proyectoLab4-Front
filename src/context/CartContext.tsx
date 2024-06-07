import { createContext, useContext, useState, ReactNode } from "react";

interface Instrument {
  id: string;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  categoria: string;
  eliminado: boolean;
  quantity:number;
}

interface CartContextType {
  cart: Instrument[];
  addToCart: (instrument: Instrument) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCart: React.Dispatch<React.SetStateAction<Instrument[]>>; // Agregar setCart aquí
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Instrument[]>([]);

  const addToCart = (instrument: Instrument) => {
    setCart((prevCart) => [...prevCart, instrument]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, setCart }} // Agregar setCart aquí
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
