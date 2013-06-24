require('../include/include');

var mapper = ephox.bolt.module.config.mapper;

assert(mapper.namespace('some.namespaced.Module') === 'some.namespaced/Module', 'namespace');
assert(mapper.namespace('NotNamespacedModule') === 'NotNamespacedModule', 'no namespace');

assert(mapper.hierarchical('some.namespaced.Module') === 'some/namespaced/Module', 'hierarchical');
assert(mapper.hierarchical('NotNamespacedModule') === 'NotNamespacedModule', 'no namespace hierarchical');

assert(mapper.flat('some.namespaced.Module') === 'some.namespaced.Module', 'flat');
assert(mapper.flat('NotNamespacedModule') === 'NotNamespacedModule', 'no namespace flat');
