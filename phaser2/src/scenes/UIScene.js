import Phaser from 'phaser';

import {Menu} from '../ui/Menu'
import {Message} from '../ui/Message'

export class UIScene extends Phaser.Scene {

    constructor() {
        super()
        Phaser.Scene.call(this, {key: 'UIScene' })
    }

    preload() {
    }

    create = () => {
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(2, 150, 90, 100);
        this.graphics.fillRect(2, 150, 90, 100);
        this.graphics.strokeRect(95, 150, 90, 100);
        this.graphics.fillRect(95, 150, 90, 100);
        this.graphics.strokeRect(188, 150, 130, 100);
        this.graphics.fillRect(188, 150, 130, 100);

        this.menus = this.add.container();

        this.heroesMenu = new HeroesMenu(195, 153, this);
        this.actionsMenu = new ActionsMenu(100, 153, this);
        this.enemiesMenu = new EnemiesMenu(8, 153, this);

        this.currentMenu = this.actionsMenu;

        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get('BattleScene');
        this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this)

        this.remapHeroes();
        this.remapEnemies();

        this.input.keyboard.on('keydown', this.onKeyInput, this);

        this.events.on('SelectEnemies', this.onSelectEnemies, this);
        this.events.on('Enemy', this.onEnemy, this);
        this.battleScene.nextTurn();
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

    }

    remapHeroes = () => {
        this.heroesMenu.remap(this.battleScene.heroes);
    }

    remapEnemies = () => {
        this.enemiesMenu.remap(this.battleScene.enemies);
    }

    onKeyInput = e => {
        if(this.currentMenu) {
            if(e.code === 'ArrowUp') {
                this.currentMenu.moveSelection(-1);
            } else if(e.code === 'ArrowDown') {
                this.currentMenu.moveSelection(+1);
            } else if(e.code === 'ArrowRight' || e.code === 'Shift') {

            } else if(e.code === 'Space' || e.code === 'ArrowLeft') {
                this.currentMenu.confirm();
            }
        }
    }

    onPlayerSelect = id => {
        this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    }

    onSelectEnemies = () => {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }

    onEnemy = (index) => {
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('attack', index);
    }
}

class HeroesMenu extends Menu {
    constructor(x, y, scene){
        super(x, y, scene)
    }
}

class ActionsMenu extends Menu {
    constructor(x, y, scene) {
        super(x, y, scene);
        this.addMenuItem('Attack');
    }
    confirm = () => {
        this.scene.events.emit('SelectEnemies');
    }
}

class EnemiesMenu extends Menu {
    constructor(x, y, scene) {
        super(x, y, scene);
    }
    confirm = () => {
        this.scene.events.emit('Enemy', this.menuItemIndex);
    }
}