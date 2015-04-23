AOEWidgetizer.WidgetRenderer = function() {
    return {
        renderWidget: function(widget) {
            var widgetMarkup = widget.get('markup');
            var widgetNode   = widget.get('node');
            widgetNode.innerHTML = widgetMarkup;
        }
    };
};
