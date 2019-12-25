import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getCanvasPosition} from './utils/formulas';
import Canvas from './components/Canvas';
import {moveObjects} from './actions/index';

let transientState = {
	canvasMousePosition: {x: 0, y: 0},
}


const trackMouse = e => {
	transientState.canvasMousePosition = getCanvasPosition(e)
}


const fixSizing = () => {
	const cnv = document.getElementById('aliens-go-home-canvas');
	cnv.style.width = `${window.innerWidth}px`;
	cnv.style.height = `${window.innerHeight}px`;
}


function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const interval = setInterval(
			() => dispatch(moveObjects(transientState.canvasMousePosition)),
			10
		);
		window.onresize = fixSizing;
		fixSizing();
		return () => clearInterval(interval);
	});


	return <Canvas trackMouse={trackMouse}/>;
}


export default App;
