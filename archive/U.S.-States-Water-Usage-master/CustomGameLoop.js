// <editor-fold desc="CustomGameLoop">
/**
 * in charge of many initializations, pointer/mouse movements, top level 
 * function, manage all the managers and draw items in the managers
 * @returns {CustomGameLoop}
 */
function CustomGameLoop() {
}

/**
 * instantiate gameloop
 * @extends {GameLoop} CustomGameLoop
 */
CustomGameLoop.prototype = new GameLoop();

/**
 * initialize window resize function, element manager, pointer manager, 
 * waterSymbo manager. After the initialization, all states' data
 * should be loaded and can be used.
 * @param {canvas} canvas
 * @returns {undefined}
 */
CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    /**
     * window width/ window height
     * @private
     * @type {number} windowSizeRatio
     * 
     */
    this.windowSizeRatio;
    this.fillWindow();
    var _this = this;
    window.addEventListener('resize', function(){
        _this.onWindowResize();
    }, false);
    
    /**
     * manage all elements that are drawn on the canvas
     * @type {ElementManager} elementManager
     */
    this.elementManager = new ElementManager();
    
    /**
     * manage mouse/pointer
     * @type {PointerManager} pointerManager
     * @param {ElementManager} pass this.elementManager 
     * @param {number} pass window width
     * @param {number} pass window height
     */
    
    this.pointerManager = new PointerManager(this.elementManager, 
    window.innerWidth,window.innerHeight, this.g);
   // this.canvas.width = 1200;
    //this.canvas.height = 550;
    
    /**
     * manage all the waterSymbols
     * @type {WaterSymbolManager} waterSymbolManager
     * @param {ElementManager} pass this.elementManager
     * @param {number} pass window width
     * @param {number} pass window height
     */
    this.waterSymbolManager = new WaterSymbolManager(this.elementManager,
    window.innerWidth, window.innerHeight);
       
}

/**
 * when window is resized and detected by the eventListener,
 * this function will be called and it will call fillWindow function
 * @returns {undefined}
 */
CustomGameLoop.prototype.onWindowResize = function(){
    this.fillWindow();
}

/**
 * after onWindowResize is called, this function will make the canvas fullfill
 * the window, and calcute the windowSizeRatio
 * @returns {undefined}
 */
CustomGameLoop.prototype.fillWindow = function(){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight; 
    this.windowSizeRatio = this.canvas.width/this.canvas.height;
}

/**
 * allow user to set the canvas size
 * @param {number} x
 * @param {number} y
 * @returns {undefined}
 */
CustomGameLoop.prototype.setCanvasSize = function(x, y){
    this.g = this.canvas.getContext("2d");
    this.canvas.width = x;
    this.canvas.height = y;
}

/**
 * When pointer click/press
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.pointerManager.onPointerEnter(id, position);
}

/**
 * when pointer is active
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.pointerManager.onPointerActivate(id, position);
}

/**
 * when pointer is moving
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerMove = function(id, position){
    this.pointerManager.onPointerMove(id, position);
}

/**
 * when pointer is not active
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerDeactivate = function(id, position){
    this.pointerManager.onPointerDeactivate(id, position);
}

/**
 * when pointer leaves
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerLeave = function(id, position) {
    this.pointerManager.onPointerLeave(id, position);
}

/**
 * add element to this.elementManager
 * @param {type} element
 * @returns {undefined}
 */
CustomGameLoop.prototype.addElement = function (element) {
    this.elementManager.addElement(element);
}

/**
 * 
 * @returns {Number|Window.innerHeight|{number} windowSizeRatio}
 */
CustomGameLoop.prototype.getWindowSizeRatio = function(){
    return this.windowSizeRatio;
}

/**
 * 
 * @returns {Number|Window.innerWidth}
 */
CustomGameLoop.prototype.getWindowWidth = function(){
    return window.innerWidth;
}

/**
 * 
 * @returns {Window.innerHeight|Number}
 */
CustomGameLoop.prototype.getWindowHeight = function(){
    return window.innerHeight;
}

/**
 * draw elements in the elementManager
 * pass triangle state to the waterSymbolManager and pass scroll bar percentage
 * to the waterSymbolManager
 * @param {canvas} g
 * @returns {undefined}
 */
CustomGameLoop.prototype.draw = function(g){
    //console.log(this.ElementManager.getTriangleStateE());
    this.waterSymbolManager.setTriangleState(this.elementManager.getTriangleStateE());
    this.waterSymbolManager.setPercentage(this.elementManager.getScrollPercentage());
    this.elementManager.draw(g);
}
// </editor-fold> 



// <editor-fold desc="ElementManager">
/**
 * Manage all elements drawn on the canvas
 * @returns {ElementManager}
 * @constructor
 */
function ElementManager(){
    /**
     * an array that stores all elements that are drawn on canvas
     * @type {array} elements
     */
    this.elements = [];
    
    /**
     * default: 0, percentage of where slider is located between two year marks
     * @type {number} scrollPercentage
     */
    this.scrollPercentage = 0;
    
    /**
     * default:1, different state represent where triangle slider is located
     * for example, state 1 is between 1985 and 1995
     * @type {number} triangleStateE
     */
    this.triangleStateE = 1;
    
    /**
     * true if triangle slider is moving
     * @type {boolean} triangleMove
     */
    this.triangleMove = false;
}

/**
 * push element into elements array
 * @param {type} element
 * @returns {undefined}
 */
ElementManager.prototype.addElement = function(element){
    this.elements.push(element);
}

/**
 * called only when the element is the triangleFlag 
 * update triangle state according to its location, pass the percentage value
 * to this.scrollPercentage and pass the triangle state value to 
 * this.triangleStateE
 * @param {type} element
 * @param {vector} position
 * @returns {undefined}
 */
ElementManager.prototype.setScrollPercentage = function(element, position){
    var nPosition = position.clone();
    element.updateYearForWaterSymbol(nPosition);
    
    this.scrollPercentage = element.getScrollBarPercentage();
    this.triangleStateE = element.getTriangelState();

}

/**
 * 
 * @returns {Number|{number} scrollPercentage}
 */
ElementManager.prototype.getScrollPercentage = function(){
    return this.scrollPercentage;
}

/**
 * 
 * @returns {{number} triangleStateE|Number}
 */
ElementManager.prototype.getTriangleStateE = function(){
    
    return this.triangleStateE;
}

/**
 * when triangle slider moves, set this.triangleMove true
 * @returns {undefined}
 */
ElementManager.prototype.TriangleMove = function(){
     //console.log("hi");
    this.triangleMove = true;
}

/**
 * when triangle slider stops moving, set this.triangleMove false
 * @returns {undefined}
 */
ElementManager.prototype.triangleStill = function(){
    this.triangleMove = false;
}

/**
 * 
 * @returns {{boolean} triangleMove|Boolean}
 */
ElementManager.prototype.getTriangleMove = function(){
    return this.triangleMove;
}

/**
 * draw every element in the elements array on canvas
 * @param {canvas} g
 * @returns {undefined}
 */
ElementManager.prototype.draw = function(g){
    for (var i=0; i < this.elements.length; i++) {
        
        
        this.elements[i].draw(g);
    }
}

/**
 * traverse through all the elements in array, find the element that is hit, 
 * return the element if that element is hittest true
 * @param {vector} mouse/pointer position
 * @returns {element|Boolean}
 */
ElementManager.prototype.getElementAtPosition = function(p){
    for (var i=0; i < this.elements.length; i++) {
        if (typeof this.elements[i].hitTest === "function") { //test if hitTest function exists
            
            if (this.elements[i].hitTest(p)) {
                
                return this.elements[i];
         
            }   
        }
    }
    return false;
}
// </editor-fold>
