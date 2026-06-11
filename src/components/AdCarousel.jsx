import axios from "axios";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";

function useAutoPlay(length, interval = 5000) {
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  const go = (i) => {
    if (!length) return;
    setCurrent((i + length) % length);
  };

  useEffect(() => {
    if (!length) return;
    timer.current = setInterval(
      () => setCurrent((c) => (c + 1) % length),
      interval,
    );
    return () => clearInterval(timer.current);
  }, [length, interval]);

  return { current, go };
}

export default function Advertisements() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/news-advertisement/active`)
      .then((res) => setAds(res.data?.data || []))
      .catch(() => {});
  }, []);

  const bigAds = ads.filter((ad) => ad.size === "big");
  const smallAds = ads.filter((ad) => ad.size === "small");

  if (!ads.length) return null;

  return (
    <div className="space-y-6">
      {!!bigAds.length && <BigAdCarousel ads={bigAds} />}
      {!!smallAds.length && <SmallAdCard ads={smallAds} />}
    </div>
  );
}

/* ── Big Ad Carousel ── */
export function BigAdCarousel({ ads }) {
  const { current, go } = useAutoPlay(ads.length);
  const ad = ads[current];

  if (!ad) return null;

  return (
    <div
      onClick={() =>
        ad.redirect_link && window.open(ad.redirect_link, "_blank")
      }
      className="relative overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-[240px] sm:h-[320px] md:h-[380px]">
        <img
          src={ad.image_url}
          alt={ad.headline}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Full dark gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* Tag — top left */}
        <span className="absolute top-4 left-4 text-[9px] font-bold tracking-[0.16em] uppercase bg-red-600 text-white px-2.5 py-1">
          {ad.tag || "Advertisement"}
        </span>

        {/* Content — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 pb-10 sm:pb-12">
          <h3 className="text-[20px] sm:text-[26px] md:text-[30px] font-bold text-white leading-tight mb-2 max-w-2xl drop-shadow">
            {ad.headline}
          </h3>
          {ad.sub && (
            <p className="text-[13px] text-white/75 mb-4 max-w-lg leading-relaxed hidden sm:block">
              {ad.sub}
            </p>
          )}
          {ad.cta && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                ad.redirect_link && window.open(ad.redirect_link, "_blank");
              }}
              className="text-[10.5px] font-bold tracking-[0.12em] uppercase bg-red-600 text-white px-5 py-2 hover:bg-red-700 transition"
            >
              {ad.cta}
            </button>
          )}
        </div>

        {/* Prev / dots / next — bottom right */}
        {ads.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(current - 1);
              }}
              className="w-6 h-6 flex items-center justify-center bg-black/50 text-white hover:bg-red-600 transition text-sm"
            >
              ‹
            </button>
            {ads.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  go(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
              />
            ))}
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(current + 1);
              }}
              className="w-6 h-6 flex items-center justify-center bg-black/50 text-white hover:bg-red-600 transition text-sm"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Small Ad Carousel ── */
export function SmallAdCard({ ads = [] }) {
  const { current, go } = useAutoPlay(ads.length, 4000);
  const ad = ads[current];

  if (!ad) return null;

  return (
    <div
      onClick={() =>
        ad.redirect_link && window.open(ad.redirect_link, "_blank")
      }
      className="relative overflow-hidden cursor-pointer group rounded-xl "
    >
      {/* Image */}
      <div className="relative">
        <img
          src={ad.image_url}
          alt={ad.headline}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Tag — top left */}
        <span className="absolute top-2.5 left-2.5 text-[8.5px] font-bold tracking-[0.14em] uppercase bg-red-600 text-white px-2 py-[2px]">
          {ad.tag || "Ad"}
        </span>

        {/* Content — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h4 className="text-[13.5px] font-bold text-white leading-snug line-clamp-2 mb-2 drop-shadow">
            {ad.headline}
          </h4>
          {ad.sub && (
            <p className="text-[13px] text-white/75 mb-4 max-w-lg leading-relaxed hidden sm:block">
              {ad.sub}
            </p>
          )}
          {ad.cta && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                ad.redirect_link && window.open(ad.redirect_link, "_blank");
              }}
              className="text-[9.5px] font-bold tracking-[0.12em] uppercase bg-red-600 text-white px-3 py-1.5 hover:bg-red-700 transition"
            >
              {ad.cta}
            </button>
          )}
        </div>

        {/* Dot nav — bottom right */}
        {ads.length > 1 && (
          <div className="absolute top-2.5 right-2.5 flex gap-1">
            {ads.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  go(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
