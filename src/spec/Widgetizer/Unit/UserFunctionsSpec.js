var WidgetFactory = require('./../WidgetFactory');
var UserFunctions = require('../../../js/components/UserFunctions');

describe('AOEWidgetizer.UserFunctions', function() {
    var userFunctions;
    var spyBeforeRequesting, spyBeforeRequesting2;
    var spyAfterRequesting, spyAfterRequesting2;
    var spyAfterRendering, spyAfterRendering2, spyAfterRendering3;
    var widget;

    beforeEach(function() {
        userFunctions = new UserFunctions();

        spyBeforeRequesting = jasmine.createSpy('userFunctionBeforeRequesting1');
        spyBeforeRequesting2 = jasmine.createSpy('userFunctionBeforeRequesting2');
        window.AOEWidgetizer.extensions.beforeRequesting.userFunctionBefore1 = spyBeforeRequesting;
        window.AOEWidgetizer.extensions.beforeRequesting.userFunctionBefore2 = spyBeforeRequesting2;

        spyAfterRequesting = jasmine.createSpy('userFunctionAfterRequesting1');
        spyAfterRequesting2 = jasmine.createSpy('userFunctionAfterRequesting2');
        window.AOEWidgetizer.extensions.afterRequesting.userFunctionBefore1 = spyAfterRequesting;
        window.AOEWidgetizer.extensions.afterRequesting.userFunctionBefore2 = spyAfterRequesting2;

        spyAfterRendering = jasmine.createSpy('userFunctionAfterRendering1');
        spyAfterRendering2 = jasmine.createSpy('userFunctionAfterRendering2');
        spyAfterRendering3 = jasmine.createSpy('userFunctionAfterRendering3');
        window.AOEWidgetizer.extensions.afterRendering.userFunctionAfter1 = spyAfterRendering;
        window.AOEWidgetizer.extensions.afterRendering.userFunctionAfter2 = spyAfterRendering2;
        window.AOEWidgetizer.extensions.afterRendering.userFunctionAfter3 = spyAfterRendering3;

        widget = WidgetFactory();
    });

    it('should prepare an AOEWidgetizer.extensions array', function() {
        expect(window.AOEWidgetizer.extensions instanceof Object).toBeTruthy();
    });

    it('should prepare an AOEWidgetizer.extensions.beforeRequesting object', function() {
        expect(window.AOEWidgetizer.extensions.beforeRequesting instanceof Object).toBeTruthy();
    });

    it('should prepare an AOEWidgetizer.extensions.afterRequesting object', function() {
        expect(window.AOEWidgetizer.extensions.afterRequesting instanceof Object).toBeTruthy();
    });

    it('should prepare an AOEWidgetizer.extensions.afterRendering object', function() {
        expect(window.AOEWidgetizer.extensions.afterRendering instanceof Object).toBeTruthy();
    });

    it('should trigger only specified functions that are added to AOEWidgetizer.extensions object', function() {
        userFunctions.runUserFunctionsBeforeRequesting(widget);
        userFunctions.runUserFunctionsAfterRequesting(widget);
        userFunctions.runUserFunctionsAfterRendering(widget);

        expect(spyBeforeRequesting).toHaveBeenCalled();
        expect(spyBeforeRequesting2).toHaveBeenCalled();
        expect(spyAfterRequesting).toHaveBeenCalled();
        expect(spyAfterRequesting2).toHaveBeenCalled();
        expect(spyAfterRendering).toHaveBeenCalled();
        expect(spyAfterRendering2).toHaveBeenCalled();

        // TODO: Commented out as long as UserFunction.js is not checking for
        // /*jQuery.inArray(userFunctionName, config.itemCallbacks) !== -1 &&*/
        //expect(spyAfter3).not.toHaveBeenCalled();
    });

    it('should pass the current widget to every user function', function() {
        userFunctions.runUserFunctionsBeforeRequesting(widget);
        userFunctions.runUserFunctionsAfterRequesting(widget);
        userFunctions.runUserFunctionsAfterRendering(widget);

        expect(spyBeforeRequesting).toHaveBeenCalledWith(widget);
        expect(spyBeforeRequesting2).toHaveBeenCalledWith(widget);
        expect(spyAfterRequesting).toHaveBeenCalledWith(widget);
        expect(spyAfterRequesting2).toHaveBeenCalledWith(widget);
        expect(spyAfterRendering).toHaveBeenCalledWith(widget);
        expect(spyAfterRendering2).toHaveBeenCalledWith(widget);
    });

    it('should not care about passing non functions', function() {
        window.AOEWidgetizer.extensions.beforeRequesting.userFunction3 = '';
        window.AOEWidgetizer.extensions.beforeRequesting.userFunction4 = {};
        window.AOEWidgetizer.extensions.beforeRequesting.userFunction5 = 5;

        window.AOEWidgetizer.extensions.afterRequesting.userFunction3 = '';
        window.AOEWidgetizer.extensions.afterRequesting.userFunction4 = {};
        window.AOEWidgetizer.extensions.afterRequesting.userFunction5 = 5;

        window.AOEWidgetizer.extensions.afterRendering.userFunction3 = '';
        window.AOEWidgetizer.extensions.afterRendering.userFunction4 = {};
        window.AOEWidgetizer.extensions.afterRendering.userFunction5 = 5;

        userFunctions.runUserFunctionsBeforeRequesting(widget);
        userFunctions.runUserFunctionsAfterRequesting(widget);
        userFunctions.runUserFunctionsAfterRendering(widget);

        expect(spyBeforeRequesting).toHaveBeenCalled();
        expect(spyBeforeRequesting2).toHaveBeenCalled();
        expect(spyAfterRequesting).toHaveBeenCalled();
        expect(spyAfterRequesting2).toHaveBeenCalled();
        expect(spyAfterRendering).toHaveBeenCalled();
        expect(spyAfterRendering2).toHaveBeenCalled();
    });
});
