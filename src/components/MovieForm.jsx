import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovies, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
	state = {
		data: {
			title: "",
			genreID: "",
			numberInStock: "",
			dailyRentalRate: "",
		},
		genres: [],
		errors: {},
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genre: Joi.string().required().label("Genre"),
		numberInStock: Joi.number()
			.min(0)
			.max(100)
			.required()
			.label("Number In Stock"),
		dailyRentalRate: Joi.number()
			.min(0)
			.max(10)
			.required()
			.label("Daily Rental Rate"),
	};

	componentDidMount = () => {
		const genres = getGenres();
		this.setState({ genres });

		const movieID = this.props.match.params.id;
		if (movieID === "new") return;

		const movie = getMovies(movieID);
		if (!movie) return this.props.history.replace("/not-found");

		this.setState({ data: this.mapToViewModel(movie) });
	};

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreID: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}

	generateID = () => {
		var length = 24,
			charset =
				"abcdefghijklmnopqrstuvwxyz012345678901234567890123456789",
			retVal = "";
		for (var i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}
		return retVal;
	};

	doSubmit = () => {
		saveMovie(this.state.data);

		this.props.history.push("/movies");
	};

	render() {
		return (
			<div className="rounded shadow p-3 bg-dark">
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelected("genreID", "Genre", this.state.genres)}
					{this.renderInput("numberInStock", "Number in Stock")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default MovieForm;
