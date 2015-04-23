AOEWidgetizer.XHRRequest = function() {
    return {
        getWidgetJSON: function(requestUri) {
            //@TODO: Think about the qwest bonus feature to limit requests via qwest.limit(4); If such things
            // are not needed we could switch to marmottajax which is way smaller but provides
            // the promises we need (check ie8 support then!)
            return qwest.get(requestUri, null, {responseType: 'json'});
        }
    };
};
