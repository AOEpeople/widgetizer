describe("AOEWidgetizer.XHRRequest", function () {
    var xhrRequester;

    beforeEach(function() {
        xhrRequester = new AOEWidgetizer.XHRRequest();
    });

    it('can make a request and get a valid json', function(done) {
       xhrRequester.getWidgetJSON('http://localhost:8000/mock/19').then(function(jsonResponse) {
           expect(jsonResponse.collection.items[0].data.title).toBe('Hennessy VSOP Privilege Limited Edition 40% 1L, Geschenkverpackung (HM)');
           done();
       });
    });

    afterEach(function() {

    });
});
