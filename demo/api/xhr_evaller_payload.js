define('xhr_evaller', ['xhr_evaller_dep'], function () {});

// simulate some slow code
new Array(10000).join("xx.xx").split(".").join("yy");
