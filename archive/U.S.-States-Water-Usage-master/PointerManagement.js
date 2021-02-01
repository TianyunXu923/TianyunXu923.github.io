
// <editor-fold desc="PointerManager">
/**
 * manages pointers, manages user interactive effects, work closely together
 * with elements in the ElementManager
 * @param {ElementManager} elementManager
 * @param {number} windowWidth
 * @param {number} windowHeight
 * @param {canvas} canvas
 * @returns {PointerManager}
 * @constructor
 */
function PointerManager(elementManager, windowWidth, windowHeight, canvas) {
    /**
     * get access to the elementManager from the parameter passed 
     * @type {ElementManager} elementManager
     */
    this.elementManager = elementManager;
    /**
     * save pointer id and position
     * @type {object} pointers
     */
    this.pointers = { };
    /**
     * @type {boolean} currentSelectElement
     */
    this.currentSelectElement = false;
    /**
     * contains all waterSymbol elements that are in the dataBox and will be 
     * drawn for line charts
     * @tyle {array} graphState
     */
    this.graphState = [];
    /**
     * @type {number} windowWidth
     */
    this.windowWidth = windowWidth;
    /**
     * @type {number} windowHeight
     */
    this.windowHeight = windowHeight;
    /**
     * get acess to the canvas passed by the parameter
     * @type {canvas} g
     */
    this.g = canvas;
}

/**
 * when point clicked/ pressed
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerEnter = function(id, position) {
    this.addPointer(id, position);
   
}

/**
 * when pointer moves
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerMove = function(id, position) {
    this.movePointer(id, position);
    // if an element is chosen
    if(this.currentSelectElement != false){
        // if that element is a button, do nothing
        if(this.currentSelectElement.isButton !== false){
          }
        // if that element is not a button  
        else{
            // if that element is not a triangle flag, update the position
            if(this.currentSelectElement.isFlag === false){
                this.currentSelectElement.setPosition
             (  position.subtract(this.currentSelectElement.getDistance()));
            }
            // if the element is a triangle flag, update triangle flag position
            // under the rule (within a certain x ranges)
            else{
                  this.currentSelectElement.setTrianglePosition
                (position.subtract(this.currentSelectElement.getDistance()));

            // also update triangle state and percenatge when triangle flag 
            // changes its position
                this.elementManager.setScrollPercentage(this.currentSelectElement,
                position.subtract(this.currentSelectElement.getDistance()));
                
            // tell the elementManager that triangle is moving, so it could 
            // signal waterSymbolManager to update triangle state and percentage 
            // and update year Data for radius
                this.elementManager.TriangleMove(); 
             }
            // uncomment next line if you want to see some dragging effect
           // this.currentSelectElement.draw(this.g);
          }
    } 
}

/**
 * when pointer is active, find the element that pointer is at, trigger revelant 
 * functionalities
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerActivate = function(id, position) {
    //this.addPointer(id, position);
    this.pointers[id].activate();
    
    //find the element in elementManager that is "chosen" by the pointer 
    this.currentSelectElement = this.elementManager.getElementAtPosition(position); 
    
    // if an element is found
    if(this.currentSelectElement != false){
            // if that element is a button
            if(this.currentSelectElement.isButton != false){
                
                // draw/ undraw the line charts 
                this.currentSelectElement.isClick();
                
                // draw waterSymbols that are stored in the this.graphState array
                // which means those that are in the dataBox
                
                this.currentSelectElement.setGraphState(this.graphState);
                
                // whenever the graph is redrawn, it will draw in the initial 
                // scale, undo other scaling down by zoom in or zoom out function
                this.currentSelectElement.defaultLineChartRatio();
                          
            }
            // if the element is a zoom button
            else if(typeof this.currentSelectElement.getFunctionMark === "function"){
                
                // for zoom in button, scale down 
                if(this.currentSelectElement.getFunctionMark() === "zoomIn"){
       
                    this.currentSelectElement.decreaseGraphRatio();
                }
                
                // for zoom out button, scale up
                else if(this.currentSelectElement.getFunctionMark() === "zoomOut"){
                    this.currentSelectElement.increaseGraphRatio();
                }
            }
            
            // if the element is neither a button nor a zoom, update position
            else{
                this.currentSelectElement.distance =
                   position.subtract(this.currentSelectElement.position);
           
           // if the element is a waterSymbol, increase the radius, change the
           // text color
                if(typeof this.currentSelectElement.setWaterSymbolColor ==="function"
                  && typeof this.currentSelectElement.setRadius === "function"){
                    this.currentSelectElement.setWaterSymbolColor("#FF80AA");
                    this.currentSelectElement.setRadius
                    (this.currentSelectElement.width*4/3);
                  }
    }
        
     } 

}

/**
 * when pointer is deactived
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerDeactivate = function(id, position) {
        this.pointers[id].deactivate();
        // if the element is a waterSymbol, set radius back, update position
        // accordingly
        if(typeof this.currentSelectElement.setWaterSymbolColor ==="function"
                && typeof this.currentSelectElement.setRadius === "function"){
            // in case the window is resized
            var backgroundImageWidthRatio =1;
            var backgroundImageHeightRatio =1;
            if(this.windowWidth < 1030){
               backgroundImageWidthRatio = this.windowWidth/1030;
        
            }
    
            if(this.windowHeight < 520){
                backgroundImageHeightRatio = this.windowHeight/520;
            }
            
            // if the waterSymbol is dragged into the dataBox
            // on tablet, need to use position.x, position.y
//            if(position.getX() < 960*backgroundImageWidthRatio &&
//                        position.getX() > 840*backgroundImageWidthRatio &&
//                    position.getY() > 220*backgroundImageHeightRatio
//                    && position.getY() < 440*backgroundImageHeightRatio ){

            if(position.x < 960*backgroundImageWidthRatio &&
                        position.x > 840*backgroundImageWidthRatio &&
                    position.y > 220*backgroundImageHeightRatio
                    && position.y < 440*backgroundImageHeightRatio ){
                // set radius back
                this.currentSelectElement.setRadius
                    (this.currentSelectElement.width*3/4);
                    
                // set color back    
                this.currentSelectElement.setWaterSymbolColor
                (this.currentSelectElement.getSignColor());
                
                // if this waterSymbol is not in this.graphState array, add it
                // so it could be marked and drawn
                if(this.currentSelectElement.getIsInGraph() === false){
                        this.currentSelectElement.setIsInGraphTrue();
                        this.graphState.push(this.currentSelectElement);
                        
                    }
                // if it's already in the this.graphState array, which means
                // the waterSymbol is moved within the data box, do nothing            
                }
                
            // when waterSymbol is moved out of the dataBox    
            else{
                // find that waterSymbol in this.graphState, remove it
                // set the waterSymbol.isGraph false
                if(this.currentSelectElement.getIsInGraph() === true){
                    for(var i =0; i<this.graphState.length; i++){
                        if(this.graphState[i] === this.currentSelectElement){
                                //remove index i item
                            this.graphState.splice(i,1); 
                            this.currentSelectElement.setIsInGraphFalse();
                            
                         }
                    }
                }
            
            // move the waterSymbol back to its initial position, set the color
            // back
            this.currentSelectElement.setPosition
                 (  this.currentSelectElement.getOriginalCoordination());
            this.currentSelectElement.setWaterSymbolColor
                (this.currentSelectElement.getSignColor());
            this.currentSelectElement.setRadius(this.currentSelectElement.width*3/4);
            }   
        }
    
    // unselect the currentSeleElement
    this.currentSelectElement = false;
    // unselect the triangle (triangle is not moving)
    this.elementManager.triangleStill();
    
}

/**
 * when pointer leaves
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerLeave = function(id, position) {
      this.removePointer(id, position);
}

/**
 * 
 * @param {number} id
 * @returns {Boolean}
 */
PointerManager.prototype.hasPointer = function(id) {
    return typeof this.pointers[id] != 'undefined';
}

/**
 * 
 * @param {number} id
 * @param {vector} initialPosition
 * @returns {undefined}
 */
PointerManager.prototype.addPointer = function(id, initialPosition) {
    this.pointers[id] = new Pointer(id, initialPosition);
    
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
PointerManager.prototype.movePointer = function(id, position) {
    this.pointers[id].move(position);
}

/**
 * 
 * @param {number} id
 * @param {vector} position
 * @returns {undefined}
 */
PointerManager.prototype.removePointer = function(id, position) {
    delete this.pointers[id];
}

/**
 * 
 * @returns {undefined}
 */
PointerManager.prototype.drawPointerDebugOverlay = function() {
    for (var id in this.pointers) {
        this.pointers[id].drawDebugOverlay();
    }
}


/**
 * Pointer that is saved in the pointerManager, touch screen/ mouse 
 * @param {number} id
 * @param {vector} initialPosition
 * @returns {Pointer}
 */
// <editor-fold desc="Element">
function Pointer(id, initialPosition) {
    /**
     * each pointer will be assigned to an id
     * @type {number} id
     */
    this.id = id;
    
    /**
     * Point 
     * @type {vector} position
     */
    this.position = initialPosition.clone();
    
    /**
     * @type {boolean} isActive
     */
    this.isActive = false;
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 * @constructor
 */
Pointer.prototype.move = function(position) {
    this.position.setX(position.getX());
    this.position.setY(position.getY());
}

/**
 * 
 * @param {vector} position
 * @returns {Pointer.prototype@pro;position@call;clone}
 */
Pointer.prototype.getPosition = function(position) {
    return this.position.clone();
}

/**
 * 
 * @returns {{boolean} isActive|Boolean}
 */
Pointer.prototype.getIsActive = function() {
    return this.isActive;
}

/**
 * 
 * @returns {undefined}
 */
Pointer.prototype.drawDebugOverlay = function() {

    if(this.getIsActive()){
        var position = this.getPosition()
        
    }else{
        var position = this.getPosition()
    }
}

/**
 * 
 * @returns {undefined}
 */
Pointer.prototype.activate = function() {
    this.isActive = true;
}

/**
 * 
 * @returns {undefined}
 */
Pointer.prototype.deactivate = function() {
    this.isActive = false;
}
// </editor-fold>
