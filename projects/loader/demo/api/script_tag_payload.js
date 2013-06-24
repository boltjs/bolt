define('script_tag', ['script_tag_dep'], function () {});

// simulate some slow code 
new Array(10000).join("xx.xx").split(".").join("yy");
