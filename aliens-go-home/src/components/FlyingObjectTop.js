import React from 'react';
import PropTypes from 'prop-types';
import {pathFromBezierCurve} from '../utils/formulas';


function FlyingObjectTop({position}) {
	const style = {
		fill: '#b6b6b6',
		stroke: '#7d7d7d',
	};

	const baseWidth = 40;
	const halfBase = baseWidth / 2;
	const height = 25;

	const pathData = pathFromBezierCurve({
		initialAxis: {x: position.x - halfBase, y: position.y},
		initialControlPoint: {x: 10, y: -height},
		endingControlPoint: {x: 30, y: -height},
		endingAxis: {x: baseWidth, y: 0},
	});

	return <path style={style} d={pathData}/>;	
}


FlyingObjectTop.propTypes = {
	position: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}).isRequired,
};


export default FlyingObjectTop;