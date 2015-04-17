describe("AOEWidgetizer.WidgetSelect", function () {
    var xhrRequester;

    beforeEach(function() {
        xhrRequester = new AOEWidgetizer.XhrRequest();
    });

    it('can make a request and get a valid json', function(done) {
       xhrRequester.getWidgetJSON('http://localhost:8000/mock/19').then(function(markup) {
           expect(markup).toMatch(/Hennessy VSOP Privilege Limited Edition/);
           done();
       });
    });

    afterEach(function() {

    })
});
