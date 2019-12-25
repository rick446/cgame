function shoot(state, action) {
	if (!state.gameState.started) return state;

	const {cannonBalls } = state.gameState;

	if(cannonBalls.length === 2) return state;

	const {angle} = action;

	const cannonBall = {
		position: {x: 0, y: 0},
		angle, 
		id: new Date(),
	};

	return {
		...state,
		gameState: {
			...state.gameState,
			cannonBalls: [...cannonBalls, cannonBall],
		}
	}
}

export default shoot;