import "phaser";
import PauseScene from "./PauseScene";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    this.add.image(128, 112, "title");
    this.onePlayer = this.add.image(74, 148, "selector");
    this.twoPlayer = this.add.image(74, 164, "selector");
    this.twoPlayer.setVisible(false);
    this.preStage = this.add.image(128, 112, "stage");
    this.curtain = this.physics.add.image(128, 90, "curtain");
    this.titlemusic = this.sound.add("title", { loop: true, volume: 0.2 });
    this.coin = this.sound.add("coin");
    this.titlemusic.play();

    //create key controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.enter = this.input.keyboard.addKey('enter');
    this.cursors.p = this.input.keyboard.addKey('p');
    this.input.keyboard.addCapture('p');

    //fullscreen 

    var FKey = this.input.keyboard.addKey('F');

    FKey.on('down', function () {

        if (this.scale.isFullscreen)
        {
            this.scale.stopFullscreen();
        }
        else
        {
            this.scale.startFullscreen();
        }

    }, this);
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

    if (this.cursors.down.isDown) {
      this.onePlayer.setVisible(false);
      this.twoPlayer.setVisible(true);
    }

    if (this.cursors.up.isDown) {
      this.onePlayer.setVisible(true);
      this.twoPlayer.setVisible(false);
    }

    if (this.cursors.space.isDown || this.cursors.enter.isDown) {
      if (this.onePlayer.visible) {
        this.titlemusic.stop();
        this.coin.play();
        this.time.delayedCall(1500, this.startGame, null, this);
      }
    }

    if (this.cursors.p.isDown){
      this.scene.pause('Title');
      this.scene.launch('Pause');
      window.pausedscene = 'Title';
    }
  }

  startGame() {
    this.scene.start("Overworld");
    this.scene.launch("HUD");
  }
}
