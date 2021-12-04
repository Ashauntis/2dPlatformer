import "phaser";

export default class HUDscene extends Phaser.Scene {
  constructor() {
    super("HUD");
  }

  create() {
    this.add.image(90,  198, "main-hud");
    this.add.image(206, 198, 'card-cells');
    this.add.image(26, 202, 'm-ind');

    //cameras
    // this.cameras.main.setVisible(false);

    // this.cameras.hudCam = this.cameras.fromJSON({
    //   name: 'hudCam',
    //   x:0, 
    //   y:0, 
    //   width: 256 * window.local.gameScale, 
    //   height: 224 * window.local.gameScale,
    //   scrollX:  -128 * (window.local.gameScale - 1),
    //   scrollY: -112 * (window.local.gameScale - 1),
    //   zoom: window.local.gameScale
  // })
  }
}
