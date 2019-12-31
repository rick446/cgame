import Phaser from 'phaser';
import fp from 'lodash/fp';
import {PlayerCharacter, Enemy} from '../units';

export class BattleScene extends Phaser.Scene {

    constructor() {
        super()
        Phaser.Scene.call(this, {key: 'BattleScene' })
    }

    preload() {
    }

    create = () => {
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

        let warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
        let mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);

        let dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
        let dragonorange = new Enemy(this, 50, 100, 'dragonorange', null, 'Dragon2', 50, 3);

        this.heroes = [warrior, mage];
        this.enemies = [dragonblue, dragonorange];

        this.units = this.heroes.concat(this.enemies);
        fp.forEach(u => this.add.existing(u), this.units);

        this.scene.launch("UIScene");

        this.index = -1;
    }

    nextTurn = () => {
        this.index = (this.index + 1) % this.units.length;

        let curUnit = this.units[this.index];

        if(curUnit) {
            if(curUnit instanceof PlayerCharacter) {
                this.events.emit('PlayerSelect', this.index);
            } else {
                var r = Math.floor(Math.random() * this.heroes.length);
                curUnit.attack(this.heroes[r])
                this.time.addEvent({
                    delay: 3000,
                    callback: this.nextTurn,
                    callbackScope: this,
                })
            }
        }
    }

    receivePlayerSelection = (action, target) => {
        if(action === 'attack') {
            this.units[this.index].attack(this.enemies[target]);
        }
        this.time.addEvent({
            delay: 3000,
            callback: this.nextTurn,
            callbackScope: this,
        })
    }

}
