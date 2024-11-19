'use client';
import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') ?? '1');
  const per_page = parseInt(searchParams.get('per_page') ?? '5');

  const changePage = (newPage: number) => {
    // Ensure the page is within the allowed range
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/blogs?page=${newPage}`);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-10 my-6">
      <button
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-blue-500 text-white'
        }`}
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages).keys()].map((index) => (
        <button
          key={index + 1}
          className={`px-3 py-1 rounded-full ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => changePage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={`px-4 py-2 rounded-md ${
          currentPage >= totalPages
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-blue-500 text-white'
        }`}
        disabled={currentPage >= totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
