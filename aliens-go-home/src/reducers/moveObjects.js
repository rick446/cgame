import fp from 'lodash/fp';

import {calculateAngle} from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';


function moveObjects(state, action) {
	const {x, y} = action.mousePosition || {x: 0, y: 0};

	const now = new Date();
	const newState = createFlyingObjects(state, now);

	const flyingObjects = fp.filter(
		fo => (now - fo.createdAt) < 4000, 
		newState.gameState.flyingObjects, 
	);

	const angle = calculateAngle(0, 0, x, y);
	return {
		...newState, 
		gameState: {
			...newState.gameState,
			flyingObjects,
		},
		angle
	};
}


export default moveObjects;