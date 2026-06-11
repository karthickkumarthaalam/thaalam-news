import { useState, useRef, useEffect } from "react";
import { useCategories } from "../hooks/useCategories";

function HamburgerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function CategoryBar({ active, onChange }) {
  const { categories, loading } = useCategories();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const refHover = useRef(null);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow =
      drawerOpen || categoriesModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, categoriesModalOpen]);

  function pick(key, type = "category", categoryId = null) {
    // key: category id or subcategory name
    // type: 'category' or 'subcategory'
    onChange({ key, type, categoryId });
    setDrawerOpen(false);
    setHoveredCategory(null);
  }

  useEffect(() => {
    if (categoriesModalOpen) {
      setShowCategoriesModal(true);
    } else {
      const timeout = setTimeout(() => {
        setShowCategoriesModal(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [categoriesModalOpen]);

  const handleCategoryHover = (category) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredCategory(category);
  };

  const handleCategoryHoverLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  return (
    <>
      <nav className="sticky top-[65px] z-50 bg-white shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex items-center h-[48px] gap-1">
          {/* ── Mobile: active label + hamburger ── */}
          {/* ── Mobile Top Bar ── */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Left Content */}
            <div className="flex flex-col px-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-red-600 font-bold">
                தமிழ் செய்திகள்
              </span>

              <span className="text-[14px] font-extrabold text-gray-900 truncate max-w-[220px]">
                உண்மையின் குரல் • உடனடி செய்திகள்
              </span>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 active:scale-95 transition-all"
            >
              <HamburgerIcon />

              {/* <span className="text-[12px] font-semibold text-gray-700">
                பிரிவுகள்
              </span> */}
            </button>
          </div>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center h-full w-full gap-1">
            {/* Hamburger Icon for more categories */}
            {!loading && categories.length > 7 && (
              <div className="relative h-full flex items-center shrink-0">
                <button
                  onClick={() => setCategoriesModalOpen(!categoriesModalOpen)}
                  className={`h-full flex items-center gap-2 px-3 transition-colors ${
                    categoriesModalOpen
                      ? "text-red-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="மேலும் பிரிவுகள்"
                >
                  {categoriesModalOpen ? <CloseIcon /> : <HamburgerIcon />}
                </button>
              </div>
            )}

            <div className="w-px h-5 bg-gray-200 mx-1 shrink-0" />

            {/* Display first 7 categories */}
            {!loading && categories.length > 0 ? (
              <>
                {categories.slice(0, 7).map((cat) => (
                  <div
                    key={cat.id}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleCategoryHover(cat)}
                    onMouseLeave={handleCategoryHoverLeave}
                    ref={hoveredCategory?.id === cat.id ? refHover : null}
                  >
                    <button
                      onClick={() => pick(cat.category_name, "category")}
                      className={`h-full px-4 text-[12.5px] font-semibold tracking-wide whitespace-nowrap transition-colors relative group ${
                        active?.key === cat.category_name &&
                        active?.type === "category"
                          ? "text-red-700"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {cat.category_name}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-red-700 transition-transform origin-left ${active?.key === cat.category_name && active?.type === "category" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </button>

                    {/* Hover Modal with Subcategories */}
                    {hoveredCategory?.id === cat.id &&
                      cat.sub_categories &&
                      cat.sub_categories.length > 0 && (
                        <div className="absolute top-[calc(100%+1px)] rounded-lg left-0 bg-white border border-gray-200 shadow-2xl z-50 animate-fade-in min-w-[280px]">
                          <div className="px-4 py-3 bg-gray-200 border-b border-gray-200">
                            <p className="text-[12px] font-bold text-gray-900">
                              {cat.category_name}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-0.5">
                              உட்பிரிவுகள்
                            </p>
                          </div>
                          <div className="max-h-[300px] overflow-y-auto bg-gray-100">
                            {cat.sub_categories.map((sub, idx) => (
                              <button
                                key={idx}
                                onClick={() => pick(sub, "subcategory", cat.id)}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-[12.5px] font-medium text-left border-b border-gray-100 hover:bg-gray-50 transition-colors text-gray-700 hover:text-red-700"
                              >
                                <span>{sub}</span>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="opacity-0 group-hover:opacity-100"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </>
            ) : loading ? (
              <div className="flex items-center gap-4 ml-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-20 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      {/* ── All Categories Modal (Desktop) ── */}
      {showCategoriesModal && (
        <div className="fixed inset-0 z-[100] hidden md:block">
          {" "}
          {/* Backdrop */}
          <div
            onClick={() => setCategoriesModalOpen(false)}
            className={`absolute inset-0  transition-opacity duration-300 ${
              categoriesModalOpen ? "opacity-100" : "opacity-0"
            }`}
          />{" "}
          {/* Modal */}
          <div
            className={`absolute top-36 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1350px] bg-gray-50 shadow-xl rounded-xl border border-gray-200 transition-all duration-300 ease-out origin-top ${
              categoriesModalOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-[0.98] pointer-events-none"
            }`}
          >
            {" "}
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
              <h2 className="text-[16px] font-black text-gray-900 mt-1">
                செய்தி பிரிவுகள்
              </h2>

              <button
                onClick={() => setCategoriesModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-black"
              >
                <CloseIcon />
              </button>
            </div>
            {/* Content */}
            <div className="px-8 py-8 bg-gray-50">
              {" "}
              {loading ? (
                <div className="grid grid-cols-4 gap-x-10 gap-y-8">
                  {[...Array(12)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />

                      <div className="space-y-3">
                        {[...Array(5)].map((_, j) => (
                          <div
                            key={j}
                            className="h-3 bg-gray-100 rounded animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-x-10 gap-y-12">
                  {" "}
                  {categories.map((cat) => (
                    <div key={cat.id} className="min-w-0">
                      {/* Category */}
                      <button
                        onClick={() => {
                          pick(cat.id, "category");
                          setCategoriesModalOpen(false);
                        }}
                        className={`group flex items-center gap-3 mb-4 text-left transition-all ${
                          active?.key === cat.category_name &&
                          active?.type === "category"
                            ? "text-red-700"
                            : "text-gray-700 hover:text-red-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-6 rounded-full transition-colors ${
                            active === cat.category_name
                              ? "bg-red-700"
                              : "bg-slate-300 group-hover:bg-red-700"
                          }`}
                        />

                        <span className="text-[18px] font-extrabold leading-tight">
                          {cat.category_name}
                        </span>
                      </button>

                      {/* Subcategories */}
                      {cat.sub_categories?.length > 0 && (
                        <div className="space-y-2 pl-5 border-l border-gray-200">
                          {cat.sub_categories.map((sub, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                pick(sub, "subcategory", cat.id);
                                setCategoriesModalOpen(false);
                              }}
                              className={`group flex items-start gap-2 w-full text-left transition-colors ${
                                active?.key === sub &&
                                active?.type === "subcategory"
                                  ? "text-red-700"
                                  : "text-gray-600 hover:text-red-700"
                              }`}
                            >
                              <span className="mt-[7px] w-1 h-1 rounded-full bg-gray-400 group-hover:bg-red-700 flex-shrink-0" />

                              <span className="text-[13px] leading-relaxed font-medium">
                                {sub}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Drawer ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-[88%] max-w-[340px] h-full bg-[#fafafa] flex flex-col shadow-2xl animate-slide-in-left overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-extrabold text-gray-900 mt-1">
                  பிரிவுகள்
                </h2>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Categories */}
            <div className="p-4 space-y-3">
              {!loading && categories.length > 0
                ? categories.map((cat) => {
                    const expanded = hoveredCategory?.id === cat.id;

                    return (
                      <div
                        key={cat.id}
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                      >
                        {/* Category Button */}
                        <button
                          onClick={() => {
                            if (expanded) {
                              setHoveredCategory(null);
                            } else {
                              setHoveredCategory(cat);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-4 py-4 transition-all ${
                            active?.key === cat.category_name
                              ? "bg-red-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                active?.key === cat.category_name
                                  ? "bg-red-600"
                                  : "bg-gray-300"
                              }`}
                            />

                            <span
                              className={`text-[14px] font-semibold ${
                                active?.key === cat.category_name
                                  ? "text-red-700"
                                  : "text-gray-800"
                              }`}
                            >
                              {cat.category_name}
                            </span>
                          </div>

                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${
                              expanded
                                ? "rotate-180 text-red-600"
                                : "text-gray-400"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* Subcategories */}
                        <div
                          className={`transition-all duration-300 overflow-hidden ${
                            expanded ? "max-h-[500px]" : "max-h-0"
                          }`}
                        >
                          <div className="px-3 pb-3 space-y-1">
                            {/* Main category quick action */}
                            <button
                              onClick={() =>
                                pick(cat.category_name, "category")
                              }
                              className="w-full text-left px-3 py-3 rounded-xl bg-gray-50 text-[13px] font-semibold text-gray-700 hover:bg-red-50 hover:text-red-700 transition"
                            >
                              அனைத்து {cat.category_name}
                            </button>

                            {cat.sub_categories?.map((sub, idx) => (
                              <button
                                key={idx}
                                onClick={() => pick(sub, "subcategory", cat.id)}
                                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[13px] font-medium transition ${
                                  active?.key === sub
                                    ? "bg-red-50 text-red-700"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <span>{sub}</span>

                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="opacity-60"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : loading
                  ? [...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl border border-gray-100 p-4"
                      >
                        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))
                  : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
