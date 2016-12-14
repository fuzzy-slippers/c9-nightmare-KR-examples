var Nightmare = require('nightmare'),
  nightmare = Nightmare();
  console.log("got here1");

nightmare.goto('http://cnn.com')
  .end()
  .then(function(title){
    console.log(title);
  })