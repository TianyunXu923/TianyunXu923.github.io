/**
 * Load data
 * @param {type} url
 * @returns {Resource}
 * @constructor
 */
function Resource(url) {
    /**
     * @type {string} url
     */
    this.url = url;
    /**
     * method of XMLHttpRequest.open
     * @type {string} method
     */
    this.method = "GET";
    /**
     * boolean in XMLHttpRequest.open
     * @type {boolean} isAsynchronous
     */
    this.isAsynchronous = true;
    /**
     * @type {boolean} isLoaded
     */
    this.isLoaded = false;
    /**
     * @type {stateDataManager} objectToNotify
     */
    this.objectToNotify = null;
    /**
     * @type {stateDataManager.onDataLoaded()} onLoadHandler
     */
    this.onLoadHandler = null;
    this.onErrorHandler = null;
    this.request = null;
    this.totalBytes = null;
    this.loadedBytes = null;
    this.loadedPercentage = 0;
}

//Resource.GlobalSettings = {
//    useWebAuthentification
//}

/**
 * begin load the data from file
 * @param {stateDataManager} objectToNotify
 * @param {type} onLoadHandler
 * @param {type} onErrorHandler
 * @returns {undefined}
 */

Resource.prototype.beginLoad = function(
        objectToNotify, 
        onLoadHandler,
        onErrorHandler) {
    if (typeof objectToNotify === 'undefined') {
        // no notification necessary
    } else if (typeof objectToNotify != null && 
            typeof onLoadHandler === 'function') {
        this.objectToNotify = objectToNotify;
        this.onLoadHandler = onLoadHandler;
        if (typeof onErrorHandler === 'function') {
            this.onErrorHandler = onErrorHandler;
        }
    }
    var _this = this;
    var request = new XMLHttpRequest();
    this.request = request;
    this.request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                _this.callLoadHandler();
            } else {
                _this.callErrorHandler();
            }
        }
    }
//    this.request.onprogress = function (evt) {
//        var total = evt.total;
//        var loaded = evt.loaded;
//        var percentage = Math.round(loaded / total * 100);
//        _this.onProgress(total, loaded, percentage);
//    }
    this.request.open(this.method, this.url, this.isAsynchronous);
    this.request.send();
}

/**
 * 
 * @param {type} total
 * @param {type} loaded
 * @param {type} roundedPercentage
 * @returns {undefined}
 */
Resource.prototype.onProgress = function(total, loaded, roundedPercentage) {
    this.totalBytes = total;
    this.loadedBytes = loaded;
    this.loadedPercentage = roundedPercentage;
}
//
//Resource.prototype.getIsLoadingStatusAvailable = function() {
//    return this.totalBytes != null && this.loadedBytes != null;
//}
//
//Resource.prototype.getLoadedPercentage = function() {
//    return this.loadedPercentage;
//}

/**
 * 
 * @returns {undefined}
 */
Resource.prototype.callLoadHandler = function() {
    this.isLoaded = true;
    if (this.onLoadHandler != null) {
        this.callHandler(this.onLoadHandler);
    }
}

/**
 * 
 * @returns {{boolean} isLoaded|Boolean}
 */
Resource.prototype.getIsLoaded = function() {
    return this.isLoaded;
}

/**
 * get data from file in string form 
 * @returns {Resource.request.responseText}
 */
Resource.prototype.getLoadedString = function() {
    //console.log("hi");
    return this.request.responseText;
}

/**
 * 
 * @returns {undefined}
 */
Resource.prototype.callErrorHandler = function() {
    if (this.onErrorHandler != null) {
        this.callHandler(this.onErrorHandler);
    }
}

/**
 * call stateDataManager and notify stateDataManager.onDataLoaded
 * @param {type} handler
 * @returns {undefined}
 */
Resource.prototype.callHandler = function(handler) {
    if (this.objectToNotify != null) {
        handler.call(this.objectToNotify, this);
    } else {
        handler(this);
    }
}

