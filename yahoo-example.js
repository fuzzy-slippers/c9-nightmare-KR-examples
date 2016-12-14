var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

nightmare
  // first set the browser size/resolution to 1024X768
  .viewport(1024, 768)
  
  .goto('http://yahoo.com')
  .screenshot('screenshots/yahoo1.png')
  
  .type('form[action*="/search"] [name=p]', 'github nightmare')
  .screenshot('screenshots/yahoo2.png')

  .click('form[action*="/search"] [type=submit]')
  .wait('#main')
  .screenshot('screenshots/yahoo3.png')

  .evaluate(function () {
    return document.querySelector('#main .searchCenterMiddle li a').href
  })
  .screenshot('screenshots/yahoo4.png')
  .end()

  .screenshot('screenshots/yahoo5.png')
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });