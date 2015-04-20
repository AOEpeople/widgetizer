var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.Widgetizer = function() {
    var widgetSelect        = new AOEWidgetizer.WidgetSelect();
    var requestUrlBuilder   = new AOEWidgetizer.RequestUrlBuilder();
    var xhrRequester        = new AOEWidgetizer.XHRRequest();
    var json2markup         = new AOEWidgetizer.JSON2Markup();
    var renderer            = new AOEWidgetizer.TemplateRenderer();
    var configCheck         = new AOEWidgetizer.ConfigCheck();
    var templateProvider    = new AOEWidgetizer.TemplateProvider();

    init = function() {
        if (!configCheck.checkConfig()) {
            return;
        }

        var widgets     = widgetSelect.getWidgets() || [];
        var requestUrls = requestUrlBuilder.getUrisForWidgets(widgets) || [];

        /* jshint ignore:start */
        // now for the async part
        for (var i = 0; i < requestUrls; i++) {
            xhrRequester.getWidgetJSON(requestUrl)
                .then(function(response) {
                    var widgetJSON   = JSON.parse(response);
                    var widgetMarkup = json2markup.getMarkup(widgetJSON, templateProvider.getTemplate());
                    renderer.renderWidget(widgetMarkup);
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
