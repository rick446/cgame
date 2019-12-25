import React from 'react';
import {useSelector} from 'react-redux';

import {pathFromBezierCurve} from '../utils/formulas';


function CannonPipe() {
	const angle = useSelector(state => state.angle)
	
	const cannonPipeStyle = {
		fill: '#999',
		stroke: '#666',
		strokeWidth: '2px',
	};
	const transform = `rotate(${angle}, 0, 0)`;

	const muzzleWidth = 40;
	const halfMuzzle = muzzleWidth / 2;
	const height = 100;
	const yBasis = 70;

	const pathData = pathFromBezierCurve({
		initialAxis: {x: -halfMuzzle, y: -yBasis},
		initialControlPoint: {x: -40, y: height * 1.7},
		endingControlPoint: {x: 80, y: height * 1.7 },
		endingAxis: {x: muzzleWidth, y: 0},
	});

	return (
		<g transform={transform}>
			<path style={cannonPipeStyle} d={pathData}/>
			<line
				x1={-halfMuzzle} y1={-yBasis}
				x2={halfMuzzle} y2={-yBasis}
				style={cannonPipeStyle}
			/>
		</g>
	)
}


export default CannonPipe;