/*!
 *  UpperHand Game v0.0.1
 *
 *  Copyright(C) 2023 Satoshi Kobayashi
 *  Released under the MIT license
 *  https://github.com/kobalab/UpperHand/blob/master/LICENSE
 */

const $ = require('jquery');
const Game  = require('./game');
const Board = require('./board');

$(function(){

    function set_handlar(board) {
        board._status.forEach(s=> s.off('click'));
        if (! board._game.next) return;
        for (let p = 0; p < board._status.length; p++) {
            if (board._game.status(p) == -1) {
                board._status[p].on('click', ()=>{
                    board._game.makeMove(p);
                    board.redraw();
                    set_handlar(board);
                });
            }
        }
    }

    const game  = new Game();
    const board = new Board($('#board'), game, 24);
    board.redraw();
    set_handlar(board);
});
