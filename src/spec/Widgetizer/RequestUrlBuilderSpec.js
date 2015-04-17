describe("AOEWidgetizer.RequestUrlBuilder", function () {
    var requestUriBuilder;

    beforeEach(function() {
        requestUriBuilder = new AOEWidgetizer.RequestUrlBuilder();
        spyOn(console, 'log');
    });

    it('called without argument returns empty array and tells us on the console', function() {
        expect(requestUriBuilder.getUrisForWidgets()).toEqual([]);
        expect(console.log).toHaveBeenCalledWith('Method getUrisForWidget needs array of html elements (widgets). No array given. Returning empty array.');
    });

    it('called without array of strings (wrong type) returns empty array and tells us on the console', function() {
        expect(requestUriBuilder.getUrisForWidgets(['string', 'string'])).toEqual([]);
        expect(console.log).toHaveBeenCalledWith('Method getUrisForWidget needs array of html elements (widgets). Wrong elements given. Returning empty array.');
    });

    describe('called with an array of two html elements (widgets)', function() {
        var widgets = [];

        beforeEach(function() {
            var widget = document.createElement('div');
            widget.setAttribute(AOEWidgetizer.config.widgetSelector.replace('[', '').replace(']', ''), '1234');
            widget.setAttribute(AOEWidgetizer.config.parametersAttribute, '{"page_currentproduct":"1","page_currentcategory":"2"}');

            var widget2 = document.createElement('div');
            widget2.setAttribute(AOEWidgetizer.config.widgetSelector.replace('[', '').replace(']', ''), '9999');
            widget2.setAttribute(AOEWidgetizer.config.parametersAttribute, '{"page_currentproduct":"3","page_currentcategory":"4"}');

            widgets.push(widget);
            widgets.push(widget2);
        });

        it('returns an array of with two elements', function() {
            expect(requestUriBuilder.getUrisForWidgets(widgets).length).toBe(2);
        });

        it('that are strings', function() {
            expect(typeof requestUriBuilder.getUrisForWidgets(widgets)[0]).toBe('string');
            expect(typeof requestUriBuilder.getUrisForWidgets(widgets)[1]).toBe('string');
        });

        it('the strings contain the baseUri (widget enpoint)', function() {
            expect(requestUriBuilder.getUrisForWidgets(widgets)[0]).toMatch(AOEWidgetizer.config.widgetEndpoint);
            expect(requestUriBuilder.getUrisForWidgets(widgets)[1]).toMatch(AOEWidgetizer.config.widgetEndpoint);
        });

        it('the strings contain the widget id', function() {
            expect(requestUriBuilder.getUrisForWidgets(widgets)[0]).toMatch(/1234/);
            expect(requestUriBuilder.getUrisForWidgets(widgets)[1]).toMatch(/9999/);
        });

        it('the strings contain the parameters from the parameters attribute (' + AOEWidgetizer.config.parametersAttribute + ')', function() {
            expect(requestUriBuilder.getUrisForWidgets(widgets)[0]).toMatch(/\?page_currentproduct=1&page_currentcategory=2/);
            expect(requestUriBuilder.getUrisForWidgets(widgets)[1]).toMatch(/\?page_currentproduct=3&page_currentcategory=4/);
        });
    });

    afterEach(function() {

    });
});
