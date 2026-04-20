import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Car, Favorite } from '../types';

export function useFavorites(userId: string | null | undefined) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!userId) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setFavorites(data || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = useCallback(async (car: Car) => {
    if (!userId) return;
    const { data } = await supabase
      .from('favorites')
      .insert({ user_id: userId, car_id: car.id, car_data: car })
      .select()
      .maybeSingle();
    if (data) setFavorites((prev) => [data, ...prev]);
  }, [userId]);

  const removeFavorite = useCallback(async (carId: string) => {
    if (!userId) return;
    await supabase.from('favorites').delete().eq('user_id', userId).eq('car_id', carId);
    setFavorites((prev) => prev.filter((f) => f.car_id !== carId));
  }, [userId]);

  const isFavorite = useCallback(
    (carId: string) => favorites.some((f) => f.car_id === carId),
    [favorites]
  );

  return { favorites, loading, addFavorite, removeFavorite, isFavorite, refetch: fetchFavorites };
}
