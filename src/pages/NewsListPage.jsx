import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import NewsGrid, { NewsGridSkeleton, NoResults } from "../components/NewsGrid";
import FilteredNewsList from "../components/FilteredNewsList";
import { useNews } from "../hooks/useNews";
import BreakingNews from "../components/BreakingNews";
import CategoryBar from "../components/CategoryBar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";

function LoadMoreBtn({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.1em] uppercase text-gray-700 border border-gray-200 px-9 py-3.5 transition hover:border-red-600 hover:text-red-600 disabled:opacity-60"
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin" />
      ) : (
        <>
          <span>Load more stories</span>
          <span className="w-6 h-6 flex items-center justify-center border border-current rounded-full">
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </>
      )}
    </button>
  );
}

export default function NewsListPage() {
  const { searchParams } = useOutletContext();
  const searchQuery = searchParams.get("search") || "";
  
  const [activeFilter, setActiveFilter] = useState({
    key: "all",
    type: "category",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterError, setFilterError] = useState(null);
  const [filterHasMore, setFilterHasMore] = useState(true);
  const [bigAds, setBigAds] = useState([]);
  const [smallAds, setSmallAds] = useState([]);
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/news-advertisement/active`)
      .then((res) => {
        const ads = res.data?.data || [];
        setBigAds(ads.filter((a) => a.size === "big"));
        setSmallAds(ads.filter((a) => a.size === "small"));
      })
      .catch(() => {});

    axios
      .get(`${API_URL}/news-poll/active`)
      .then((res) => {
        const data = res.data?.data;
        setPoll(Array.isArray(data) ? (data[0] ?? null) : (data ?? null));
      })
      .catch(() => {});
  }, []);

  // const { categories } = useCategories();
  const { news, loading, loadingMore, hasMore, error, loadMore } = useNews({
    limit: 50,
    category:
      activeFilter?.type === "category" && activeFilter?.key !== "all"
        ? activeFilter.key
        : "",
    subcategory: activeFilter?.type === "subcategory" ? activeFilter.key : "",
    search: searchQuery,
  });

  function handleCategoryChange(filterObj) {
    // filterObj = { key, type, categoryId }
    setActiveFilter(filterObj);
    setCurrentPage(1);
    setFilteredNews([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Fetch filtered news with pagination
  const fetchFilteredNews = useCallback(
    async (page) => {
      if (activeFilter?.key === "all") return;

      try {
        setFilterLoading(true);
        setFilterError(null);

        const query = new URLSearchParams({
          page,
          limit: 10,
          ...(activeFilter?.type === "category" && {
            category: activeFilter.key,
          }),
          ...(activeFilter?.type === "subcategory" && {
            subcategory: activeFilter.key,
          }),
        });

        const res = await axios.get(`${API_URL}/news?${query.toString()}`);
        const items = res?.data?.data || [];

        setFilteredNews(items);
        setFilterHasMore(items.length === 10); // If we got 10 items, there might be more
      } catch (err) {
        console.error("Failed to fetch filtered news:", err);
        setFilterError(err.message);
        setFilteredNews([]);
      } finally {
        setFilterLoading(false);
      }
    },
    [activeFilter],
  );

  // Fetch filtered news when filter changes or page changes
  useEffect(() => {
    if (activeFilter?.key !== "all") {
      fetchFilteredNews(currentPage);
    }
  }, [activeFilter, currentPage, fetchFilteredNews]);

  return (
    <>
      <CategoryBar active={activeFilter} onChange={handleCategoryChange} />
      <div className="mt-1">
        <BreakingNews />
      </div>
      <main className=" min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto px-2 lg:px-6 py-4  pb-20">
          {/* Search Results View */}
          {searchQuery ? (
            <>
              {loading ? (
                <NewsGridSkeleton />
              ) : error ? (
                <div className="text-center py-16 text-gray-500">
                  <p>Failed to load search results. Please try again.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-xs font-semibold tracking-widest uppercase text-white bg-red-600 px-6 py-2 hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              ) : news.length === 0 ? (
                <NoResults
                  onReset={() => window.location.href = "/"}
                />
              ) : (
                <FilteredNewsList
                  news={news}
                  category=""
                  subcategory={`Search: "${searchQuery}"`}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  hasMore={hasMore}
                  loading={loading}
                  onClearFilter={() => window.location.href = "/"}
                />
              )}
            </>
          ) : /* Filtered View */
          activeFilter?.key !== "all" ? (
            <>
              {filterLoading ? (
                <NewsGridSkeleton />
              ) : filterError ? (
                <div className="text-center py-16 text-gray-500">
                  <p>Failed to load news. Please try again.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-xs font-semibold tracking-widest uppercase text-white bg-red-600 px-6 py-2 hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredNews.length === 0 ? (
                <NoResults
                  onReset={() =>
                    handleCategoryChange({ key: "all", type: "category" })
                  }
                />
              ) : (
                <FilteredNewsList
                  news={filteredNews}
                  category={
                    activeFilter?.type === "category" ? activeFilter.key : ""
                  }
                  subcategory={
                    activeFilter?.type === "subcategory" ? activeFilter.key : ""
                  }
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  hasMore={filterHasMore}
                  loading={filterLoading}
                  onClearFilter={() =>
                    handleCategoryChange({ key: "all", type: "category" })
                  }
                />
              )}
            </>
          ) : (
            <>
              {/* Default Grid View */}
              {loading ? (
                <NewsGridSkeleton />
              ) : error ? (
                <div className="text-center py-16 text-gray-500">
                  <p>Failed to load news. Please try again.</p>

                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-xs font-semibold tracking-widest uppercase text-white bg-red-600 px-6 py-2 hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              ) : news.length === 0 ? (
                <NoResults
                  onReset={() =>
                    handleCategoryChange({ key: "all", type: "category" })
                  }
                />
              ) : (
                <>
                  <NewsGrid
                    news={news}
                    bigAds={bigAds}
                    smallAds={smallAds}
                    poll={poll}
                  />

                  {(hasMore || loadingMore) && (
                    <div className="flex justify-center mt-14">
                      <LoadMoreBtn onClick={loadMore} loading={loadingMore} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
