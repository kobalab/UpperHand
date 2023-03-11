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

function getValue(game) {
    if (! game.next) {
        return game.length / 2 - game.ball(1) + game.ball(2);
    }
    else {
        let ev = [], rv = 0;
        for (let p = 0; p < game.length; p++) {
            if      (game.status(p) == -1) ev[p] = 0.5;
            else if (game.status(p) ==  0) ev[p] = 0.5;
            else if (game.status(p) ==  1) ev[p] = 1.0;
            else if (game.status(p) ==  2) ev[p] = 0.0;
            else {
                let [ e1, e2, e3, e4 ] = game.child(p).map(q => ev[q]);
                ev[p] = e1 * e2 * e3 * e4
                      + (1 - e1) * e2 * e3 * e4
                      + e1 * (1 - e2) * e3 * e4
                      + e1 * e2 * (1 - e3) * e4
                      + e1 * e2 * e3 * (1 - e4)
                      + (1 - e1) * (1 - e2) * e3 * e4 * 0.5
                      + (1 - e1) * e2 * (1 - e3) * e4 * 0.5
                      + (1 - e1) * e2 * e3 * (1 - e4) * 0.5
                      + e1 * (1 - e2) * (1 - e3) * e4 * 0.5
                      + e1 * (1 - e2) * e3 * (1 - e4) * 0.5
                      + e1 * e2 * (1 - e3) * (1 - e4) * 0.5;
            }
            rv += ev[p];
        }
        return rv;
    }
}

module.exports = class Player {

    constructor(game) {
        this._game = game;
        this._posision = makePriorityOfPosition(game);
    }

    selectMove() {
        let rv, max = 0;
        for (let p of this._posision) {
            if (this._game.status(p) != -1) continue;
            let ev = this._game.next == 1
                        ? getValue(this._game.clone().makeMove(p))
                        : this._game.length
                            - getValue(this._game.clone().makeMove(p));
            if (ev > max) {
                max = ev;
                rv  = p;
            }
        }
        return rv;
    }
}