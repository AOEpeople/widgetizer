var jQuery = require('jquery');
var Events = require('../../../js/components/Events');

describe("Events", function () {
    var event;

    beforeEach(function() {
        event = new Events(jQuery);
    });

    describe('has a triggerWidgetRendered method', function() {
        it('that triggers an event on the body', function(done) {
            jQuery(document).on('widgetRendered.AOEWidgetizer', function() {
                // yea, this is a bit weird, but didn't want to add karma-jasmine-jquery just for spyOnEvents()
                expect('widgetRendered.AOEWidgetizer should have been triggered').toBeTruthy();
                done();
            });

            event.triggerWidgetRendered();
        });

        it('and provides the optionally given data as array as second parameter of the callback', function(done) {
            jQuery(document).on('widgetRendered.AOEWidgetizer', function(event, data) {
                expect(data.foo).toBe('bar');
                expect(data.bar).toBe('foo');
                done();
            });

            event.triggerWidgetRendered({foo: 'bar', bar: 'foo'});
        });

        afterEach(function() {
            jQuery(document).off('widgetRendered.AOEWidgetizer');
        });
    });
});
