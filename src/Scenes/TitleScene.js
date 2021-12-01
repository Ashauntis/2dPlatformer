import "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    this.add.image(400, 300, "main-title");
    this.onePlayer = this.add.image(240, 398, "selector");
    this.twoPlayer = this.add.image(240, 442, "selector");
    this.twoPlayer.setVisible(false);
    this.blackTitle = this.add.image(400, 300, "black-title");
    this.curtain = this.physics.add.image(400, 230, "curtain");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.titlemusic = this.sound.add("title", { loop: true, volume: 0.2 });
    this.coin = this.sound.add("coin");
    this.titlemusic.play();
  }

  update() {
    if (this.curtain) {
      if (this.curtain.y > -315) {
        this.curtain.setVelocityY(-200);
      } else {
        this.blackTitle.destroy();
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

    if (this.cursors.space.isDown) {
      if (this.onePlayer.visible) {
        this.titlemusic.stop();
        this.coin.play();
        this.time.delayedCall(1500, this.startGame, null, this);
      }
    }
  }

  startGame() {
    this.scene.start("Overworld");
    this.scene.launch("HUD");
  }
}
