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