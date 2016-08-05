// <editor-fold desc="Point">

/**
 * position point on canvas
 * @param {number} x
 * @param {number} y
 * @returns {Point}
 * @constructor
 */
function Point(x, y)
{
    // initialize x and y 
    this.setX(x);
    this.setY(y);
}

/**
 * 
 * @returns {number}
 */
Point.prototype.getX = function() {
    return this.x;
}

/**
 * 
 * @returns {number}
 */
Point.prototype.getY = function() {
    return this.y;
}

/**
 * 
 * @param {number} x
 * @returns {undefined}
 */
Point.prototype.setX = function(x) {
    this.x = x;
}

/**
 * 
 * @param {number} y
 * @returns {undefined}
 */
Point.prototype.setY = function(y) {
    this.y = y;
}

/**
 * 
 * @returns {Point}
 */
Point.prototype.clone = function() {
    return new Point(this.x, this.y);
}

/**
 * @param {vector} p
 * @returns {Point}
 */
Point.prototype.subtract = function(p) {
    return new Point(this.x - p.x, this.y - p.y);
}

/**
 * 
 * @param {vector} p
 * @returns {Point}
 */
Point.prototype.add = function(p) {
    return new Point(this.x + p.x, this.y + p.y);
}
// </editor-fold> 

/**
 * 
 * @returns {GameLoop}
 */
function GameLoop() {
}

/**
 * get mouse
 * @type type
 * @constructor
 */
GameLoop.Settings = {
    Input : {
        MOUSE_ID : "MOUSE"
    }
}

/**
 * initialize the canvas
 * @returns {undefined}
 */
GameLoop.prototype.initializeGraphics = function() {
    this.g = this.canvas.getContext("2d");
    this.canvas.width = 1000;
    this.canvas.height = 400;
}

/*
 * initialize mouse settings
 */
GameLoop.prototype.initializeInput = function() {
    this.canvas.associatedGameLoop = this;
    this.canvas.onmouseenter = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseEnter(localCoordinate);
    }
    this.canvas.onmousemove = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseMove(localCoordinate);
    }
    this.canvas.onmousedown = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseDown(localCoordinate);
    }
    this.canvas.onmouseup = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseUp(localCoordinate);
    }
    this.canvas.onmouseleave = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseLeave(localCoordinate);
    }
    this.canvas.ontouchstart = function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) 
        {
           var t = e.changedTouches[i];
           var localCoordinate = 
                   this.associatedGameLoop
                   .getLocalCanvasCoordinates(t.clientX, t.clientY);
           this.associatedGameLoop.onTouchStart(t.identifier, localCoordinate);
        }
    }
    this.canvas.ontouchmove = function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) 
        {
           var t = e.changedTouches[i];
           var localCoordinate = 
                   this.associatedGameLoop
                   .getLocalCanvasCoordinates(t.clientX, t.clientY);
           this.associatedGameLoop.onTouchMove(t.identifier, localCoordinate);
        }
    }
    this.canvas.ontouchend = function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) 
        {
           var t = e.changedTouches[i];
           var localCoordinate = 
                   this.associatedGameLoop
                   .getLocalCanvasCoordinates(t.clientX, t.clientY);
           this.associatedGameLoop.onTouchEnd(t.identifier, localCoordinate);
        }
    }
    this.canvas.ontouchcancel = function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) 
        {
           var t = e.changedTouches[i];
           var localCoordinate = 
                   this.associatedGameLoop
                   .getLocalCanvasCoordinates(t.clientX, t.clientY);
           this.associatedGameLoop.onTouchEnd(t.identifier, localCoordinate);
        }
    }
}

/**
 * 
 * @param {type} arg1
 * @param {type} arg2
 * @returns {GameLoop.prototype.getLocalCanvasCoordinates.positionOnCanvas}
 */
GameLoop.prototype.getLocalCanvasCoordinates = function(arg1, arg2) {
    var clientX = 0;
    var clientY = 0;
    if (typeof arg2 == 'undefined') {
        var e = arg1;
        clientX = e.clientX;
        clientY = e.clientY;
    } else {
        clientX = arg1;
        clientY = arg2;
    }
    var offset = this.canvas.getBoundingClientRect();
    var positionOnCanvas = {
        x : clientX - offset.left,
        y : clientY - offset.top
    }
    return positionOnCanvas;
}

/**
 * when mouse clicks
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseEnter = function(position) {
    // override
    this.onPointerEnter(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseDown = function(position) {
    // override
    this.onPointerActivate(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseUp = function(position) {
    // override
    this.onPointerDeactivate(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseMove = function(position) {
    // override
    this.onPointerMove(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseLeave = function(position) {
    // override
    this.onPointerLeave(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y))
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onTouchStart = function(id, position) {
    var point = new Point(position.x, position.y);
    this.onPointerEnter(id, point);
    this.onPointerActivate(id, point);
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onTouchMove = function(id, position) {
    this.onPointerMove(id, new Point(position.x, position.y));
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onTouchEnd = function(id, position) {
    this.onPointerDeactivate(id, position);
    this.onPointerLeave(id, new Point(position.x, position.y));
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onTouchCancelled = function(id, position) {
    this.onPointerLeave(id, new Point(position.x, position.y));
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerEnter = function(id, position) {
    
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerMove = function(id, position) {
    
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerActivate = function(id, position) {
    
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerDeactivate = function(id, position) {
    
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerLeave = function(id, position) {
    
}

/**
 * setInterval method will continue calling the function 
 * every 10ms
 * @returns {undefined}
 */
GameLoop.prototype.initializeTimer = function() {
    var engine = this;
    setInterval(function() {
        engine.onTimerTick();
    }, 10);
}

/**
 * canvas update every 10ms
 * @returns {undefined}
 */
GameLoop.prototype.onTimerTick = function() {
    this.update(10);
    this.clear(this.g);
    this.draw(this.g);
}

/**
 * clear the canavs
 * @param {canvas} g
 * @returns {undefined}
 */
GameLoop.prototype.clear = function(g) {
    g.fillStyle = "white";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

/**
 * update every 10ms
 * @param {type} elapsedMilliseconds
 * @returns {undefined}
 */
GameLoop.prototype.update = function(elapsedMilliseconds) {
    // override
}

/**
 * 
 * @param {canvas} g
 * @returns {undefined}
 */
GameLoop.prototype.draw = function(g) {
    // override
}

/**
 * initialize canvas, graph, input and timer
 * @param {type} canvas
 * @returns {undefined}
 */
GameLoop.prototype.initialize = function(canvas) {
    this.canvas = canvas;
    this.isInputDebugModeEnabled = false;
    this.initializeGraphics();
    this.initializeInput();
    this.initializeTimer();
}