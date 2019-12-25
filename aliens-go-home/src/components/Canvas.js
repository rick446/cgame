import React from 'react';
import PropTypes from 'prop-types';

import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';


function Canvas({trackMouse}) {
	const viewBox = [
		window.innerWidth / -2, 100 - window.innerHeight,
		window.innerWidth, window.innerHeight,
	]

	return (
		<svg
			id="aliens-go-home-canvas"
      		preserveAspectRatio="xMaxYMax slice"
      		onMouseMove={trackMouse}
      		viewBox={viewBox}
		>
			<defs>
				<filter id="shadow">
					<feDropShadow dx="!" dy="1" stdDeviation="2"/>
				</filter>
			</defs>
			<Sky />
			<Ground />
			<CannonPipe />
			<CannonBase />
			<CannonBall position={{x: 0, y: -100}}/>
			<CurrentScore score={15}/>
			<FlyingObject position={{x: -150, y: -300}}/>
			<FlyingObject position={{x: 150, y: -300}}/>
		</svg>
	)
}

Canvas.propTypes = {
	trackMouse: PropTypes.func.isRequired,
}


export default Canvas;