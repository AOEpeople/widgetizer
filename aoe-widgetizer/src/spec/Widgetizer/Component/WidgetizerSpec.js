var Widgetizer       = require('./../../../js/Widgetizer');
var WidgetizerConfig = require('./../Mock/WidgetizerConfig');
var $                = require('jquery');

describe("AOEWidgetizer.Widgetizer", function () {
    var widgetDiv1,
        widgetDiv2,
        widgetDiv3,
        widgetDiv4,
        widgetDiv5,
        widgetizerConfig,
        widgetizer,
        widgetHolder;

    beforeEach(function() {
        /* *********************************************************************************** */
        /* WidgetizerSpec.js runs just after UserFunctionsSpec.js and it does it so fast that  */
        /* jQuery doesn't get the time to clean up the JSONP callback from the last test in    */
        /* 'should ensure flow "beforeRequesting" and "afterRendering" and "afterRequesting"'. */
        /* Therefore we change the callback base for the two test suits so they don't collide. */
        /* *********************************************************************************** */
        widgetizerConfig = new WidgetizerConfig();
        widgetizerConfig.jsonpCallbackBase = 'widgetizer_spec_js_';
        /* *********************************************************************************** */

        widgetizer = new Widgetizer(widgetizerConfig, $);
        widgetDiv1 = document.createElement('div');
        widgetDiv1.setAttribute('data-sp_widget', '19');
        widgetDiv1.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
        widgetDiv1.setAttribute('data-config', '{"json": "for config"}');

        //@TODO: This should not have the same id as the first widget
        widgetDiv2 = document.createElement('div');
        widgetDiv2.setAttribute('data-sp_widget', '19');
        widgetDiv2.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
        widgetDiv2.setAttribute('data-config', '{"json": "for config"}');

        widgetDiv3 = document.createElement('div');
        widgetDiv3.setAttribute('data-sp_widget', '19');
        widgetDiv3.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
        widgetDiv3.setAttribute('data-config', '{"json": "for config"}');
        widgetDiv3.setAttribute('data-disabled', '');

        widgetDiv4 = document.createElement('div');
        widgetDiv4.setAttribute('data-sp_widget', 'test_alias');
        widgetDiv4.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
        widgetDiv4.setAttribute('data-config', '{"json": "for config"}');

        document.body.appendChild(widgetDiv1);
        document.body.appendChild(widgetDiv2);
        document.body.appendChild(widgetDiv3);
        document.body.appendChild(widgetDiv4);
    });

    /** IMPORTANT!
     *
     *  Widgetizer triggers an event after all widgets have been rendered. That means, if you write two tests, where
     *  the first test does not wait for the event triggering but the second test does, the first test might finish
     *  before the event has been triggered and the event will trigger the second tests event handler which
     *  might result in failing tests.
     *
     *  Suggestion: Even if you don't need to wait for the allWidgetsRendered event,
     *  wait for it and then execute your assertions.
     *
     *  Farewell.
     */

    it('emits an allWidgetsRendered.AOEWidgetizer event on the document when all widgets have been rendered', function(done) {
        widgetizer.init();

        var triggered = false;
        $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
            triggered = true;
        });

        // everything longer than 500ms is considered slow by jasmine
        // 450 ms plus execution time shouldn't go over 500 ms
        setTimeout(function() {
            expect(triggered).toBe(true);
            done();
        }, 450);
    });

    it('renders the widgets title to the widget divs inner HTML', function(done) {
        widgetizer.init();

        $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
            expect(document.body.innerHTML).toMatch(/<h1>Hennessy VSOP Privilege Limited Edition 40% 1L, Geschenkverpackung \(HM\)<\/h1>/);
            expect(document.body.innerHTML).toMatch((/<h1>Hennessy VSOP Privilege Limited Edition 40% 1L, Geschenkverpackung \(HM\)<\/h1>/));
            done();
        });
    });

    it('renders the widgets image to the widget divs inner HTML', function(done) {
        widgetizer.init();

        $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
            expect(document.body.innerHTML).toMatch(/<img src="http:\/\/www.latest.test-web.aoe.host\/media\/catalog\/product\/cache\/1\/small_image\/201x201\/9df78eab33525d08d6e5fb8d27136e95\/1\/0\/1077972.jpg">/);
            expect(document.body.innerHTML).toMatch((/<img src="http:\/\/www.latest.test-web.aoe.host\/media\/catalog\/product\/cache\/1\/small_image\/201x201\/9df78eab33525d08d6e5fb8d27136e95\/1\/0\/1077972.jpg">/));
            done();
        });
    });

    it('renders the widgets description to the widget divs inner HTML', function(done) {
        widgetizer.init();

        $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
            expect(document.body.innerHTML).toMatch(/<span>Hennessy VSOP Privilege Limited Edition 40% 1L, GeschenkverpackungInspiriert von dem im Jahr 1817 von George IV, dem späteren König von England, in Auftrag gegebenen Cognac „Very Superior Old Pale“ bezieht der Hennessy V.S.O.P sein Image in nahezu zwei Jahrhunderten. Kreiert wurde er, um allen Anlässen gerecht zu werden und kann on the rocks, als Long Drink oder noch kreativer als Bestandteil eines Cocktails genossen werden. Alkoholgehalt in Vol.-%: 40 Herstellerinformation: Jas Hennessy &amp; Co ,Rue de la Richonne ,16101 ,Cognac Cedex ,Frankreich Warnhinweise: Maßvoll genießen Zutaten: grapes from cognac, burnt sugar mit Farbstoff<\/span>/);
            expect(document.body.innerHTML).toMatch(/<span>Hennessy VSOP Privilege Limited Edition 40% 1L, GeschenkverpackungInspiriert von dem im Jahr 1817 von George IV, dem späteren König von England, in Auftrag gegebenen Cognac „Very Superior Old Pale“ bezieht der Hennessy V.S.O.P sein Image in nahezu zwei Jahrhunderten. Kreiert wurde er, um allen Anlässen gerecht zu werden und kann on the rocks, als Long Drink oder noch kreativer als Bestandteil eines Cocktails genossen werden. Alkoholgehalt in Vol.-%: 40 Herstellerinformation: Jas Hennessy &amp; Co ,Rue de la Richonne ,16101 ,Cognac Cedex ,Frankreich Warnhinweise: Maßvoll genießen Zutaten: grapes from cognac, burnt sugar mit Farbstoff<\/span>/);
            done();
        });
    });

    it('returns two not disabled items and ignores the third from type AOEWidgetizer.Widget', function(done) {
        var widgets = widgetizer.init();

        $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
            expect(widgets.length).toBe(3);
            expect(widgets[0].constructorName).toBe('AOEWidgetizer.Widget');
            expect(widgets[1].constructorName).toBe('AOEWidgetizer.Widget');
            expect(widgets[2].constructorName).toBe('AOEWidgetizer.Widget');

            done();
        });
    });

    it('renders a custom template when template config matches', function (done) {
        var templateElement = document.createElement('script');
        templateElement.setAttribute('type', 'text/template');
        templateElement.setAttribute('data-sp-widget_template', 'my-template');
        templateElement.innerHTML = 'customTemplateContent';
        document.head.appendChild(templateElement);

        widgetDiv1.setAttribute('data-config', '{"template": "my-template"}');

        widgetizer.init();

        $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
            expect(document.body.innerHTML).toMatch(/customTemplateContent/);
            document.head.removeChild(templateElement);
            done();
        });
    });

    describe('emits an widgetRendered.AOEWidgetizer event on the document', function() {
        it('for every rendered widget', function(done) {
            widgetizer.init();

            var triggered = 0;
            $(document).on('widgetRendered.AOEWidgetizer', function() {
                triggered += 1;
            });


            $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
                expect(triggered).toBe(3);
                done();
            });
        });

        it('with the widgets node as data', function(done) {
            widgetizer.init();

            var passedData = [];
            $(document).on('widgetRendered.AOEWidgetizer', function(event, data) {
                passedData.push(data);
            });

            $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
                expect($(passedData[0].node).attr('data-sp_widget')).toBe(widgetDiv1.getAttribute('data-sp_widget'));
                expect($(passedData[1].node).attr('data-sp_widget')).toBe(widgetDiv2.getAttribute('data-sp_widget'));
                expect($(passedData[2].node).attr('data-sp_widget')).toBe(widgetDiv4.getAttribute('data-sp_widget'));
                done();
            });
        });
    });

    describe("selectively initializes widgets", function () {
        beforeEach(function() {

            widgetDiv5 = document.createElement('div');
            widgetDiv5.setAttribute('data-sp_widget', 'widget5');
            widgetDiv5.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
            widgetDiv5.setAttribute('data-config', '{"json": "for config"}');

            widgetHolder = document.createElement('div');
            widgetHolder.appendChild(widgetDiv5);
            document.body.appendChild(widgetHolder);
        });

        it('only inside provided element (scope)', function(done) {
            widgetizer.init(widgetHolder);

            var passedData = [];
            var triggered = 0;
            $(document).on('widgetRendered.AOEWidgetizer', function(event, data) {
                passedData.push(data);
                triggered += 1;
            });


            $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
                expect(triggered).toBe(1);
                expect($(passedData[0].node).attr('data-sp_widget')).toBe(widgetDiv5.getAttribute('data-sp_widget'));
                done();
            });
        });

        it('that are provided to the init function', function(done) {
            widgetizer.init(widgetDiv5);

            var passedData = [];
            var triggered = 0;
            $(document).on('widgetRendered.AOEWidgetizer', function(event, data) {
                passedData.push(data);
                triggered += 1;
            });


            $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
                expect(triggered).toBe(1);
                expect($(passedData[0].node).attr('data-sp_widget')).toBe(widgetDiv5.getAttribute('data-sp_widget'));
                done();
            });
        });

        afterEach(function() {
            document.body.removeChild(widgetHolder);
        });
    });

    describe("is a singleton", function() {
        it("should be unique", function() {
            var widgetizer1 = new Widgetizer(widgetizerConfig);
            var widgetizer2 = new Widgetizer(widgetizerConfig);

            expect(widgetizer1).toBe(widgetizer2);
        });
    });

    xdescribe("generates urls", function() {
        it("with proper callback names", function(done) {
            var callback = initializeSpyAndGetCallback();
            initializeExtensionAndWidgetizer(callback);

            $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
                done();
            });
        });

        it("with proper callback names when we re-render a certain widget", function(done) {
            var callback = initializeSpyAndGetCallback();
            initializeExtensionAndWidgetizer(callback);

            $(document).on('allWidgetsRendered.AOEWidgetizer', function() {
                var afterRequesting = function(widget) {
                    expect($.ajax.calls.mostRecent().args[1].jsonpCallback).toEqual(widgetizerConfig.jsonpCallbackBase + 0);
                };

                initializeExtensionAndWidgetizer(afterRequesting, widgetDiv1);

                $(document).off('allWidgetsRendered.AOEWidgetizer')
                    .on('allWidgetsRendered.AOEWidgetizer', function() {
                        done();
                    });
            });
        });

        function initializeSpyAndGetCallback() {
            spyOn($, "ajax").and.callThrough();

            var widgetIndex = 0;
            return function (widget) {
                expect($.ajax.calls.argsFor(widgetIndex)[1].jsonpCallback).toEqual(widgetizerConfig.jsonpCallbackBase + widgetIndex);
                widgetIndex++;
            };
        }

        function initializeExtensionAndWidgetizer(afterRequesting, baseElement) {
            AOEWidgetizer.extensions = {
                afterRequesting: {
                    userFunctionAfterRequesting: afterRequesting
                }
            };

            widgetizer.init(baseElement);
        }
    });

    afterEach(function() {
        document.body.removeChild(widgetDiv1);
        document.body.removeChild(widgetDiv2);
        document.body.removeChild(widgetDiv3);
        document.body.removeChild(widgetDiv4);

        $(document).off('allWidgetsRendered.AOEWidgetizer');
        $(document).off('widgetRendered.AOEWidgetizer');
    });
});
