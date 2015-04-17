var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.RequestUrlBuilder = function() {
    var uris    = [];

    buildWidgetUris = function(widgets) {
        for (var i = 0; i < widgets.length; i++) {
            var currentWidget = widgets[i];
            var uri = AOEWidgetizer.config.widgetEndpoint;

            // add widget ids
            var widgetId       = currentWidget.getAttribute(AOEWidgetizer.config.widgetSelector.replace('[', '').replace(']', ''));
            uri += widgetId;

            // add parameters
            var parametersJSON = currentWidget.getAttribute(AOEWidgetizer.config.parametersAttribute);
            var parameters     = JSON.parse(parametersJSON);

            //@TODO: Write super small library
            var firstRun = true;
            for (var parameterName in parameters) {
                if (firstRun) {
                    uri += '?' + parameterName + '=' + parameters[parameterName];
                } else {
                    uri += '&' + parameterName + '=' + parameters[parameterName];
                }
                firstRun = false;
            }
            //@ENDTODO

            //var configurationJSON = currentWidget.getAttribute(AOEWidgetizer.configurationAttribute);

            uris.push(uri);
        }

        return uris;
    };

    noArrayGiven = function(widgets) {
        // testcase1 - console.log
        if (!widgets || widgets.constructor !== Array) {
            console.log('Method getUrisForWidget needs array of html elements (widgets). No array given. Returning empty array.');
            return true;
        }
        return false;
    };

    noHTMLElementsGiven = function(widgets) {
        // testcase2 - console.log
        if (widgets.length > 0 && !widgets[0].constructor.toString().match(/html/i)) {
            console.log('Method getUrisForWidget needs array of html elements (widgets). Wrong elements given. Returning empty array.');
            return true;
        }
        return false;
    };

    return {
        getUrisForWidgets: function(widgets) {
            if (noArrayGiven(widgets) || noHTMLElementsGiven(widgets)) {
                return [];
            }

            return buildWidgetUris(widgets);
        }
    };
};
