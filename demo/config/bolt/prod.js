configure({
  repositories: [
    repository('impugn', 'http://localhost/~mth/compass/scratch/main/js', '../../stuff')
  ],
  sources: [
    source('amd', 'bolt.demo', '../../src/js', mapper.hierarchical),
    source('amd', 'ephox.compass', '.', mapper.flat, 'impugn')
  ]
});
