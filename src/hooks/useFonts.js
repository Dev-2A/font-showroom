import { useState, useEffect } from "react";
import { fetchFontList } from "../utils/fontLoader";

/**
 * Google Fonts 목록을 불러오는 커스텀 훅
 */
export function useFonts() {
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const list = await fetchFontList("popularity");

        if (!cancelled) {
          setFonts(list);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { fonts, loading, error };
}
