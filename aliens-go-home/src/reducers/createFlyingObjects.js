import * as C from '../utils/constants';
import * as F from '../utils/formulas';

export default (state, now) => {
	if (!state.gameState.started) return state;

	const {lastObjectCreatedAt, flyingObjects} = state.gameState;

	const createNewObject = (
		now - lastObjectCreatedAt > C.createInterval
		&& flyingObjects.length < C.maxFlyingObjects
	);

	if (!createNewObject) return state;

	const x = F.randomChoice(C.flyingObjectsStartingXs)
	const newFlyingObject = {
		position: {x, y: C.flyingObjectsStartingY},
		createdAt: now,
		id: now,
	};

	return {
		...state,
		gameState: {
			...state.gameState,
			flyingObjects: [
				...state.gameState.flyingObjects,
				newFlyingObject,
			],
			lastObjectCreatedAt: now,
		}
	};
}