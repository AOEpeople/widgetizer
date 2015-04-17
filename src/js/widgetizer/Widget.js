var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.Widget = function() {
    return {
        set: function(name, value) {
            this[name] = value;
        },
        get: function(name) {
            return this[name];
        }
    };
};
