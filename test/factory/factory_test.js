require('../include/include');

//var factory = ephox.bolt.module.api.factory;
//var builtins = ephox.bolt.module.config.builtins.commonjs;
//
//var config = {};
//
//factory.create(config, builtins, function (api) {
//
//
//});
//
//
//
//// async
//api.configure({
//  configs: ['strings'],
//  modulators: [
//    modulator('js', 'asfa', [
//      source('amd', '.....')
//    ])
//  ],
//  sources: [
//    source('mock'),
//    source('amd', '....')
//  ]
//});
//
//
//test(['dep1', 'dep2'], function () {
//
//});
//
//
//
//
//mock('ephox.wrap.$', function () {
//
//});
//
//
//mtest(['ephox.wrap.$'], ['dep1', 'dep2'], function (mock$, dep1, dep2) {
//
//});
//
//
//
//
//
//test(function () {
//  var mocks = demand('ephox.mock.Registry');
//  var jQuery = mocks.create();
//  mocks.register('ephox.wrap.$', mock);
//
//  require([], function () {
//
//  });
//});
//
//
//
//// sync
//api.define();  // always succeeds
//api.demand();  // fail until configured
//
//
//api.main();    // defer until configured
//api.require(); // defer until configured
//
//// what does 'configured' mean
//
//// 1. Configure can only be called once, and it is that call; or
//// 2. Configure until explicit ready call
//
//// once configured, they run......
//
//
//
//assert(true, 'placeholder');
