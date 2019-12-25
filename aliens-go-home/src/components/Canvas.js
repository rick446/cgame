import React from 'react';
import PropTypes from 'prop-types';

import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';


function Canvas({trackMouse}) {
	const viewBox = [
		window.innerWidth / -2, 100 - window.innerHeight,
		window.innerWidth, window.innerHeight,
	]

	return (
		<svg
			id="aliens-go-home-canvas"
      		preserveAspectRatio="xMaxYMax"
      		onMouseMove={trackMouse}
      		viewBox={viewBox}
		>
			<Sky />
			<Ground />
			<CannonPipe />
			<CannonBase />
		</svg>
	)
}

Canvas.propTypes = {
	trackMouse: PropTypes.func.isRequired,
}


export default Canvas;