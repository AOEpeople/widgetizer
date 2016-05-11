module.exports = function (jQuery, config, utility) {
    var addTemplates = function(widgets) {

        function getTemplateForName(widgetConfig) {
            if (!widgetConfig) {
                return getDefaultTemplate();
            }

            var template = jQuery(config.templateSelector.replace('#NAME#', widgetConfig.template))[0];

            return template ? template.innerHTML : getDefaultTemplate();
        }

        function getDefaultTemplate() {
            return config.defaultTemplate;
        }

        for (var i = 0; i < widgets.length; i++) {
            var currentWidget = widgets[i];
            var widgetConfig = currentWidget.get('config');
            var template = getTemplateForName(widgetConfig);
            currentWidget.set('template', template);
        }

        return widgets;
    };

    return {
        addTemplatesToWidgets: function(widgets) {

            if (utility.noArrayGiven(widgets)) {
                return [];
            }

            return addTemplates(widgets);
        }
    };
};
