import Phaser from "phaser";

export default class MainMenuScene extends Phaser.Scene{
    
    constructor(){
        // REFERENCE THE MAIN MENU SCENE
        super('main-menu-scene')
    }
    
    preload(){

    }

    create(){
        console.log("Loaded fonts:", this.cache.bitmapFont.getKeys()); 
        // SETUP THE CAMERA WIDTH AND HEIGHT
        const width = this.cameras.main.width
        const height = this.cameras.main.height



        // SETUP THE TITLE FOR GAME
        const titleText = this
        .add
        .bitmapText(width /2, height / 2 - 50, 'arcade', 'Meteor Swarm', 40)
        .setOrigin(0.5)
    
        // KEYBOARD MAPPING
        this.cursors = this.input.keyboard.createCursorKeys()
    
        // SETUP INSTRUCTION
        const playInstruction = this
        .add
        .bitmapText(width /2, height / 2 + 50, 'arcade', 'Press Space to Play', 20)
        .setOrigin(0.5)

       

        
    }

    update(){
        if (this.cursors.space.isDown){
            this.scene.switch('play-scene')
        }
    }
}