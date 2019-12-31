import Phaser from 'phaser';
import fp from 'lodash/fp';

import {MenuItem} from './MenuItem';


export class Menu extends Phaser.GameObjects.Container {
    constructor(x, y, scene, heroes) {
        super(scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.heroes = heroes;
        this.x = x;
        this.y = y;
    }

    addMenuItem = unit => {
        let mi = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(mi);
        this.add(mi);
    }

    moveSelection = delta => {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = (this.menuItemIndex + delta) % this.menuItems.length;
        this.menuItems[this.menuItemIndex].select();
    }

    select = (index=0) => {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    }

    deselect = () => {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    }

    confirm = () => {
        console.log('confirm!');
    }

    clear = () => {
        fp.forEach(mi => mi.destroy(), this.menuItems);
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }

    remap = units => {
        this.clear();
        fp.forEach(u => this.addMenuItem(u.type), units);
    }

}