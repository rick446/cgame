export function pathFromBezierCurve({
	initialAxis, initialControlPoint, endingControlPoint, endingAxis,
}) {
	return `
		M ${initialAxis.x} ${initialAxis.y}
		c ${initialControlPoint.x} ${initialControlPoint.y}
		${endingControlPoint.x} ${endingControlPoint.y}
		${endingAxis.x} ${endingAxis.y}
	`
}


export const r2d = r => ((r * 180) / Math.PI);
export const d2r = d => ((d * Math.PI) / 180);

export function calculateAngle(x1, y1, x2, y2) {
	if(x2 >= 0 && y2 >= 0) {
		return 90;
	} else if(x2 < 0 && y2 >= 0) {
		return -90;
	}

	const rad = Math.atan(
		(x2 - x1) / 
		(y2 - y1)
	);

	return r2d(rad) * -1;
}

export function calculateNextPosition(x, y, angle, divisor=300) {
	const realAngle = (angle * -1) + 90;
	const stepsX = r2d(Math.cos(d2r(realAngle))) / divisor;
	const stepsY = r2d(Math.sin(d2r(realAngle))) / divisor;
	return {
		x: x + stepsX,
		y: y - stepsY,		
	}
}


export const collide = (ra, rb) => (
	ra.x1 < rb.x2 && ra.x2 > rb.x1 
	&& ra.y1 < rb.y2 && ra.y2 > rb.y1
);

export function getCanvasPosition(ev) {
	const svg = document.getElementById('aliens-go-home-canvas');
	const point = svg.createSVGPoint();

	point.x = ev.clientX;
	point.y = ev.clientY;

	return point.matrixTransform(svg.getScreenCTM().inverse());
}


export function randomChoice(arr) {
	const index = Math.floor(Math.random() * arr.length);
	return arr[index];
}