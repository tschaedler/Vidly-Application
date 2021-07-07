import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
	return (
		<div className="container">
			<Navbar />
			<Switch>
				<Route path="/register" component={RegisterForm} />
				<Route path="/login" component={LoginForm} />
				<Route path="/movies/:id" component={MovieForm} />
				<Route path="/movies" component={Movies} />
				<Route path="/customers" component={Customers} />
				<Route path="/rentals" component={Rentals} />
				<Route path="/not-found" component={NotFound} />
				<Redirect exact from="/" to="/movies" />
				<Redirect to="/not-found" />
			</Switch>
		</div>
	);
}

export default App;
