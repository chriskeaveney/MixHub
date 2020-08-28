import React from "react";

const Artist = ({ artist }) => {

	return (
		<View>
		<Text className="artist" href={artist.url} target="_blank">{artist.name}</Text>
		</View>
	);
};

export default Artist;
