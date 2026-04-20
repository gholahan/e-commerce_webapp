type PaginationProps = {
   page: number;
  setPage: (page: number) => void;
  hasNextPage: boolean; totalPages?: number; };

const Pagination = ({
  page,
  setPage,
  hasNextPage,
  totalPages = 1,
}: PaginationProps) => {

  let startPage = Math.max(1, page - 1);
  let endPage = Math.min(totalPages, page + 1);

  // ensure always 3 numbers
  if (page === 1) {
    endPage = Math.min(3, totalPages);
  }

  if (page === totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }

  const pageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center items-center mt-8 gap-2 text-xs">

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      {pageButtons.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`w-8 h-8 border rounded transition ${
            page === pageNum
              ? "bg-zinc-900 text-white"
              : "bg-white border-gray-300 hover:bg-gray-100"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasNextPage || page >= totalPages}
        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;