var WidgetMock = require('./Mock/WidgetMock');

module.exports = function(widgetConfig, config) {
    var widgetConfig = widgetConfig || {};
    var widget = new WidgetMock();

    var widgetNode = document.createElement('div');
    widget.set('node', widgetNode);

    if (widgetConfig.config) {
        widgetNode.setAttribute(config.configurationAttribute, JSON.stringify(widgetConfig.config));
        widget.set('config', widgetConfig.config);
    }

    if (widgetConfig.parameters) {
        widgetNode.setAttribute(config.parametersAttribute, JSON.stringify(widgetConfig.parameters));
    }

    if (widgetConfig.json) {
        widget.set('json', widgetConfig.json);
    }

    if (widgetConfig.template) {
        widget.set('template', widgetConfig.template);
    }

    if (widgetConfig.id) {
        widgetNode.setAttribute(config.widgetSelector.replace('[', '').replace(']', ''), widgetConfig.id);
    }

    if (widgetConfig.markup) {
        widgetNode.innerHtml = widgetConfig.markup;
        widget.set('markup', widgetConfig.markup);
    }

    return widget;
}