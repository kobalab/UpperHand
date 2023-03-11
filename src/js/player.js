/*
 *  Player
 */

"use strict";

function getWeight(game) {
    let weight = [];
    for (let p = 0; p < game.length; p++) {
        let pos = [], w = 0;
        pos[p] = true;
        for (let q = game.size * game.size ; q < game.length; q++) {
            for (let c of game.child(q)) {
                if (pos[c]) {
                    pos[q] = true;
                    w++;
                    break;
                }
            }
        }
        weight[p] = w;
    }
    return weight;
}

function makePriorityOfPosition(game) {
    const weight = getWeight(game);
    let position = [];
    for (let p = 0; p < game.length; p++) position[p] = p;
    for (let i = position.length; i > 0; i--) {
        let j = (Math.random() * i)|0;
        [ position[i-1], position[j] ] = [ position[j], position[i-1] ];
    }
    return position.sort((a, b)=> weight[b] - weight[a]);
}

module.exports = class Player {

    constructor(game) {
        this._game = game;
        this._posision = makePriorityOfPosition(game);
    }

    selectMove() {
        for (let p of this._posision) {
            if (this._game.status(p) == -1) return p;
        }
    }
}
