import "phaser";

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super("Pause");
  }

  create() {
    this.add.image(128, 112, "paused");
    this.position = 1;
    this.toggleSelector = this.add.image(
      88,
      112 + 13 * (this.position - 1),
      "selector"
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.enter = this.input.keyboard.addKey("enter");
    this.cursors.p = this.input.keyboard.addKey("p");
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      if (this.position >= 3) {
        this.position = 1;
      } else this.position++;
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.position <= 1) {
        this.position = 3;
      } else this.position--;
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) || Phaser.Input.Keyboard.JustDown(this.cursors.enter)) {
      if ((this.position = 1)) {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        } else {
          this.scale.startFullscreen();
        }
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.enter)) {
      alert("You pressed Enter!");
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.p)) {
      this.scene.sleep("Pause");
      this.scene.resume(window.pausedscene);
      console.log(window.pausedscene);
    }

    // redraw based on current selection
    this.toggleSelector.x = 88;
    this.toggleSelector.y = 112 + 13 * (this.position - 1);
  }
}
