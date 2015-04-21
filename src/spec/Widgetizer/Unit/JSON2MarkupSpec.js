describe("AOEWidgetizer.JSON2Markup", function () {
    var json2markup,
        widgets = [];

    beforeEach(function() {
        json2markup = new AOEWidgetizer.JSON2Markup();

        var template =
            '{{collection.items}}' +
            '{{if data.title}} <h1>{{data.title}}</h1> {{/if}}' +
            '{{if data.previewimage}} <img src="{{data.previewimage}}" /> {{/if}}' +
            '{{if data.description}} <span>{{data.description}}</span> {{/if}}' +
            '{{/collection.items}}';

        var widgetJSON = {'collection': {'items': [
            {'data': {}},
            {'data': {}}
        ]
        }};

        for (var i = 0; i <= 1; i++) {
            var itemNumber = i + 1;

            widgetJSON.collection.items[i].data.title = 'Item ' + itemNumber + ' title';
            widgetJSON.collection.items[i].data.previewimage = 'https://placeimg.com/100/300/any#' + itemNumber;
            widgetJSON.collection.items[i].data.description = 'Some longer description describing item ' + itemNumber + '.';

            widgets.push(new AOEWidgetizer.Widget());
            widgets[i].set('json', widgetJSON);
            widgets[i].set('template', template);

        }
    });

    describe('returns the the two passed in widgets', function() {
        it('each with the markup property filled with a string', function() {
            expect(typeof json2markup.addMarkupToWidget(widgets[0]).get('markup')).toBe('string');
            expect(typeof json2markup.addMarkupToWidget(widgets[1]).get('markup')).toBe('string');
        });


        it('each with the proper title in the markup property', function() {
            expect(json2markup.addMarkupToWidget(widgets[0]).get('markup')).toMatch(/<h1>Item 1 title<\/h1>/);
            expect(json2markup.addMarkupToWidget(widgets[1]).get('markup')).toMatch(/<h1>Item 2 title<\/h1>/);
        });

        it('each with the previewimage in html markup', function() {
            expect(json2markup.addMarkupToWidget(widgets[0]).get('markup')).toMatch(/<img src="https:\/\/placeimg.com\/100\/300\/any#1" \/>/);
            expect(json2markup.addMarkupToWidget(widgets[1]).get('markup')).toMatch(/<img src="https:\/\/placeimg.com\/100\/300\/any#2" \/>/);
        });

        it('each with the description in html markup', function() {
            expect(json2markup.addMarkupToWidget(widgets[0]).get('markup')).toMatch(/<span>Some longer description describing item 1.<\/span>/);
            expect(json2markup.addMarkupToWidget(widgets[1]).get('markup')).toMatch(/<span>Some longer description describing item 2.<\/span>/);
        });
    });

    afterEach(function() {
        var widgetJSON = {'collection': {'items': [
            {'data': {}},
            {'data': {}}
        ]
        }};
    });
});
