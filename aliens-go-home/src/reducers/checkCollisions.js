import fp from 'lodash/fp';

import * as F from '../utils/formulas';
import * as C from '../utils/constants';


const foPos = (now, fo) => {
	const age = now - fo.createdAt;
	return {
		x: fo.position.x, 
		y: fo.position.y + ((age / 4000) * C.gameHeight)
	}
}

const hitbox = ({w, h}) => ({x, y}) => {
	const hw = w / 2;
	const hh = h / 2
	return {
		x1: x - hw, x2: x + hw,
		y1: y - hh, y2: y + hh,
	}
}

const cbHitbox = hitbox(C.cannonBallHitboxSize)
const foHitbox = hitbox(C.flyingObjectHitboxSize)

export default function checkCollisions(cannonBalls, flyingObjects) {
	let result = {
		cannonBallsDestroyed: [],
		flyingObjectsDestroyed: [],
	};
	const now = new Date();

	fp.forEach(fo => {
		const foBox = foHitbox(foPos(now, fo));
		fp.forEach(cb => {
			const cbBox = cbHitbox(cb.position);
			if(F.collide(foBox, cbBox)) {
				result.cannonBallsDestroyed.push(cb.id);
				result.flyingObjectsDestroyed.push(fo.id);
			}
		}, cannonBalls)
	}, flyingObjects)
	return result;
}