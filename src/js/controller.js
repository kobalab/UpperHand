/*
 *  Controller
 */

"use strict";

const $ = require('jquery');
const Board = require('./board');

module.exports = class Controller {

    constructor(root, game, r) {
        this._game  = game;
        this._board = new Board(root, game, r);
    }

    start(...players) {

        this._selectMove = [];

        for (let player of [ 1, 2 ]) {
            this._selectMove[player] = ()=>{
                for (let p = 0; p < this._game.length; p++) {
                    if (this._game.status(p) == -1) {
                        this._board.status[p].on('click', ()=>{
                            this._board.status.forEach(s => s.off('click'));
                            this.move(p);
                            this.next();
                        });
                    }
                }
            };
        }

        this._moved = true;
        this.next();
    }

    next() {
        if (this._timeoutID) this._timeoutID = clearTimeout(this._timeoutID);
        if (! this._moved) return;

        this._board.redraw();
        if (! this._game.next) return;

        this._moved = false;
        this._selectMove[this._game.next]();
        this._timeoutID = setTimeout(()=> this.next(), 1000);
    }

    move(p) {
        this._moved = true;
        this._game.makeMove(p);
        if (! this._timeoutID)
            this._timeoutID = setTimeout(()=> this.next(), 0);
    }
}
