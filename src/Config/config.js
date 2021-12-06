import "phaser";
import local from "./local";

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 256,
    height: 224,
  },
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
  callbacks: {
    preBoot: function (game) {
      game.music = Phaser.Sound.SoundManagerCreator.create(game);
      game.effects = Phaser.Sound.SoundManagerCreator.create(game);
      game.menu = Phaser.Sound.SoundManagerCreator.create(game);
    },
  },
};
