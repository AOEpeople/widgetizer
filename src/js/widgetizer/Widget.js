var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.Widget = function() {
    var node,
        endpoint,
        json,
        template,
        markup;

    return {
        // module pattern just returns an anonymous object, need some way to determine
        // if it has been build with AOEWidgetizer.Widget
        constructorName: 'AOEWidgetizer.Widget',

        set: function(name, value) {
            this[name] = value;
        },
        get: function(name) {
            return this[name];
        }
    };
};
