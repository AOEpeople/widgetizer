var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.RequestUrlBuilder = function() {
    var uris    = [];

    buildWidgetUris = function(widgets) {
        //@TODO: Extract to Widget class?
        function getWidgetId(currentWidget) {
            var widgetId = parseInt(currentWidget.getAttribute(AOEWidgetizer.config.widgetSelector.replace('[', '').replace(']', '')));
            if (!isNaN(widgetId)) {
                return widgetId;
            }
            return '';
        }

        function getParameters(currentWidget) {
            var parametersJSON  = currentWidget.getAttribute(AOEWidgetizer.config.parametersAttribute);
            var parameters      = JSON.parse(parametersJSON);
            var parameterString = '';

            //@TODO: Write super small library
            var firstRun = true;
            for (var parameterName in parameters) {
                if (firstRun) {
                    parameterString += '?' + parameterName + '=' + parameters[parameterName];
                } else {
                    parameterString += '&' + parameterName + '=' + parameters[parameterName];
                }
                firstRun = false;
            }

            return parameterString;
            //@ENDTODO
        }

        function requestUriIsBaseUri() {
            //@TODO: Check if widget id has been added, just because the uri changed does not mean it has an id
            return uri === AOEWidgetizer.config.widgetEndpoint;
        }

        for (var i = 0; i < widgets.length; i++) {
            var currentWidget = widgets[i];
            var uri = AOEWidgetizer.config.widgetEndpoint;

            uri += getWidgetId(currentWidget);
            uri += getParameters(currentWidget);

            if (!requestUriIsBaseUri(uri)) {
                uris.push(uri);
            }
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
