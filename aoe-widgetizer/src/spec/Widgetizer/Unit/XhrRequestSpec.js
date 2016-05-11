var jQuery     = require('jquery');
var testHelper = require('./../testHelper');
var XHRRequest = require('./../../../js/Widgetizer/XhrRequest');

describe("XHRRequest", function () {
    var xhrRequester;

    it('can make a request and get a valid json', function(done) {
        xhrRequester = new XHRRequest(jQuery, {jsonp: false});

        xhrRequester.getWidgetJSON(testHelper.widgetEndpoint + '19').done(function(jsonResponse) {
            expect(jsonResponse.collection.items[0].data.title).toBe('Hennessy VSOP Privilege Limited Edition 40% 1L, Geschenkverpackung (HM)');
            done();
        });
    });

    it('can make a request and get a valid jsonp response', function(done) {
        xhrRequester = new XHRRequest(jQuery, {jsonp: true});

        xhrRequester.getWidgetJSON(testHelper.widgetEndpoint + '22').done(function(jsonResponse) {
            expect(jsonResponse.collection.items[0].data.title).toBe('Hennessy VSOP Privilege Limited Edition 40% 1L, Geschenkverpackung (HM)');
            done();
        });
    });
});
