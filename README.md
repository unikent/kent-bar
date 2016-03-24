# Kent Bar
The new Kent bar will be a replacement for the [current Kent nav bar](https://github.com/unikent/kent-nav-bar). The new version will allow personalisation for staff and students if they are logged in via SSO to allow them to quickly access the services relevant to them.

It is a [Exoskeleton.js app](http://exosjs.com/) app which is a derivative of *[Backbone](http://backbonejs.org/)*, built **without** *[jQuery](https://jquery.com/)* or *[Underscore](http://underscorejs.org/)*.


## Using the Bar

To add the Kent Bar to you webpage simply include the `build/deploy/assets/app.js` script. This should be loaded asynchronously before you `</body` tag.
```
<script src="URL_PATH_TO/build/deploy/assets/app.js" async></script>
```

### Customizing and configuring the bar

To customise the bar you can set a number of options prior to including the script above.

These options should be defined in a javascript object as below:

```javascript
	window.KENT  = window.KENT || {};
	window.KENT.kentbar = {
		config:{
			... YOUR OPTIONS HERE ...
		}
	};
```
**Note** it is important to check for the existence of the preceding `KENT` namespace object as other Kent services may have already defined this object for their own purposes.

#### Config Options

| Option	| Description				| Default		| Example(s)	|
|---------------|---------------------------------------|-----------------------|---------------|
| target	| A string selector for the target dom element for the bar to use as its container. If false (default) then a div will be inserted automatically at the top of `<body>`. | false	| "#myBar", "div.my-kent-bar" |
| render	| Whether the bar should render the contents of the `target` container. This is designed for advanced use where you which to modify or customize the contents of the bar. By setting to false you are responsible for creating the necessary markup for component menus and buttons etc. | true	| true, false |
| components | An ordered Array of component names for components which you wish the bar to render. Note this value is ignored if `render` is false. Possible components are: 'student', 'staff', 'departments' and 'alumni'. | `["student", "staff" ]` | `["staff","departmetns"]` |
| custom_link | An object containing a `title` and `url` value representing custom link that will be added tot he end of the bar. | false | `{ title:"TEST", url:"https://www.google.co.uk"}` |
| styles	| The stylesheets you wish the bar to load. Stylesheets available are: `kentfont` - the Kent Font styles and font face declarations; `fonts`: The ArialLight font face declarations use as the primary font for the bar; `base`: the Kent Bar's styles. If any of these styles are not loaded by the bar you are responsible for providing a suitable replacement. | `{ kentfont:true, fonts:true, base:true }`| `{ kentfont:false, fonts:false, base:true }` |  


## Development

Make sure you have [Node](http://nodejs.org/) installed on your system. You also need to have
`grunt-cli` installed globally:

    $ npm install -g grunt-cli

Clone this repo to a local directory and run `npm install` to install dependencies:

    $ git clone git@github.com:unikent/kent-bar.git
    $ cd kent-bar
    $ npm install


### Running the Development Server

Run the development server:

    $ grunt server

If you're using localhost, that's it! **If you're not using localhost, it'll be virtualhostname:7070**

Your app is now running on port 7070. To see it, just open it in your browser:

    $ open http://localhost:7070

Grunt will watch your src directory for changes and recompile as needed, triggering a refresh in your browser.

### Organization

The JS Exoskeleton project is stored in the `src/js` directory.

SCSS is stored in `src/scss`.

Static assets like images are located in `src/public`, the contents of which are copied directly into the root of each build without preprocessing.

Grunt configuration is returned by `config/get-config.js`, which in turn requires task-specific configuration files stored in the `config` directory.

Unit tests are included in the `test` directory (see below).

When [Grunt](http://gruntjs.com/), [Browserify](http://browserify.org/) and [Sass](http://sass-lang.com/) compile the application, the result is stored in a subdirectory of the `build` directory (which is ignored by git). 
Builds for the development server are stored in `build/dev/`, builds for unit testing are in `build/test/`, and builds for deploying to production or staging are in `build/deploy/`.


### Testing and Linting

Linting is via [JSLint](http://www.jslint.com/) and testing using [Mocha](https://mochajs.org/) and [Test'em](https://github.com/testem/testem).
- Run `npm install -g phantomjs` to install [PhantomJS](http://phantomjs.org/) globally.
- Run `npm test` to run all tests provided in the `test` directory using [PhantomJS](http://phantomjs.org/) and to [JSLint](http://www.jslint.com/) the application code (including all tests and configuration).

Additionally, you may opt to install Testem globally by running `npm install -g testem`. Doing so makes it easy to run
tests against local browsers by running `testem` in the project directory.

### APIs
The audience bar calls the [services](https://github.com/unikent/api.kent/blob/develop/readme.md#services-apis) and [departments](https://github.com/unikent/api.kent/blob/develop/readme.md#departments-apis) endpoints on [api.kent](https://github.com/unikent/api.kent). *(N.B. You'll also want to clone the API repo for local development.)*
These are used to assist with personalisation - showing the most relevant systems to staff and student users. 
The departments link on the audience bar provides a search so that users can easily go to the faculty/department website that they're looking for.

### Caching
The Kent Bar will cache the api results it receives in browser localstorage for 24 hours. Api requests will still be cached via nginx and api.kent as normal.  

add some text to test the gh template
