var Mark = require('markup-js');
var WidgetSelect = require('./components/WidgetSelect');
var RequestUrlBuilder = require('./components/RequestUrlBuilder');
var XHRRequest = require('./components/XHRRequest');
var JSON2Markup = require('./components/JSON2Markup');
var WidgetRenderer = require('./components/WidgetRenderer');
var TemplateProvider = require('./components/TemplateProvider');
var Events = require('./components/Events');
var UserFunctions = require('./components/UserFunctions');
var ExternalConfig = require('./components/ExternalConfig');
var Widget = require('./components/Widget');
var Utility = require('./components/Utility');
var defaultConfig = require('./components/config');

var widgetizerSingleton;

module.exports = function(config) {
    if (widgetizerSingleton && typeof widgetizerSingleton === 'object') {
        return widgetizerSingleton;
    }

    //TODO: This still adds jQuery, even if not used - find a better solution
    $ = (config.jQuery && config.jQuery.fn && config.jQuery.fn.jquery) ? config.jQuery : require('jquery');

    config = $.extend(defaultConfig, config);

    console.log('Running with config ', config);

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