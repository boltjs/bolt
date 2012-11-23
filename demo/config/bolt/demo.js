configure({
  configs: [
    './prod.js'
  ],
  sources: [
    source('amd', 'bolt.demo.test', '../../src/demo/js', mapper.hierarchical)
  ]
});
