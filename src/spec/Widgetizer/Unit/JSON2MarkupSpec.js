var WidgetFactory    = require('./../WidgetFactory');
var WidgetizerConfig = require('./../Mock/WidgetizerConfig');
var JSON2Markup      = require('../../../js/components/JSON2Markup');

describe("JSON2Markup", function () {
    var json2markup,
        WITH_ITEMS = true,
        fallbackContent = 'Fallback content',
        MarkUpStub = {up: function() {}};

    var getWidgets = function (withItems) {
        var widgets = [];
        var template = 'some template';
        var widgetJSON = {'collection': {'items': [{'data': {}}, {'data': {}}]}};

        for (var i = 0; i <= 1; i++) {
            var itemNumber = i + 1;

            if (withItems) {
                widgetJSON.collection.items[i].data.title = 'Item ' + itemNumber + ' title';
                widgetJSON.collection.items[i].data.previewimage = 'https://placeimg.com/100/300/any#' + itemNumber;
                widgetJSON.collection.items[i].data.description = 'Some longer description describing item ' + itemNumber + '.';
            } else {
                widgetJSON.collection.fallback_content = fallbackContent;
            }

            widgets.push(WidgetFactory({json: widgetJSON, template: template}, new WidgetizerConfig()));
        }

        return widgets;
    };

    beforeEach(function() {
        json2markup = new JSON2Markup(MarkUpStub);
    });

    it('should call the template engine if widgets with items are passed in', function() {
        var widgets = getWidgets(WITH_ITEMS);
        spyOn(MarkUpStub, 'up');

        json2markup.addMarkupToWidget(widgets[0]);
        expect(MarkUpStub.up).toHaveBeenCalledWith(widgets[0].template, widgets[0].json);
        json2markup.addMarkupToWidget(widgets[1]);
        expect(MarkUpStub.up).toHaveBeenCalledWith(widgets[1].template, widgets[1].json);
    });

    it('should not call the template engine if empty widgets are passed in', function() {
        var widgets = getWidgets(!WITH_ITEMS);
        spyOn(MarkUpStub, 'up');

        json2markup.addMarkupToWidget(widgets[0]);
        expect(MarkUpStub.up).not.toHaveBeenCalled();
        json2markup.addMarkupToWidget(widgets[1]);
        expect(MarkUpStub.up).not.toHaveBeenCalled();
    });
});
