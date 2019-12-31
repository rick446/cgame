import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super()
        Phaser.Scene.call(this, {key: 'BootScene' })
    }

    preload() {
        this.load.image('tiles', 'assets/map/spritesheet.png');
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        this.load.spritesheet('player', 'assets/RPG_assets.png', {
            frameWidth: 16, frameHeight: 16,
        });
        this.load.image('dragonblue', 'assets/dragonblue.png');
        this.load.image('dragonorange', 'assets/dragonorange.png');
    }

    create() {
        // this.scene.start('WorldScene');
        this.scene.start('BattleScene');
    }
}