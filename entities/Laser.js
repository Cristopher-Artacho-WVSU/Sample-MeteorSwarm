import Phaser from "phaser";

export default class Laser extends Phaser.Physics.Arcade.Sprite{
    // PASSING IN PARAMETERS WHEN CALLED
    constructor(scene, x, y){
        super(scene, x, y, 'laser');

        // LASER SPEED
        this.speed = Phaser.Math.GetSpeed(500, 1)
        this.setScale(0.6)
    }

    fire(x, y, direction) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    
        
        this.direction = direction - Phaser.Math.DegToRad(90);
        this.rotation = this.direction;
        this.setRotation(direction);
    }

    update(time, delta){
        // LASER PATH
        this.x += Math.cos(this.direction)*this.speed*delta;
        this.y += Math.sin(this.direction)*this.speed*delta;
        
        // DESTROY LASER IF OUT OF SCREEN
        if (this.x < -50 || this.y < 50 || this.x > 800 || this.y > 600){
            this.setActive(false)
            this.setVisible(false)
            this.destroy()
        }
    }

}