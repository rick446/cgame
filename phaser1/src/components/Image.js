import {useContext, useMemo} from 'react';

import {SceneContext} from './Scene'

export default function Image({x, y, name}) {
	const scene = useContext(SceneContext);
	const image = useMemo(
		() => {
			if(!scene) return null;
			console.log('add image', x, y, name)
			let result = scene.add.image(x, y, name);
			console.log('added image', scene, result);
			return result;
		},
		[scene, x, y, name]
	);
	return null;
}