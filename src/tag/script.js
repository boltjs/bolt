loader.tag.script = def(
  [
  ],

  function () {
    var guard = function (callback, el) {
      return function (evt) {
        if (el.readyState === "loaded" || el.readyState === "complete")
          callback();
      };
    };

    var ie = function (el) {
      return el.attachEvent && !window.opera;
    };

    var onload = function (el, callback) {
      if (ie(el))
        el.attachEvent("onreadystatechange", guard(callback, el));
      else
        el.addEventListener("load", callback, false);
    };

    var createtag = function (callback) {
      var el = document.createElement("script");
      el.type = "text/javascript";
      onload(el, callback);
      return el;
    };

    var insert = function (decorator, callback) {
      var el = createtag(callback);
      decorator(el);
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(el);
    };

    return {
      insert: insert
    };
  }
);
