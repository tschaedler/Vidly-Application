import React, { Component } from "react";
import ListGroup from "./common/ListGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreChange = (genre) => {
		this.setState({ genre });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const { movies, currentPage, pageSize, selectedGenre, sortColumn } =
			this.state;

		const movieFiltered =
			selectedGenre && selectedGenre._id
				? movies.filter((m) => m.genre._id === selectedGenre._id)
				: movies;

		const movieSorted = _.orderBy(
			movieFiltered,
			[sortColumn.path],
			[sortColumn.order]
		);
		const movieSubset = paginate(movieSorted, currentPage, pageSize);

		return { totalCount: movieFiltered.length, data: movieSubset };
	};

	render() {
		const { length: count } = this.state.movies;
		const { currentPage, pageSize, sortColumn } = this.state;

		const { totalCount, data: movieSubset } = this.getPagedData();

		return (
			<React.Fragment>
				<div className="mt-3 mb-3">
					{count === 0 ? (
						<h3>There are no movies!</h3>
					) : (
						<h3>There are {totalCount} movies</h3>
					)}
				</div>
				<div className="row">
					<div className="col-3">
						{
							<ListGroup
								items={this.state.genres}
								selectedItem={this.state.selectedGenre}
								onItemSelect={this.handleGenreSelect}
							/>
						}
					</div>
					<div className="col">
						<div className="table-responsive rounded overflow-hidden shadow p-3 bg-dark">
							<MoviesTable
								movieSubset={movieSubset}
								sortColumn={sortColumn}
								onLike={this.handleLike}
								onDelete={this.handleDelete}
								onSort={this.handleSort}
							/>
						</div>
						<Pagination
							itemsCount={totalCount}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Movies;
