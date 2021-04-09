// Developed by mhawksey
// https://github.com/mhawksey/GATrack/blob/master/LICENSE
var GATrack = (function (ns) {

  // Globals
  var GA_BATCH = [];
  var TRACKING_KEY = 'GATrack_Pref';

  /*
  * Initialize with Google Analytics Tracking ID / Web Property ID.
  * @param {string} TID of Tracking ID / Web Property ID
  * @param {string} optUID setting optional User ID
  */
  ns.init = function (TID, optUID, optCID) {
    ns.setProp_('TID', TID);
    ns.setProp_('UID', optUID || '');
    ns.setProp_('CID', optCID || Utilities.getUuid());
  };

  /*
  * Build data to send Google Analytics Measurement Protocol.
  * @param {Object} hitsObject to queue for Google Analytics
  */
  ns.addToGA = function (hitsObject){
    var base = {v:   '1',
                tid: ns.getProp_('TID')};

    if (ns.getProp_('UID')){
      base.uid = ns.getProp_('UID');
    }
    if (ns.getProp_('CID')){
      base.cid = ns.getProp_('CID');
    }

    // merge hitsObject with base
    // https://stackoverflow.com/a/171256
    for (var a in base) {
      hitsObject[a] = base[a];
    }
    // turn obejct into querystring
    var payload = Object.keys(hitsObject).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(hitsObject[key]);
    }).join('&');
    addToGABatch_(payload, new Date());
    // Uncomment the next line if you want to view what is being sent to GA in Stackdriver Logging
    // [As the measurement protocol returns no error for invalid hits the test_url can be used to validate]
    // console.log({call: 'addToGa',data:payload, test_url: 'https://ga-dev-tools.appspot.com/hit-builder/?'+payload});
  }

  /*
  * Adds our GA call to a queue and sends when it hits 20
  * @param {string} query for event to track
  * @param {Date} date of event to track
  */
  function addToGABatch_(query, date){
    GA_BATCH.push({query: query, time:date});
    if (GA_BATCH.length >= 20){
      ns.flushGAQueue();
    }
  }

  /*
  * Send data to GA from queue
  */
  ns.flushGAQueue = function (){
    // check tracking pref
    var doNotTrack = ns.getDoNotTrack();
    if (!doNotTrack){
      var payload = "";
      var ga_now = new Date().getTime();
      // build payload
      for (var i=0; i < GA_BATCH.length; i++){
        payload += GA_BATCH[i].query + "&qt=" + (ga_now - GA_BATCH[i].time) + "\n";
      }
      var options = {'method' : 'POST',
                     'payload' : payload,};
      var url = 'https://www.google-analytics.com/batch';
      var rep_code = UrlFetchApp.fetch(url, options).getResponseCode();
      if (rep_code < 200 || rep_code > 299){
        console.error({call: 'GATrack', error:rep_code});
      }
      GA_BATCH = [];
    }
  }

  /**
  * Gets tracking pref using caching.
  * @returns {Boolean} tracking pref.
  */
  ns.getDoNotTrack = function (){
    return ns.getProp_(TRACKING_KEY) == 'true'
  }

  /**
  * Sets tracking pref using caching.
  */
  ns.setDoNotTrack = function(pref){
    ns.setProp_(TRACKING_KEY, pref);
  }

  /**
  * Sets a static user property, using caching.
  * @param {string} key The property key.
  * @param {string} value The property value.
  */
  ns.setProp_ = function (key, value){
    PropertiesService.getUserProperties().setProperty(key, value);
    CacheService.getUserCache().put(key, value, 86400);
  }

  /**
  * Gets a static document property, using caching.
  * @param {string} key The property key.
  * @returns {string} The property value.
  */
  ns.getProp_ = function(key){
    var value = CacheService.getUserCache().get(key);
    if (!value){
      var value = PropertiesService.getUserProperties().getProperty(key);
      CacheService.getUserCache().put(key, value, 86400);
    }
    return value;
  }
  return ns;
})(GATrack || {});

// Expose Namespace methods for google.script.run
// http://ramblings.mcpher.com/Home/excelquirks/gassnips/exposeserver
function expose (namespace , method) {
  return this[namespace][method].apply(this,Array.prototype.slice.call(arguments,2));
}
