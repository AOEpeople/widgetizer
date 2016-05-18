module.exports = function (jQuery, config) {
    var index = 0;

    return {
        getWidgetJSON: function (requestUri) {
            if (config.jsonp) {
                var jsonpConfig = {
                    dataType: 'jsonp'
                };
                if (config.jsonpCallbackBase) {
                    jsonpConfig.jsonpCallback = config.jsonpCallbackBase + index++;
                }
                return jQuery.ajax(requestUri, jsonpConfig);
            } else {
                return jQuery.getJSON(requestUri);
            }
        },

        resetIndex: function () {
            index = 0;
        }
    };
};