
// <editor-fold desc="Triangle">
/**
 * Triangle flag for slider
 * @returns {Triangle}
 */
function Triangle(){
    /**
     * override the isFlag, tell the elementManager that this object is a 
     * triangle flag/slider
     * @type {boolean} isFlag
     */
    this.isFlag = true;   
}

/**
 * instantiate Shape2, which is hitTestableElement2
 * @extends Shape2
 */
Triangle.prototype = new Shape2();

/**
 * 
 * @returns {undefined}
 */
Triangle.prototype.setTriangleY = function(){
    this.triangleY = this.position.getY();
}

/**
 * called in the scrollBar function, get scrollBarX1 and scrollBarX2 and pass
 * values to the triangle function 
 * @param {scrollBar} element
 * @returns {undefined}
 */
Triangle.prototype.setScrollBarX = function(element){
    this.scrollBarX1 = element.getScrollBarX1();
    this.scrollBarX2 = element.getScrollBarX2();
}

/**
 * 
 * @returns {Triangle.prototype@pro;position@call;getX}
 */
Triangle.prototype.getTriangleX = function(){
    return this.position.getX();
}

/**
 * draw the traingle slider
 * @param {type} g
 * @returns {undefined}
 */
Triangle.prototype.draw = function(g){
    g.beginPath();
    g.moveTo(this.position.getX(), this.position.getY());
    g.lineTo(this.position.getX()+this.width/2, this.position.getY()+ this.height);
    g.lineTo(this.position.getX()-this.width/2, this.position.getY()+this.height);

    g.fillStyle = this.fillColor;
    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
    
    
}
//</editor-fold>


