import React, { useState } from "react";
import {
	TextInput,
	Text,
  View,
  Button
} from 'react-native';

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
			<View>
			<TextInput
				className="discover-search"
				onChange={handleSearchInputChanges}
				placeholder="Enter your favourite artist"
				type="text"
				value={searchValue}
			/>
		<Button onClick={callSearchFunction} type="submit" value="SEARCH" className="discover-button"> Search < /Button>
		</View>
	);
};

export default Search;
