import { Form, Button } from 'react-bootstrap';
import React, { useState } from "react";
import App from "../../../App.css";

const Search = ({ search, refreshPage }) => {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchInputChanges = e => {
		setSearchValue(e.target.value);
	};

	const resetInputField = () => {
		setSearchValue("");
	};

	const callSearchFunction = e => {
		e.preventDefault();
		search(searchValue);
		resetInputField();
	};

	return (
		<Form>
			<input
				className="discover-search"
				onChange={handleSearchInputChanges}
				placeholder="Enter your favourite artist"
				type="text"
				value={searchValue}
			/>
		<Button variant = "outline-primary" onClick={callSearchFunction} type="submit" value="SEARCH" className="discover-button"> Search < /Button>
	</Form>
	);
};

export default Search;
