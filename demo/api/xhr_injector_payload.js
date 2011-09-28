define('xhr_injector', ['xhr_injector_dep'], function () {});

// simulate some slow code 
new Array(10000).join("xx.xx").split(".").join("yy");
