import React from "react";

const ListGroup = ({
	items,
	textProperty,
	valueProperty,
	onItemSelect,
	selectedItem,
}) => {
	const generateGenreList = () => {
		const genresList = items.map((item) => {
			return (
				<li
					key={item[valueProperty]}
					style={{ cursor: "pointer" }}
					className={
						item === selectedItem
							? "list-group-item bg-secondary text-light p-3"
							: "list-group-item bg-dark text-light p-3"
					}
					onClick={() => onItemSelect(item)}
				>
					{item[textProperty]}
				</li>
			);
		});

		return genresList;
	};
	return <ul className="list-group shadow">{generateGenreList()}</ul>;
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};

export default ListGroup;
