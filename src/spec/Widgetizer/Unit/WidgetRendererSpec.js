var WidgetFactory  = require('./../WidgetFactory');
var WidgetizerConfig = require('./../Mock/WidgetizerConfig');
var WidgetRenderer = require('./../../../js/components/WidgetRenderer');

describe("WidgetRenderer", function () {
    var renderer,
        widget,
        markup;

    beforeEach(function() {
        renderer = new WidgetRenderer();
        markup   = '<span>Some markup</span>';
        widget   = WidgetFactory({markup: markup}, new WidgetizerConfig());
    });

    it('the inner html of a freshly created node should be empty', function () {
        expect(widget.get('node').innerHTML).toBe('');
    });

    it('puts the content of the widgets markup property into the widgets node property innerHTML', function() {
        renderer.renderWidget(widget);

        expect(widget.get('node').innerHTML).toBe(markup);
    });
});
