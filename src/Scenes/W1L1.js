import "phaser";
import PauseScene from "./PauseScene";

export default class W1L1 extends Phaser.Scene {
  constructor() {
    super("W1L1");
  }

  preload() {
    this.load.image("level1tileset", "assets/maps/w1l1/1-1.png");
    this.load.tilemapTiledJSON("level1JSON", "assets/maps/w1l1/1-1.json");
  }

  create() {
    //map information
    const map = this.make.tilemap({ key: "level1JSON" });
    const tileset = map.addTilesetImage("1-1", "level1tileset");

    var oob = map.createLayer("OutOfBounds", tileset);
    var background = map.createLayer("Background", tileset);
    var ground = map.createLayer("Ground", tileset);
    var bushes = map.createLayer("Bushes", tileset);
    var tubes = map.createLayer("Tubes", tileset);
    var shadows = map.createLayer("Shadows", tileset);
    var boxes = map.createLayer("Boxes", tileset);

    ground.setCollisionByExclusion([-1]);
    tubes.setCollisionByExclusion([-1]);
    oob.setCollisionByExclusion([-1]);

    this.physics.world.setBounds(0, 0, 176 * 16, 27 * 16);

    //winbox
    this.winBox = [
      this.add.image(2696, 344, "mushroom-box"),
      this.add.image(2696, 344, "flower-box"),
      this.add.image(2696, 344, "star-box"),
    ];

    //sounds
    this.jump = this.game.effects.add("jump");
    this.loseLife = this.game.effects.add('lose-life');
    this.music = this.game.music.add('world1leveltheme', {volume: 0.25});
    this.music.addMarker({name: 'intro', start: 0, duration: 3.3})
    this.music.addMarker({name: 'loopstart', start: 3.2, duration: 76.8})
    this.music.play('intro', {volume: 0.25});
    this.time.delayedCall(3200, this.playLoop, null, this);
    // this.music.on('complete', this.playLoop, this);

    //define mario
    this.mario = this.physics.add.sprite(50, 400, "smallmario", 2);
    this.mario.setCollideWorldBounds(true);
    this.physics.add.collider(this.mario, ground);
    this.physics.add.collider(this.mario, tubes);

    //keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.p = this.input.keyboard.addKey("p");

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("smallmario", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [
        {
          key: "smallmario",
          frame: 2,
        },
      ],
      frameRate: 60,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("smallmario", {
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump-right",
      frames: [
        {
          key: "smallmario",
          frame: 6,
        },
      ],
      frameRate: 60,
      repeat: -1,
    });

    //cameras
    this.cam = this.cameras.main;
    this.cam.setBounds(0, 0, 176 * 16, 27 * 16);
    this.cam.startFollow(this.mario, true, 0.075, 0.075);
  }

  update() {
    window.frameCounter++;

    //winbox math
    this.winBox[0].setVisible(false);
    this.winBox[1].setVisible(false);
    this.winBox[2].setVisible(false);

    let idx = Math.floor(window.frameCounter / 8) % 3;
    this.winBox[idx].setVisible(true);

    //pause key
    if (this.cursors.p.isDown) {
      this.scene.pause("W1L1");
      this.scene.launch("Pause");
      window.pausedscene = "W1L1";
    }

    //mario movement
    if (this.cursors.left.isDown) {
      this.mario.setVelocityX(-160);
      this.mario.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.mario.setVelocityX(160);
      this.mario.anims.play("right", true);
    } else {
      this.mario.setVelocityX(0);

      this.mario.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.mario.body.onFloor()) {
      this.jump.play();
      this.mario.setVelocityY(-350);
      this.mario.anims.play("jump-right", true);
    }
  }

  outOfBounds(player) {
    this.physics.pause();
    this.backgroundMusic.stop();
    player.setTint(0xff0000);
    this.loseLife.play();
    if (lifeCount <= 0) gameOver = true;
    else lifeCount--;
}
  playLoop(){
    this.music.play('loopstart', {loop: true, volume: 0.25});
  }
}
