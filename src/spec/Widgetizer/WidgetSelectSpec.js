describe("AOEWidgetizer.WidgetSelect", function () {
    var oldMarkup,
        widgetMarkup,
        widgetSelect;

    beforeEach(function() {
        oldMarkup = document.body.innerHTML;
        widgetMarkup =  '<div data-sp_widget="19" data-parameters="{"page_currentproduct":"2", "page_currentcategory":"1"}' +
        'data-config="{json: "for config"}" />';

        // setting up the DOM
        document.body.innerHTML = document.body.innerHTML + +
            widgetMarkup.replace('#id', 3) +
            widgetMarkup.replace('#id', 5) +
            widgetMarkup.replace('#id', 1);

        widgetSelect = new AOEWidgetizer.WidgetSelect();
    });

    it('returns the widgets that are on the current page', function() {
        expect(widgetSelect.getWidgets().length).toBe(2);
    });

    it('if the browser doesn\'t support querySelectorAll, it returns empty array and tells us on the console', function() {
        // store old value
        var querySelectorAll = document.querySelectorAll;

        // destroy method
        document.querySelectorAll = undefined;

        // add spy
        spyOn(console, 'log');

        // check
        expect(widgetSelect.getWidgets().length).toBe(0);
        expect(console.log).toHaveBeenCalledWith('This browser doesn\'t support querySelectorAll. Returning empty array.');

        // restore old value
        document.querySelectorAll = querySelectorAll;
    });

    afterEach(function() {
        document.body.innerHTML = oldMarkup;
    })
});
