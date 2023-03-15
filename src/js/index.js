/*!
 *  UpperHand Game v0.1.0
 *
 *  Copyright(C) 2023 Satoshi Kobayashi
 *  Released under the MIT license
 *  https://github.com/kobalab/UpperHand/blob/master/LICENSE
 */

const $ = require('jquery');
const Game       = require('./game');
const Player     = require('./player');
const Controller = require('./controller');

$(function(){

    let [ size, level, turn ] = location.hash.replace(/^#/,'').split('/');

    size = + size || 5;
    size = size < 3  ?  3
         : size > 11 ? 11
         :             size;

    turn = + turn || 1;

    if (level == '0') turn = 0;

    level = (level || 2) - 1;

    let r = Math.min((($('body').width() - 40) / size / 2)|0, 24);

    function start() {
        const game = new Game(size);
        const ctrl = new Controller($('#board'), game, r, start);
        if      (turn == 1) ctrl.start(null, new Player(game, level));
        else if (turn == 2) ctrl.start(new Player(game, level), null);
        else if (turn == 3) ctrl.start(new Player(game, level),
                                       new Player(game, level));
        else                ctrl.start(null, null);
    }

    start();
});
