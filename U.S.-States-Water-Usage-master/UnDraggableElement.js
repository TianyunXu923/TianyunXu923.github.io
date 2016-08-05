/**
 * 3D U.S. Map
 * @returns {BackgroundImage}
 */
function BackgroundImage(){

}

/**
 * Instantiation of Element
 * @extends Element
 */
BackgroundImage.prototype = new Element();

/**
 * load the image from url
 * @param {string} url
 * @returns {undefined}
 */
BackgroundImage.prototype.loadUrl = function(url){
    this.imageObj = new Image();
    this.imageObj.src = url;
}

/**
 * draw the image
 * @param {canvas} g
 * @returns {undefined}
 */
BackgroundImage.prototype.draw = function(g){
    var imageO = new Image();

    g.drawImage(this.imageObj, this.position.getX(),
    this.position.getY(),this.width, this.height);
        
}

/**
 * scroll bar: 1985, 1995, 2000, 2005, 2010
 * @param {type} windowWidth
 * @param {type} windowHeight
 * @returns {scrollBar}
 */
function scrollBar(windowWidth, windowHeight){
    /**
     * @type {string} fillColor
     */
    this.fillColor;
    /**
     * @type {string} strokeColor
     */
    this.strokeColor;
    /**
     * @type {string} strokeThickness
     */
    this.strokeThickness;
    /**
     * @type {string} textColor1985
     */
    this.textColor1985 = "black";
    /**
     * @type {string} textColor1995
     */
    this.textColor1995 = "black";
    /**
     * @type {string} textColor2000
     */
    this.textColor2000 = "black";
    /**
     * @type {string} textColor2005
     */
    this.textColor2005 = "black";
    /**
     * @type {string} textColor2010
     */
    this.textColor2010 = "black";
    /**
     * @type {number} windowWidth
     */
    this.windowWidth = windowWidth;
    /**
     * @type {number} windowHeight
     */
    this.windowHeight = windowHeight;
 
}

/**
 * scrollBar instantiates Element, not draggable
 * @extends Element
 */
scrollBar.prototype = new Element();

/**
 * 
 * @param {string} f
 * @returns {undefined}
 */
scrollBar.prototype.setFillColor = function(f){
    this.fillColor = f;
}
/**
 * 
 * @param {string} s
 * @returns {undefined}
 */
scrollBar.prototype.setStrokeColor = function(s){
    this.strokeColor = s;
}

/**
 * 
 * @param {string} s
 * @returns {undefined}
 */
scrollBar.prototype.setStrokeThickness = function(s){
    this.strokeThickness = s;
}

/**
 * return the left x value of the scroll bar
 * @returns {scrollBar.prototype@pro;position@call;getX}
 */
scrollBar.prototype.getScrollBarX1 = function(){
    return this.position.getX();    
}

/**
 * return the right x value of the scroll bar
 * @returns {scrollBar.prototype@pro;position@call;getX|scrollBar.width}
 */
scrollBar.prototype.getScrollBarX2 = function(){
    return this.position.getX() + this.width;
}

/**
 * 
 * @param {string} c
 * @returns {undefined}
 */
scrollBar.setTextColor1985 = function(c){
    this.textColor1985 = c;
}

/**
 * 
 * @param {string} c
 * @returns {undefined}
 */
scrollBar.setTextColor1995 = function(c){
    this.textColor1995 = c;
}

/**
 * 
 * @param {string} c
 * @returns {undefined}
 */
scrollBar.setTextColor2000 = function(c){
    this.textColor2000 = c;
}

/**
 * 
 * @param {string} c
 * @returns {undefined}
 */
scrollBar.setTextColor2005 = function(c){
    this.textColor2005 = c;
}


/**
 * 
 * @param {string} c
 * @returns {undefined}
 */
scrollBar.setTextColor2010 = function(c){
    this.textColor2010 = c;
}

/**
 * 
 * @param {canvas} g
 * @returns {undefined}
 */
scrollBar.prototype.draw = function(g){
    g.beginPath();
    
    // draw the rectangle scrollbar
    g.rect(this.position.getX(),this.position.getY(),this.width,this.height);
    g.fillStyle = this.fillColor;

    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
    g.fillStyle = "black";
    g.font = "12px Comic Sans MS";
    
    // in case the window is resized
    var backgroundImageWidthRatio=1;
    var backgroundImageHeightRatio = 1;
    if(this.windowWidth < 1030){
        backgroundImageWidthRatio =this.windowWidth / 1030; 
    }
    
    if(this.windowHeight < 520){
        backgroundImageHeightRatio = this.windowHeight / 520;
    }
    
    // text under the scroll bar
    g.fillText("1985", this.position.getX(), 
    this.position.getY()+this.height+20*backgroundImageHeightRatio);
    g.fillText("1995", this.position.getX() + this.width*2/5, 
    this.position.getY()+this.height+20*backgroundImageHeightRatio);
    g.fillText("2000", this.position.getX() + this.width*3/5, 
    this.position.getY()+this.height+20*backgroundImageHeightRatio);
    g.fillText("2005", this.position.getX() + this.width*4/5, 
    this.position.getY()+this.height+20*backgroundImageHeightRatio);
    g.fillText("2010", this.position.getX() + this.width-30, 
    this.position.getY()+this.height+20*backgroundImageHeightRatio);
    
    g.font = "12px Arial";
    g.fillStyle = "black";
    g.fillText
    ("Move the slider", 50*backgroundImageWidthRatio, 
    515*backgroundImageHeightRatio);
    
    // font size changes when window size changes
    if(backgroundImageWidthRatio < 0.2){
        g.font = "5px Arial";
    }
    else if(backgroundImageWidthRatio < 0.3){
        g.font = "8px Arial";
    }
    else if(backgroundImageWidthRatio < 0.5){
        g.font = "11px Arial";
       
    }
    else if(backgroundImageWidthRatio < 0.8){
        g.font = "14px Arial";
    }
    else{
        g.font = "18px Arial";
    }
    g.fillStyle = "black";
    g.fillText
    ("Total Water Withdrawals By State (Million Gallons/ Day)",
    250*backgroundImageWidthRatio, 25*backgroundImageHeightRatio);
    
}

/**
 * dataBox: a rectangle that user can drag waterSymbol inside
 * @param {number} windowWidth
 * @param {number} windowHeight
 * @extends {DataBox}
 */
function DataBox(windowWidth, windowHeight){
    /**
     * 
     * @type {string} fillColor   
     */
    this.fillColor;
    /**
     * @type {string} strokeColor
     */
    this.strokeColor;
    /**
     * @type {number} strokeThickness
     */
    this.strokeThickness;
    /**
     * @type {number} windowWidth
     */
    this.windowWidth = windowWidth;
    /**
     * @type {number} windowHeight 
     */
    this.windowHeight = windowHeight;
}

/**
 * instantiate Element
 * @type Element
 */
DataBox.prototype = new Element();

/**
 * 
 * @param {string} f
 * @returns {undefined}
 */
DataBox.prototype.setFillColor = function(f){
    this.fillColor = f;
}

/**
 * 
 * @param {string} s
 * @returns {undefined}
 */
DataBox.prototype.setStrokeColor = function(s){
    this.strokeColor = s;
}

/**
 * 
 * @param {string} s
 * @returns {undefined}
 */
DataBox.prototype.setStrokeThickness = function(s){
    this.strokeThickness = s;
}

/**
 * 
 * @param {canvas} g
 * @returns {undefined}
 */
DataBox.prototype.draw = function(g){
    g.beginPath();
    // draw the rectangle
    g.rect(this.position.getX(),this.position.getY(),this.width,this.height);
    g.fillStyle = this.fillColor;

    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
    
    // in case window is resized, change font size accordingly
    var backgroundImageWidthRatio=1;
    var backgroundImageHeightRatio = 1;
    if(this.windowWidth < 1030){
        backgroundImageWidthRatio =this.windowWidth / 1030; 
    }
    
    if(this.windowHeight < 520){
        backgroundImageHeightRatio = this.windowHeight / 520;
    }
    
    if(backgroundImageWidthRatio < 0.4){
        g.font = "5px Arial";
        //console.log("0.4");
    }
    else if(backgroundImageWidthRatio < 0.5){
        g.font = "6px Arial";
        //console.log("0.5");
    }
    else if(backgroundImageWidthRatio < 0.6){
        g.font = "7px Arial";
        //console.log("0.6");
    }
    else if(backgroundImageWidthRatio < 0.7){
        g.font = "8px Arial";
        //console.log("0.7");
       
    }
    else if(backgroundImageWidthRatio < 0.8){
        g.font = "9px Arial";

    }
     else if(backgroundImageWidthRatio < 0.9){
        g.font = "10px Arial";
    }
    else{
       
        g.font="12px Arial";
    }
    g.fillStyle = "black";
    g.fillText("Drag circles into the box", 
    this.position.getX(), this.position.getY()-50*backgroundImageHeightRatio);
     g.fillText("Click the button below to compare",
    this.position.getX()-15*backgroundImageWidthRatio, 
    this.position.getY()-30*backgroundImageHeightRatio);
    
}

