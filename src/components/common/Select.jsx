import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<div className="form-group mt-3">
			<label htmlFor={name}>{label}</label>
			<select {...rest} id={name} name={name} className="form-select">
				{options.map((option) => {
					return (
						<option key={option._id} value={option._id}>
							{option.name}
						</option>
					);
				})}
			</select>
			{error && <small className="text-danger">{error}</small>}
		</div>
	);
};

export default Select;
