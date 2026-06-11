export default function FilteredNewsList({
  news,
  category,
  subcategory,
  currentPage,
  onPageChange,
  hasMore,
  loading,
  onClearFilter,
}) {
  return (
    <div>
      {/* Header with Category/Subcategory */}
      <div className="mb-8 pb-6 px-4 border-b border-gray-200">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h1 className="text-xl font-bold text-gray-900">
            {subcategory || category || "News"}
          </h1>
          <button
            onClick={onClearFilter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-700 border border-gray-300 rounded-md hover:border-red-600 hover:text-red-600 transition-colors"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            View All
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Showing results for{" "}
          <span className="font-semibold text-red-700">
            {subcategory || category}
          </span>
          {subcategory && category && (
            <span className="text-gray-500 ml-1">in {category}</span>
          )}
        </p>
      </div>

      {/* News List */}
      <div className="space-y-4 mb-12">
        {news.map((n) => (
          <div
            key={n._id || n.slug}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-red-100 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              {/* Image */}
              {n.cover_image && (
                <div className="relative flex-shrink-0 sm:w-52 h-40 sm:h-32 overflow-hidden rounded-xl">
                  <img
                    src={n.cover_image}
                    alt={n.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Optional gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="max-w-[400px]">
                  <h3 className="text-[15px] sm:text-base font-semibold leading-6 text-gray-700 line-clamp-2 group-hover:text-red-700 transition-colors duration-200">
                    {n.title}
                  </h3>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {n.category && (
                      <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-medium">
                        {n.category}
                      </span>
                    )}

                    {n.published_date && (
                      <span>
                        {new Date(n.published_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    )}
                  </div>

                  <div className="text-red-600 text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Read →
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
            currentPage === 1 || loading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600"
          }`}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Page</span>
          <span className="font-bold text-gray-900">{currentPage}</span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasMore || loading}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
            !hasMore || loading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Next
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
