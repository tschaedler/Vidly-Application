import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;
	let pages = [];
	for (let i = 1; i < pagesCount + 1; i++) {
		pages.push(i);
	}

	return (
		<nav className="mt-4">
			<ul className="pagination">
				{pages.map((page) => {
					return (
						<li
							key={page}
							style={{ cursor: "pointer" }}
							className="page-item shadow"
						>
							<div
								className={
									page === currentPage
										? "page-link bg-secondary text-light border-0"
										: "page-link bg-dark text-light border-0"
								}
								onClick={() => onPageChange(page)}
							>
								{page}
							</div>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
};

export default Pagination;
