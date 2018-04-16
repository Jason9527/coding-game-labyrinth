/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
var R = parseInt(inputs[0]); // number of rows.
var C = parseInt(inputs[1]); // number of columns.
var A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.

var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;
var output = ["UP", "RIGHT", "DOWN", "LEFT"];

var X, Y;
class Coords {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
}

function neighbours(d) {
    X = d.X;
    Y = d.Y;
    var list = [];
    list.push(new Coords(X, Y - 1));
    list.push(new Coords(X + 1, Y));
    list.push(new Coords(X, Y + 1));
    list.push(new Coords(X - 1, Y));
    return list;
}

function readNewInfo() {
    var inputs = readline().split(' ');
    c.Y = parseInt(inputs[0]);
    c.X = parseInt(inputs[1]);
    
    for(let y = 0; y < R; y++) {
        var ROW = readline();
        if(c.Y-2 <= y && y <= c.Y+2) {
            for( let x = Math.max(c.X-2, 0); x < Math.min(c.X+3, C); x++) {
                map[y][x] = ROW.charAt(x);
            }
        }
    }

    for(let i = 0; i < R; i++) {
        let r = '';
        for(let j = 0; j < C; j++) {
            r += map[i][j];
        }
        printErr(r);
    }
}

function isInMap(s) {
    return 0 <= s.X && s.X < C && 0 <= s.Y && s.Y < R;
}

function mustBeAvoided(s, avoid) {
    for( let k in avoid) {
        if(map[s.Y][s.X] == avoid[k]) {
            return true;
        }
    }
    return false;
}

function equals(d) {
    return c.X == d.X && c.Y == d.Y;
}


function goTo(target, toAvoid, onlyReveal) {
    let prec = [], y, x;
    for(y = 0; y < R; y++) {
        prec[y] = [];
        for(x =0; x < C; x++) {
            prec[y][x] = -1;
        }
    }

    let queue = [];
    queue.push(c);

    while(queue.length && map[queue[0].Y][queue[0].X] != target ) {
        let point = queue.shift();
        let neighboursList = neighbours(point);
        for(let i = 0; i < neighboursList.length; i++) {
            let n = neighboursList[i];
            if(isInMap(n) && !mustBeAvoided(n, toAvoid) && prec[n.Y][n.X] == -1) {
                prec[n.Y][n.X] = (i+2) % 4;
                queue.push(n);
            }
        }
    }

    // print prec 
    for(let a = 0; a < R; a++) {
        let z = '';
        for(let b = 0; b < C; b++) {
            z += prec[a][b];
        }
        printErr(z);
    }

    
    if(queue.length == 0) {
        return false;
    }else{
        let targetCell = queue.shift();
        printErr('targetCell Y ' + targetCell.Y + ' X ' + targetCell.X);
        let path = [];
        let iter = targetCell;
        while( !equals(iter) ) {
            path.push( (prec[iter.Y][iter.X] + 2) % 4 );
            iter = neighbours(iter)[prec[iter.Y][iter.X]];
        }

        while( (onlyReveal && map[targetCell.Y][targetCell.X] == target) ||
                (!onlyReveal && path.length) ) {
            print(output[path.pop()]);
            readNewInfo();
        }
        return true;
    }
}

var map = [];
var c = new Coords(-1, -1);

// game loop
while (true) {
    //init map 
    for(var y = 0; y < R; y++){
        map[y] = [];
        for(var x = 0; x < C; x++){
            map[y][x] = '?';
        }
    }

    readNewInfo();
    let avoidWallsAndControl = ['#', 'C'];
    while( goTo('?', avoidWallsAndControl, true));

    let avoidWalls = ['#', '?'];
    goTo('C', avoidWalls, false);
    goTo('T', avoidWalls, false);

}