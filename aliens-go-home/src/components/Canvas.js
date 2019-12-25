import React from 'react';
import PropTypes from 'prop-types';
import fp from 'lodash/fp';
import {useSelector, useDispatch} from 'react-redux';

import * as A from '../actions';
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
	const gameState = useSelector(state => state.gameState);
	const angle = useSelector(state => state.angle);
	const dispatch = useDispatch();

	const viewBox = [
		window.innerWidth / -2, 100 - gameHeight,
		window.innerWidth, gameHeight,
	];

	const lives = fp.map(i => <Heart key={i} position={{
			x: -180 - (i * 70),
			y: 35,
		}}
	/>, fp.range(0, gameState.lives));

	return (
		<svg
			id="aliens-go-home-canvas"
      		preserveAspectRatio="xMaxYMax "
      		onMouseMove={trackMouse}
      		viewBox={viewBox}
      		onClick={e => gameState.started && dispatch(A.shoot(angle))}
		>
			<defs>
				<filter id="shadow">
					<feDropShadow dx="1" dy="1" stdDeviation="2"/>
				</filter>
			</defs>
			<Sky />
			<Ground />
			{fp.map(
				cb => <CannonBall key={cb.id.getTime()} position={cb.position}/>,
				gameState.cannonBalls,
			)}
			<CannonPipe />
			<CannonBase />
			<CurrentScore score={gameState.kills}/>
			{!gameState.started && 
				<g>
					<StartGame />
					<Title />
				</g>
			}
			{fp.map(
				fo => <FlyingObject key={fo.id.getTime()} position={fo.position}/>, 
				gameState.flyingObjects
			)}
			{lives}
		</svg>
	)
}

Canvas.propTypes = {
	trackMouse: PropTypes.func.isRequired,
}


export default Canvas;