import "phaser";

export default class OverworldMap extends Phaser.Scene {
  constructor() {
    super("Overworld");
  }

  create() {

    

    let x = (256 / 2) * window.local.gameScale
    let y =  (224 / 2.06) * window.local.gameScale

    this.add.image(x,  y, "overworld-1");
    this.overworldmusic = this.sound.add('overworld-1', {loop: true, volume: 0.5});
    this.overworldmusic.play();

    //camera
    const cam = this.cameras.main;
    cam.setViewport(0, 0, 256 * window.local.gameScale, 224  * window.local.gameScale);
    cam.zoom = window.local.gameScale;

    this.scene.launch('HUD');
  }
}
