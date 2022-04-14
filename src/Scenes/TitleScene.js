import "phaser";
import PauseScene from "./PauseScene";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    //images
    this.add.image(128, 112, "title");
    this.position = 1;
    this.selector = this.add.image(
      74,
      148 + 16 * (this.position - 1),
      "selector"
      );
    this.preStage = this.add.image(128, 112, "stage");
    this.curtain = this.physics.add.image(128, 90, "curtain");  
      
    //sounds
    this.titlemusic = this.game.music.add("title", { loop: true, volume: 0.2 });
    this.titlemusic.play();
    this.coin = this.game.menu.add("coin");
    this.movesound = window.game.effects.add('map-travel');

    //create key controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.enter = this.input.keyboard.addKey("enter");
    this.cursors.p = this.input.keyboard.addKey("p");

    this.started = false;
  }

  update() {

    if (this.curtain) {
      if (this.curtain.y > -94) {
        this.curtain.setVelocityY(-100);
      } else {
        this.preStage.destroy();
        this.curtain.destroy();
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      if (this.position >= 2) {
        this.position = 1;
        console.log(this.position);
      } else this.position++;
      this.movesound.play();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.position <= 1) {
        this.position = 2;
      } else this.position--;
      this.movesound.play();
    }

    if(!this.started) {
      if (this.cursors.space.isDown || this.cursors.enter.isDown) {
        if (this.position == 1) {
          console.log('Spacebar pressed!');
          this.titlemusic.stop();
          this.coin.play();
          this.started = true;
          this.time.delayedCall(1500, this.startGame, null, this);
        }
      }
    }

    if (this.cursors.p.isDown) {
      this.scene.pause("Title");
      this.scene.launch("Pause");
      window.pausedscene = "Title";
    }

    this.selector.x = 74;
    this.selector.y = 148 + 16 * (this.position - 1);
  }

  startGame() {
    this.scene.start("Overworld");
  }
}
