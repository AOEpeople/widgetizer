describe("AOEWidgetizer.Widgetizer", function () {
    var widgetDiv1,
        widgetDiv2,
        widgetizer;

    beforeEach(function() {
        widgetizer = new AOEWidgetizer.Widgetizer();

        widgetDiv1 = document.createElement('div');
        widgetDiv1.setAttribute('id', 'widget-div-1');
        widgetDiv1.setAttribute('data-sp-widget', '19');
        widgetDiv1.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
        widgetDiv1.setAttribute('data-config', '{json: "for config"}');

        widgetDiv2 = document.createElement('div');
        widgetDiv2.setAttribute('id', 'widget-div-2');
        widgetDiv2.setAttribute('data-sp-widget', '19');
        widgetDiv2.setAttribute('data-parameters', '{"page_currentproduct":"2", "page_currentcategory":"1"}');
        widgetDiv2.setAttribute('data-config', '{json: "for config"}');

        document.body.appendChild(widgetDiv1);
        document.body.appendChild(widgetDiv2);
    });

    it('renders the widgets title to the widget divs inner HTML', function() {
        widgetizer.init();

        setTimeout(function() {
            expect(document.body.innerHTML).toMatch(/<h1>Hennessy VSOP Privilege Limited Edition 40% 1L, Geschenkverpackung (HM)<\/h1>/);
            expect(document.body.innerHTML).toMatch((/<h1>Hennessy VSOP Privilege Limited Edition 40% 1L, Geschenkverpackung (HM)<\/h1>/));
        }, 500);
    });

    it('renders the widgets image to the widget divs inner HTML', function() {
        widgetizer.init();

        setTimeout(function() {
            expect(document.body.innerHTML).toMatch(/<img src="http:\/\/www.latest.fraport-web.aoe.host\/media\/catalog\/product\/cache\/1\/small_image\/201x201\/9df78eab33525d08d6e5fb8d27136e95\/1\/0\/1077972.jpg">/);
            expect(document.body.innerHTML).toMatch((/<img src="http:\/\/www.latest.fraport-web.aoe.host\/media\/catalog\/product\/cache\/1\/small_image\/201x201\/9df78eab33525d08d6e5fb8d27136e95\/1\/0\/1077972.jpg">/));
        }, 500);
    });

    it('renders the widgets description to the widget divs inner HTML', function() {
        widgetizer.init();

        setTimeout(function() {
            expect(document.body.innerHTML).toMatch(/<span>Hennessy VSOP Privilege Limited Edition 40% 1L, GeschenkverpackungInspiriert von dem im Jahr 1817 von George IV, dem späteren König von England, in Auftrag gegebenen Cognac „Very Superior Old Pale“ bezieht der Hennessy V.S.O.P sein Image in nahezu zwei Jahrhunderten. Kreiert wurde er, um allen Anlässen gerecht zu werden und kann on the rocks, als Long Drink oder noch kreativer als Bestandteil eines Cocktails genossen werden. Alkoholgehalt in Vol.-%: 40 Herstellerinformation: Jas Hennessy &amp; Co ,Rue de la Richonne ,16101 ,Cognac Cedex ,Frankreich Warnhinweise: Maßvoll genießen Zutaten: grapes from cognac, burnt sugar mit Farbstoff<\/span>/);
            expect(document.body.innerHTML).toMatch(/<span>Hennessy VSOP Privilege Limited Edition 40% 1L, GeschenkverpackungInspiriert von dem im Jahr 1817 von George IV, dem späteren König von England, in Auftrag gegebenen Cognac „Very Superior Old Pale“ bezieht der Hennessy V.S.O.P sein Image in nahezu zwei Jahrhunderten. Kreiert wurde er, um allen Anlässen gerecht zu werden und kann on the rocks, als Long Drink oder noch kreativer als Bestandteil eines Cocktails genossen werden. Alkoholgehalt in Vol.-%: 40 Herstellerinformation: Jas Hennessy &amp; Co ,Rue de la Richonne ,16101 ,Cognac Cedex ,Frankreich Warnhinweise: Maßvoll genießen Zutaten: grapes from cognac, burnt sugar mit Farbstoff<\/span>/);
        }, 500);
    });

    afterEach(function() {
        document.body.removeChild(widgetDiv1);
        document.body.removeChild(widgetDiv2);
    });
});