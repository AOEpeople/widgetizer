module.exports = function (jQuery) {
    var $document = jQuery(document);
    var eventNamespace = '.AOEWidgetizer';

    var trigger = function(name, additionalDataAsObject) {
        $document.trigger(name + eventNamespace, additionalDataAsObject);
    };

    return {
       triggerWidgetRendered: function(additionalDataAsObject) {
           trigger('widgetRendered', additionalDataAsObject);
        },
        triggerAllWidgetsRendered: function() {
            trigger('allWidgetsRendered', {});
        }
    };
};
