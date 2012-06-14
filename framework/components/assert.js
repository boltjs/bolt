global['assert'] = function (expression, message) {
  if (expression) 
    console.log("  [passed] %s", message || "");
  else {
    console.log("  [failed] %s", message || "");
    process.exit(1);
  } 
};

