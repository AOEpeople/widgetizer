describe("config", function () {
    it('self initializes and returns an object', function() {
        expect(AOEWidgetizer.config).not.toBeNull();
        expect(typeof AOEWidgetizer.config).toBe('object');
    });
});
