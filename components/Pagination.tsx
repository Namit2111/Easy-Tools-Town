'use client'

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    //if only one page
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        //alwas show first page 
        pages.push(1);

        //if we many pages , show ellipsis and nearby pages 
        if (totalPages <= 7) {
            //show all pages if 7 or fewer
            for (let i = 2; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            //show ellipsis for many pages
            if (currentPage <= 3) {
                ///near. the start : [1,2,3,4,...,10]
                for (let i = 2; i < 4; i++) {
                    pages.push('...');
                    pages.push(totalPages);
                }
            } else if (currentPage >= totalPages - 2) {
                //near the end: [1,'...',7,8,9,10]
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                //in the middle : [1, ..., 2,3,4,5, ..., 10]
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('...');
                pages.push(totalPages)
            }
        }
        return pages;
    }

    const pageNumbers = getPageNumbers();
    return (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
          px-4 py-2 font-bold border-2 border-black neo-shadow
          ${currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-100 active:neo-shadow-active'
                    }
        `}
            >
                Previous
            </button>
            {/* Page Number Buttons */}
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                            ...
                        </span>
                    );
                }
                const pageNum = page as number;
                const isActive = pageNum === currentPage;
                return (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`
              px-4 py-2 font-bold border-2 border-black neo-shadow
              ${isActive
                                ? 'bg-[#fdffb6] text-black'
                                : 'bg-white hover:bg-gray-100 active:neo-shadow-active'
                            }
            `}
                    >
                        {pageNum}
                    </button>
                );
            })}
            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
          px-4 py-2 font-bold border-2 border-black neo-shadow
          ${currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-100 active:neo-shadow-active'
                    }
        `}
            >
                Next
            </button>
        </div>
    )

}

export default Pagination;
