module.exports = function(config) {
    var isValidDOMNode = function(element) {
        if (!element) {
            return false;
        }

        return element.nodeName ? true : false;
    };

    return {
        noArrayGiven: function (widgets) {
            if (!widgets || widgets.constructor !== Array) {
                console.log('Method getUrisForWidget needs array of AOEWidgetizer.Widget elements. No array given. Returning empty array.');
                return true;
            }
            return false;
        },

        isValidDOMNode: function(element) {
            return isValidDOMNode(element);
        },

        isWidget: function(element) {
            return isValidDOMNode(element) ?
                element.hasAttribute(config.widgetSelector.replace('[', '').replace(']', '')) :
                false;
        }
    };
};
