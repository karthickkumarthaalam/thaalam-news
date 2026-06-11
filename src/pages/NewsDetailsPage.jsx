import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NewsDetailsSkeleton } from "../components/Skeleton";
import { formatDate } from "../hooks/useNews";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";

/* ── Icons ── */
function IconUser() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconBack() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function IconLink() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SocialBtn({ onClick, title, children, cls }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all hover:scale-110 ${cls}`}
    >
      {children}
    </button>
  );
}

/* ── Latest news sidebar item ── */
function LatestItem({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-lg overflow-hidden bg-white border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300 text-left mb-2"
    >
      {/* Image */}
      {item.cover_image && (
        <div className="relative w-full h-[150px] overflow-hidden">
          <img
            src={item.cover_image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Category */}
          {item.category && (
            <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.14em] uppercase bg-red-600 text-white px-2.5 py-1 rounded-full shadow">
              {item.category}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <p className="text-[14px] font-semibold leading-[1.4rem] text-gray-900 line-clamp-2 group-hover:text-red-700 transition-colors duration-300">
          {item.title}
        </p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-[11px] text-gray-400 font-medium">
            {formatDate(item.published_date)}
          </p>

          <span className="text-[11px] font-semibold text-red-600 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Read More →
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── Latest news sidebar skeleton ── */
function LatestSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-3 py-3 border-b border-gray-100">
          <div className="w-[72px] h-[52px] flex-shrink-0 bg-gray-100 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 bg-gray-100 animate-pulse w-1/3" />
            <div className="h-3 bg-gray-100 animate-pulse w-full" />
            <div className="h-3 bg-gray-100 animate-pulse w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NewsDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [latest, setLatest] = useState([]);
  const [latestLoading, setLatestLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [submittingComment, setSubmittingComment] = useState(false);

  /* fetch article */
  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("err");
      return;
    }
    window.scrollTo({ top: 0 });
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API_URL}/news/per-slug/${slug}`);
        setArticle(res.data?.data);
      } catch {
        setError("err");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  /* fetch comments when article loads */
  useEffect(() => {
    if (article?.id) {
      fetchComments();
    }
  }, [article?.id]);

  /* fetch latest news for sidebar */
  useEffect(() => {
    (async () => {
      try {
        setLatestLoading(true);
        const res = await axios.get(`${API_URL}/news?page=1&limit=5`);
        setLatest(res.data?.data || []);
      } catch {
        /* silent */
      } finally {
        setLatestLoading(false);
      }
    })();
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/news-comments/news/${article.id}?status=approved`,
      );

      setComments(res.data?.result?.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handlePostComment = async () => {
    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    setSubmittingComment(true);
    try {
      await axios.post(`${API_URL}/news-comments`, {
        news_id: article.id,
        comment: comment.trim(),
        guest_id: "guest_" + Date.now(),
        guest_name: "Anonymous User",
        guest_email: "guest@example.com",
      });

      setComment("");
      alert("Comment posted successfully and is pending approval");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert(error.response?.data?.message || "Failed to post comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  /* ── Loading ── */
  if (loading)
    return (
      <main className="min-h-[60vh] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <NewsDetailsSkeleton />
          </div>
        </div>
      </main>
    );

  /* ── Error ── */
  if (error || !article)
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-5">Failed to load article.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-[11px] font-bold tracking-widest uppercase text-white bg-red-700 px-6 py-2.5 hover:bg-red-800 transition"
          >
            Go Back
          </button>
        </div>
      </main>
    );

  const {
    title,
    subtitle,
    content,
    cover_image,
    category,
    subcategory,
    published_date,
    published_by,
    country,
    state,
    city,
  } = article;
  const location = [city, state, country].filter(Boolean).join(", ");
  const sidebarItems = latest.filter((n) => n.slug !== slug);

  return (
    <main className="min-h-[60vh] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 pb-20">
        {/* ── Back ── */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-gray-500 hover:text-red-700 transition mb-6"
        >
          <IconBack /> Back to News
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">
          {/* ══ MAIN ARTICLE ══ */}
          <article>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-4">
              <button
                onClick={() => navigate("/")}
                className="hover:text-red-700 transition"
              >
                Home
              </button>
              {category && (
                <>
                  <span>/</span>
                  <span>{category}</span>
                </>
              )}
              {subcategory && (
                <>
                  <span>/</span>
                  <span>{subcategory}</span>
                </>
              )}
            </nav>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {category && (
                <span className="text-[9.5px] font-bold tracking-[0.14em] uppercase bg-red-700 text-white px-2.5 py-1">
                  {category}
                </span>
              )}
              {subcategory && (
                <span className="text-[9.5px] font-bold tracking-[0.14em] uppercase border border-gray-300 text-gray-500 px-2.5 py-1">
                  {subcategory}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-[18px] sm:text-[26px] font-bold leading-tight text-gray-900 mb-4">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-[16px] text-gray-500 leading-relaxed border-l-4 border-red-700 pl-4 italic mb-5">
                {subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-gray-500 border-t border-b border-gray-100 py-3 mb-6">
              {published_by && (
                <span className="flex items-center gap-1.5">
                  <span className="text-red-700">
                    <IconUser />
                  </span>
                  <span className="font-semibold text-gray-700">
                    {published_by}
                  </span>
                </span>
              )}
              {published_date && (
                <span className="flex items-center gap-1.5">
                  <span className="text-red-700">
                    <IconCalendar />
                  </span>
                  {formatDate(published_date)}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1.5">
                  <span className="text-red-700">
                    <IconPin />
                  </span>
                  {location}
                </span>
              )}

              {/* Share icons */}
              <div className="ml-auto flex items-center gap-1.5">
                <SocialBtn
                  title="Share on WhatsApp"
                  cls="border-green-200 text-green-600 hover:bg-green-50"
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`,
                      "_blank",
                    )
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882l6.186-1.443A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.724.868.936-3.42-.235-.372A9.818 9.818 0 1 1 12 21.818z" />
                  </svg>
                </SocialBtn>
                <SocialBtn
                  title="Share on Facebook"
                  cls="border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                      "_blank",
                    )
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialBtn>
                <SocialBtn
                  title="Share on X"
                  cls="border-gray-200 text-gray-800 hover:bg-gray-50"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
                      "_blank",
                    )
                  }
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SocialBtn>
                <SocialBtn
                  title={copied ? "Copied!" : "Copy link"}
                  cls={
                    copied
                      ? "border-green-400 text-green-600 bg-green-50"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }
                  onClick={copyLink}
                >
                  {copied ? <IconCheck /> : <IconLink />}
                </SocialBtn>
              </div>
            </div>

            {/* Cover image */}
            {cover_image && (
              <div className="relative overflow-hidden mb-8">
                <img
                  src={cover_image}
                  alt={title}
                  className="w-full max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Article body */}
            <div
              className="prose-article text-[16px] leading-[1.9] text-gray-800"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Footer tags */}
            <div className="mt-10 pt-5 border-t border-gray-200 flex flex-wrap items-center gap-2">
              <span className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400 mr-2">
                Tags:
              </span>
              {category && (
                <span className="text-[10.5px] font-semibold tracking-wide uppercase bg-gray-100 text-gray-600 px-3 py-1 hover:bg-red-700 hover:text-white transition cursor-pointer">
                  {category}
                </span>
              )}
              {subcategory && (
                <span className="text-[10.5px] font-semibold tracking-wide uppercase bg-gray-100 text-gray-600 px-3 py-1 hover:bg-red-700 hover:text-white transition cursor-pointer">
                  {subcategory}
                </span>
              )}
              {state && (
                <span className="text-[10.5px] font-semibold tracking-wide uppercase bg-gray-100 text-gray-600 px-3 py-1 hover:bg-red-700 hover:text-white transition cursor-pointer">
                  {state}
                </span>
              )}
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8">
              {/* Heading */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-bold text-gray-900">
                  Comments
                </h3>

                <span className="text-[12px] text-gray-400">
                  {comments?.length || 0} Comments
                </span>
              </div>

              {/* Comment Form */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-200">
                <textarea
                  placeholder="Write your comment..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-red-500 resize-none transition"
                />

                <div className="flex justify-end mt-3">
                  <button
                    onClick={handlePostComment}
                    disabled={submittingComment}
                    className="bg-red-700 hover:bg-red-800 disabled:opacity-60 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition"
                  >
                    {submittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>

              {/* Comment List */}
              <div className="space-y-5">
                {comments?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-5 border-b border-gray-100"
                  >
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[13px] shrink-0">
                      {(item.Member?.name || item.guest_name || "U").charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-[13px] font-semibold text-gray-900">
                          {item.Member?.name || item.guest_name || "Anonymous"}
                        </h4>

                        <span className="text-[11px] text-gray-400">
                          {formatDate(item.created_at)}
                        </span>
                      </div>

                      <p className="mt-2 text-[13.5px] leading-6 text-gray-600">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                ))}

                {!comments?.length && (
                  <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl">
                    <p className="text-[13px] text-gray-400">
                      No comments yet. Be the first to comment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* ══ SIDEBAR ══ */}
          <aside className="lg:border-l border-gray-200 lg:pl-8">
            <div className="sticky top-[120px]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-5 bg-red-700 block" />
                <h2 className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-700">
                  Latest News
                </h2>
              </div>

              {latestLoading ? (
                <LatestSkeleton />
              ) : (
                <>
                  <div className="grid grid-col2-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
                    {sidebarItems.slice(0, 7).map((item) => (
                      <LatestItem
                        key={item._id || item.slug}
                        item={item}
                        onClick={() => navigate(`/details/${item.slug}`)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-red-700 border border-red-200 py-2.5 hover:bg-red-700 hover:text-white transition"
                  >
                    View All Stories <IconArrow />
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
