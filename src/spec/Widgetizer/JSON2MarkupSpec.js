describe("AOEWidgetizer.JSON2Markup", function () {
    var json2markup;
    var widgetJSON;

    beforeEach(function() {
        json2markup = new AOEWidgetizer.JSON2Markup();
        widgetJSON = {'collection': {'items': [
            {'data': {}},
            {'data': {}}
        ]
        }};

        for (var i = 0; i <= 1; i++) {
            var itemNumber = i + 1;

            widgetJSON.collection.items[i].data.title = 'Item ' + itemNumber + ' title';
            widgetJSON.collection.items[i].data.previewimage = 'https://placeimg.com/100/300/any#' + itemNumber;
            widgetJSON.collection.items[i].data.description = 'Some longer description describing item ' + itemNumber + '.';
        }
    });

    describe('returns the widgets markup which contains two items', function() {
        it('each with the title in html markup', function() {
            expect(json2markup.getMarkup(widgetJSON)).toMatch(/<h1>Item 1 title<\/h1>/);
            expect(json2markup.getMarkup(widgetJSON)).toMatch(/<h1>Item 2 title<\/h1>/);
        });

        it('each with the previewimage in html markup', function() {
            expect(json2markup.getMarkup(widgetJSON)).toMatch(/<img src="https:\/\/placeimg.com\/100\/300\/any#1" \/>/);
            expect(json2markup.getMarkup(widgetJSON)).toMatch(/<img src="https:\/\/placeimg.com\/100\/300\/any#2" \/>/);
        });

        it('each with the description in html markup', function() {
            expect(json2markup.getMarkup(widgetJSON)).toMatch(/<span>Some longer description describing item 1.<\/span>/);
            expect(json2markup.getMarkup(widgetJSON)).toMatch(/<span>Some longer description describing item 2.<\/span>/);
        });
    });

    afterEach(function() {
        var widgetJSON = {'collection': {'items': [
            {'data': {}},
            {'data': {}}
        ]
        }};
    })
});
