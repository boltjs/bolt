configure({
  configs: [
    './prod.js'
  ],
  sources: [
    source('amd', 'bolt.demo.demo', '../../src/demo/js', mapper.hierarchical)
  ]
});
