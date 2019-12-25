import React from 'react';
import PropTypes from 'prop-types';


function CannonBall({position}) {
	const ballStyle = {
		fill: '#777',
		stroke: '#444',
		strokeWidth: '2px',
	};

	return (
		<ellipse
			cx={position.x} cy={position.y}
			rx="16" ry="16"
			style={ballStyle}
		/>
	)
}

CannonBall.propTypes = {
	position: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}).isRequired,
}

export default CannonBall;