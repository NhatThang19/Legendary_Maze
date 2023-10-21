const canvas = document.getElementById("maze-map");


var cols, rows;
var w = 40;
var grid = [];

var current;
var stack = [];

function setup() {
    canvas.width = 400
    canvas.height = 400
    cols = Math.floor(canvas.width/w);
    rows = Math.floor(canvas.height/w);

    for(var j = 0; j < cols; j++){
        for(var i = 0; i < rows; i++){
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    current = grid[0]; 
}

function draw() {
    const ctx = canvas.getContext("2d");
    canvas.width = 400
    canvas.height = 400
    ctx.clearRect(0, 0, 400, 400)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    current.visited = true;
 
    var next = current.checkNeighbors();
    if(next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
    } else if(stack.length > 0) {
        current = stack.pop();
    }
    
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
        current.highlight();  
    }
    update()
    // window.requestAnimationFrame(draw);
}

function update() {
    ctx = canvas.getContext("2d");
}


function index(i, j) {
    if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    } 
    return i + j * cols;
    
}

function Cell(i, j) {
    const ctx = canvas.getContext("2d");
    canvas.width = 400
    canvas.height = 400
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function() {
        var neighbors = [];

        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if(top && !top.visited) {
            neighbors.push(top);
        }

        if(right && !right.visited) {
            neighbors.push(right);
        }

        if(bottom && !bottom.visited) {
            neighbors.push(bottom);
        }

        if(left && !left.visited) {
            neighbors.push(left);
        }

        if(neighbors.length > 0) {
            var r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.highlight = function() {
        var x = this.i * w;
        var y = this.j * w;
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, w, w);
    }

    this.show = function() {
        var x = this.i * w;
        var y = this.j * w;

        if(this.walls[0]) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + w, y);
            ctx.stroke();
        }

        if(this.walls[1]) {
            ctx.beginPath();
            ctx.moveTo(x + w, y);
            ctx.lineTo(x + w, y + w);
            ctx.stroke();
        }

        if(this.walls[2]) {
            ctx.beginPath();
            ctx.moveTo(x + w, y + w);
            ctx.lineTo(x, y + w);
            ctx.stroke();
        }

        if(this.walls[3]) {
            ctx.beginPath();
            ctx.moveTo(x, y + w);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        if(this.visited) {
            ctx.fillStyle = "green";
            ctx.fillRect(x, y, w, w);
        }
    }
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if(x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if(x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if(y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if(y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

setup();
// window.requestAnimationFrame(draw);
setInterval(draw, 200);

