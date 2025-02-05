import Phaser from "phaser";
import Meteor from "../entities/Meteor";
import Laser from "../entities/Laser";



export default class PlayScene extends Phaser.Scene{

    constructor(){
        // REFRENCE THE TAG 
        super('play-scene')
    }

    preload(){

    }

    create(){
        // CREATE SCORE AREA
        const width = this.cameras.main.width
        const height = this.cameras.main.height

        // CREATE SCORE
        this.score = 0
        this.scoreText = this.add.bitmapText(width - 200, 20, 'arcade', 'Score: 0000', 24)
        .setOrigin(0.5)
        // KEYBOARD MAPPING
        this.cursors = this.input.keyboard.createCursorKeys()

        // ADD PLAYER IMAGE
        this.player = this.physics.add.image(200, 200, 'player')
        // SET PHYSICS VARIABLE
        this.player.setDrag(0.99)
        this.player.setMaxVelocity(150)
        // SCALE THE SIZE OF PLAYER
        this.player.setScale(0.5)
        // SET THE WORLD BOUNDARY
        this.player.setCollideWorldBounds(true)

        // GENERATE METEORS
        this.meteorGroup = this.physics.add.group()
        this.meteorArray = []

        for (let i = 0; i < 10; i++){
            const meteor = new Meteor(this, 300, 300)
            
            const xPos = Phaser.Math.RND.between(0, 800)
            const yPos = Phaser.Math.RND.between(0, 600)
            meteor.setPosition(xPos, yPos)
            meteor.setActive(true)
            meteor.setVisible(true)


            
            this.meteorGroup.add(meteor, true)
            this.meteorArray.push(meteor)
        }

        // CREATING THE LASER 
        this.laserGroup = this.physics.add.group({
            classType: Laser,
            maxSize: 1,
            runChildUpdate: true
        })

        // COLLISION BETWEEN LASER AND METEOR
        this.physics.add.overlap(this.laserGroup, this.meteorGroup, this.meteorCollision, null, this)
        // COLLISION BETWEEN PLAYER AND METEOR
        this.physics.add.overlap(this.meteorGroup, this.player, this.playerCollision, null, this)


    }

    update(time, delta){
        if (!this.player || !this.player.active) {
            return;  // ✅ Prevents errors when the player is destroyed
        }
        // PLAYER SHIP MOVEMENT AND PHYSICS
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(
                this.player.rotation - Phaser.Math.DegToRad(90),
                150, 
                this.player.body.acceleration
            );
        } else if (this.cursors.down.isDown){
            this.physics.velocityFromRotation(
                this.player.rotation - Phaser.Math.DegToRad(90),
                -150, 
                this.player.body.acceleration
            );
        } 
        
        else {
            this.player.setAcceleration(0);
            this.player.setVelocity(
                this.player.body.velocity.x * 0.98,
                this.player.body.velocity.y * 0.98
            );
        }


        // ROTATE LEFT
        if(this.cursors.left.isDown){
            this.player.setAngularVelocity(-300)
        } 
        // ROTATE RIGHT
        else if (this.cursors.right.isDown){
            this.player.setAngularVelocity(+300)
        }
        // STEADY
        else{
            this.player.setAngularVelocity(0)
        }
        for (const meteor of this.meteorArray){
            meteor.update(time, delta)
        }

        // UPDATE SCORE
        this.scoreText.setText('Score: ' + this.score)

        // FIRING THE LASER
        if (this.cursors.space.isDown){
            const shoot = this.laserGroup.get()
            if (shoot){
                shoot.fire(this.player.x, this.player.y, this.player.rotation)
                this.sound.play('laser-sfx')
            }
        }
    }
    // DESTROYING THE METEOR
    meteorCollision(laser, meteor){
        laser.destroy();
        meteor.destroy();
        this.score += 10
        this.sound.play('explosion-sfx')
        
        if (this.meteorGroup.countActive() == 0){
            this.scene.switch('game-over-scene')
        }
    
        }
    // PROCEEDS TO GAME OVER SCREEN AFTER COLLIDING
    playerCollision(meteor, player){
        meteor.destroy();
        player.destroy();
        this.sound.play('explosion-sfx')
        this.scene.start('game-over-scene')
    }
}