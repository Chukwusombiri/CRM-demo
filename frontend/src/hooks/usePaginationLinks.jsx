import React from 'react'

export default function usePaginationLinks(meta) {
    let links = [];

    if (meta?.current_page && Array.isArray(meta.links)) {
        const currentPage = meta.current_page;
        const lastPage = meta.last_page;

        links = meta.links.filter((item) => {
            const label = item.label;

            // Always include 'Previous' and 'Next'
            if (typeof label === 'string' && (label.includes('Previous') || label.includes('Next'))) {
                return true;
            }

            // Convert numeric label
            const pageNum = parseInt(label, 10);
            if (isNaN(pageNum)) return false;

            // Always include current page
            if (pageNum === currentPage) return true;

            // Handle edges
            if (currentPage === 1) {
                return pageNum <= currentPage + 2;
            }

            if (currentPage === 2) {
                return pageNum >= currentPage - 1 && pageNum <= currentPage + 2;
            }

            if (currentPage === lastPage) {
                return pageNum >= currentPage - 2;
            }

            if (currentPage === lastPage - 1) {
                return pageNum >= currentPage - 2 && pageNum <= currentPage + 1;
            }

            // Default: current + 2 pages
            return pageNum >= currentPage && pageNum <= currentPage + 2;
        });
    }
    
    return links
}
