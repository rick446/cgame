import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import {useSelector} from 'react-redux';

import {gameHeight} from '../utils/constants';

import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';


function Canvas({trackMouse}) {
	const viewBox = [
		window.innerWidth / -2, 100 - gameHeight,
		window.innerWidth, gameHeight,
	]
	const gameState = useSelector(state => state.gameState);

	return (
		<svg
			id="aliens-go-home-canvas"
      		preserveAspectRatio="xMaxYMax "
      		onMouseMove={trackMouse}
      		viewBox={viewBox}
		>
			<defs>
				<filter id="shadow">
					<feDropShadow dx="1" dy="1" stdDeviation="2"/>
				</filter>
			</defs>
			<Sky />
			<Ground />
			<CannonPipe />
			<CannonBase />
			<CannonBall position={{x: 0, y: -100}}/>
			<CurrentScore score={15}/>
			<Heart position={{x:-300, y:35}} />
			{!gameState.started && 
				<g>
					<StartGame />
					<Title />
				</g>
			}
			{fp.map(
				fo => <FlyingObject key={fo.id} position={fo.position}/>, 
				gameState.flyingObjects
			)}
		</svg>
	)
}

Canvas.propTypes = {
	trackMouse: PropTypes.func.isRequired,
}


export default Canvas;