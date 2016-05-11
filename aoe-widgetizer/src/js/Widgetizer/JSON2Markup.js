module.exports = function (Mark) {
    var widget;

    return {
        addMarkupToWidget: function(_widget_) {
            widget = _widget_;

            if (hasFallbackContent()) {
                renderFallback();
            } else {
                renderTemplate();
            }

            return widget;
        }
    };

    function hasFallbackContent() {
        return widget.json.collection.fallback_content;
    }

    function renderFallback() {
        widget.set('markup', widget.json.collection.fallback_content);
    }

    function renderTemplate() {
        widget.set('markup', Mark.up(widget.template, widget.json));
    }
};
