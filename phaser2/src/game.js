import Phaser from 'phaser';

import {BootScene, WorldScene} from './scenes';

window.game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'root',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: true,
    }
  },
  scene: [BootScene, WorldScene]
});