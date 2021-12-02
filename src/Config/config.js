import "phaser";
import local from  "./local"

export default {
    type: Phaser.AUTO,
    parent: "phaser-example",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 256 * local.gameScale,
    height: 224 * local.gameScale,
    pixelArt: true,
    antialias: false,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 1000,
            },
            debug: false,
        },
    },
};
