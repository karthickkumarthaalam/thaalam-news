import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const stripHtml = (html, maxLen = 160) => {
  if (!html) return "";

  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
};
export const useNews = ({ limit = 10, category = "", subcategory = "", search = "" }) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(
    async (pageToLoad, isLoadMore = false) => {
      try {
        if (isLoadMore) setLoadingMore(true);
        else setLoading(true);

        const query = new URLSearchParams({
          page: pageToLoad,
          limit,
          ...(search ? {} : {
            ...(category && { category }),
            ...(subcategory && { subcategory }),
          }),
          ...(search && { search }),
        });

        const res = await axios.get(`${API_BASE_URL}/news?${query.toString()}`);

        const items = res?.data?.data || [];

        setNews((prev) => (isLoadMore ? [...prev, ...items] : items));

        setHasMore(items.length === limit);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [limit, category, subcategory, search],
  );

  useEffect(() => {
    setPage(1);
    fetchNews(1, false);
  }, [category, subcategory, search, fetchNews]);

  const loadMore = () => {
    if (!hasMore || loadingMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, true);
  };

  return {
    news,
    loading,
    loadingMore,
    hasMore,
    loadMore,
  };
};
