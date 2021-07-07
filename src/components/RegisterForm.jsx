import React from "react";
import Form from "./common/Form";

import Joi from "joi-browser";

class RegisterForm extends Form {
	state = {
		data: { username: "", password: "", name: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Passoword"),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = () => {
		console.log("submitted");
	};

	render() {
		return (
			<div className="rounded shadow p-3 bg-dark">
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
