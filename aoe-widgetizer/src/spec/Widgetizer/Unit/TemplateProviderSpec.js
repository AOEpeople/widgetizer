var $ = require('jquery');
var WidgetFactory    = require('./../WidgetFactory');
var WidgetizerConfig = require('./../Mock/WidgetizerConfig');
var TemplateProvider = require('./../../../js/Widgetizer/TemplateProvider');

describe("TemplateProvider", function () {
    var oldMarkup;
    var templateProvider;
    var defaultTemplateContent = 'defaultTemplateContent';
    var widgetizerConfig = new WidgetizerConfig();

    beforeEach(function() {
        oldMarkup = document.body.innerHTML;
        widgetizerConfig.defaultTemplate = defaultTemplateContent;
        templateProvider = new TemplateProvider($, widgetizerConfig, {noArrayGiven: function() { return false; }});
    });

    it("returns the default template when no data-config exists at all", function() {
        var widgetWithoutConfig = WidgetFactory(null, widgetizerConfig);

        var widgetsWithTemplates = templateProvider.addTemplatesToWidgets([widgetWithoutConfig]);

        expectDefaultTemplateContent(widgetsWithTemplates);
    });

    it("returns the default template when no data-config without template specified exists", function() {
        var widgetWithSomeConfig = WidgetFactory({config: {setting: 'x'}}, widgetizerConfig);

        var widgetsWithTemplates = templateProvider.addTemplatesToWidgets([widgetWithSomeConfig]);

        expectDefaultTemplateContent(widgetsWithTemplates);
    });

    it("returns the default template when template config can't find template", function() {
        var widgetWithTemplateConfig = WidgetFactory({config: {template: 'does-not-exist'}}, widgetizerConfig);

        var widgetsWithTemplates = templateProvider.addTemplatesToWidgets([widgetWithTemplateConfig]);

        expectDefaultTemplateContent(widgetsWithTemplates);
    });

    it("returns the custom template when template config and template match", function() {
        var templateName = 'custom-template';
        var templateElement = document.createElement('script');
        templateElement.setAttribute('type', 'text/template');
        templateElement.setAttribute('data-sp-widget_template', templateName);
        templateElement.innerHTML = 'customTemplateContent';
        document.head.appendChild(templateElement);

        var widgetWithTemplateConfig = WidgetFactory({config: {template: templateName}}, widgetizerConfig);

        var widgetsWithCustomTemplates = templateProvider.addTemplatesToWidgets([widgetWithTemplateConfig]);

        expect(widgetsWithCustomTemplates.length).toBe(1);
        expect(widgetsWithCustomTemplates[0].get('template')).toBe('customTemplateContent');
    });

    afterEach(function() {
        document.body.innerHTML = oldMarkup;
    });

    function expectDefaultTemplateContent(widgets) {
        widgets.forEach(function (widget) {
            var templateContent = widget.get('template');
            expect(templateContent).toBe(defaultTemplateContent);
        });
    }
});
