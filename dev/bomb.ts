class Bomb{
    
    private element: HTMLElement
    public posy:number
    public posx:number
    public height:number
    public width:number
    private speed:number
    private game:Game
        
    constructor(game:Game) {
        this.game = game
        this.element = document.createElement("bomb")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        
        this.width = this.element.clientWidth
        this.height = this.element.clientHeight

        this.speed = Math.random() * 10 + 1
        this.posy = Math.random() * 1800 * -1
        this.posx = Math.random() * 500
    }

    public update():void {
        this.posy += this.speed
        if(this.posy > window.innerHeight){
            this.posy = Math.random() * 1800 * -1
            this.posx = Math.random() * window.innerWidth
            this.game.scorePoint()
        }
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
    public resetBomb(){
        this.posy = Math.random() * 1800 * -1
        this.posx = Math.random() * window.innerWidth
    }

  
}