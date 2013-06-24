runDemo('Transporter - XHR', function () {
  var positive = createOutputElement('positive case did not run');
  var negative = createOutputElement('negative case did not run');

  ephox.bolt.loader.transporter.xhr.request("transporter/demo.txt", function (data) {
    pass(positive, data);
  }, function (message) {
    fail(positive, message);
  });

  ephox.bolt.loader.transporter.xhr.request("transporter/missing.txt", function (data) {
    fail(negative, 'somehow we got: ' + data);
  }, function (message) {
    pass(negative, 'failed in an expected way: ' + message);
  });
});