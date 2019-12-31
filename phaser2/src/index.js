import Phaser from "phaser";

import {BootScene, BattleScene, UIScene, WorldScene} from './scenes';

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
  scene: [BootScene, BattleScene, UIScene, WorldScene],
  antialias: false,
};

const game = new Phaser.Game(config);
