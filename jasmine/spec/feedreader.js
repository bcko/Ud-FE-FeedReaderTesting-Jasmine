/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeTruthy();
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined and not empty', function() {
            // iterate over allFeeds
            for (const feed of allFeeds) {
                // checks if url.length === 0 and url === undefined
                expect(feed.url).toBeTruthy();
            }
         });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Name defined and not empty', function() {
            // iterate over allFeeds
            for (const feed of allFeeds) {
                expect(feed.name).toBeTruthy();
            }
         });

    });


    /* a test suite named "The menu" */
    describe('The menu', function() {
        /* a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu element is hidden by default', function() {
            // checks to see the existence of menu-hidden class in <body>
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });


        /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when the menu icon is clicked.', function() {
            // clicks menu-icon-link
            $('.menu-icon-link').click();
            
            // checks to see the existence of menu-hidden class in <body>
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // clicks menu-icon-list
            $('.menu-icon-link').click();

            // checks to see the existence of menu-hidden class in <body>            
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });

    });

                 
    /* a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            /* This function performs everything necessary to load a
             * feed using the Google Feed Reader API. It will then
             * perform all of the DOM operations required to display
             * feed entries on the page. Feeds are referenced by their
             * index position within the allFeeds array.
             * This function all supports a callback as the second parameter
             * which will be called after everything has run successfully.
             */
            loadFeed(0, done);
         });

         it('there is at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThanOrEqual(1);
         });

    });



    /* a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         // declare feeds array to store feed
        const feeds = [];

        beforeEach(function(done) {
            // load feed 0 and store values in feeds[0]
            loadFeed(0, function() {
                feeds.push($('.feed').html());
                // load feed 1
                loadFeed(1, done);
            });
           
        });


        it('content actually changes', function() {
            feeds.push($('.feed').html());
            expect(feeds[0]).not.toEqual(feeds[1]);
        });

    });

}());
