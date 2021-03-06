import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('loading', 'assets/loading.jpg');
  }

  create () {
    this.scene.start('Preloader');
  }
};
