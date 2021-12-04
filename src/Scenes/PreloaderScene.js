import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    // add logo image
    this.add.image(400, 150, 'logo');

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // images
    this.load.image('paused', 'assets/hud/pause-menu.png');
    this.load.image('stage', 'assets/menu/stage2.png');
    this.load.image('curtain', 'assets/menu/curtain.png');
    this.load.image('title', 'assets/menu/title.png');
    this.load.image('selector', 'assets/menu/selector.png');
    this.load.image('main-hud', 'assets/hud/main-hud.png');
    this.load.image('overworld-1', 'assets/maps/overworld1.png')    
    this.load.image('card-cells', 'assets/hud/card-cells.png');
    this.load.image('m-ind', 'assets/hud/m-ind.png')
 
   // sounds
    this.load.audio('title', 'assets/sounds/title.mp3');
    this.load.audio('overworld-1', 'assets/sounds/overworld-1.ogg');
    this.load.audio('coin', 'assets/sounds/coin.ogg');
  }

  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};
