/**
 * Element on the canvas
 * @returns {Element}
 * @constructor
 */

function Element() {
    /**
     * @type {number} width
     */
    this.width = 0;
    /**
     * @type {number} height
     */
    this.height = 0;
    /**
     * @type {vector} position
     */
    this.position = new Point(0, 0);
    /**
     * array that stores all elements
     * @type {array} children
     */
    this.children = [];
    /**
     * if the element is triangle flag
     * @type {boolean} isFlag
     */
    this.isFlag = false;
    /**
     * if the element is a button
     * @type {boolean} isButton
     */
    this.isButton = false;
    /**
     * y position of the triangle flag
     * @type {number} triangleY
     */
    this.triangleY;
    /**
     * left x value of the scrollBar
     * @type {number} scrollBarX1
     */
    this.scrollBarX1;
    /**
     * right x value of the scrollBar
     * @type {number} scrollBarX2
     */
    this.scrollBarX2;

    //for waterSymbol
    /**
     * waterSymbol data percentage
     * @type {number} percentageOfData
     */
    this.percentageOfData = 0;
    /**
     * triangle state, signal to waterSymbol
     * @type {number} triangleState
     */
    this.triangleState = 1;
}

/**
 * 
 * @param {number} width
 * @returns {undefined}
 */
Element.prototype.setWidth = function(width) {
    this.width = width;
}

/**
 * 
 * @param {number} height
 * @returns {undefined}
 */
Element.prototype.setHeight = function(height) {
    this.height = height;
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
Element.prototype.setPosition = function(position) {
    this.position = position.clone();
}

/**
 * limit triangle's moving area within the scrollBar
 * @param {vector} position
 * @returns {undefined}
 */
Element.prototype.setTrianglePosition = function(position){
    var newPosition = position.clone();
    //console.log(this.scrollBarX2);
    if(newPosition.getX() < this.scrollBarX2-10 && 
            newPosition.getX() > this.scrollBarX1 +10){
        this.position = new Point(newPosition.getX(), this.triangleY);
    }
    else if(newPosition.getX() >= this.scrollBarX2 -10){
        this.position = new Point(this.scrollBarX2-10, this.triangleY);   
    }
    else if(newPosition.getX() <= this.scrollBarX1+10){
        this.position = new Point(this.scrollBarX1+10, this.triangleY);   
    }
}

/**
 * pass triangle state and percenatge of data to waterSymbol when triangle moves
 * among different year marks
 * @param {vector} position
 * @returns {undefined}
 */
Element.prototype.updateYearForWaterSymbol = function(position){
    var trianglePosition = position.clone();
    var width = this.scrollBarX2 - this.scrollBarX1;
    var triangleX = trianglePosition.getX();
    
    if(triangleX > this.scrollBarX1 + 10 && 
            triangleX < this.scrollBarX1 + width*2/5 ){
            this.percentageOfData = (triangleX - this.scrollBarX1)/(2*width/5);
            this.triangleState = 1;
    }
    else if(triangleX >= this.scrollBarX1 + width*2/5 &&
            triangleX < this.scrollBarX1 + width*3/5){
            this.percentageOfData = (triangleX - this.scrollBarX1 
                    - width*2/5)/(3*width/5); 
            this.triangleState = 2;
    }
    else if(triangleX >= this.scrollBarX1 + width*3/5 &&
            triangleX < this.scrollBarX1 + width*4/5){
            this.percentageOfData = (triangleX - this.scrollBarX1 
                    - width*3/5)/(4*width/5); 
            this.triangleState = 3;
    }
    else if(triangleX >= this.scrollBarX1 + width*4/5 &&
            triangleX < this.scrollBarX2 -10){
            this.percentageOfData = (triangleX - this.scrollBarX1 
                    - width*4/5)/(width/5 - 10); 
            this.triangleState = 4;
    }

}

/**
 * 
 * @returns {{number} scrollBarX1|Number|{number} percentageOfData|width|triangleX}
 */
Element.prototype.getScrollBarPercentage = function(){
   
    return this.percentageOfData;
}

/**
 * 
 * @returns {Number|{number} triangleState}
 */
Element.prototype.getTriangelState = function(){
    // console.log(this.triangleState);
    return this.triangleState;
}

/**
 * 
 * @returns {Element.prototype@pro;position@call;clone}
 */
Element.prototype.getPosition = function() {
    return this.position.clone();
}

/**
 * if the element is a triangle flag
 * @returns {{boolean} isFlag|Boolean}
 */
Element.prototype.isFlag = function(){
    return this.isFlag;
}

/**
 * draw all the elements 
 * @param {canvas} g
 * @returns {undefined}
 */
Element.prototype.draw = function(g) {
   

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].draw(g);
    }

}

/**
 * add element into the this.children array
 * @param {element} element
 * @returns {undefined}
 */
Element.prototype.addChild = function(element) {
    this.children.push(element);
}

/**
 * HitTestable element for circles (waterSymbol)
 * @returns {HitTestableElement}
 */
function HitTestableElement(){
    
}

/**
 * instantiate Element 
 * @extends Element
 */
HitTestableElement.prototype = new Element();

/**
 * hit test for circles 
 * @param {vector} p
 * @returns {Element.hitTest.a|Boolean}
 */
HitTestableElement.prototype.hitTest = function(p){

    var a= ((p.getX() > this.position.getX() - this.width/2)&& 
            (p.getX()< this.position.getX() + this.width/2) &&
            (p.getY() > this.position.getY() - this.height/2) &&
            (p.getY() < this.position.getY() + this.height/2));

    return a;
}

/**
 * HitTestable elements for non-circles
 * @returns {HitTestableElement2}
 */
function HitTestableElement2(){
    
}

/**
 * instantiate Element
 * @extends Element
 */
HitTestableElement2.prototype = new Element();

/**
 * hit test for non-circles
 * @param {vector} p : position
 * @returns {Element.hitTest.a|Boolean}
 */
HitTestableElement2.prototype.hitTest = function(p){

    var a= ((p.getX() > this.position.getX() - this.width)&& 
            (p.getX()< this.position.getX() + this.width) &&
            (p.getY() > this.position.getY() - this.height) &&
            (p.getY() < this.position.getY() + this.height));

    return a;
}

