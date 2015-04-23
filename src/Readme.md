Configuration:
    - src/js/conf/config.js
    - override this configuration for the tests in src/spec/Widgetizer/testconfig.js
    - this is the way how the endpoint is shifted to localhost in the tests
    
Build:
    - ./node_modules/.bin/gulp build
    
Output:
    - Check ./dist -  widgetizer_standalone.js is the library
