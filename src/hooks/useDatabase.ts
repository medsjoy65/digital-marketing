import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useDatabase<T>(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from(tableName).select("*");

      if (error) {
        setError(error.message);
        return null;
      }
      return data as T[];
    } catch (err: any) {
      setError(err.message || `Error fetching data from ${tableName}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
        return null;
      }
      return data as T;
    } catch (err: any) {
      setError(err.message || `Error fetching item from ${tableName}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const insert = async (item: Partial<T>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert(item)
        .select();

      if (error) {
        setError(error.message);
        return null;
      }
      return data[0] as T;
    } catch (err: any) {
      setError(err.message || `Error inserting into ${tableName}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, item: Partial<T>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(item)
        .eq("id", id)
        .select();

      if (error) {
        setError(error.message);
        return null;
      }
      return data[0] as T;
    } catch (err: any) {
      setError(err.message || `Error updating in ${tableName}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from(tableName).delete().eq("id", id);

      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (err: any) {
      setError(err.message || `Error deleting from ${tableName}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAll,
    getById,
    insert,
    update,
    remove,
    loading,
    error,
  };
}
