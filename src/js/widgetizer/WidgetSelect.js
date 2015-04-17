var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.WidgetSelect = function() {
    var selectWidgets = function() {
        var widgets = [];

        if (typeof document.querySelectorAll !== 'function') {
            console.log('This browser doesn\'t support querySelectorAll. Returning empty array.');
            return widgets;
        }

        // should even work in IE8 (http://caniuse.com/#search=querySelectorAll)
        widgets = document.querySelectorAll(AOEWidgetizer.config.widgetSelector);

        return widgets;
    };

    return {
        getWidgets: function() {
            return selectWidgets();
        }
    };
};
