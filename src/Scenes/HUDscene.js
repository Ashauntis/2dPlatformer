import 'phaser';

export default class HUDscene extends Phaser.Scene {
  constructor () {
    super('HUD');
  }

  config = {
    height: 100
  }

  create () {
      this.add.image(0, 0, 'main-hud')
  }
};0
