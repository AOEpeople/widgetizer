var Widgetizer       = require('./../../../js/Widgetizer');
var WidgetizerConfig = require('./../Mock/WidgetizerConfig');
var $                = require('jquery');

describe("AOEWidgetizer.Widgetizer", function () {
    var widgetDiv1,
        widgetDiv2,
        widgetizerConfig,
        widgetizer;

    beforeEach(function () {
        /* *********************************************************************************** */
        /* WidgetizerSpec.js runs just after UserFunctionsSpec.js and it does it so fast that  */
        /* jQuery doesn't get the time to clean up the JSONP callback from the last test in    */
        /* 'should ensure flow "beforeRequesting" and "afterRendering" and "afterRequesting"'. */
        /* Therefore we change the callback base for the two test suits so they don't collide. */
        /* *********************************************************************************** */
        widgetizerConfig = new WidgetizerConfig();
        widgetizerConfig.jsonpCallbackBase = 'user_functions_spec_js_';
        /* *********************************************************************************** */

        widgetizer = new Widgetizer(widgetizerConfig);

        widgetDiv1 = document.createElement('div');
        widgetDiv1.setAttribute('data-sp_widget', '19');
        widgetDiv1.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
        widgetDiv1.setAttribute('data-config', '{"json": "for config"}');

        //@TODO: This should not have the same id as the first widget
        widgetDiv2 = document.createElement('div');
        widgetDiv2.setAttribute('data-sp_widget', '19');
        widgetDiv2.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
        widgetDiv2.setAttribute('data-config', '{"json": "for config"}');

        document.body.appendChild(widgetDiv1);
        document.body.appendChild(widgetDiv2);
    });

    describe('has "beforeRequesting" and "afterRendering" and "afterRequesting" callbacks', function () {
        it('should execute "beforeRequesting"', function (done) {
            var spyBefore1 = jasmine.createSpy('userFunctionBefore1');
            var spyBefore2 = jasmine.createSpy('userFunctionBefore2');

            window.AOEWidgetizer.extensions = {
                beforeRequesting: {
                    userFunctionBefore1: spyBefore1,
                    userFunctionBefore2: spyBefore2
                }
            };

            widgetizer.init();

            $(document).on('allWidgetsRendered.AOEWidgetizer', function () {
                expect(spyBefore1).toHaveBeenCalled();
                expect(spyBefore2).toHaveBeenCalled();
                done();
            });
        });

        it('should execute "afterRendering"', function (done) {
            var spyAfter1 = jasmine.createSpy('userFunctionAfter1');
            var spyAfter2 = jasmine.createSpy('userFunctionAfter2');

            window.AOEWidgetizer.extensions = {
                afterRendering: {
                    userFunctionAfter1: spyAfter1,
                    userFunctionAfter2: spyAfter2
                }
            };

            widgetizer.init();

            $(document).on('allWidgetsRendered.AOEWidgetizer', function () {
                expect(spyAfter1).toHaveBeenCalled();
                expect(spyAfter2).toHaveBeenCalled();
                done();
            });
        });

        it('should execute "afterRequesting"', function (done) {
            var spyAfter1 = jasmine.createSpy('userFunctionAfterRequesting1');
            var spyAfter2 = jasmine.createSpy('userFunctionAfterRequesting2');

            window.AOEWidgetizer.extensions = {
                afterRequesting: {
                    userFunctionAfterRequesting1: spyAfter1,
                    userFunctionAfterRequesting2: spyAfter2
                }
            };

            widgetizer.init();

            $(document).on('allWidgetsRendered.AOEWidgetizer', function () {
                expect(spyAfter1).toHaveBeenCalled();
                expect(spyAfter2).toHaveBeenCalled();
                done();
            });
        });

        xit('should ensure flow "beforeRequesting" and "afterRendering" and "afterRequesting"', function (done) {
            var orderArray = [];
            var callbackSpy = function(arg) {
                  orderArray.push(arg);
            };

            window.AOEWidgetizer.extensions = {
                beforeRequesting: {
                    runBeforeRequesting: callbackSpy.call(this, 1)
                },
                afterRequesting: {
                    runAfterRequesting: callbackSpy.call(this, 2)
                },
                afterRendering: {
                    runAfterRendering: callbackSpy.call(this, 3)
                }
            };

            widgetizer.init();

            $(document).on('widgetRendered.AOEWidgetizer', function() {
                expect(orderArray).toEqual([1, 2, 3]);
                done();
            });
        });

        //TODO: Add more specific tests for every callback (that they're called at the right time and in the right place)

        afterEach(function () {
            window.AOEWidgetizer.extensions = {};
        });
    });

    afterEach(function () {
        document.body.removeChild(widgetDiv1);
        document.body.removeChild(widgetDiv2);

        $(document).off('allWidgetsRendered.AOEWidgetizer');
        $(document).off('widgetRendered.AOEWidgetizer');
    });
});
