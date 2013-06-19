configure({
  sources: [
    source('bolt', 'bolt.demo', '../../src/js', mapper.hierarchical),
    source('lib', '$', 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min', { exports: 'jQuery' })
  ]
});
