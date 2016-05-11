module.exports = function (jQuery, utility) {
    function addConfigToWidget(widget) {
        var config = JSON.parse(jQuery(widget.node).first().attr('data-config') || "{}");
        widget.set('config', config);
    }

    function addConfigs(widgets) {
        for (var i = 0; i < widgets.length; i++) {
            addConfigToWidget(widgets[i]);
        }

        return widgets;
    }

    return {
        addConfigToWidgets: function(widgets) {

            if (utility.noArrayGiven(widgets)) {
                return [];
            }

            return addConfigs(widgets);
        }
    };
};
