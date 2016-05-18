var Widget = require('../../../js/components/Widget');

describe("Widget", function () {
    var widget = new Widget();

    it('has set method to set properties', function() {
        expect(typeof widget.set).toBe('function');
    });

    it('has get method to get properties', function() {
        expect(typeof widget.get).toBe('function');
    });

    it('has a constructorName that is AOEWidgetizer.Widget', function() {
        expect(widget.constructorName).toBe('AOEWidgetizer.Widget');
    });

    it('set should return the widget so that it\'s chainable', function() {
        expect(widget.set('a', 'b')).toEqual(widget);
    });

    describe('set', function() {
        it('sets a property which get can retrieve', function() {
            widget.set('name', 'value');
            expect(widget.get('name')).toBe('value');
        });
    });
});
