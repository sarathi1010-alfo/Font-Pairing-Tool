"use client";

import { useState, useEffect } from 'react';

// Custom hook to manage favorites in localStorage
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites on mount and listen to storage events across tabs
  useEffect(() => {
    let mounted = true;

    const fetchFavorites = () => {
        try {
          const stored = localStorage.getItem('font-pairing-favorites');
          if (stored && mounted) {
            setFavorites(JSON.parse(stored));
          }
        } catch (e) {
          console.error('Failed to load favorites from localStorage', e);
        }
        if (mounted) setIsLoaded(true);
    };

    fetchFavorites();

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'font-pairing-favorites' && mounted) {
            if (e.newValue) {
                setFavorites(JSON.parse(e.newValue));
            } else {
                setFavorites([]);
            }
        }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        mounted = false;
        window.removeEventListener('storage', handleStorageChange);
    };
  }, [setFavorites, setIsLoaded]);

  // Save favorites when updated
  const toggleFavorite = (pairSlug: string) => {
    setFavorites(prev => {
      let newFavorites;
      if (prev.includes(pairSlug)) {
        newFavorites = prev.filter(slug => slug !== pairSlug);
      } else {
        newFavorites = [...prev, pairSlug];
      }

      try {
        localStorage.setItem('font-pairing-favorites', JSON.stringify(newFavorites));
        // Dispatch custom event for same-tab updates (since storage event only fires for other tabs)
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'font-pairing-favorites',
            newValue: JSON.stringify(newFavorites)
        }));
      } catch (e) {
        console.error('Failed to save favorites to localStorage', e);
      }

      return newFavorites;
    });
  };

  const isFavorite = (pairSlug: string) => favorites.includes(pairSlug);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
