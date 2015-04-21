var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.JSON2Markup = function() {
    return {
        addMarkupToWidget: function(widget) {
            widget.set('markup', Mark.up(widget.template, widget.json));

            return widget;
        }
    };
};
