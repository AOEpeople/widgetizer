var AOEWidgetizer = AOEWidgetizer || {};

if (typeof window.define === "function" && window.define.amd) {
    define("aoewidgetizer", [], function() {
        return AOEWidgetizer;
    });
}

AOEWidgetizer.Widgetizer = function() {
    var widgetSelect      = new AOEWidgetizer.WidgetSelect();
    var requestUrlBuilder = new AOEWidgetizer.RequestUrlBuilder();
    var xhrRequester      = new AOEWidgetizer.XHRRequest();
    var json2markup       = new AOEWidgetizer.JSON2Markup();
    var renderer          = new AOEWidgetizer.WidgetRenderer();
    var configCheck       = new AOEWidgetizer.ConfigCheck();
    var templateProvider  = new AOEWidgetizer.TemplateProvider();
    var widgets           = [];

    init = function() {
        if (!configCheck.checkConfig()) {
            return;
        }

        widgets = widgetSelect.getWidgets();
        widgets = requestUrlBuilder.addUrisToWidgets(widgets);

        /* jshint ignore:start */
        for (var i = 0; i < widgets.length; i++) {
            var currentWidget = widgets[i];

            xhrRequester.getWidgetJSON(currentWidget.endpoint)
                .then(function(response) {
                    currentWidget.set('json', response);
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
        },
        getWidgets: function() {
            return widgets;
        }
    };
};
