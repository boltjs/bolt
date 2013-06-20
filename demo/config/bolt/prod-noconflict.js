configure({
  sources: [
    source('bolt', 'bolt.demo', '../../src/js', mapper.hierarchical),
    source('lib', 'JQuery', 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min', {
      define: function () {
        return jQuery.noConflict(true);
      }
    })
  ]
});
