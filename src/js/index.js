/*!
 *  UpperHand Game v0.0.1
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

    let size = + location.hash.replace(/^#/,'') || 5;
    size = size < 3  ?  3
         : size > 11 ? 11
         :             size;
    let r = Math.min((($('body').width() - 40) / size / 2)|0, 24);

    level = 3;

    function start(first) {
        const game = new Game(size);
        const ctrl = new Controller($('#board'), game, r, ()=>start(! first));
        if (first) ctrl.start(null, new Player(game, level));
        else       ctrl.start(new Player(game, level), null);
    }

    start(1);
});
