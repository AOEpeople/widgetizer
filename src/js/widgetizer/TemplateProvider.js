var AOEWidgetizer = AOEWidgetizer || {};

AOEWidgetizer.TemplateProvider = function() {
    return {
        getTemplate: function () {
            return  '{{collection.items}}' +
                        '{{if data.title}} <h1>{{data.title}}</h1> {{/if}}' +
                        '{{if data.previewimage}} <img src="{{data.previewimage}}" /> {{/if}}' +
                        '{{if data.description}} <span>{{data.description}}</span> {{/if}}' +
                    '{{/collection.items}}';
        }
    };
};
