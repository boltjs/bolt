loader.core.scripttag = def(
  [
  ],

  function () {
    var guard = function (callback) {
        return function (evt) {
            if (evt.type === "load" || this.readyState === "loaded" || this.readyState === "complete")
                callback();
        };
    };

    var ie = function (el) {
        return el.attachEvent && !window.opera;
    };

    var script = function (url, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      if (ie(script))
        script.attachEvent("onreadystatechange", guard(callback));
      else
        script.addEventListener("load", guard(callback), false);
      script.src = url;
      return script;
    };

    return function (url, callback) {
      var el = script(url, callback);
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(el);
    };  
  }
);
