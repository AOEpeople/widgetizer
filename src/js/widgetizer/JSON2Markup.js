var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.JSON2Markup = function() {

    buildMarkup = function(widgetJSON) {



        return '<h1>Item 1 title</h1><h1>Item 2 title</h1>' +
            '<img src="https://placeimg.com/100/300/any#1" /><img src="https://placeimg.com/100/300/any#2" />' +
            '<span>Some longer description describing item 1.</span><span>Some longer description describing item 2.</span>';
    };

    return {
        getMarkup: function(widgetJSON, widgetTemplate) {
            return buildMarkup();
        }
    };

};
