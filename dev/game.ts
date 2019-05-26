class Game {
    
    private score:number = 0
    private destroyed:number = 0
    private textfield:HTMLElement
    private statusbar:HTMLElement
    private bomb:Array<Bomb> = []
    private ship:Ship
    private cloud:Array<Cloud> = []
    private recovery:Recovery
    private game:Game
    private lives:number = 0
    private static instance:Game

    //set private for Singleton
    private constructor() {
        
    }

    public init(){
        this.game = this
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement

        this.recovery = new Recovery(this, this.ship)
        this.ship = new Ship()
        for(let i = 0; i < 10; i++){
        this.bomb.push(new Bomb(this))

        }
        for(let i = 0; i < 5; i++){
    
                this.cloud.push(new Cloud)
            }

            this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement
   
        this.gameLoop()
    }
    //Singleton
    static getInstance(){
        if(!this.instance){
            this.instance = new Game()
        }
        return this.instance
    }
    
    private gameLoop():void{
        this.ship.update()
        this.recovery.update()
        this.cloud.forEach(cloud => {
            cloud.update()
        })
        this.bomb.forEach(bomb => {
            if(this.checkCollision(this.ship, bomb) == true){
                this.planetDamaged()
                bomb.resetBomb()
            }
            bomb.update()
            
        })
        if(this.game.checkCollision(this.ship, this.recovery) == true){
            this.recovered()
            this.recovery.reset()
        }
  
        requestAnimationFrame(() => this.gameLoop())
    }

    public planetDamaged(){
        this.destroyed ++
        this.lives -= 72
        this.statusbar.style.backgroundPositionX = this.lives + "px"
        if(this.destroyed == 4){
            requestAnimationFrame(null)
        }
        console.log("buildings destroyed " + this.destroyed)
    }
    public recovered(){
        console.log(this.destroyed)
        if(this.destroyed >= 1){
        this.destroyed --

            this.lives += 72
        this.statusbar.style.backgroundPositionX = this.lives + "px"
        }
        

    }
       
    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score
    }
    public status(){
        this.statusbar.innerHTML = 'blabla'
    }
    private restartGame(){
        this.game = Game.getInstance()
     }
     public checkCollision(ship:Ship, bomb) {
        return !(
            ((ship.posy + ship.height) < (bomb.posy)) ||
            (ship.posy > (bomb.posy + bomb.height)) ||
            ((ship.posx + ship.width) < bomb.posx) ||
            (ship.posx > (bomb.posx + bomb.width))
        );
    }

} 

// starting game with Singleton
window.addEventListener("load", () => {
let gameOne = Game.getInstance()
gameOne.init()
})