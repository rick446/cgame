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