configure({
  configs: [
    './prod.js'
  ],
  sources: [
    source('bolt', 'bolt.demo.test', '../../src/demo/js', mapper.hierarchical)
  ]
});
