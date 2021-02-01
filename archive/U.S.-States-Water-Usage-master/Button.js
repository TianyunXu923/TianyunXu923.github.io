/**
 * It creates the graph button, when click the button, a rectangle will be drawn,
 * with coordinations and titles. Line charts of selected states will also be
 * drawn.
 *  
 * @param {number} windowWidth
 * @param {number} windowHeight
 * @returns {Button}
 */
function Button(windowWidth, windowHeight){
    /**
     * Will signal pointerManger that the element is a button
     * @type {boolean}
     */
    this.isButton = true;
    /**
     * color
     * @type {string} fillColor
     */
    this.fillColor = "#CCCCCC";
    /**
     * @type {string} strokeThickness
     */
    this.strokeThickness = "1";
    /**
     * color
     * @type {string} strokeColor
     */
    this.strokeColor = "#CCCCCC";
    /**
     * Default: false, when the button is clicked, it will be true, then signal
     * the draw function to draw the rectangle and line chart. 
     * @type {boolean} click
     */
    this.click = false;
    /**
     * contains all states' information 
     * @type {array} graphState
     */
    this.graphState = [];
    /**
     * used in scaling the y coordination
     * @type {number} lineChartRatio
     */
    this.lineChartRatio = 220;
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
 * instantiate HitTestableElement2, Button is hit-testable
 * @extends {HitTestableElement2} Button
 */
Button.prototype = new HitTestableElement2();

/**
 * 
 * set level of transparency 
 * @param {number} alpha
 * @returns {undefined}
 * 
 */

Button.prototype.setAlpha = function(alpha){
    this.alpha = alpha;
}

/**
 * set color of the button 
 * @param {string} color
 * @returns {undefined}
 */
Button.prototype.setFillColor = function(color){
    this.fillColor = color;
}

/**
 * set stroke line color
 * @param {string} color
 * @returns {undefined}
 */
Button.prototype.setStrokeColor = function(color){
    this.strokeColor = color;
}

/**
 * 
 * @returns {string} Button.strokeColor
 */
Button.prototype.getStrokeColor = function(){
    return Button.strokeColor.clone();
}

/**
 * 
 * @param {number} real
 * @returns {undefined}
 */
Button.prototype.setStrokeThickness = function(real){
    this.strokeThickness = real;
}

/**
 * 
 * @returns {number} Button.strokeThickness
 */
Button.prototype.getStrokeThickness = function(){
    return Button.strokeThickness.clone();
}

/**
 * reset the position
 * @param {vector} position
 * @returns {undefined}
 */
Button.prototype.updatePosition = function(position){
    this.position = position;
}

/**
 * pass the value(should be an array) to this.graphState
 * @param {array} s
 * @returns {undefined}
 */
Button.prototype.setGraphState = function(s){
    this.graphState = s;
}

/**
 * Like a controller, turn this.isClick false to true, or true to false
 * @returns {undefined}
 */
Button.prototype.isClick = function(){
    if(this.click != true){
        this.click = true;
    }
    else{
        this.click = false;
    }
}

/**
 * increase this.lineChartRatio by 20, scale y coordinate down
 * @returns {undefined}
 */
Button.prototype.increaseLineChartRatio = function(){
    this.lineChartRatio = this.lineChartRatio + 20;
}

/**
 * decrease this.lineChartRatio by 20, scale y coordinate up
 * @returns {undefined}
 */
Button.prototype.decreaseLineChartRatio = function(){
    this.lineChartRatio = this.lineChartRatio - 20;
}

/**
 * set this.lineChartRatio back to default value, which is 220
 * @returns {undefined}
 */
Button.prototype.defaultLineChartRatio = function(){
    this.lineChartRatio = 220;
}

/**
 * graph the button, graph line charts when button is first clicked, ungraph
 * when button is clicked again 
 * @param {canvas} g
 * @returns {undefined}
 */
Button.prototype.draw = function(g){
    g.beginPath();
    
    // graph the button
    g.rect(this.position.getX(),this.position.getY(),this.width,this.height);
    g.fillStyle = this.fillColor;

    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
    
   
    // graph the line chart
    if(this.click != false){
        
        // when window is resized 
        var backgroundImageWidthRatio =1;
        var backgroundImageHeightRatio =1;
        if(this.windowWidth < 1030){
               backgroundImageWidthRatio = this.windowWidth/1030;        
            }
    
        if(this.windowHeight < 520){
                backgroundImageHeightRatio = this.windowHeight/520;
            }
        // background rectangle    
        g.rect(170*backgroundImageWidthRatio,50*backgroundImageHeightRatio,
        620*backgroundImageWidthRatio,350*backgroundImageHeightRatio);
        g.fillStyle = "white";
        g.globalAlpha = 0.9;
        g.fill();
        g.lineWidth = 2;
        g.strokeStyle = "black";
        g.stroke();
        // coordinates and years
        g.font="14px Arial";
        g.fillStyle = "black";
        g.globalAlpha = 1;
        g.fillText("1985", 200*backgroundImageWidthRatio,
        395*backgroundImageHeightRatio);
        g.fillText("1995", 320*backgroundImageWidthRatio, 
        395*backgroundImageHeightRatio);
        g.fillText("2000", 440*backgroundImageWidthRatio, 
        395*backgroundImageHeightRatio);
        g.fillText("2005", 560*backgroundImageWidthRatio, 
        395*backgroundImageHeightRatio);
        g.fillText("2010", 680*backgroundImageWidthRatio, 
        395*backgroundImageHeightRatio);
        g.fillText("Total Water Withdrawals by State and Year", 355*backgroundImageWidthRatio,
        70*backgroundImageHeightRatio);
     
        
        // x coordinate
        g.moveTo(200*backgroundImageWidthRatio, 380*backgroundImageHeightRatio);
        g.lineTo(760*backgroundImageWidthRatio, 380*backgroundImageHeightRatio);
        g.lineWidth = "1";
        g.stroke();
               
        // y coordinate
          g.fillText("0", 180*backgroundImageWidthRatio, 
          385*backgroundImageHeightRatio);
//        g.fillText("10000", 205,329);
//        g.fillText("20000", 205, 273);
//        g.fillText("30000", 205, 217);
//        g.fillText("40000", 205, 161);
          g.font = "10px Arial";
          g.fillText("Unit: Mgal/ day", 210*backgroundImageWidthRatio,
          95*backgroundImageHeightRatio);
        
        g.moveTo(200*backgroundImageWidthRatio, 380*backgroundImageHeightRatio);
        g.lineTo(200*backgroundImageWidthRatio, 100*backgroundImageHeightRatio);
        g.lineWidth = "1";
        g.stroke();
        
        // line charts for states that are moved into the dataBox
        for(var i =0; i < this.graphState.length; i++){
            // information of states that are in the dataBox are saved in the
            // this.graphState already
            var allYearData = this.graphState[i].getAllYearData();
         
            for(var j = 0; j < allYearData.length; j++){
               
                g.beginPath();
                
                var height = 350 - Math.round
                (allYearData[j]/this.lineChartRatio);
                var x = 210+ 120*j;
                // if the line chart is not out of the box
                if(height >= 50){
                    g.arc(x*backgroundImageWidthRatio, 
                    height*backgroundImageHeightRatio, 2.5, 0, 2*Math.PI);
                g.fillStyle = this.graphState[i].getSignColor();
                g.strokeStyle = this.graphState[i].getSignColor();
                g.fill();
                g.font = "11px Arial";
                g.fillText(allYearData[j], (x-20)*backgroundImageWidthRatio,
                (height-5)*backgroundImageHeightRatio );
                if(j !=0){
                    g.moveTo((210+120*(j-1))*backgroundImageWidthRatio, 
                    (350 - Math.round(allYearData[j-1]/this.lineChartRatio))
                            *backgroundImageHeightRatio);
                    g.lineTo(x*backgroundImageWidthRatio,
                    height*backgroundImageHeightRatio);
                    g.stroke();
                }
                g.closePath();
                
            }
        }
//            g.fillText(this.graphState[i].getStateAbbreviation(),
//            230+120*4,350 - Math.round(allYearData[4]/220) );
            // only display state's name when the line chart is in the rectangle
            if((350 - Math.round(allYearData[4]/this.lineChartRatio)) >50){
                g.fillText(this.graphState[i].getStateName(),
                (230+120*4)* backgroundImageWidthRatio,
                (350 - Math.round(allYearData[4]/this.lineChartRatio))
                    *backgroundImageHeightRatio );
            
            }
        }
    }
    
    
}

/**
 * 
 * zoom in and zoom out button
 * @param {Button} graphButton
 * @param {number} windowWidth
 * @param {number} windowHeight
 * @returns {zoom}
 */
function zoom(graphButton, windowWidth, windowHeight){
    /**
     * @type {string} fillColor
     */
    this.fillColor = "#CCCCCC";
    /**
     * @type {string} strokeThickness
     */
    this.strokeThickness = "1";
     /**
     * @type {string} strokeColor
     */   
    this.strokeColor = "#CCCCCC";
    /**
     * text display on the zoom button
     * @type {string} text
     */
    this.text;
    /**
     * mark the actual function of the zoom button, ex: if it's "zoom in"
     * or "zoom out"
     * @type {string} functionMark
     */    
    this.functionMark;
    /**
     * get the value passed by the parameter 
     * @type {Button} graph
     */        
    this.graph = graphButton;
    /**
     * window width value passed by the parameter
     * @type {number} windowWidth
     */        
    this.windowWidth = windowWidth;
    /**
     * window height value passed by the parameter
     * @type {number} windowHeight
     */        
    this.windowHeight = windowHeight;
}

/**
 * instantiate HitTestableElement2, Button is hit-testable
 * @extends {HitTestableElement2} zoom
 */
zoom.prototype = new HitTestableElement2();

/**
 * set the level of transparency 
 * @param {number} alpha
 * @returns {undefined}
 */
zoom.prototype.setAlpha = function(alpha){
    this.alpha = alpha;
}

/**
 * set color of the zoom button 
 * @param {string} color
 * @returns {undefined}
 */
zoom.prototype.setFillColor = function(color){
    this.fillColor = color;
}

 /**
 * set stroke line color
 * @param {string} color
 * @returns {undefined}
 */
zoom.prototype.setStrokeColor = function(color){
    this.strokeColor = color;
}

/**
 * 
 * @returns {string} zoom.strokeColor
 */

zoom.prototype.getStrokeColor = function(){
    return zoom.strokeColor.clone();
}

/**
 * 
 * @param {number} real
 * @returns {undefined}
 */

zoom.prototype.setStrokeThickness = function(real){
    this.strokeThickness = real;
}

/**
 * 
 * @returns {number} zoom.strokeThickness
 */
zoom.prototype.getStrokeThickness = function(color){
    return zoom.strokeThickness.clone();
}


zoom.prototype.updatePosition = function(position){
    this.position = position;
}

/**
 * reset the position
 * @param {vector} position
 * @returns {undefined}
 */
zoom.prototype.setGraphState = function(s){
    this.graphState = s;
}

/**
 * set text that is displayed on the zoom button
 * @param {string} t
 * @returns {undefined}
 */
zoom.prototype.setText = function(t){
    this.text = t;
}

/**
 * set functionality of the zoom button, like "zoom in" or "zoom out"
 * @param {string} f
 * @returns {undefined}
 */
zoom.prototype.setFunctionMark = function(f){
    this.functionMark = f;
}

/**
 * 
 * @returns {{string} functionMark|String}
 */
zoom.prototype.getFunctionMark = function(){
    return this.functionMark;
}

/**
 * when called, will increase the Button.lineChartRatio, scale down (zoom out)
 * @returns {undefined}
 */
zoom.prototype.increaseGraphRatio = function(){
    this.graph.increaseLineChartRatio();
}

/**
 * when called, will decrease the Button.lineChartRatio, scale up (zoom in)
 * @returns {undefined}
 */
zoom.prototype.decreaseGraphRatio = function(){
    this.graph.decreaseLineChartRatio();
}

/**
 * when called, will set the Button.lineChartRatio back to default
 * @returns {undefined}
 */
zoom.prototype.defaultGraphRatio = function(){
    this.graph.defaultLineChartRatio();
}


/**
 * draw the zoom button
 * @param {canvas} g
 * @returns {undefined}
 */
zoom.prototype.draw = function(g){
    g.beginPath();
    
    g.rect(this.position.getX(),this.position.getY(),this.width,this.height);
    //g.fillStyle = this.fillColor;
    g.fillStyle = "blue";
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.fill();
    g.stroke();
    g.fillStyle = "white";
    
    // set up in case window is resized
    var backgroundImageWidthRatio =1;
    var backgroundImageHeightRatio =1;
    if(this.windowWidth < 1030){
        backgroundImageWidthRatio = this.windowWidth/1030;
        
        }
    
    if(this.windowHeight < 520){
        backgroundImageHeightRatio = this.windowHeight/520;
    }
    
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
        g.font = "20px Arial";
    }
    g.fillText(this.text, this.position.getX()+2*backgroundImageWidthRatio,
    this.position.getY()+13*backgroundImageHeightRatio);

}