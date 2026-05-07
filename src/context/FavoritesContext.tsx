"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNotifications } from "./NotificationContext";

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (id: number, collegeName?: string) => void;
  removeFavorite: (id: number, collegeName?: string) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const { addNotification } = useNotifications();

  // Load from localStorage on mount
  useEffect(() => {
    const stored = window.localStorage.getItem("college-favorites");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        setFavorites([]);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isHydrated) {
      window.localStorage.setItem("college-favorites", JSON.stringify(favorites));
    }
  }, [favorites, isHydrated]);

  const addFavorite = (id: number, collegeName?: string) => {
    if (favorites.includes(id)) {
      addNotification({
        type: "info",
        title: "Already in favorites",
        message: `${collegeName || "College"} is already saved.`,
      });
      return;
    }
    
    setFavorites((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });

    addNotification({
      type: "success",
      title: "Added to favorites",
      message: `${collegeName || "College"} saved successfully.`,
    });
  };

  const removeFavorite = (id: number, collegeName?: string) => {
    if (!favorites.includes(id)) {
      return;
    }

    setFavorites((prev) => prev.filter((fav) => fav !== id));

    addNotification({
      type: "info",
      title: "Removed from favorites",
      message: `${collegeName || "College"} removed from favorites.`,
    });
  };

  const isFavorite = (id: number) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
