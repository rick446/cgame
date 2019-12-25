import fp from 'lodash/fp';

import {calculateAngle} from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';
import moveCannonBalls from './moveCannonBalls';
import checkCollisions from './checkCollisions';


function moveObjects(state, action) {
	if (!state.gameState.started) return state;

	let cannonBalls = moveCannonBalls(state.gameState.cannonBalls);

	const {x, y} = action.mousePosition || {x: 0, y: 0};

	const now = new Date();
	const newState = createFlyingObjects(state, now);

	let flyingObjects = fp.filter(
		fo => (now - fo.createdAt) < 4000, 
		newState.gameState.flyingObjects, 
	);

	const lostLives = newState.gameState.flyingObjects.length - flyingObjects.length;
	let lives = state.gameState.lives - lostLives;

	const started = lives > 0;
	if(!started) {
		flyingObjects = [];
		cannonBalls = [];
		lives = 3;
	}

	const angle = calculateAngle(0, 0, x, y);

	const {
		cannonBallsDestroyed, 
		flyingObjectsDestroyed
	} = checkCollisions(cannonBalls, flyingObjects);
	if(cannonBallsDestroyed.length > 0) {
		console.log(cannonBallsDestroyed);
	}

	flyingObjects = fp.filter(fo => !fp.includes(fo.id, flyingObjectsDestroyed), flyingObjects);
	cannonBalls = fp.filter(cb => !fp.includes(cb.id, cannonBallsDestroyed), cannonBalls);

	const kills = state.gameState.kills + flyingObjectsDestroyed.length;

	return {
		...newState, 
		gameState: {
			...newState.gameState,
			flyingObjects,
			cannonBalls,
			lives,
			started,
			kills,
		},
		angle
	};
}


export default moveObjects;