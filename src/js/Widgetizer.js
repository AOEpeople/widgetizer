var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.Widgetizer = function() {
    var widgetSelect        = new AOEWidgetizer.WidgetSelect();
    var requestUrlBuilder   = new AOEWidgetizer.RequestUrlBuilder();
    var xhrRequester        = new AOEWidgetizer.XHRRequest();
    var json2markup         = new AOEWidgetizer.JSON2Markup();
    var renderer            = new AOEWidgetizer.TemplateRenderer();
    var configCheck         = new AOEWidgetizer.ConfigCheck();
    var widgetTemplate      = new AOEWidgetizer.Template();

    init = function() {
        var widgets = [],
            requestUrls = [];

        if (!configCheck.checkConfig()) {
            return;
        }

        widgets     = widgetSelect.getWidgets();
        requestUrls = requestUrlBuilder.getUrisForWidgets(widgets);

        /* jshint ignore:start */
        // now for the async part
        for (var i = 0; i < requestUrls; i++) {
            xhrRequester.getWidgetJSON(requestUrl)
                .then(function(widgetJSON) {
                    var widgetMarkup = json2markup.getMarkup(widgetJSON);
                    renderer.renderWidget(widgetMarkup, widgetTemplate);
                })
                // catch is ie8 reserved keyword, thus need array notation
                ['catch'](function(e) {
                    //@TODO Test w. component test
                    console.log('Error loading widget. Original error: ', e);
                });
        }
        /* jshint ignore:end */
    };

    return {
        init: function() {
            init();
        }
    };
};
