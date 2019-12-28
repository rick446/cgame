import React from 'react';
import Phaser from 'phaser';

import {BootScene, WorldScene} from './scenes';


export default function App() {

  React.useEffect(() => {
    let game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'content',
      width: 320,
      height: 240,
      zoom: 2,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0},
        }
      },
      scene: [BootScene, WorldScene]
    });

  })
  return <React.Fragment/>
}
