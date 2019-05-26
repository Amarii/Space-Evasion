class Recovery{
    private element: HTMLElement
    public posy:number
    public posx:number
    public height:number
    public width:number
    private rotation:number = 0
    private game:Game
    private ship:Ship
    constructor(game:Game, ship:Ship){
        this.game = game
        this.ship = ship
        this.element = document.createElement("recovery")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        
        this.width = this.element.clientWidth
        this.height = this.element.clientHeight

        this.posy = Math.random() * 1800 * -1
        this.posx = Math.random() * 400

    }
    public update():void {

      
        this.posy += 3
        this.rotation += 3
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px) rotate(${this.rotation}deg)`
        if(this.posy > window.innerHeight){
            this.reset()

        }
    }
    public reset(){
        this.posy = -400
        this.posx = Math.random() * 400
        

    }
    
}