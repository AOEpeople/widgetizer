describe("AOEWidgetizer.ConfigCheck", function () {
    var oldConfig = AOEWidgetizer.config;
    var configCheck;
    var missingPropertyTemplate = 'You have to configure the #property# in your config. Bailing out.';

    beforeEach(function() {
        spyOn(console, 'log');
        configCheck = new AOEWidgetizer.ConfigCheck();
    });

    it('returns false and outputs an error if config is not present at all', function() {
        AOEWidgetizer.config = undefined;

        expect(configCheck.checkConfig()).toBeFalsy();
        expect(console.log).toHaveBeenCalledWith('No config present at all. Please create AOEWidgetizer.config object. Bailing out.');
    });

    it('returns false and outputs an error if widgetSelector is missing in config', function() {
        AOEWidgetizer.config = {};

        expect(configCheck.checkConfig()).toBeFalsy();
        expect(console.log).toHaveBeenCalledWith(missingPropertyTemplate.replace('#property#', 'widgetSelector'));
    });

    it('returns false and outputs an error if widgetEndpoint is missing in config', function() {
        AOEWidgetizer.config = {'widgetSelector': ''};

        expect(configCheck.checkConfig()).toBeFalsy();
        expect(console.log).toHaveBeenCalledWith(missingPropertyTemplate.replace('#property#', 'widgetEndpoint'));
    });

    it('returns false and outputs an error if parametersAttribute is missing in config', function() {
        AOEWidgetizer.config = {'widgetSelector': '', 'widgetEndpoint': ''};

        expect(configCheck.checkConfig()).toBeFalsy();
        expect(console.log).toHaveBeenCalledWith(missingPropertyTemplate.replace('#property#', 'parametersAttribute'));
    });

    it('returns false and outputs an error if configurationAttribute is missing in config', function() {
        AOEWidgetizer.config = {'widgetSelector': '', 'widgetEndpoint': '', 'parametersAttribute': ''};

        expect(configCheck.checkConfig()).toBeFalsy();
        expect(console.log).toHaveBeenCalledWith(missingPropertyTemplate.replace('#property#', 'configurationAttribute'));
    });

    it('returns true if everything is well', function() {
        AOEWidgetizer.config = {'widgetSelector': '', 'widgetEndpoint': '', 'parametersAttribute': '', configurationAttribute: ''};

        expect(configCheck.checkConfig()).toBeTruthy();
        expect(console.log).not.toHaveBeenCalled();
    });

    afterEach(function() {
        AOEWidgetizer.config = oldConfig;
    });

});
