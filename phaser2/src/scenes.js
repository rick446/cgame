import Phaser from 'phaser';

export const BootScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function BootScene() {
        Phaser.Scene.call(this, {key: 'BootScene' })
    },

    preload: function() {
        this.load.image('tiles', 'assets/map/spritesheet.png');
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        this.load.spritesheet('player', 'assets/RPG_assets.png', {
            frameWidth: 16, frameHeight: 16,
        });
    },

    create: function() {
        this.scene.start('WorldScene');
    },
});


export const WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function WorldScene() {
        Phaser.Scene.call(this, {key: 'WorldScene' })
    },

    preload: function() {
    },

    create: function() {
        let map = this.make.tilemap({key: 'map'});

        let tiles = map.addTilesetImage('spritesheet', 'tiles');

        let grass = map.createStaticLayer('Grass', tiles, 0, 0);
        let obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);

        this.player = this.physics.add.sprite(50, 100, 'player', 6);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;

        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    },
});

