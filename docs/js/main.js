class Util {
    constructor() {
    }
    checkCollision(ship, bomb) {
        return !(((ship.posy + ship.height) < (bomb.posy)) ||
            (ship.posy > (bomb.posy + bomb.height)) ||
            ((ship.posx + ship.width) < bomb.posx) ||
            (ship.posx > (bomb.posx + bomb.width)));
    }
}
class Bomb {
    constructor(game) {
        this.game = game;
        this.element = document.createElement("bomb");
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.speed = Math.random() * 10 + 1;
        this.posy = Math.random() * 1800 * -1;
        this.posx = Math.random() * 500;
    }
    update() {
        this.posy += this.speed;
        if (this.posy > window.innerHeight) {
            this.posy = Math.random() * 1800 * -1;
            this.posx = Math.random() * window.innerWidth;
            this.game.scorePoint();
        }
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
    resetBomb() {
        this.posy = Math.random() * 1800 * -1;
        this.posx = Math.random() * window.innerWidth;
    }
}
class Cloud extends HTMLElement {
    constructor() {
        super();
        document.body.appendChild(this);
        this.posx = window.innerWidth;
        this.posy = Math.random() * 200;
        this.random = (Math.random() * 2) + 1;
    }
    update() {
        this.posx += this.random;
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
        if (this.posx > window.innerWidth) {
            this.resetPosition();
        }
    }
    resetPosition() {
        this.posx = ((Math.random() * window.innerWidth) * -1) - 265;
        this.posy = Math.random() * 500;
    }
}
window.customElements.define("cloud-component", Cloud);
class Game {
    constructor() {
        this.score = 0;
        this.destroyed = 0;
        this.bomb = [];
        this.cloud = [];
        this.lives = 0;
    }
    init() {
        this.game = this;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.recovery = new Recovery(this, this.ship);
        this.ship = new Ship();
        for (let i = 0; i < 10; i++) {
            this.bomb.push(new Bomb(this));
        }
        for (let i = 0; i < 5; i++) {
            this.cloud.push(new Cloud);
        }
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.gameLoop();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    }
    gameLoop() {
        this.ship.update();
        this.recovery.update();
        this.cloud.forEach(cloud => {
            cloud.update();
        });
        this.bomb.forEach(bomb => {
            if (this.checkCollision(this.ship, bomb) == true) {
                this.planetDamaged();
                bomb.resetBomb();
            }
            bomb.update();
        });
        if (this.game.checkCollision(this.ship, this.recovery) == true) {
            this.recovered();
            this.recovery.reset();
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    planetDamaged() {
        this.destroyed++;
        this.lives -= 72;
        this.statusbar.style.backgroundPositionX = this.lives + "px";
        if (this.destroyed == 4) {
            requestAnimationFrame(null);
        }
        console.log("buildings destroyed " + this.destroyed);
    }
    recovered() {
        console.log(this.destroyed);
        if (this.destroyed >= 1) {
            this.destroyed--;
            this.lives += 72;
            this.statusbar.style.backgroundPositionX = this.lives + "px";
        }
    }
    scorePoint() {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
    status() {
        this.statusbar.innerHTML = 'blabla';
    }
    restartGame() {
        this.game = Game.getInstance();
    }
    checkCollision(ship, bomb) {
        return !(((ship.posy + ship.height) < (bomb.posy)) ||
            (ship.posy > (bomb.posy + bomb.height)) ||
            ((ship.posx + ship.width) < bomb.posx) ||
            (ship.posx > (bomb.posx + bomb.width)));
    }
}
window.addEventListener("load", () => {
    let gameOne = Game.getInstance();
    gameOne.init();
});
class Recovery {
    constructor(game, ship) {
        this.rotation = 0;
        this.game = game;
        this.ship = ship;
        this.element = document.createElement("recovery");
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.posy = Math.random() * 1800 * -1;
        this.posx = Math.random() * 400;
    }
    update() {
        this.posy += 3;
        this.rotation += 3;
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px) rotate(${this.rotation}deg)`;
        if (this.posy > window.innerHeight) {
            this.reset();
        }
    }
    reset() {
        this.posy = -400;
        this.posx = Math.random() * 400;
    }
}
class Ship {
    constructor() {
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.upSpeed = 0;
        this.downSpeed = 0;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.element = document.createElement("ship");
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.width = 35;
        this.height = 75;
        this.posx = 600;
        this.posy = window.innerHeight - 160;
    }
    update() {
        this.posx -= this.leftSpeed;
        this.posx += this.rightSpeed;
        this.posy -= this.upSpeed;
        this.posy += this.downSpeed;
        if (this.posx > window.innerWidth) {
            this.posx = 0;
        }
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 65:
                this.leftSpeed = 7;
                break;
            case 68:
                this.rightSpeed = 7;
                break;
            case 87:
                this.upSpeed = 7;
                break;
            case 83:
                this.downSpeed = 7;
                break;
        }
    }
    onKeyUp(event) {
        switch (event.keyCode) {
            case 65:
                this.leftSpeed = 0;
                break;
            case 68:
                this.rightSpeed = 0;
                break;
            case 87:
                this.upSpeed = 0;
                break;
            case 83:
                this.downSpeed = 0;
                break;
        }
    }
}
//# sourceMappingURL=main.js.map