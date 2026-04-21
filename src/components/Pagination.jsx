const Pagination = ({ page, setPage, total, pageSize }) => {
  const start = page * pageSize;
  const end = start + pageSize;

  return (
    <div className="pagination">
      <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
        Previous
      </button>

      <span>Page {page + 1}</span>

      <button onClick={() => setPage((p) => p + 1)} disabled={end >= total}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
