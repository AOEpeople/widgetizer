var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.config = (function() {
    return {
        // only data-attributes!
        widgetSelector: '[data-sp_widget]',
        parametersAttribute: 'data-parameters',
        configurationAttribute: 'data-configuration',
        // see https://extranet.aoe.com/confluence/display/SearchpereienceManual/Widget+Integration?src=search
        widgetEndpoint: 'https://cockpit.latest.fraport-search.aoe.host/frontend/widgets/'
    };
})();
