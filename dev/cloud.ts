class Cloud extends HTMLElement{
    
    private posx:number
    private posy:number
    private random:number
        
    constructor() {
        super()
       
        
        document.body.appendChild(this);
        
        this.posx = window.innerWidth
        this.posy = Math.random() * 200
        this.random = (Math.random() * 2) + 1


    }

    public update():void {

        this.posx += this.random
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        if(this.posx > window.innerWidth){
            this.resetPosition()
        }
    }

    public resetPosition() {
        this.posx = ((Math.random() * window.innerWidth) * -1) - 265
        this.posy = Math.random() * 500
    }
}

window.customElements.define("cloud-component", Cloud)