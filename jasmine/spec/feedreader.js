
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined, not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("URL defined and not empty", () => {
            allFeeds.forEach(feed => {
                expect(feed.hasOwnProperty("url")).toBe(true);
                
                expect(feed.url).not.toBe('');
            })
        })


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("Names are defined", () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })
                
    });


    /* Write a new test suite named "The menu" */
    describe("The menu", () => {

        /* Write a test that ensures the menu element is
         * hidden by default. */
        
        it("menu is hidden by default", () => {
            var classValue = document.body.className;
            expect($(classValue).hasClass('menu-hidden'));
        });
         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it("menu changes visibilty when the menu icon is clicked", () => {
            let menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(document.body.className).toBe('');
            menuIcon.click();
        })
    })
    /* Write a new test suite named "Initial Entries" */
    describe("Initial Entries", () => {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(done => {
            loadFeed(1, function() {
                done();
            });
            
        })
        
        it("have at least a single enetry element within container", done => {
            
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        })
    })
    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let oldFeed = "";
         let newFeed = "";
        
             
         beforeEach(function(done) {
             loadFeed(0, function() {
             oldFeed = $('article h2')[0].innerText;
                 
                 
                 loadFeed(1, function() {
                     newFeed = $('article h2')[0].innerText;
                     done();
                     
                     
                 });
             })
         });

        it('load feed change when function is called', function(){
           expect(newFeed).not.toBe(oldFeed);
        });
    });
}());
