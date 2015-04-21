describe("AOEWidgetizer.TemplateProvider", function () {
    var templateProvider;

    beforeEach(function() {
        templateProvider = new AOEWidgetizer.TemplateProvider();
    });

    it("returns a basic template", function() {
        expect(templateProvider.getTemplate()).toMatch(/description/);
        expect(templateProvider.getTemplate()).toMatch(/title/);
        expect(templateProvider.getTemplate()).toMatch(/previewimage/);
    });

    afterEach(function() {

    });
});
