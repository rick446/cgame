import React from 'react';
import {useDispatch} from 'react-redux';

import {startGame} from '../actions';
import {gameWidth} from '../utils/constants';


function StartGame() {
	const dispatch = useDispatch();

	const button = {
		x: gameWidth / -2, y: -280,
		width: gameWidth, height: 200,
		rx: 10, ry: 10,
		style: {fill: 'transparent', cursor: 'pointer'},
		onClick: () => dispatch(startGame()),
	};
	const text = {
		textAnchor: 'middle',
		x: 0, y: -150,
		style: {
			fontFamily: '"Joti One", cursive',
			fontSize: 60,
			fill: '#e3e3e3',
			cursor: 'pointer',
		},
		onClick: () => dispatch(startGame()),
	};
	return (
		<g filter="url(#shadow)">
			<rect {...button}/>
			<text {...text}>Tap To Start!</text>
		</g>
	);
}


export default StartGame;