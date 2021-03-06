import 'phaser';
import local from  "./Config/local";                    // our local settings
import config from './Config/config';                   // main phaser config
import OverworldMap from './Scenes/OverworldMap';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import PauseScene from './Scenes/PauseScene';
import CreditsScene from './Scenes/CreditsScene';
import HUDscene from './Scenes/HUDscene';
import W1L1 from './Scenes/W1L1';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Overworld', OverworldMap);
    this.scene.add('HUD', HUDscene);
    this.scene.add('W1L1', W1L1);
    this.scene.add('Pause', PauseScene);
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
