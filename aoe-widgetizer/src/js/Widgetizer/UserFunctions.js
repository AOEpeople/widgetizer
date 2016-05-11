module.exports = function () {
    window.AOEWidgetizer                             = window.AOEWidgetizer || {};
    window.AOEWidgetizer.extensions                  = window.AOEWidgetizer.extensions || {};
    window.AOEWidgetizer.extensions.beforeRequesting = window.AOEWidgetizer.extensions.beforeRequesting || {};
    window.AOEWidgetizer.extensions.afterRequesting  = window.AOEWidgetizer.extensions.afterRequesting || {};
    window.AOEWidgetizer.extensions.afterRendering   = window.AOEWidgetizer.extensions.afterRendering || {};

    var runUserFunctions = function (widget, functions) {
        for (var userFunctionName in functions) {
            if (functions.hasOwnProperty(userFunctionName)) {
                var widgetConfig = widget.get('config');

                // TODO: If you remove the comment from this line,
                // go to UserFunctionsSpec and remove the comment from expect(spyAfter3).not.toHaveBeenCalled();
                // TODO: decide on the name of the field, 'itemCallbacks' is not good since we now have
                // before and after callbacks
                if (/*jQuery.inArray(userFunctionName, widgetConfig.itemCallbacks) !== -1 &&*/
                    typeof functions[userFunctionName] === 'function') {
                    functions[userFunctionName](widget);
                }
            }
        }
    };

    return {
        runUserFunctionsBeforeRequesting: function (widget) {
            runUserFunctions(widget, window.AOEWidgetizer.extensions.beforeRequesting);
        },
        runUserFunctionsAfterRequesting: function (widget) {
            runUserFunctions(widget, window.AOEWidgetizer.extensions.afterRequesting);
        },
        runUserFunctionsAfterRendering: function (widget) {
            runUserFunctions(widget, window.AOEWidgetizer.extensions.afterRendering);
        }
    };
};
