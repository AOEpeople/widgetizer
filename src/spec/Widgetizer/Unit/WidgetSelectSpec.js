var jQuery       = require('jquery');
var WidgetMock   = require('./../Mock/WidgetMock');
var WidgetSelect = require('../../../js/components/WidgetSelect');

describe("WidgetSelect", function () {
    var oldMarkup,
        widgetMarkup,
        widgetSelect;

    beforeEach(function() {
        oldMarkup = document.body.innerHTML;
        widgetMarkup =  '<div data-sp_widget="#id" data-parameters="{"page_currentproduct":"2", "page_currentcategory":"1"}' +
        'data-config="{json: "for config"}" />';

        // setting up the DOM
        document.body.innerHTML = document.body.innerHTML +
            widgetMarkup.replace('#id', 3) +
            widgetMarkup.replace('#id', 5) +
            widgetMarkup.replace('#id', 1);

        //jQuery, config, utility, Widget
        widgetSelect = new WidgetSelect(
            jQuery,
            { widgetSelector: '[data-sp_widget]' },
            /* TODO: Missing tests that check for the following functions returning different values (or values at all :)) */
            {isValidDOMNode: function() {}, isWidget: function() {}},
            WidgetMock
        );
    });

    it('returns the widgets that are on the current page', function() {
        expect(widgetSelect.getWidgets().length).toBe(3);
    });

    it('the widgets are objects from type AOEWidgetizer.Widget', function() {
        expect(widgetSelect.getWidgets()[0].constructorName).toBe('AOEWidgetizer.Widget');
        expect(widgetSelect.getWidgets()[1].constructorName).toBe('AOEWidgetizer.Widget');
        expect(widgetSelect.getWidgets()[2].constructorName).toBe('AOEWidgetizer.Widget');
    });

    it('the widgets have a html node in their node properties', function() {
        expect(widgetSelect.getWidgets()[0].get('node').constructor.toString()).toMatch(/html/i);
        expect(widgetSelect.getWidgets()[1].get('node').constructor.toString()).toMatch(/html/i);
        expect(widgetSelect.getWidgets()[2].get('node').constructor.toString()).toMatch(/html/i);
    });

    afterEach(function() {
        document.body.innerHTML = oldMarkup;
    });
});
