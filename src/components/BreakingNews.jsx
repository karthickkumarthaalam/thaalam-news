import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function BreakingNews() {
  const [breaking, setBreaking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const fetchBreakingNews = async () => {
    try {
      const response = await axios.get(`${API_URL}/breaking-news/active-news`);
      setBreaking(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch breaking news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  useEffect(() => {
    if (!breaking.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % breaking.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [breaking]);

  const prev = () =>
    setIndex((i) => (i - 1 + breaking.length) % breaking.length);
  const next = () => setIndex((i) => (i + 1) % breaking.length);

  if (!breaking.length) return null;

  const currentNews = breaking[index];

  return (
    <div className="bg-white border-b border-gray-200">
      {/* ── Mobile ── */}
      <div className="flex md:hidden items-stretch">
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-red-700 text-white px-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] font-bold tracking-[0.14em] uppercase whitespace-nowrap">
            Breaking
          </span>
        </div>
        <div className="flex-1 flex items-center overflow-hidden px-3 py-2">
          <p
            key={currentNews.id}
            onClick={() => {
              if (currentNews?.url) {
                window.location.href = currentNews.url;
              }
            }}
            className={`text-[12px] font-medium truncate animate-fade-in transition cursor-pointer hover:text-red-700 ${
              currentNews?.url
                ? "text-gray-800"
                : "text-gray-500 cursor-default"
            }`}
          >
            {currentNews.content}
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center border-l border-gray-200">
          <button
            onClick={prev}
            className="px-2.5 py-2 text-gray-500 active:bg-red-700 active:text-white transition"
          >
            <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="text-[10px] text-gray-400 tabular-nums">
            {index + 1}/{breaking.length}
          </span>
          <button
            onClick={next}
            className="px-2.5 py-2 text-gray-500 active:bg-red-700 active:text-white transition"
          >
            <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex max-w-[1200px] mx-auto px-6 items-stretch">
        <div className="flex-shrink-0 flex items-center gap-2 bg-red-700 text-white px-4 py-2.5 mr-4">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase whitespace-nowrap">
            Breaking News
          </span>
        </div>
        <div className="flex-1 flex items-center overflow-hidden border-l border-r border-gray-200">
          <p
            key={currentNews.id}
            onClick={() => {
              if (currentNews?.url) {
                window.location.href = currentNews.url;
              }
            }}
            className={`text-[12px] font-medium truncate animate-fade-in transition cursor-pointer hover:text-red-700 ${
              currentNews?.url
                ? "text-gray-800"
                : "text-gray-500 cursor-default"
            }`}
          >
            {currentNews.content}
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center border-l border-gray-200">
          <span className="text-[11px] text-gray-400 px-3 tabular-nums">
            {index + 1} / {breaking.length}
          </span>
          <button
            onClick={prev}
            className="h-full px-3 text-gray-500 hover:bg-red-700 hover:text-white transition border-l border-gray-200"
          >
            <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="h-full px-3 text-gray-500 hover:bg-red-700 hover:text-white transition border-l border-gray-200"
          >
            <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
