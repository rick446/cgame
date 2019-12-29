import Phaser from "phaser";

import {BootScene, WorldScene} from './scenes';

const config = {
  // type: Phaser.AUTO,
  type: Phaser.WEBGL,
  parent: 'content',
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
  scene: [BootScene, WorldScene],
  antialias: false,
};

const game = new Phaser.Game(config);
