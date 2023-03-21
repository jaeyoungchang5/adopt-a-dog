import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

interface IPaginationComponentProps {
    itemsCount: number,
    itemsPerPage: number,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export function PaginationComponent({ itemsCount, itemsPerPage, currentPage, setCurrentPage }: IPaginationComponentProps) {
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const isPaginationShown = pagesCount > 1;
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pagesCount;

    function changePage(newPage: number) {
        if (currentPage === newPage) {
            return;
        }

        setCurrentPage(newPage);
		scrollToTop();
    }

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}

	function onPageNumberClick(pageNumber: number) {
		changePage(pageNumber);
	}

	function onPreviousPageClick() {
    	changePage(currentPage - 1);
	}

	function onNextPageClick() {
    	changePage(currentPage + 1);
	}

	function setLastPageAsCurrent() {
		if (currentPage > pagesCount) {
			setCurrentPage(pagesCount);
		}
	}

	let isPageNumberOutOfRange: boolean;

	const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
		const pageNumber = index + 1;
		const isPageNumberFirst = pageNumber === 1;
		const isPageNumberLast = pageNumber === pagesCount;
		const isCurrentPageWithinOnePageNumber = Math.abs(pageNumber - currentPage) <= 1;

		if (
			// isPageNumberFirst ||
			// isPageNumberLast ||
			isCurrentPageWithinOnePageNumber
		) {
			isPageNumberOutOfRange = false;
			return (
				<Pagination.Item
					key={pageNumber}
					onClick={() => onPageNumberClick(pageNumber)}
					active={pageNumber === currentPage}
				>
					{pageNumber}
				</Pagination.Item>
			);
		}

		if (isPageNumberFirst || isPageNumberLast) {
			return (
				<Pagination.Item
					key={pageNumber}
					disabled
				>
					{pageNumber}
				</Pagination.Item>
			)
		}

		if (!isPageNumberOutOfRange) {
			isPageNumberOutOfRange = true;
			return <Pagination.Ellipsis key={pageNumber} disabled className="muted" />;
		}
		
		return null;
  	});

	useEffect(() => {
		setLastPageAsCurrent();
	}, [pagesCount])

	return (
		<>
		{isPaginationShown && (
			<Pagination>
			<Pagination.Prev
				onClick={onPreviousPageClick}
				disabled={isCurrentPageFirst}
			/>
			{pageNumbers}
			<Pagination.Next
				onClick={onNextPageClick}
				disabled={isCurrentPageLast}
			/>
			</Pagination>
		)}
		</>
	);
};