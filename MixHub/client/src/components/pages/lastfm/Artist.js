import { Row } from 'react-bootstrap';
import React from "react";

const Artist = ({ artist }) => {

	return (
		<Row className="newrow">
		<a className="artist" href={artist.url} target="_blank">{artist.name}</a>
		</Row>
	);
};

export default Artist;
