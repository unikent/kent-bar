# kent-bar
The new Kent bar will be a replacement for the [current Kent nav bar](https://github.com/unikent/kent-nav-bar). The new version will allow personalisation for staff and students if they are logged in via SSO to allow them to quickly access the services relevant to them.

It is a [Exoskeleton.js app](http://exosjs.com/) app which is a derivative of *Backbone*, built **without** *jQuery* or *Underscore*.

## Setup

Make sure you have [Node](http://nodejs.org/) installed on your system. You also need to have
`grunt-cli` installed globally:

    $ npm install -g grunt-cli

Clone this repo to a local directory and run `npm install` to install dependencies:

    $ git clone git@github.com:unikent/kent-bar.git
    $ cd kent-bar
    $ npm install


## Running the Development Server

Run the development server:

    $ grunt server

That's it! Your app is now running on port 7070. To see it, just open it in your browser:

    $ open http://localhost:7070

Grunt will watch your src directory for changes and recompile as needed, triggering a refresh in your browser.


## Organization

The JS Exoskeletion project is stored in the `src/js` directory.

SCSS is stored in `src/scss`.

Static assets like images are located in `src/public`, the contents of which are copied directly into the root of each
build without preprocessing.

Grunt configuration is returned by `config/get-config.js`, which in turn requires task-specific configuration files
stored in the `config` directory.

Unit tests are included in the `test` directory (see below).

When Grunt, Browserify and Sass compile the application, the result is stored in a subdirectory of the `build` directory
(which is ignored by git). Builds for the development server are stored in `build/dev/`, builds for unit testing are in
`build/test/`, and builds for deploying to production or staging are in `build/deploy/`.


## Testing and Linting

Linting is via Grunt-JSLint and testing using mocha and testem.
Run `npm test` to run all tests provided in the `test` directory using PhantomJS and to JSLint the application code
(including all tests and configuration).

Additionally, you may opt to install Testem globally by running `npm install testem -g`. Doing so makes it easy to run
tests against local browsers by running `testem` in the project directory.


<!-- TODO: link to API docs for endpoints -->
<!-- TODO: detail how to get kent-bar on another app e.g. Moodle -->
