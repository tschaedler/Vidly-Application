import React from "react";

const SearchBox = ({ value, onChange }) => {
	return (
		<form className="col-12 col-lg-auto mb-3 w-100">
			<input
				type="search"
				className="form-control"
				placeholder="Search..."
				value={value}
				onChange={(e) => onChange(e.currentTarget.value)}
			/>
		</form>
	);
};

export default SearchBox;
