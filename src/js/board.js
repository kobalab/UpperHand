/*
 *  Board
 */
"use strict";

const $ = require('jquery');

module.exports = class Board {

    constructor(root, game, r) {
        this._board = $('.board', root);
        this._game  = game;
        this._r     = r;

        let size = game.size;
        this._board.css('width',  `${r * 2 * size}px`)
                   .css('height', `${r * 2 * size}px`);
        for (let i = 0; i < size * size; i++) {
            const panel = $('<span>')
                            .addClass('panel')
                            .css('width',  `${r * 2}px`)
                            .css('height', `${r * 2}px`);
            this._board.append(panel);
        }

        this._status = [];
        for (let z = size; z > 0; z--) {
            const base = (size - z) * r;
            for (let y = 0; y < z; y++) {
                for (let x = 0; x < z; x++) {
                    const ball = $('<span>')
                                    .addClass('ball')
                                    .css('left', `${base + r * 2 * x}px`)
                                    .css('top',  `${base + r * 2 * y}px`)
                                    .css('width',  `${r * 2}px`)
                                    .css('height', `${r * 2}px`)
                                    .attr('data-status', -1);
                    this._board.append(ball);
                    this._status.push(ball);
                }
            }
        }
    }

    redraw() {
        for (let p = 0; p < this._game._status.length; p++) {
            this._status[p].attr('data-status', this._game.status(p) ?? '');
        }
        console.log(this._game.ball(1), this._game.ball(2));
    }
}
