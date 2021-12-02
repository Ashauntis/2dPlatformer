import 'phaser';
import local from  "./Config/local";                    // our local settings
import config from './Config/config';                   // main phaser config
import OverworldMap from './Scenes/OverworldMap';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import HUDscene from './Scenes/HUDscene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Overworld', OverworldMap);
    this.scene.add('HUD', HUDscene);
    this.scene.start('Boot');
  }
}

//Globals
window.multiplayer = false;
window.p1LifeCount = 4;
window.p2LifeCount = 4;
window.frameCounter = 0;

// reference our local settings in the global window object
window.local = local;
window.game = new Game();
