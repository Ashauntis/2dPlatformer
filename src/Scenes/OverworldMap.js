import "phaser";

export default class OverworldMap extends Phaser.Scene {
  constructor() {
    super("Overworld");
  }

  create() {
    //keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.p = this.input.keyboard.addKey("p");

    let map = this.add.image(128,  98, "overworld-1");
    this.overworldmusic = this.game.music.add('overworld-1', {loop: true, volume: 0.5});
    this.overworldmusic.play();

    //mario
    this.mario = this.add.sprite(40, 58, 'charspritesheet');

    this.anims.create({
      key: 'mario-overworld-walk',
      frames: this.anims.generateFrameNumbers('charspritesheet', {
          start: 0,
          end: 1
      }),
      frameRate: 5,
      repeat: -1
  });
       
    //launch HUD
    this.scene.launch('HUD');
  }

  update () {

    this.mario.anims.play('mario-overworld-walk');

    if (this.cursors.p.isDown) {
      this.scene.pause("Overworld");
      this.scene.launch("Pause");
      window.pausedscene = "Overworld";
    }
    
  }
}
 