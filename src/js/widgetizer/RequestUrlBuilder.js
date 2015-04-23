AOEWidgetizer.RequestUrlBuilder = function() {
    buildWidgetUris = function(widgets) {
        //@TODO: Extract to Widget class?
        function getWidgetId(currentWidget) {
            var widgetId = parseInt(currentWidget.getAttribute(AOEWidgetizer.config.widgetSelector.replace('[', '').replace(']', '')));
            if (!isNaN(widgetId)) {
                return widgetId;
            }
            //@TODO: This needs to drop an error, currently it's just:
            // Error loading widget. Original error:  SyntaxError: Unexpected token < {stack: (...), message:
            // "Unexpected token <"}message: "Unexpected token <"stack: (...)get stack: function () { [native code] }
            // set stack: function () { [native code] }__proto__: Error
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

        for (var i = 0; i < widgets.length; i++) {
            var currentWidget = widgets[i];
            var uri = AOEWidgetizer.config.widgetEndpoint;

            uri += getWidgetId(currentWidget.node);
            uri += getParameters(currentWidget.node);

            currentWidget.endpoint = uri;
        }

        return widgets;
    };

    noArrayGiven = function(widgets) {
        if (!widgets || widgets.constructor !== Array) {
            console.log('Method getUrisForWidget needs array of AOEWidgetizer.Widget elements. No array given. Returning empty array.');
            return true;
        }
        return false;
    };

    return {
        addUrisToWidgets: function(widgets) {

            if (noArrayGiven(widgets)) {
                return [];
            }

            return buildWidgetUris(widgets);
        }
    };
};
