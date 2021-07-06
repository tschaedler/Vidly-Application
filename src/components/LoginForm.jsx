import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";

class LoginForm extends Form {
	state = {
		data: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Passoword"),
	};

	doSubmit = () => {
		console.log("submitted");
	};

	render() {
		return (
			<div className="rounded shadow p-3 bg-dark">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderButton("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
