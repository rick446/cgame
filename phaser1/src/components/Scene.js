import React, {useContext, useMemo} from 'react';

import {GameContext} from './Game'

export const SceneContext = React.createContext({scene: null});

export default function Scene({
	key='default', preload, create, update, children,
}) {
	const {game, isBooted} = useContext(GameContext);

	const scene = useMemo(() => {
		console.log('Running scene memo', game, isBooted, game.scene.booted)
		if(!isBooted) {
			let config = {preload, create, update};
			game.scene.add(key, config, true);
			return null;
		} else {
			return game.scene.getScene(key);
		}
	}, [isBooted, create, game, key, preload, update])
	window.scene = scene;
	

	return <SceneContext.Provider value={scene}>{children}</SceneContext.Provider>
}