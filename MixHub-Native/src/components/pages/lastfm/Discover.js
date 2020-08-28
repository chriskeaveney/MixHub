import React, { useReducer, useEffect } from "react";
import Artist from "./Artist";
import Search from "./Search";
import config from "../config/config.js";

const API_KEY = config["API_KEY"];
const DEFAULT_ARTIST = 'beck';
const RESULT_LIMIT = 30;
const RESULT_PAGE = 1;
const API_URL = `http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&limit=${RESULT_LIMIT}&format=json&api_key=${API_KEY}`;

const initialState = {
	loading: false,
	artists: [],
	errorMessage: null
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null
			};
		case "SEARCH_SUCCESS":
			return {
				...state,
				loading: false,
				artists: action.payload
			};
		case "SEARCH_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error
			};
		default:
			return state;
	}
};

class DiscoverScreen extends React.Component {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch(`${API_URL}&page=${RESULT_PAGE}&artist=${DEFAULT_ARTIST}`)
			.then(response => response.json())
			.then(jsonResponse => {
				const artists = jsonResponse.similarartists[Object.keys(jsonResponse.similarartists)[0]];
				dispatch({
					type: "SEARCH_SUCCESS",
					payload: artists
				});
			});
	}, []);

	const search = searchValue => {
		dispatch({
			type: "SEARCH_REQUEST"
		});

		const Header = (props) => {
			return (
				<View className="App-header">
					<Text>{props.text}</Text>
				</View>
			);
		};

		fetch(`${API_URL}&page=${RESULT_PAGE}&artist=${searchValue}`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (!jsonResponse.error) {
					const artists = jsonResponse.similarartists[Object.keys(jsonResponse.similarartists)[0]];
					dispatch({
						type: "SEARCH_SUCCESS",
						payload: artists
					});
				} else {
					dispatch({
						type: "SEARCH_FAILURE",
						error: jsonResponse.error
					});
				}
			});
	};

	let { artists, errorMessage, loading } = state;
	console.log( state );

	return (
		<View className="app">
		<View>
			<Text className = "search" > Discover new artists with Last FM </Text>
			</View>
			<View className="justify-content-md-center">
			<Search search={search} />
			</View>
	    <View>
			<View className="artists">
				{loading && !errorMessage && artists.length > 0 ? (
					<View className="loader"></View>
				) : errorMessage ? (
					<Text className="discover-error" errorcode={errorMessage}>No results found for that artist. Please try again.</Text>
				) : (
					artists.map((artist, index) => (
						<Artist
							key={`${index}-${artist.name}`}
							artist={artist}
						/>
					))
				)}
			</View>
			</View>
		</View>
	);
};

export default DiscoverScreen;
