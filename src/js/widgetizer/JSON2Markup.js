var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.JSON2Markup = function() {
    return {
        getMarkup: function(widgetJSON, template) {
            return Mark.up(template, widgetJSON);
        }
    };
};
