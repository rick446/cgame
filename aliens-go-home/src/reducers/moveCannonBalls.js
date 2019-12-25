import fp from 'lodash/fp';

import * as F from '../utils/formulas';

export default function moveCannonBalls(cannonBalls) {
	return fp.flow([
		fp.filter(cb => (
			cb.position.y > -800 
			&& cb.position.x > -500 
			&& cb.position.x < 500
		)),
		fp.map(cb => {
			const {x, y} = cb.position;
			const {angle} = cb;
			return {...cb, position: F.calculateNextPosition(x, y, angle, 5)};
		}),
	])(cannonBalls);
}