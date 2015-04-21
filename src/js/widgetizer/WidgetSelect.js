var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.WidgetSelect = function() {

    var widgets = [],
        widgetNodes;

    var selectWidgets = function() {
        if (typeof document.querySelectorAll !== 'function') {
            console.log('This browser doesn\'t support querySelectorAll. Returning empty array.');
            return widgets;
        }

        // should even work in IE8 (http://caniuse.com/#search=querySelectorAll)
        widgetNodes = document.querySelectorAll(AOEWidgetizer.config.widgetSelector);

        pushWidgetsToArray();

        return widgets;
    };

    var pushWidgetsToArray = function() {
        for (var i = 0; i < widgetNodes.length; i++) {
            var widget = new AOEWidgetizer.Widget();
            widget.set('node', widgetNodes[i]);
            widgets.push(widget);
        }
    };

    return {
        getWidgets: function() {
            return selectWidgets();
        }
    };
};
