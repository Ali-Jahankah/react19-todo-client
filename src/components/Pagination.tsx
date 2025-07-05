import type { FC, ReactElement } from 'react';
import type { IPaginationProps } from '../types/todos';

const Pagination: FC<IPaginationProps> = ({
  prevPage,
  page,
  totalPages,
  nextPage
}): ReactElement => {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <button onClick={prevPage} disabled={page === 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={nextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
