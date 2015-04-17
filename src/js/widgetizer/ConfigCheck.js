var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.ConfigCheck = function() {
    var checkConfig = function() {
        var propertyMissingTemplate = 'You have to configure the #property# in your config. Bailing out.';

        if (!AOEWidgetizer.config) {
            console.log('No config present at all. Please create AOEWidgetizer.config object. Bailing out.');
            return false;
        }

        if (typeof AOEWidgetizer.config.widgetSelector === 'undefined') {
            console.log(propertyMissingTemplate.replace('#property#', 'widgetSelector'));
            return false;
        }

        if (typeof AOEWidgetizer.config.widgetEndpoint === 'undefined') {
            console.log(propertyMissingTemplate.replace('#property#', 'widgetEndpoint'));
            return false;
        }

        if (typeof AOEWidgetizer.config.parametersAttribute === 'undefined') {
            console.log(propertyMissingTemplate.replace('#property#', 'parametersAttribute'));
            return false;
        }

        if (typeof AOEWidgetizer.config.configurationAttribute === 'undefined') {
            console.log(propertyMissingTemplate.replace('#property#', 'configurationAttribute'));
            return false;
        }

        return true;
    };

    return {
        checkConfig: function() {
            return checkConfig();
        }
    };
};
