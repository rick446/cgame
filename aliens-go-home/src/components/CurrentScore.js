import React from 'react';
import PropTypes from 'prop-types';


function CurrentScore({score}) {
	const scoreStyle = {
		fontFamily: '"Joti One", cursive',
		fontSize: 80,
		fill: '#dd6d3e',
	};

	return (
		<g filter="url(#shadow)">
			<text style={scoreStyle} x="300" y="80">{score}</text>
		</g>
	)
}


CurrentScore.propTypes = {
	score: PropTypes.number.isRequired,
}


export default CurrentScore;