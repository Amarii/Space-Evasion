class Ship {

    public element:HTMLElement
    
    public posx:number
    public posy:number
    public height:number
    public width:number

    private leftSpeed:number = 0
    private rightSpeed:number = 0
    private upSpeed:number = 0
    private downSpeed:number = 0

    constructor() {
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
        this.element = document.createElement("ship")
        let foreground = document.getElementsByTagName("foreground")[0]
foreground.appendChild(this.element);
        
        this.width = 35
        this.height = 75
        this.posx = 600
        this.posy = window.innerHeight -160
        }

    public update():void {
        this.posx -= this.leftSpeed
        this.posx += this.rightSpeed
        this.posy -= this.upSpeed
        this.posy += this.downSpeed

        if(this.posx > window.innerWidth){
            this.posx = 0
        }
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
        

    }
    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.leftSpeed = 7
            break
        case 68:
            this.rightSpeed = 7
            break
        case 87:
            this.upSpeed = 7
            break
        case 83:
            this.downSpeed = 7
            break
        }
    }
    
    onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.leftSpeed = 0
            break
        case 68:
            this.rightSpeed = 0
            break
        case 87:
            this.upSpeed = 0
            break
        case 83:
            this.downSpeed = 0
            break
        }
    }

    
}

