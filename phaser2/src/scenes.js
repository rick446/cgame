import fp from 'lodash/fp';
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
    }

    create() {
        this.scene.start('WorldScene');
    }
}


export class WorldScene extends Phaser.Scene {

    constructor() {
        super()
        Phaser.Scene.call(this, {key: 'WorldScene' })
    }

    preload() {
    }

    create = () => {
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

        this.cameras.main.setBounds(
            0, 0, map.widthInPixels, map.heightInPixels
        );
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        let anims = {
            left:  [1, 7, 1, 13],
            right: [1, 7, 1, 13],
            up:    [2, 8, 2, 14],
            down:  [0, 6, 0, 12],
        }
        fp.flow([
            fp.toPairs,
            fp.forEach(
                ([key, frames]) => {
                    this.anims.create({
                        key,
                        frames: this.anims.generateFrameNumbers('player', {frames}),
                        frameRate: 10,
                        repeat: -1,
                    })
                }
            )
        ])(anims);

        this.physics.add.collider(this.player, obstacles);
    }

    update() {
        this.player.body.setVelocity(0);

        // Movement
        if(this.cursors.left.isDown) {
            this.player.body.setVelocityX(-80);
        } else if(this.cursors.right.isDown) {
            this.player.body.setVelocityX(80);
        }

        if(this.cursors.up.isDown) {
            this.player.body.setVelocityY(-80);
        } else if(this.cursors.down.isDown) {
            this.player.body.setVelocityY(80);
        }

        // Animation
        if(this.cursors.left.isDown) {
            this.player.anims.play('left', true);
        } else if(this.cursors.right.isDown) {
            this.player.anims.play('right', true);
        } else if(this.cursors.up.isDown) {
            this.player.anims.play('up', true);
        } else if(this.cursors.down.isDown) {
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop();
        }



    }
}
