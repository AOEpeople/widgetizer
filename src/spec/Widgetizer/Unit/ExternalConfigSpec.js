var $                = require('jquery');
var WidgetFactory    = require('./../WidgetFactory');
var WidgetizerConfig = require('./../Mock/WidgetizerConfig');
var ExternalConfig   = require('../../../js/Widgetizer/ExternalConfig');

describe('ExternalConfig', function() {
    var widget;
    var externalConfig;
    var json;

    beforeEach(function() {
        json = {"itemCallbacks": ["foo", "bar"]};
        widget = WidgetFactory({config: json}, new WidgetizerConfig());

        externalConfig = new ExternalConfig($, {noArrayGiven: function() { return false; }});
    });

    it('should get the json passed via config parameter from the widgets node and add it to config as js object', function() {
        externalConfig.addConfigToWidgets([widget]);

        expect(widget.config).toEqual(json);
    });
});
