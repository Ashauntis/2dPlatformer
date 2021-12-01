import "phaser";

export default class HUDscene extends Phaser.Scene {
  constructor() {
    super("HUD");
  }

  create() {
    this.add.image(236 / 2 * window.local.gameScale, 268 / 2 * window.local.gameScale, "main-hud");

    //camera
    const cam = this.cameras.main;
    cam.setViewport(0, 0, 256 * window.local.gameScale, 224  * window.local.gameScale);
    cam.zoom = window.local.gameScale;
  }
}

