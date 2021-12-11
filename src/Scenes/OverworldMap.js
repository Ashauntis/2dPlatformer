import "phaser";
import MapPoint from "../Classes/MapPoint";

export default class OverworldMap extends Phaser.Scene {
  constructor() {
    super("Overworld");

    this.locations = [];

    this.current_location = 'start';
    this.current_point = null;
    this.move_start = 0;
    this.move_time = 400;
    this.moving = false;
    this.locations.push(new MapPoint('start', 40,   58, null, '1,1', null, null));
    this.locations.push(new MapPoint('1,0',   72,   26, null, '2,0', '1,1', null));
    this.locations.push(new MapPoint('2,0',   104,  26, null, '3,0', null, '1,0'));
    this.locations.push(new MapPoint('3,0',   136,  26, null, '4,0', '3,1', '2,0'));
    this.locations.push(new MapPoint('4,0',   168,  26, null, '5,0', null, '3,0'));
    this.locations.push(new MapPoint('5,0',   200,  26, null, null, '5,1', '4,0'));
    this.locations.push(new MapPoint('1,1',   72,   58, '1,0', null, null, 'start'));
    this.locations.push(new MapPoint('3,1',   136,  58, '3,0', '4,1', '3,2', null));
    this.locations.push(new MapPoint('4,1',   168,  58, null, '5,1', null, '3,1'));
    this.locations.push(new MapPoint('5,1',   200,  58, '5,0', null, null, '4,1'));
    this.locations.push(new MapPoint('1,2',   72,   90, null, '2,2', '1,3', null));
    this.locations.push(new MapPoint('2,2',   104,  90, null, '3,2', null, '1,2'));
    this.locations.push(new MapPoint('3,2',   136,  90, '3,1', null, null, '2,2'));
    this.locations.push(new MapPoint('1,3',   72,   122, '1,2', null, '1,4', null));
    this.locations.push(new MapPoint('2,3',   104,  122, null, '3,3', null, null));
    this.locations.push(new MapPoint('3,3',   136,  122, null, '4,3', '3,4', '2,3'));
    this.locations.push(new MapPoint('4,3',   168,  122, null, '5,3', null, '3,3'));
    this.locations.push(new MapPoint('5,3',   200,  122, null, null, null, '4,3'));
    this.locations.push(new MapPoint('1,4',   72,   154, '1,3', '2,4', null, null));
    this.locations.push(new MapPoint('2,4',   104,  154, null, '3,4', null, '1,4'));
    this.locations.push(new MapPoint('3,4',   136,  154, '3,3', null, null, '2,4'));
  }

  create() {
    //map audio
    this.overworldmusic = this.game.music.add('overworld-1', {loop: true, volume: 0.5});
    this.overworldmusic.play();
    this.movesound = window.game.effects.add('map-travel'); 

    //keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.p = this.input.keyboard.addKey("p");
    this.cursors.right = this.input.keyboard.addKey("right");
    this.cursors.left = this.input.keyboard.addKey("left");
    this.cursors.up = this.input.keyboard.addKey("up");
    this.cursors.down = this.input.keyboard.addKey("down");

    this.map = this.add.image(128,  98, "overworld-1");
  
    
    this.mario = this.physics.add.sprite(40, 58, 'charspritesheet');
    // disable physics gravity
    this.physics.world.gravity.y = 0;

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

    this.mario.anims.play('mario-overworld-walk');
  }

  update (time, delta) {

    // initialize the current point to the start point.
    if (this.current_point === null) {
      this.locations.forEach(location => {
        if (location.name === this.current_location) {
          this.current_point = location;
        }
      });
    }


    // handle the pause key
    if (this.cursors.p.isDown) {
      this.scene.pause("Overworld");
      this.scene.launch("Pause");
      window.pausedscene = "Overworld";
    }

    // handle the movement inputs of the player
    if(this.move_start === 0) {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
        if(this.current_point.e !== null && this.moving == false) {
          this.current_location = this.current_point.e;
          this.movesound.play();
        }
      }
  
      if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
        if(this.current_point.w !== null && this.moving == false) {
          this.current_location = this.current_point.w;
          this.movesound.play();
        }
      }
  
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        if(this.current_point.n !== null && this.moving == false) {
          this.current_location = this.current_point.n;
          this.movesound.play();
        }
      }
  
      if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        if(this.current_point.s !== null && this.moving == false) {
          this.current_location = this.current_point.s;
          this.movesound.play();
        }
      }

      // handle moving the player sprite
      if(this.current_location !== this.current_point.name) {
        this.locations.forEach(location => {
          if (location.name === this.current_location) {
            this.current_point = location;
          }
        });
        this.physics.moveTo(this.mario, this.current_point.x, this.current_point.y, null, 500);
        this.moving = true;
        this.time.delayedCall(500, this.stop, null, this);
      }
    } 
    console.log(this.current_location, this.mario.x, this.mario.y);
  }

  stop (){
    this.mario.x = this.current_point.x;
    this.mario.y = this.current_point.y;
    this.moving = false;
    this.mario.setVelocity(0, 0);
  }
}