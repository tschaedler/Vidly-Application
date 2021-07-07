import React, { Component } from "react";
import ListGroup from "./common/ListGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/SearchBox";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		sortColumn: { path: "title", order: "asc" },
		searchQuery: "",
		selectedGenre: null,
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
		this.setState({
			selectedGenre: genre,
			searchQuery: "",
			currentPage: 1,
		});
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const {
			movies,
			currentPage,
			pageSize,
			selectedGenre,
			sortColumn,
			searchQuery,
		} = this.state;

		let movieFiltered = movies;
		if (searchQuery) {
			movieFiltered = movies.filter((m) =>
				m.title.toLowercase().startsWith(searchQuery.toLowercase())
			);
		} else if (selectedGenre && selectedGenre._id) {
			movieFiltered = movies.filter(
				(m) => m.genre._id === selectedGenre._id
			);
		}

		const movieSorted = _.orderBy(
			movieFiltered,
			[sortColumn.path],
			[sortColumn.order]
		);
		const movieSubset = paginate(movieSorted, currentPage, pageSize);

		return { totalCount: movieFiltered.length, data: movieSubset };
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1,
		});
	};

	render() {
		const { length: count } = this.state.movies;
		const { currentPage, pageSize, sortColumn, searchQuery } = this.state;

		const { totalCount, data: movieSubset } = this.getPagedData();

		return (
			<React.Fragment>
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
						<Link to="/movies/new" className="btn btn-primary me-2">
							New Movie
						</Link>
						<div className="mt-3 mb-3">
							{count === 0 ? (
								<h3>There are no movies!</h3>
							) : (
								<h3>There are {totalCount} movies</h3>
							)}
						</div>
						<SearchBox
							value={searchQuery}
							onChange={this.handleSearch}
						/>
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
