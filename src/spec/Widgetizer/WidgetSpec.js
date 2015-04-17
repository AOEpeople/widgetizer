describe("Widget", function () {
    var widget = new AOEWidgetizer.Widget();

    it('has set method to set properties', function() {
        expect(typeof widget.set).toBe('function');
    });

    it('has get method to get properties', function() {
        expect(typeof widget.get).toBe('function');
    });

    describe('set', function() {
       it('sets a property which get can retrieve', function() {
           widget.set('name', 'value');
           expect(widget.get('name')).toBe('value')
       });
    });
});
