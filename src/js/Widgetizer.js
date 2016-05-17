var Mark = require('markup-js');
var WidgetSelect = require('./Widgetizer/WidgetSelect');
var RequestUrlBuilder = require('./Widgetizer/RequestUrlBuilder');
var XHRRequest = require('./Widgetizer/XHRRequest');
var JSON2Markup = require('./Widgetizer/JSON2Markup');
var WidgetRenderer = require('./Widgetizer/WidgetRenderer');
var TemplateProvider = require('./Widgetizer/TemplateProvider');
var Events = require('./Widgetizer/Events');
var UserFunctions = require('./Widgetizer/UserFunctions');
var ExternalConfig = require('./Widgetizer/ExternalConfig');
var Widget = require('./Widgetizer/Widget');
var Utility = require('./Widgetizer/Utility');

var widgetizerSingleton;

module.exports = function(config) {
    if (widgetizerSingleton && typeof widgetizerSingleton === 'object') {
        return widgetizerSingleton;
    }

    //TODO: This still adds jQuery, even if not used - find a better solution
    $ = (config.jQuery && config.jQuery.fn && config.jQuery.fn.jquery) ? config.jQuery : require('jquery');

    //TODO: Test for missing config obj
    var utility             = new Utility(config);
    var widgetSelect        = new WidgetSelect($, config, utility, Widget);
    var requestUrlBuilder   = new RequestUrlBuilder(config, utility);
    var xhrRequester        = new XHRRequest($, config);
    var json2markup         = new JSON2Markup(Mark);
    var renderer            = new WidgetRenderer();
    var templateProvider    = new TemplateProvider($, config, utility);
    var events              = new Events($);
    var userFunctions       = new UserFunctions();
    var externalConfig      = new ExternalConfig($, utility);

    var init = function (baseElement) {
        var widgets = [];
        var renderedWidgetsCount = 0;
        xhrRequester.resetIndex();

        widgets = widgetSelect.getWidgets(baseElement);
        widgets = requestUrlBuilder.addUrisToWidgets(widgets);
        widgets = externalConfig.addConfigToWidgets(widgets);
        widgets = templateProvider.addTemplatesToWidgets(widgets);

        $(widgets).each(function (i, currentWidget) {
            userFunctions.runUserFunctionsBeforeRequesting(currentWidget);
            xhrRequester
                .getWidgetJSON(currentWidget.endpoint)
                .done(createResponseHandler(currentWidget))
                .fail(failHandler);
        });

        function createResponseHandler(widget) {
            return function renderWidget(response) {
                widget.set('json', response);
                userFunctions.runUserFunctionsAfterRequesting(widget);
                widget = json2markup.addMarkupToWidget(widget);
                renderer.renderWidget(widget);
                userFunctions.runUserFunctionsAfterRendering(widget);
                events.triggerWidgetRendered({node: widget.node});

                if (++renderedWidgetsCount === widgets.length) {
                    events.triggerAllWidgetsRendered();
                }
            };
        }

        function failHandler(jqXHR, textStatus, errorThrown) {
            //@TODO Test w. component test
            console.log('Error loading widget. Status was:' + jqXHR.status + '. Original error: ', errorThrown);
        }

        return widgets;
    };

    widgetizerSingleton = {
        init: function (baseElement) {
            return init(baseElement);
        }
    };

    return widgetizerSingleton;
};