configure({
  configs: [
    './prod.js'
  ],
  sources: [
    source('amd', 'bolt.example.demo', '../../src/demo/js', mapper.hierarchical)
  ]
});
