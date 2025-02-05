import Phaser from "phaser";


export default class LoaderScene extends Phaser.Scene{
    constructor(){
        // REFERENCE THIS TAG NAME TO SWITCH SCENES
        super('loader-scene')
    }

    // LOADS ALL ASSETS THAT WILL BE USED IN THE GAME
    preload(){
        // PNGs
        this.load.image('player', './assets/PNG/playerShip2_blue.png')
        this.load.image('laser', './assets/PNG/Lasers/laserBlue01.png')
        this.load.image('meteor-sm', './assets/PNG/Meteors/meteorGrey_small1.png')
        this.load.image('meteor-md', './assets/PNG/Meteors/meteorGrey_med1.png')
        this.load.image('meteor-lg', './assets/PNG/Meteors/meteorGrey_big4.png')

        // SFX
        this.load.audio('laser-sfx', './assets/Bonus/sfx_laser1.ogg')
        this.load.audio('explosion-sfx', './assets/Bonus/sfx_zap.ogg')
    
        //FONTS
        this.load.bitmapFont(
            "arcade",
            "./assets/fonts/arcade.png",
            "./assets/fonts/arcade.xml"
        )
    
    }
    create(){
        this.scene.switch('main-menu-scene')
        console.log(this.cache.bitmapFont.get("arcade"));
    }
}