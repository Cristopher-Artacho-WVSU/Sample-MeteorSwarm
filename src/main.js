import Phaser, { Scene } from "phaser";
import LoaderScene from "../scenes/LoaderScene";
import MainMenuScene from "../scenes/MainMenuScene";
import PlayScene from "../scenes/PlayScene";
import GameOverScene from "../scenes/GameOverScene";


// INITIALIZATE AND START GAME ENGINE
const config = {
  type: Phaser.AUTO,
  width:800,
  height:600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y:0
      },
      // DEBUGGING PURPOSES. RESPONSIBLE FOR THE RECTANGLES AROUND OBJECTS
      debug: false
    }
  },
  backgroundColor:'#6495ed',
  // ADDS SCENES
  scene:[
    LoaderScene,
    MainMenuScene,
    PlayScene,
    GameOverScene
  ]
}

const game = new Phaser.Game(config)