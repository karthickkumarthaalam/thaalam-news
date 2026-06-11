import {
  BigSkeleton,
  CompactSkeleton,
  SideSkeleton,
  SmallSkeleton,
} from "./Skeleton";
import { BigCard, SmallCard, SideCard, CompactCard } from "./NewsCard";
import { BigAdCarousel, SmallAdCard } from "./AdCarousel";
import QuizWidget from "./QuizWidget";

export function NewsGridSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-9 items-start">
        <BigSkeleton />
        <div className="lg:border-l border-gray-200 lg:pl-8 pt-6 lg:pt-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">
          <SideSkeleton />
          <SideSkeleton />
        </div>
      </div>
      <div className="h-px bg-gray-200 my-9" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SmallSkeleton />
        <SmallSkeleton />
        <SmallSkeleton />
      </div>
      <div className="h-px bg-gray-200 my-9" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SmallSkeleton />
        <SmallSkeleton />
        <SmallSkeleton />
      </div>
      <div className="h-px bg-gray-200 my-9" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CompactSkeleton />
        <CompactSkeleton />
        <CompactSkeleton />
        <CompactSkeleton />
      </div>
    </div>
  );
}

export function NoResults({ onReset }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 9a4 4 0 015.656 0M9 15h6m4-3a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        No articles found
      </h3>

      {/* Description */}
      <p className="max-w-md mx-auto text-[15px] leading-7 text-gray-500 mb-8">
        There are no articles available in this category right now. Try
        exploring other topics or browse the latest news.
      </p>

      {/* Button */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-white hover:bg-red-700 transition"
      >
        Browse all news
      </button>
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-1 h-5 bg-red-700 block" />
      <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-700">
        {label}
      </span>
      <span className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

export default function NewsGrid({
  news,
  bigAds = [],
  smallAds = [],
  poll = null,
}) {
  if (!news?.length) return null;

  // Default view: Grid layout
  const pool = [...news];
  const take = (n) => pool.splice(0, n);

  const hero = pool.shift();
  const side = take(4);
  const row1 = take(poll ? 2 : 3); // 2 + poll slot, or 3 if no poll
  const row2 = take(3);
  const compact = take(4);
  const extra = pool;

  return (
    <div>
      {/* ── Big Ad ── */}
      <div className="mb-9">
        <BigAdCarousel ads={bigAds} />
      </div>

      {/* ── Hero + sidebar ── */}
      {hero && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_340px] gap-6 lg:gap-10 items-start">
            <BigCard news={hero} />
            {side.length > 0 && (
              <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1 h-4 bg-red-700 block" />
                  <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-gray-500">
                    Top Stories
                  </span>
                </div>
                {side.map((n, i) => (
                  <SideCard
                    key={n._id || n.slug}
                    news={n}
                    isLast={i === side.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="h-px bg-gray-200 my-8" />
        </>
      )}

      {/* ── Row 1: poll first if present, else 3 news ── */}
      {row1.length > 0 && (
        <>
          <SectionLabel label="Latest Stories" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {row1.map((n) => (
              <SmallCard key={n._id || n.slug} news={n} />
            ))}
            {poll && (
              <div className="order-first lg:order-last sm:col-span-2 lg:col-span-1">
                <QuizWidget poll={poll} />
              </div>
            )}
          </div>
          <div className="h-px bg-gray-200 my-8" />
        </>
      )}

      {/* ── Row 2: 2 news + small ad carousel, or 3 news ── */}
      {row2.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(smallAds.length > 0 ? row2.slice(0, 2) : row2).map((n) => (
              <SmallCard key={n._id || n.slug} news={n} />
            ))}
            {smallAds.length > 0 && <SmallAdCard ads={smallAds} />}
          </div>
          <div className="h-px bg-gray-200 my-8" />
        </>
      )}

      {/* ── Compact strip: newspaper text columns ── */}
      {compact.length > 0 && (
        <>
          <SectionLabel label="More Stories" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {compact.map((n) => (
              <div key={n._id || n.slug} className="p-5">
                <CompactCard news={n} />
              </div>
            ))}
          </div>
          {extra.length > 0 && <div className="h-px bg-gray-200 my-8" />}
        </>
      )}

      {/* ── Extra (load more) ── */}
      {extra.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {extra.map((n) => (
            <SmallCard key={n._id || n.slug} news={n} />
          ))}
        </div>
      )}
    </div>
  );
}
