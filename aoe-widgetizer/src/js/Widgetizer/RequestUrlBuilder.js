module.exports = function(config, utility) {
    var buildWidgetUris = function(widgets) {
        //@TODO: Extract to Widget class?
        function getWidgetIdOrAlias(currentWidget) {
            /* technically we return widget id or widget alias here */
            return currentWidget.getAttribute(config.widgetSelector.replace('[', '').replace(']', ''));

            //@TODO: This needs to drop an error, currently it's just:
            // Error loading widget. Original error:  SyntaxError: Unexpected token < {stack: (...), message:
            // "Unexpected token <"}message: "Unexpected token <"stack: (...)get stack: function () { [native code] }
            // set stack: function () { [native code] }__proto__: Error
        }

        var getParameterValue = function(parameter) {
            return Array.isArray(parameter) ? JSON.stringify(parameter) : parameter;
        };

        function parseParameterJSON(parametersJSON) {
            try {
                return JSON.parse(parametersJSON);
            } catch (e) {
                return {};
            }
        }

        function getGETParameterString(currentWidget) {
            var parametersJSON  = currentWidget.getAttribute(config.parametersAttribute);
            var parameters      = parseParameterJSON(parametersJSON);
            var parameterString = '';

            //@TODO: Write super small library
            var firstRun = true;
            for (var parameterName in parameters) {
                if (parameters.hasOwnProperty(parameterName)) {
                    if (firstRun) {
                        parameterString += '?' + parameterName + '=' + getParameterValue(parameters[parameterName]);
                    } else {
                        parameterString += '&' + parameterName + '=' + getParameterValue(parameters[parameterName]);
                    }
                    firstRun = false;
                }
            }

            return parameterString;
            //@ENDTODO
        }

        for (var i = 0; i < widgets.length; i++) {
            var currentWidget = widgets[i];
            var uri = config.widgetEndpoint;

            uri += getWidgetIdOrAlias(currentWidget.node);
            uri += getGETParameterString(currentWidget.node);

            currentWidget.endpoint = uri;
        }

        return widgets;
    };

    return {
        addUrisToWidgets: function(widgets) {
            if (utility.noArrayGiven(widgets)) {
                return [];
            }
            return buildWidgetUris(widgets);
        }
    };
};
