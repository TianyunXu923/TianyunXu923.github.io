/**
 * Load data and pass them into waterSymbolManager
 * @param {WaterSymbolManager} waterSymbolManager
 * @returns {StateDataManager}
 * @constructor
 */
function StateDataManager(waterSymbolManager) {
    /**
     * get access to the waterSymbolManager
     * @type {waterSymbolManager} waterSymbolManager 
     */
    this.waterSymbolManager = waterSymbolManager;
    /**
     * instantiate Resource, pass csv file, load data
     * @extends Resource
     */
    this.data = new Resource("test.csv");
     
     /**
      * only when data is loaded, call this.onDataLoaded 
      */
    this.data.beginLoad(this, this.onDataLoaded);
    
    /**
     * contains all stateData,each stateData has name, abbreviation, year data
     * and position
     * @type {array} states
     */
    this.states = [];
    /**
     * @type {number} windowWidth
     */
    this.windowWidth = this.waterSymbolManager.getWindowWidth();
    /**
     * @type {number} windowHeight
     */
    this.windowHeight = this.waterSymbolManager.getWindowHeight();
    /**
     * contains state array, each state array contains state abbreviation, x
     * and y value for initial position. It is stored in order
     * @type {array} positionArray
     */
    this.positionArray = [ ["AL",640, 270],   ["AK",200, 380],  ["AZ",310,280],
        ["AR", 550, 260], ["CA",170, 200], ["CO", 370,210], ["CT",775,130], 
        ["DE", 765,165], ["DC",735,175],  ["FL",720, 330], ["GA",670,270],
        ["HI", 400, 430],  ["ID", 290,120],  ["IL",590,190], ["IN", 625,190], 
        ["IA", 525, 170], ["KS", 470, 215], ["KY",640,215], ["LA",555, 305], 
        ["ME", 800,60], ["MD",745,170], ["MA", 785, 110], ["MI", 640,120], 
        ["MN", 520,90], ["MS", 590, 280], ["MO",540,210], ["MT",350,80], 
        ["NE",455,180], ["NV",260,180], ["NH",780,90], ["NJ",760,150], ["NM",375, 260],
        ["NY",740,110], ["NC",735,230], ["ND",450,80], ["OH", 670, 180],
        ["OK",485,260], ["OR",220,110], ["PA",720,150], ["RI",795,120], 
        ["SC", 720, 260], ["SD",450,130],  ["TN",630, 240], ["TX", 440, 310],
        ["UT", 310,190], ["VT", 765,88], ["VA",730,195],  ["WA", 235, 60], 
        ["WV",700,190], ["WI",560,120], ["WY", 370, 140], ["PR",615, 420]];
    
 }

/**
 * Will be called by Resource function when data is loaded
 * @param {Resource} resource
 * @returns {undefined}
 */    
StateDataManager.prototype.onDataLoaded = function(resource) {

    // get XMLHttpRequest responseText
    var data = resource.getLoadedString();
    var dataSet = data.split(",");
   
    var i =0;
    var j =0;
    
    // in case window is resized
    var backgroundImageWidthRatio =1;
    var backgroundImageHeightRatio =1;
 
    if(this.windowWidth < 1030){
        backgroundImageWidthRatio =this.windowWidth / 1030; 
        
    }
    
    if(this.windowHeight < 520){
        backgroundImageHeightRatio = this.windowHeight / 520;
    }
    
    // save each state's information into a new StateData, push StateData for
    // each state into this.states array
    while(i < dataSet.length-2){
        var state = new StateData();
        state.setStateName(dataSet[i]);
        state.setAbbreviation(dataSet[i+1]);
        // year data array
        var stateArray = [dataSet[i+2], dataSet[i+3], dataSet[i+4],
            dataSet[i+5], dataSet[i+6]];
        state.setYearData(stateArray);
        state.setPosition(new Point(this.positionArray[j][1]*backgroundImageWidthRatio, 
        this.positionArray[j][2] * backgroundImageHeightRatio));
        this.states.push(state);
        i = i+7;
        j=j+1;

    }
    // notify watersymbolmanager
    this.waterSymbolManager.onStateDataLoaded(this.states);
}


/**
 * stateData stores each state's information that is loaded from the file source
 * including state name, abbreviation, an array of year data, position
 * @returns {StateData}
 */
function StateData(){
    /**
     * @type {string} stateName
     */
    this.stateName;
    /**
     * @type {string} stateAbbreviation
     */
    this.stateAbbreviation;
    /**
     * amount of water in gallon/day in 1985, 1995, 2000, 2005, 2010
     * @type {array} yearData
     */
    this.yearData=[];
    /**
     * @type {vector} position
     */
    this.position = new Point(0,0);
}

/**
 * 
 * @param {string} s
 * @returns {undefined}
 */
StateData.prototype.setStateName = function(s){
    this.stateName = s;
}

/**
 * 
 * @param {string} a
 * @returns {undefined}
 * @constructor
 */
StateData.prototype.setAbbreviation = function(a){
    this.stateAbbreviation = a;
}

/**
 * 
 * @param {array} d
 * @returns {undefined}
 */
StateData.prototype.setYearData = function(d){
    this.yearData = d;
}

/**
 * 
 * @returns {{string} stateName|String}
 */
StateData.prototype.getStateName = function(){
    return this.stateName;
}

/**
 * 
 * @returns {String|{string} stateAbbreviation}
 */
StateData.prototype.getStateAbbreviation = function(){
    return this.stateAbbreviation;
}

/**
 * 
 * @returns {Array|array}
 */
StateData.prototype.getDataSet = function(){
    return this.yearData;
}

/**
 * 
 * @param {vector} position
 * @returns {undefined}
 */
StateData.prototype.setPosition = function(position){
    this.position = position.clone();
}

/**
 * 
 * @returns {StateData.prototype@pro;position@call;clone}
 */
StateData.prototype.getPosition = function(){
    return this.position.clone();
}

/**
 * 
 * @returns {number}
 */
StateData.prototype.get1985Data = function(){
    return this.yearData[0];
}

/**
 * 
 * @returns {number}
 */
StateData.prototype.get1995Data = function(){
    return this.yearData[1];
}

/**
 * 
 * @returns {number}
 */
StateData.prototype.get2000Data = function(){
    return this.yearData[2];
}

/**
 * 
 * @returns {number}
 */
StateData.prototype.get2005Data = function(){
    return this.yearData[3];
}

/**
 * 
 * @returns {number}
 */
StateData.prototype.get2010Data = function(){
    return this.yearData[4];
}