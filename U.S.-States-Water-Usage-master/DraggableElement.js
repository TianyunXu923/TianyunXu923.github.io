/**
 * 
 * Draggable elemenets: waterSymbol
 * @returns {DraggableElement}
 */

function DraggableElement(){
    
}
/**
 * distance the element moves
 * @type {number} distance
 */
this.distance = 0;

/**
 * instantiate HitTestableElement, hit test designed for cicles
 * @extends {HitTestableElement} DraggableElement
 */
DraggableElement.prototype = new HitTestableElement();

/**
 * 
 * @returns {DraggableElement.distance}
 */
DraggableElement.prototype.getDistance = function(){
    return this.distance;
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
DraggableElement.prototype.resetPosition = function(position){

 }
 
 DraggableElement.prototype.draw = function(g){

 }

/**
 * Draggable element: triangle flag
 * @returns {DraggableElement2}
 */
function DraggableElement2(){
    
}

/**
 * distance the element moves
 * @type {number} distance
 */

this.distance = 0;

/**
 * instantiate HitTestableElement2, which is designed for non-cicle elements
 * @extends HitTestableElement2
 */
DraggableElement2.prototype = new HitTestableElement2();

/**
 * 
 * @returns {DraggableElement2.distance}
 */
DraggableElement2.prototype.getDistance = function(){
    return this.distance;
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
DraggableElement2.prototype.resetPosition = function(position){
    
 }

/**
 * Shape for waterSymbol, instantiate DraggableElement
 * @returns {Shape}
 */
function Shape(){
    /**
     * @type {String} fillColor
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
}

/**
 * instantiate DraggableElement for waterSymbol
 * @extends DraggableElement
 */
Shape.prototype = new DraggableElement();

/**
 * set level of transparency 
 * @param {number} alpha
 * @returns {undefined}
 */
Shape.prototype.setAlpha = function(alpha){
    this.alpha = alpha;
}

/**
 * 
 * @param {string} color
 * @returns {undefined}
 */
Shape.prototype.setFillColor = function(color){
    this.fillColor = color;
}

/**
 * 
 * @param {string} color
 * @returns {unresolved}
 */
Shape.prototype.getFillColor = function(color){
    return Shape.fillColor.clone();
}

/**
 * 
 * @param {stirng} color
 * @returns {undefined}
 */
Shape.prototype.setStrokeColor = function(color){
    this.strokeColor = color;
}

/**
 * 
 * @param {string} color
 * @returns {unresolved}
 */
Shape.prototype.getStrokeColor = function(color){
    return Shape.strokeColor.clone();
}

/**
 * 
 * @param {string} real
 * @returns {undefined}
 */
Shape.prototype.setStrokeThickness = function(real){
    this.strokeThickness = real;
}

/**
 * 
 * @param {string} color
 * @returns {unresolved}
 */
Shape.prototype.getStrokeThickness = function(color){
    return Shape.strokeThickness.clone();
}

/**
 * used when shape moves
 * @param {vector} position
 * @returns {undefined}
 */
Shape.prototype.updatePosition = function(position){
    this.position = position;
}

/**
 * 
 * @param {canvas} g
 * @returns {undefined}
 */
Shape.prototype.draw = function(g){

}

/**
 * shape for non-waterSymbol, initiated from DraggableElement2
 * @returns {Shape2}
 */
function Shape2(){
    /**
     * @type {String} fillColor
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
}

/**
 * instantiate DraggableElement2 for non-waterSymbol
 * @extends DraggableElement2
 */
Shape2.prototype = new DraggableElement2();

/**
 * set level of transparency
 * @param {number} alpha
 * @returns {undefined}
 */
Shape2.prototype.setAlpha = function(alpha){
    this.alpha = alpha;
}

/**
 * 
 * @param {string} color
 * @returns {undefined}
 */
Shape2.prototype.setFillColor = function(color){
    this.fillColor = color;
}

/**
 * 
 * @param {string} color
 * @returns {unresolved}
 */
Shape2.prototype.getFillColor = function(color){
    return Shape.fillColor.clone();
}

/**
 * 
 * @param {string} color
 * @returns {undefined}
 */
Shape2.prototype.setStrokeColor = function(color){
    this.strokeColor = color;
}

/**
 * 
 * @param {string} color
 * @returns {unresolved}
 */
Shape2.prototype.getStrokeColor = function(color){
    return Shape.strokeColor.clone();
}

/**
 * 
 * @param {string} real
 * @returns {undefined}
 */
Shape2.prototype.setStrokeThickness = function(real){
    this.strokeThickness = real;
}

/**
 * 
 * @param {string} color
 * @returns {unresolved}
 */
Shape2.prototype.getStrokeThickness = function(color){
    return Shape.strokeThickness.clone();
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
Shape2.prototype.updatePosition = function(position){
    this.position = position;
}

/**
 * 
 * @param {canvas} g
 * @returns {undefined}
 */
Shape2.prototype.draw = function(g){

}





// <editor-fold desc="Rectangle">
/**
 * Inheritance of Shape
 * @returns {Rectangle}
 */
function Rectangle(){
    
}

/**
 * Inherite Shape
 * @extends Shape
 */
Rectangle.prototype = new Shape();

/**
 * draw rectangle
 * @param {canvas} g
 * @returns {undefined}
 */
Rectangle.prototype.draw = function(g){

    g.beginPath();
    
    g.rect(this.position.getX(),this.position.getY(),this.width,this.height);
    g.fillStyle = this.fillColor;

    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
}
//</editor-fold>

// <editor-fold desc="circle">
/**
 * Inherite Shape
 * @returns {Circle}
 */
function Circle(){
    
}    
/**
 * Inherite Shape
 * @extends Shape
 */
Circle.prototype = new Shape();

/**
 * draw circle
 * @param {canvas} g
 * @returns {undefined}
 */
Circle.prototype.draw = function(g){
    g.beginPath();
    g.ellipse(this.position.getX(), this.position.getY(), this.width/2,
    this.height/2, 0, 2*Math.PI, false);
    g.fillStyle = this.fillColor;
    g.globalAlpha = this.alpha;
    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
}
//</editor-fold>

/**
 * Manager all waterSymbols
 * @param {ElementManager} elementManager
 * @param {number} windowWidth
 * @param {number} windowHeight
 * @returns {WaterSymbolManager}
 * @constructor
 */
function WaterSymbolManager(elementManager, windowWidth, windowHeight){
    /**
     * get ElementManager passed by the parameter, get the access 
     * @type {ElementManager} elemenetManager
     */
    this.elementManager = elementManager;
    
    /**
     * @type {number} windowWidth
     */
    this.windowWidth = windowWidth;
    
    /**
     * @type {number} windowHeight
     */
    this.windowHeight = windowHeight;
    
    /**
     * instantiate StateDataManager, where all the data is loaded
     * @type {StateDataManager} dataSource
     */
    this.dataSource = new StateDataManager(this);
    
    /**
     * contains all waterSymbols
     * @type {array} allSymbol
     */
    this.allSymbol = [];
    
    /**
     * indicate where triangle is
     * @type {number} triangleState
     */
    this.triangleState;
    
    /**
     * where triangle flag is between two time marks
     * @type {number} percentage
     */
    this.percentage;
    
}

/**
 * Will be called in data.js StateDataManager after data is loaded
 * @param {array} stateData
 * @returns {undefined}
 */
WaterSymbolManager.prototype.onStateDataLoaded = function(stateData) {
    this.initialize(stateData);
}

/**
 * 
 * @returns {Number|{number} windowWidth}
 */
WaterSymbolManager.prototype.getWindowWidth = function(){
    return this.windowWidth;
}

/**
 * 
 * @returns {Number|{number} windowHeight}
 */
WaterSymbolManager.prototype.getWindowHeight = function(){
    return this.windowHeight;
}

/**
 * set waterSymbol state name, state abbreviation, year data, position, color
 * @param {array} stateData
 * @returns {undefined}
 */
WaterSymbolManager.prototype.initialize = function(stateData){
    var allStatesInfo = stateData;   
    var i = 0;
    
    while(i < allStatesInfo.length){

        var wSymbol = new waterSymbol(this.elementManager);
        
        wSymbol.setStateName(allStatesInfo[i].getStateName());
        
        wSymbol.setStateAbbreviation(allStatesInfo[i].getStateAbbreviation());

        var allYearData = [allStatesInfo[i].get1985Data(), 
            allStatesInfo[i].get1995Data(), allStatesInfo[i].get2000Data(),
            allStatesInfo[i].get2005Data(), allStatesInfo[i].get2010Data()];
        // raius is normalized by dividing the original number by 400
        
        //alert(allStatesInfo[i].getStateName() +allStatesInfo[i].getPosition().getY());
        wSymbol.setRadius(allStatesInfo[i].get1985Data()/400);
        wSymbol.setAllYearData(allYearData);
        wSymbol.setYear(1985);
        wSymbol.setPosition(allStatesInfo[i].getPosition());
    
        wSymbol.setOriginalCoordination(allStatesInfo[i].getPosition());
        wSymbol.setAlpha("0.8");
        wSymbol.setWindowWidth(this.windowWidth);
        wSymbol.setWindowHeight(this.windowHeight);
        

        
        wSymbol.setFillColor("#7FFFD4");
        // state name color will be a random color to distinguish
        var randomColors = new randomColor();
        wSymbol.setSignColor(randomColors.getRandomColor());
        wSymbol.setWaterSymbolColor(randomColors.getRandomColor());
  
        wSymbol.setStrokeColor("#7FFFD4");
        wSymbol.setStrokeThickness(1);
        // push the informed wSymbol into the elementManager
        this.elementManager.elements.push(wSymbol);
        i++;
    }
        // in case window is resized
        var backgroundImageWidthRatio =1;
        var backgroundImageHeightRatio =1;
        if(this.windowWidth < 1030){
               backgroundImageWidthRatio = this.windowWidth/1030;
        
            }
    
        if(this.windowHeight < 520){
                backgroundImageHeightRatio = this.windowHeight/520;
            }
        
        
        // add graphButton after waterSymbols are drawn so that graph will be 
        // over waterSymbols
        var graphButton = new Button(this.windowWidth, this.windowHeight);
        graphButton.setPosition(new Point(860 *backgroundImageWidthRatio, 
        430*backgroundImageHeightRatio));
        graphButton.setWidth(30*backgroundImageWidthRatio);
        graphButton.setHeight(15*backgroundImageHeightRatio);   
        graphButton.setFillColor("blue");
        graphButton.setStrokeColor("black");
        graphButton.setStrokeThickness(1);
        this.elementManager.elements.push(graphButton);
        
        // draw zoom in button
        var zoomInButton = new zoom(graphButton, this.windowWidth, this.windowHeight);
        zoomInButton.setPosition(new Point(905*backgroundImageWidthRatio, 
        430*backgroundImageHeightRatio));
        zoomInButton.setWidth(15*backgroundImageWidthRatio);
        zoomInButton.setHeight(15*backgroundImageHeightRatio);   
        zoomInButton.setText("+");
        zoomInButton.setFillColor("blue");
        zoomInButton.setStrokeColor("black");
        zoomInButton.setStrokeThickness(1);
        zoomInButton.setFunctionMark("zoomIn");       
        this.elementManager.elements.push(zoomInButton);
        
        // draw zoom out button
        var zoomOutButton = new zoom(graphButton);
        zoomOutButton.setPosition(new Point(930*backgroundImageWidthRatio, 
        430*backgroundImageHeightRatio));
        zoomOutButton.setWidth(15*backgroundImageWidthRatio);
        zoomOutButton.setHeight(15*backgroundImageHeightRatio);   
        zoomOutButton.setText("-");
        zoomOutButton.setFillColor("blue");
        zoomOutButton.setStrokeColor("black");
        zoomOutButton.setStrokeThickness(1);
        zoomOutButton.setFunctionMark("zoomOut");  
        this.elementManager.elements.push(zoomOutButton);
              
}

/**
 * 
 * @param {number} p
 * @returns {undefined}
 */
WaterSymbolManager.prototype.setPercentage = function(p){
    this.percentage = p;
}

/**
 * 
 * @param {number} s
 * @returns {undefined}
 */
WaterSymbolManager.prototype.setTriangleState = function(s){
    this.triangleState = s;
}

/**
 * draw waterSymbol in the waterSymbolManager, update waterSymbol whenever 
 * triangle state and location is changed
 * @param {canvas} g
 * @returns {undefined}
 */
WaterSymbolManager.prototype.draw = function(g){

}

/**
 * water symbol that represents the amount of water each state uses
 * in gallon/day, instantiation of Circle
 * @param {ElementManager} elementManager
 * @returns {waterSymbol}
 * @constructor
 */
function waterSymbol(elementManager){
    /**
     * passed by the parameter, get access to the elementManager
     * @type {ElementManager} elementManager
     */
    this.elementManager = elementManager;
    /**
     * @type {string} stateName
     */
    this.stateName;
    /**
     * @type {string} stateAbbreviation
     */
    this.stateAbbreviation;
    /**
     * @type {number} year
     */
    this.year;
    /**
     * default: 1; indicate where the triangle flag is 
     * @type {number} triangleState
     */
    this.triangleState = 1;
    /**
     * default: 0; indicate how much the triangle flag is away from the first 
     * year mark to the second year mark
     * @type {number} percentage
     */
    this.percentage = 0;
    /**
     * contains water withdrawl data in 1985, 1995, 2000, 20005, 2010
     * @type {array} allYearData
     */
    this.allYearData = [];
    /**
     * where waterSymbol is located when it's first drawn  
     * @type {vector} orginalCoordination
     */
    this.originalCoordination;
    /**
     * if the waterSymbol is in the dataBox
     * @type {boolean} isInGraph
     */
    this.isInGraph = false;
    /**
     * line chart color (called in button.js)
     * @type {string} signColor
     */
    this.signColor;
    /**
     * color of the state name
     * @type {string} wordColor
     */
    this.wordColor;
    /**
     * @type {number} windowWidth
     */
    this.windowWidth;
    /**
     * @type {number} windowHeight
     */
    this.windowHeight;
    
}

/**
 * instantiation of Circle, waterSymbol has circle shape
 * @extends Circle
 */
waterSymbol.prototype = new Circle();

/**
 * 
 * @param {string} s
 * @returns {undefined}
 */
waterSymbol.prototype.setStateName = function(s){
    this.stateName = s;
}

/**
 * 
 * @param {string} a
 * @returns {undefined}
 */
waterSymbol.prototype.setStateAbbreviation = function(a){
    this.stateAbbreviation = a;
}

/**
 * 
 * @returns {{string} stateAbbreviation|String}
 */
waterSymbol.prototype.getStateAbbreviation = function(){
    return this.stateAbbreviation;
}

/**
 * set state name color
 * @param {string} c
 * @returns {undefined}
 */
waterSymbol.prototype.setWaterSymbolColor = function(c){
    this.wordColor = c;
}

/**
 * 
 * @returns {{string} stateName|String}
 */
waterSymbol.prototype.getStateName = function(){
    return this.stateName;
}

/**
 * set both waterSymbol width and height to r
 * @param {number} r
 * @returns {undefined}
 */
waterSymbol.prototype.setRadius = function(r){
    this.width = r;
    this.height = r;
}

/**
 * 
 * @returns {{number} year}
 */
waterSymbol.prototype.getYear = function(){
    return this.year;
}

/**
 * 
 * @param {number} y
 * @returns {undefined}
 */
waterSymbol.prototype.setYear = function(y){
    this.year = y;
}

/**
 * save array of 5 years' water withdrawl data into this.allYearData
 * @param {array} y
 * @returns {undefined}
 */
waterSymbol.prototype.setAllYearData = function(y){
    this.allYearData = y;
}

/**
 * get array of 5 years' water withdrawl data into this.allYearData
 * @returns {Array|array}
 */
waterSymbol.prototype.getAllYearData = function(){
    return this.allYearData;
}

/**
 * 
 * @param {number} p
 * @returns {undefined}
 */
waterSymbol.prototype.setPercentage = function(p){
    this.percentage = p;
}

/**
 * 
 * @param {number} s
 * @returns {undefined}
 */
waterSymbol.prototype.setTriangleState = function(s){
    this.triangleState = s;
}

/**
 * save the initial waterSymbol position
 * @param {type} o
 * @returns {undefined}
 */
waterSymbol.prototype.setOriginalCoordination = function(o){
    this.originalCoordination = o;
}

/**
 * 
 * @returns {type|{vector} orginalCoordination}
 */
waterSymbol.prototype.getOriginalCoordination = function(){
    return this.originalCoordination;
}

/**
 * if it's in the dataBox
 * @returns {undefined}
 */
waterSymbol.prototype.setIsInGraphTrue = function(){
    this.isInGraph = true;
}

/**
 * if it's not in the dataBox
 * @returns {undefined}
 */
waterSymbol.prototype.setIsInGraphFalse = function(){
    this.isInGraph = false;
}

/**
 * 
 * @returns {{boolean} isInGraph|Boolean}
 */
waterSymbol.prototype.getIsInGraph = function(){
    return this.isInGraph;
}

/**
 * set line chart color
 * @param {string} s
 * @returns {undefined}
 */
waterSymbol.prototype.setSignColor = function(s){
    this.signColor = s;
}

/**
 * 
 * @returns {String|{string} signColor}
 */
waterSymbol.prototype.getSignColor = function(){
    return this.signColor;
}

/**
 * 
 * @param {number} w
 * @returns {undefined}
 */
waterSymbol.prototype.setWindowWidth = function(w){
    this.windowWidth = w;
}

/**
 * 
 * @param {number} h
 * @returns {undefined}
 */
waterSymbol.prototype.setWindowHeight = function(h){
    this.windowHeight = h;
}

/**
 * draw waterSymbol, update it's size whenever triangle flag moves
 * @param {canvas} g
 * @returns {undefined}
 */
waterSymbol.prototype.draw = function(g){
    var percentage = this.elementManager.getScrollPercentage();
    
    var triangleState = this.elementManager.getTriangleStateE();
    // data of first year mark where triangle is located in between
    var year1;
    // data of second year mark where triangle is located in between
    var year2;
    // the amount of water usuage according to where triangle is located between
    // two marks
    var yearData;
    
    // different triangle state coorelates to different year1 and year2 data
    if(this.elementManager.getTriangleMove() === true){
        if(triangleState === 1){
                year1 = this.allYearData[0];
                year2 = this.allYearData[1];
            }
            else if(triangleState === 2){
                year1 = this.allYearData[1];
                year2 = this.allYearData[2];
            }
            else if(triangleState === 3){
                year1 = this.allYearData[2];
                year2 = this.allYearData[3];
            }
            else if(triangleState === 4){
                year1 = this.allYearData[3];
                year2 = this.allYearData[4];
            }
            
            // the exact water usuage data caluclated according to the position 
            // the triangle is located between two year datas
            var diff = year2-year1;
            var diff2 = Math.round(diff*percentage);
            var all3 = year1/400 + diff2/400;
            yearData = Math.round(year1/400 + (year2-year1)*percentage/400); 
            
            // in case window is resized
            var radiusRatio =1;
            if(this.windowWidth < 1030){
               radiusRatio = this.windowWidth/1030;
        
            }
    
            if(this.windowHeight < 520){
                radiusRatio = this.windowHeight/520;
            }

            this.width = yearData *radiusRatio;
            this.height = yearData * radiusRatio;
     
    }

    else{
            var radiusRatio =1;
            if(this.windowWidth < 1030){
               radiusRatio = this.windowWidth/1030;
        
            }
    
            if(this.windowHeight < 520){
                radiusRatio = this.windowHeight/520;
            }
            
    }
    
    // test bug
    if (typeof g == 'undefined') {
        var test = 1;      
    }
    g.beginPath();
    // draw waterSymbol
    g.arc(this.position.getX(), this.position.getY(), this.width/2*radiusRatio,
    this.height/2*radiusRatio, 0, 2*Math.PI, false);
    g.fillStyle = this.fillColor;
    g.globalAlpha = this.alpha;
    
    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
    g.font = "12px Comic Sans MS";
    g.fillStyle = this.wordColor;
    
    g.fillText(this.stateAbbreviation, this.position.getX()-this.width/3*radiusRatio, 
    this.position.getY()+this.height/4*radiusRatio);
    g.closePath();
   

}


/**
 * generate random color
 * Reference source: 
 * http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
 * @returns {randomColor}
 * @constructor
 */

function randomColor(){
    }
    
randomColor.prototype.getRandomColor = function(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    //console.log(color);
    return color;
}