import "phaser";

export default class OverworldMap extends Phaser.Scene {
  constructor() {
    super("Overworld");
  }

  create() {

    let map = this.add.image(128,  98, "overworld-1");
    this.overworldmusic = this.sound.add('overworld-1', {loop: true, volume: 0.5});
    this.overworldmusic.play();
 
    this.scene.launch('HUD');
  }

  update () {
    
  }
}
 