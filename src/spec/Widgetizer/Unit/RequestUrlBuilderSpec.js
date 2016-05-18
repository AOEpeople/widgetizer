var WidgetFactory     = require('./../WidgetFactory');
var WidgetizerConfig  = require('./../Mock/WidgetizerConfig');
var WidgetMock        = require('./../Mock/WidgetMock');
var testHelper        = require('./../testHelper');
var RequestUrlBuilder = require('../../../js/components/RequestUrlBuilder');

describe("RequestUrlBuilder", function () {
    var requestUriBuilder,
        mockConfig = new WidgetizerConfig();

    var getWidgetMockWithInvalidParameters = function() {
        var invalidJSON = '{"user_language":"de_DE","limit":"4","keywords":"?quot;,"brand_code":""}';
        var widget = new WidgetMock();
        var widgetNode = document.createElement('div');
        widget.set('node', widgetNode);
        widgetNode.setAttribute(mockConfig.parametersAttribute, invalidJSON);
        widgetNode.setAttribute(mockConfig.widgetSelector.replace('[', '').replace(']', ''), 'someId');

        return widget;
    };

    beforeEach(function() {
        requestUriBuilder = new RequestUrlBuilder(mockConfig, {noArrayGiven: function() {return false;}});
        spyOn(console, 'log');
    });

    describe('called with an array of three Widget elements', function() {
        var widgets = [];

        beforeEach(function() {
            var widgetizerConfig = mockConfig;
            var widget1 = WidgetFactory({ parameters: { page_currentproduct:"1", page_currentcategory:"2" }, id: 1234}, widgetizerConfig);
            var widget2 = WidgetFactory({ parameters: { page_currentproduct:"3", page_currentcategory:"4" }, id: 9999}, widgetizerConfig);
            var widget3 = WidgetFactory({ parameters: { page_currentproduct:"33", page_currentcategory:"44" }, id: 'test_alias'}, widgetizerConfig);

            widgets.push(widget1);
            widgets.push(widget2);
            widgets.push(widget3);
        });

        it('returns an array of three elements', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets).length).toBe(3);
        });

        it('that are from the type AOEWidgetizer.Widget', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets)[0].constructorName).toBe('AOEWidgetizer.Widget');
            expect(requestUriBuilder.addUrisToWidgets(widgets)[1].constructorName).toBe('AOEWidgetizer.Widget');
            expect(requestUriBuilder.addUrisToWidgets(widgets)[2].constructorName).toBe('AOEWidgetizer.Widget');
        });

        it('the returned widgets endpoint properties contain the configured widgetEndpoint uri', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets)[0].get('endpoint')).toMatch(testHelper.widgetEndpoint);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[1].get('endpoint')).toMatch(testHelper.widgetEndpoint);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[2].get('endpoint')).toMatch(testHelper.widgetEndpoint);
        });

        it('the returned widgets endpoint properties contain the widget id', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets)[0].get('endpoint')).toMatch(/1234/);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[1].get('endpoint')).toMatch(/9999/);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[2].get('endpoint')).toMatch(/test_alias/);
        });

        it('the returned widgets endpoint properties contain the parameters from the parameters attribute (' + mockConfig.parametersAttribute + ')', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets)[0].get('endpoint')).toMatch(/\?page_currentproduct=1&page_currentcategory=2/);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[1].get('endpoint')).toMatch(/\?page_currentproduct=3&page_currentcategory=4/);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[2].get('endpoint')).toMatch(/\?page_currentproduct=33&page_currentcategory=44/);
        });
        it("parameter building should not throw an exception if called with invalid JSON", function () {
            expect(function() {
                requestUriBuilder.addUrisToWidgets([getWidgetMockWithInvalidParameters()]);
            }).not.toThrow(new SyntaxError("Unable to parse JSON string"));
        });
        it("parameter building should return an empty parameter list if JSON is invalid", function () {
            var widget = getWidgetMockWithInvalidParameters();
            requestUriBuilder.addUrisToWidgets([widget]);
            var endpoint = widget.get('endpoint');

            expect(endpoint).toBe(testHelper.widgetEndpoint + "someId");
        });
    });
});
