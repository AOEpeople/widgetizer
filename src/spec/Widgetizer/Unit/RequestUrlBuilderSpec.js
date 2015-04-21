describe("AOEWidgetizer.RequestUrlBuilder", function () {
    var requestUriBuilder;

    beforeEach(function() {
        requestUriBuilder = new AOEWidgetizer.RequestUrlBuilder();
        spyOn(console, 'log');
    });

    it('called without argument returns empty array and tells us on the console', function() {
        expect(requestUriBuilder.addUrisToWidgets()).toEqual([]);
        expect(console.log).toHaveBeenCalledWith('Method getUrisForWidget needs array of AOEWidgetizer.Widget elements. No array given. Returning empty array.');
    });

    describe('called with an array of two AOEWidgetizer.Widget elements', function() {
        var widgets = [];

        beforeEach(function() {
            var widgetElement1 = document.createElement('div');
            widgetElement1.setAttribute(AOEWidgetizer.config.widgetSelector.replace('[', '').replace(']', ''), '1234');
            widgetElement1.setAttribute(AOEWidgetizer.config.parametersAttribute, '{"page_currentproduct":"1","page_currentcategory":"2"}');
            var widget1 = new AOEWidgetizer.Widget();
            widget1.set('node', widgetElement1);

            var widgetElement2 = document.createElement('div');
            widgetElement2.setAttribute(AOEWidgetizer.config.widgetSelector.replace('[', '').replace(']', ''), '9999');
            widgetElement2.setAttribute(AOEWidgetizer.config.parametersAttribute, '{"page_currentproduct":"3","page_currentcategory":"4"}');
            var widget2 = new AOEWidgetizer.Widget();
            widget2.set('node', widgetElement2);

            widgets.push(widget1);
            widgets.push(widget2);
        });

        it('returns an array of two elements', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets).length).toBe(2);
        });

        it('that are from the type AOEWidgetizer.Widget', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets)[0].constructorName).toBe('AOEWidgetizer.Widget');
            expect(requestUriBuilder.addUrisToWidgets(widgets)[1].constructorName).toBe('AOEWidgetizer.Widget');
        });

        it('the returned widgets endpoint properties contain the configured widgetEndpoint uri', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets)[0].get('endpoint')).toMatch(AOEWidgetizer.config.widgetEndpoint);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[1].get('endpoint')).toMatch(AOEWidgetizer.config.widgetEndpoint);
        });

        it('the returned widgets endpoint properties contain the widget id', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets)[0].get('endpoint')).toMatch(/1234/);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[1].get('endpoint')).toMatch(/9999/);
        });

        it('the returned widgets endpoint properties contain the parameters from the parameters attribute (' + AOEWidgetizer.config.parametersAttribute + ')', function() {
            expect(requestUriBuilder.addUrisToWidgets(widgets)[0].get('endpoint')).toMatch(/\?page_currentproduct=1&page_currentcategory=2/);
            expect(requestUriBuilder.addUrisToWidgets(widgets)[1].get('endpoint')).toMatch(/\?page_currentproduct=3&page_currentcategory=4/);
        });
    });

    afterEach(function() {

    });
});
