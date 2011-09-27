loader.tag.script = def(
  [
  ],

  function () {
    var guard = function (callback) {
      return function (evt) {
        if (this.readyState === "loaded" || this.readyState === "complete")
          callback();
      };
    };

    var ie = function (el) {
      return el.attachEvent && !window.opera;
    };

    var onload = function (el, callback) {
      if (ie(el))
        el.attachEvent("onreadystatechange", guard(callback));
      else
        el.addEventListener("load", callback, false);
    };

    var createtag = function (callback) {
      var el = document.createElement("script");
      el.type = "text/javascript";
      onload(el, callback);
      return el;
    };

    var bindtag = function (tagger, callback) {
      var el = createtag(callback);
      tagger(el);
      head = document.getElementsByTagName("head")[0];
      head.appendChild(el);
    };

    return {bindtag: bindtag};
  }
);
