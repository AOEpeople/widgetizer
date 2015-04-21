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

        var widgets = [];

        widgets = widgetSelect.getWidgets();
        widgets = requestUrlBuilder.addUrisToWidgets(widgets);

        /* jshint ignore:start */
        // now for the async part
        for (var i = 0; i < widgets.length; i++) {
            var currentWidget = widgets[i];

            xhrRequester.getWidgetJSON(currentWidget.endpoint)
                .then(function(response) {
                    currentWidget.set('json', JSON.parse(response));
                    currentWidget.set('template', templateProvider.getTemplate());
                    currentWidget = json2markup.addMarkupToWidget(currentWidget);
                    renderer.renderWidget(currentWidget);
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
