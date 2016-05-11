module.exports = function(jQuery, config, utility, Widget) {
    var selectWidgets = function(baseElement) {
        return getWidgetNodes(baseElement)
            .filter(":not([data-disabled])")
            .map(function() {
                return new Widget().set('node', this);
            })
            .toArray();
    };

    var getWidgetNodes = function(baseElement) {
        if (utility.isWidget(baseElement)) {
            return jQuery(baseElement);
        }

        if (utility.isValidDOMNode(baseElement)) {
            return jQuery(baseElement).find(config.widgetSelector);
        }

        return jQuery(config.widgetSelector);
    };

    return {
        getWidgets: function(baseElement) {
            return selectWidgets(baseElement);
        }
    };
};