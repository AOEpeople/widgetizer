var AOEWidgetizer = require('./Widgetizer');
if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('AOEWidgetizer', function () { return AOEWidgetizer; });
} else {
    global.window.AOEWidgetizer = AOEWidgetizer;
}