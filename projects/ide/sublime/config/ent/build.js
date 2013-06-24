var p = Ent.Project.create('lightning', 'external');
p.setVersion(1, 0, 0);

p.setConfig({
    command: [ 'make' ],
    dist: 'scratch/dist',
    distInclude: '**/*'
});
