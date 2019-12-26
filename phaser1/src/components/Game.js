import React, {useMemo, useState} from 'react';
import Phaser from 'phaser';

export const GameContext = React.createContext();

window.game_props = [];

export default function Game({children, width, height, type}) {
	const [isBooted, setBooted] = useState(false);
	console.log('render game')
	const game = useMemo(() => {
		return new Phaser.Game({
			callbacks: {
				postBoot: () => setBooted(true),
			},
			width, height, type,
		});
	}, [width, height, type]);
	window.game = game;
	return (
		<GameContext.Provider value={{game, isBooted}}>
			{children}
		</GameContext.Provider>
	);
}