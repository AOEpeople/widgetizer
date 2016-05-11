module.exports = function() {
    return {
        widgetEndpoint: 'http://localhost:3000/',
        jsonp: true,
        // only data-attributes!
        widgetSelector: '[data-sp_widget]',
        parametersAttribute: 'data-parameters',
        configurationAttribute: 'data-config',
        // see https://extranet.aoe.com/confluence/display/SearchpereienceManual/Widget+Integration?src=search
        templateSelector: 'script[data-sp-widget_template="#NAME#"]',
        defaultTemplate: '{{collection.items}}' +
        '{{if data.title}} <h1>{{data.title|sanitize}}</h1> {{/if}}' +
        '{{if data.previewimage}} <img src="{{data.previewimage|sanitize}}" /> {{/if}}' +
        '{{if data.description}} <span>{{data.description|sanitize}}</span> {{/if}}' +
        '{{/collection.items}}',
        jsonpCallbackBase: 'widgetizer_callback_'
    }
};