import { useNavigate } from "react-router-dom";
import { formatDate, stripHtml } from "../hooks/useNews";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function BigCard({ news }) {
  const nav = useNavigate();
  return (
    <article
      onClick={() => nav(`/details/${news.slug}`)}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={news.cover_image}
          alt={news.title}
          loading="lazy"
          className="w-full h-[180px] md:h-[250px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {news.category && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.12em] uppercase bg-red-700 text-white px-2.5 py-[3px]">
            {news.category}
          </span>
        )}
      </div>
      <div className="pt-4 border-t-4 border-red-700">
        <time className="block text-[11px] tracking-[0.07em] uppercase text-gray-500 mb-1">
          {formatDate(news.published_date)}
        </time>
        <h2 className="text-[26px] font-bold leading-tight text-gray-900 mb-3 transition-colors duration-200 group-hover:text-red-700">
          {news.title}
        </h2>
        <p className="text-[15px] leading-[1.72] text-gray-500">
          {stripHtml(news.content, 180)}
        </p>
        <span className="inline-flex items-center gap-1 mt-4 text-[11px] font-semibold tracking-[0.1em] uppercase text-red-700">
          Read full story
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </span>
      </div>
    </article>
  );
}

export function SmallCard({ news }) {
  const nav = useNavigate();
  return (
    <article
      onClick={() => nav(`/details/${news.slug}`)}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden mb-3">
        <img
          src={news.cover_image}
          alt={news.title}
          loading="lazy"
          className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {news.category && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.12em] uppercase bg-red-700 text-white px-2.5 py-[3px]">
            {news.category}
          </span>
        )}
      </div>
      <div className="border-t-2 border-gray-200 group-hover:border-red-700 transition-colors pt-3">
        <time className="block text-[11px] tracking-[0.07em] uppercase text-gray-400 mb-1.5">
          {formatDate(news.published_date)}
        </time>
        <h3 className="text-[15.5px] font-semibold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-700 line-clamp-3">
          {news.title}
        </h3>
      </div>
    </article>
  );
}

export function SideCard({ news, isLast }) {
  const nav = useNavigate();
  return (
    <article
      onClick={() => nav(`/details/${news.slug}`)}
      className={`cursor-pointer group ${!isLast ? "pb-5 mb-5 border-b border-gray-200" : ""}`}
    >
      {/* {news.cover_image && (
        <div className="relative overflow-hidden mb-3">
          <img
            src={news.cover_image}
            alt={news.title}
            loading="lazy"
            className="w-full h-[120px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {news.category && (
            <span className="absolute top-2 left-2 text-[9px] font-bold tracking-[0.12em] uppercase bg-red-700 text-white px-2 py-[2px]">
              {news.category}
            </span>
          )}
        </div>
      )} */}
      <div>
        <time className="block text-[10.5px] tracking-[0.08em] uppercase text-gray-400 mb-1.5">
          {formatDate(news.published_date)}
        </time>
        <h3 className="text-[14.5px] font-semibold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-700 line-clamp-3">
          {news.title}
        </h3>
      </div>
    </article>
  );
}

export function CompactCard({ news }) {
  const nav = useNavigate();
  return (
    <article
      onClick={() => nav(`/details/${news.slug}`)}
      className="cursor-pointer group border-b border-gray-200 pb-4 last:border-0"
    >
      {news.category && (
        <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-red-700 mb-1.5 block">
          {news.category}
        </span>
      )}
      <h4 className="text-[14px] font-bold leading-snug text-gray-900 group-hover:text-red-700 transition-colors mb-1.5 line-clamp-3">
        {news.title}
      </h4>
      <p className="text-[12.5px] leading-relaxed text-gray-500 line-clamp-2 mb-2">
        {stripHtml(news.content, 100)}
      </p>
      <time className="text-[10px] tracking-[0.08em] uppercase text-gray-400">
        {formatDate(news.published_date)}
      </time>
    </article>
  );
}
