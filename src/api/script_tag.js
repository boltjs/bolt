loader.api.scripttag = def(
  [
    loader.tag.script
  ],

  function (script) {
    var load = function (url, onsuccess, onfailure) {
      var sourcer = function (tag) { tag.src = url; };
      script.bindtag(sourcer, onsuccess);
    };  
    return {load: load};
  }
);
