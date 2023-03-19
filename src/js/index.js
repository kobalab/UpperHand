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

    turn  = + turn  || 1;
    level = level == '0' ? 0 : + level || 2;

    if (turn == 3) {
        $('select[name="turn"] option:not([value="3"])').hide();
    }
    else {
        $('select[name="turn"] option[value="3"]').hide();
    }

    function start() {

        $('#pref').hide();
        $('#rule').hide();

        size  = + $('select[name="size"]').val();
        level = + $('select[name="level"]').val();
        turn  = + $('select[name="turn"]').val();

        let r = Math.min((($('body').width() - 40) / size / 2)|0, 24);

        const game = new Game(size);
        const ctrl = new Controller($('#board'), game, r, start);
        if      (level == 0) ctrl.start(null, null);
        else if (turn  == 1) ctrl.start(null, new Player(game, level - 1));
        else if (turn  == 2) ctrl.start(new Player(game, level - 1), null);
        else                 ctrl.start(new Player(game, level - 1),
                                        new Player(game, level - 1));

        $('#board').fadeIn();

        return false;
    }

    function reset() {
        $('#pref').hide();
        $('#rule').hide();
        $('#board').show();

        $('select[name="size"]').val(size);
        $('select[name="level"]').val(level);
        $('select[name="turn"]').val(turn);
        return false;
    }

    $('a[href="#pref"]').on('click', ()=>{
        $('#board').hide();
        $('#rule').hide();
        $('#pref').slideDown();
        return false;
    });
    $('a[href="#rule"]').on('click', ()=>{
        $('#board').hide();
        $('#pref').hide();
        $('#rule').slideDown();
        return false;
    });

    $('form').on('submit', start);
    $('form').on('reset',  reset);

    reset();
    start();
});
