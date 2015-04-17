var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.Widgetizer = function() {
    var widgetSelect        = new AOEWidgetizer.WidgetSelect();
    var requestUrlBuilder   = new AOEWidgetizer.RequestUrlBuilder();
    var xhrRequester        = new AOEWidgetizer.XhrRequest();
    var jsonTransformer     = new AOEWidgetizer.JSONTransformer();
    var renderer            = new AOEWidgetizer.TemplateRenderer();
    var configCheck         = new AOEWidgetizer.ConfigCheck();

    init = function() {
        var widgets = [],
            requestUrls = [],
            widgetMarkups = [];

        if (!configCheck.checkConfig()) {
            return;
        }

        widgets         = widgetSelect.getWidgets();
        requestUrls     = requestUrlBuilder.getUrisForWidgets(widgets);

        /* jshint ignore:start */
        for (var i = 0; i < requestUrls; i++) {
            xhrRequester.getWidgetJSON(requestUrl)
                .then(function(widgetJSON) {
                    var widgetMarkup = jsonTransformer.transformJSON(widgetJSON);
                    renderer.renderWidget(widgetMarkup);
                })
                // catch is ie8 reserved keyword, thus need array notation
                ['catch'](function() {

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
