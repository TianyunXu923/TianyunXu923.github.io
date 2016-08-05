/**
 * set up elements that will be displayed on the canvas
 * @returns {undefined}
 */
function setupScenario() {
    /**
     * game loop is an instantiation of customGameLoop
     * @extends CustomGameLoop
     */
    var gameLoop = new CustomGameLoop();

    gameLoop.initialize(document.getElementById("canvas"));
   // gameLoop.setCanvasSize(1200, 800);
   // in case window is resized
    var windowSizeRatio = gameLoop.getWindowSizeRatio();
    var windowWidth = gameLoop.getWindowWidth();
    var windowHeight = gameLoop.getWindowHeight();    
    var backgroundImageWidthRatio = 1;
    var backgroundImageHeightRatio = 1;
    if(windowWidth < 1030){
        backgroundImageWidthRatio =windowWidth / 1030; 
    }
    
    if(windowHeight < 520){
        backgroundImageHeightRatio = windowHeight / 520;
    }
    
    /**
     * 
     * @type BackgroundImage
     */
    var backgroundImage = new BackgroundImage();
    backgroundImage.loadUrl("us_map.png");
    backgroundImage.setPosition(new Point(50 * backgroundImageWidthRatio,
    -100 * backgroundImageHeightRatio));
    backgroundImage.setWidth(800 * backgroundImageWidthRatio);
    backgroundImage.setHeight(600 * backgroundImageHeightRatio);
    gameLoop.addElement(backgroundImage);
    
    /**
     * 
     * @type DataBox
     */
    var dataBox = new DataBox(windowWidth, windowHeight);
    dataBox.setPosition(new Point(840*backgroundImageWidthRatio,
    220 * backgroundImageHeightRatio));
    dataBox.setWidth(120 * backgroundImageWidthRatio);
    dataBox.setHeight(200 *backgroundImageHeightRatio );
    dataBox.setFillColor("white");
    dataBox.setStrokeColor("grey");
    dataBox.setStrokeThickness(3);
    gameLoop.addElement(dataBox);
    

    /**
     * 
     * @type scrollBar
     */
    var ScrollBar = new scrollBar(windowWidth, windowHeight);
    ScrollBar.setPosition(new Point(70 * backgroundImageWidthRatio, 
    455*backgroundImageHeightRatio));
    ScrollBar.setWidth(800 * backgroundImageWidthRatio);
    ScrollBar.setHeight(20* backgroundImageHeightRatio);   
    ScrollBar.setFillColor("white");
    ScrollBar.setStrokeColor("grey");
    ScrollBar.setStrokeThickness(3);
    gameLoop.addElement(ScrollBar);
    
    /**
     * 
     * @type Triangle
     */
    var triangle = new Triangle();
    triangle.setPosition(new Point(80 *backgroundImageWidthRatio,
    460*backgroundImageHeightRatio));
    triangle.setTriangleY();
    triangle.setWidth(10*backgroundImageWidthRatio);
    triangle.setHeight(20 *backgroundImageHeightRatio);
    triangle.setScrollBarX(ScrollBar);
    triangle.setFillColor("red");
    triangle.setStrokeColor("red");
    triangle.setStrokeThickness(2);
    gameLoop.addElement(triangle);
    
    
    
}


/**
 * 
 * @returns {undefined}
 * @constructor
 */
function initialize() {
    setupScenario();
}

window.onload = initialize;