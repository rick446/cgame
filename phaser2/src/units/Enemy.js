import Phaser from 'phaser';
import {Unit} from './Unit';

export class Enemy extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame, type, hp, damage)
    }
};