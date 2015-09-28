/**
 * autoreload.js
 * 
 * Reloads the whole page or refreshes the CSS every N milliseconds.
 *
 * EXAMPLES
 * 
 * Reloads the page every 500 milliseconds.
 *   autoreload.page(500);
 * 
 * Reloads all CSS files every second.
 *   autoreload.css(1000);
 * 
 * DEPENDENCIES
 * None
 */

var autoreload = {};

// Reloads the page at an interval.
autoreload.page = function(interval_ms) {
  setTimeout(function() { location.reload(); }, interval_ms);
};

/**
 * Refreshes one stylesheet instantly; once.
 * 
 * @stylesheet
 *   An element in the array document.stylesheets
 *
 * Example:
 *   var stylesheet = document.styleSheets[0];
 *   autoreload.reload_one_css(stylesheet);
 */
autoreload.reload_one_css = function(stylesheet) {
  var href = stylesheet.ownerNode.href;
  
  // Source: http://nv.github.com/css_auto-reload/

  // The reason why this section is necessary is because it prevents
  // the browser from using the cached version of a CSS file. It does
  // this by appending the current time to the URL of the CSS file so
  // when the browser fetches the file, it thinks it's getting a
  // unique one.

  // Repeatedly calling this to refresh the CSS does not work because
  // the browser will use the cached version:
  //   document.styleSheets.href[0] = document.styleSheets.href[0]
  
  var n = href.indexOf('?');
  var last_reload = 'last_reload=' + (new Date).getTime();
  if (n == -1) {
    href += '?' + last_reload;
  } else if (href.indexOf('last_reload=', n) < 0) {
    href += '&' + last_reload;
  } else {
    href = href.replace(/last_reload=\d+/, last_reload);
  }
  
  //

  // Reload the stylesheet this instant.
  stylesheet.ownerNode.href = href;
};

// Reloads all CSS files at an interval.
autoreload.css = function(interval_ms) {
  setInterval(
    function() {
      var css = document.styleSheets;
      for (var i=0; i < css.length; i++) {
        autoreload.reload_one_css(css[i]);
      }
    }, interval_ms);
};
