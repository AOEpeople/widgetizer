describe("AOEWidgetizer.WidgetRenderer", function () {
    var renderer,
        node;

    beforeEach(function() {
        renderer = new AOEWidgetizer.WidgetRenderer();
        node = document.createElement('div');
    });

    it('the inner html of a freshly created node should be empty', function () {
        expect(node.innerHTML).toBe('');
    });

    it('puts the content of the widgets markup property into the widgets node property innerHTML', function() {
        var widget = new AOEWidgetizer.Widget();
        var markup = '<span>Some markup</span>';
        widget.set('node', node);
        widget.set('markup', markup);
        renderer.renderWidget(widget);

        expect(widget.get('node').innerHTML).toBe(markup);
    });
});
