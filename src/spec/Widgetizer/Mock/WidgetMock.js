module.exports = function() {
    return {
        // module pattern just returns an anonymous object, need some way to determine
        // if it has been build with AOEWidgetizer.Widget
        constructorName: 'AOEWidgetizer.Widget',

        set: function(name, value) {
            this[name] = value;
            return this;
        },
        get: function(name) {
            return this[name];
        }
    };
};
