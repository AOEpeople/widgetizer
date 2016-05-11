Configuration:
    - src/js/conf/config.js
    - override this configuration for the tests in src/spec/Widgetizer/testconfig.js
    - this is the way how the endpoint is shifted to localhost in the tests
    
Build:
    - ./node_modules/.bin/gulp build
    
Output:
    - Check ./dist 
        - widgetizer_standalone.min.js is the library without jquery (you need jquery, it's just not bundled into the lib)
        - widgetizer_standalone_jquery.min.js is the library bundled with jquery
