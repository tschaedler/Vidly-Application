import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow rounded justify-content-center mb-5">
			<div className="container-fluid">
				<Link className="navbar-brand fs-2" to="/">
					Vidly
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link fs-5" to="/movies">
								Movies
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link fs-5" to="/customers">
								Customers
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link fs-5" to="/rentals">
								Rentals
							</NavLink>
						</li>
					</ul>
					<NavLink to="/login" className="btn btn-outline-light me-2">
						Login
					</NavLink>
					<NavLink to="/register" className="btn btn-primary me-2">
						Register
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
