class Util{

  
    constructor(){


    }


public checkCollision(ship:Ship, bomb:Bomb) {
    return !(
        ((ship.posy + ship.height) < (bomb.posy)) ||
        (ship.posy > (bomb.posy + bomb.height)) ||
        ((ship.posx + ship.width) < bomb.posx) ||
        (ship.posx > (bomb.posx + bomb.width))
    );
}
}