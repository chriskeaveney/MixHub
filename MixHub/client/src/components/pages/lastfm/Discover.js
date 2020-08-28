import { Card, Row, Col } from 'react-bootstrap';
import React, { useReducer, useEffect } from "react";
import Artist from "./Artist";
import Search from "./Search";
import config from "../config/config.js";

const DEFAULT_ARTIST = 'beck';
const RESULT_LIMIT = 30;
const RESULT_PAGE = 1;
const API_URL = `http://localhost:5000/${RESULT_LIMIT}&format=json&api_key='insert api key here'`;

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

const App = () => {
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
		<div className="app">
		<br/><br/><br/>
		<Row>
			<p className = "search" > Discover new artists with Last FM < /p>
			</Row>
			<Row className="justify-content-md-center">
			<Col className="col-md-6">
			<Search search={search} />
			</Col>
			</Row>
			<Card className="discover-card" text="white" style={{width: '37rem'}}>
	    <Row className="newrow2">
	    <Col className="newcol">
			<div className="artists">
				{loading && !errorMessage && artists.length > 0 ? (
					<div className="loader"></div>
				) : errorMessage ? (
					<div className="discover-error" errorcode={errorMessage}>No results found for that artist. Please try again.</div>
				) : (
					artists.map((artist, index) => (
						<Artist
							key={`${index}-${artist.name}`}
							artist={artist}
						/>
					))
				)}
			</div>
			</Col>
			</Row>
			</Card>
			<br/><br/><br/>
		</div>
	);
};

export default App;
