import "phaser";

export default class OverworldMap extends Phaser.Scene {

  constructor() {
    super("Overworld");
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.add.image(400, 300, 'logo');
  }

}
