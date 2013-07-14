require('../include/include');

var Mapper = demand('bolt.runtime.config.Mapper');

assert(Mapper.namespace('some.namespaced.Module') === 'some.namespaced/Module', 'namespace');
assert(Mapper.namespace('NotNamespacedModule') === 'NotNamespacedModule', 'no namespace');

assert(Mapper.hierarchical('some.namespaced.Module') === 'some/namespaced/Module', 'hierarchical');
assert(Mapper.hierarchical('NotNamespacedModule') === 'NotNamespacedModule', 'no namespace hierarchical');

assert(Mapper.flat('some.namespaced.Module') === 'some.namespaced.Module', 'flat');
assert(Mapper.flat('NotNamespacedModule') === 'NotNamespacedModule', 'no namespace flat');
