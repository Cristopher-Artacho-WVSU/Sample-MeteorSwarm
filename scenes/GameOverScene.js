import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene{

    constructor(){
        super('game-over-scene')
    }
    preload(){

    }

    create(){
        const width = this.cameras.main.width
        const height = this.cameras.main.height

        const gameOverText = this
        .add
        .bitmapText(width /2, height / 2 - 50, 'arcade', 'GAME OVER', 40)
        .setOrigin(0.5)
        
        // KEYBOARD MAPPING
        this.cursors = this.input.keyboard.createCursorKeys()

        // SETUP INSTRUCTION
        const playInstruction = this
        .add
        .bitmapText(width /2, height / 2 + 50, 'arcade', 'Press Space to Play Again', 20)
        .setOrigin(0.5)
    }
    update(){
        if (this.cursors.space.isDown){
            this.scene.switch('play-scene')
        }
    }
    
}