import "phaser";

export default class OverworldMap extends Phaser.Scene {
  constructor() {
    super("Overworld");
  }

  create() {

    this.warp_speed = -0.02;

    let x = 128       // * window.local.gameScale
    let y = 112 - 14  // * window.local.gameScale

    let map = this.add.image(x,  y, "overworld-1");
    this.overworldmusic = this.sound.add('overworld-1', {loop: true, volume: 0.5});
    this.overworldmusic.play();

    this.cameras.main.setVisible(false);

    this.cameras.overworld = this.cameras.fromJSON({
        name: 'overCam',
        x:0, 
        y:0, 
        width: 256 * window.local.gameScale, 
        height: 224 * window.local.gameScale,
        scrollX:  -128 * (window.local.gameScale - 1),
        scrollY: -112 * (window.local.gameScale - 1),
        zoom: window.local.gameScale
    })
 
    this.scene.launch('HUD');
  }

  update () {
    
  }
}
 