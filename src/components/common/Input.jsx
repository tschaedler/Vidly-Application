import React from "react";

const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className="form-group mt-3">
			<label htmlFor={name}>{label}</label>
			<input {...rest} id={name} name={name} className="form-control" />
			{error && <small className="text-danger">{error}</small>}
		</div>
	);
};

export default Input;
