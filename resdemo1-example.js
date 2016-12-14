var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });


// get rid of this function later - just for trying to debug document
// Nightmare.action('dumpdebuginfo', function (done) {
//   this.evaluate_now(function() {
//     // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
//     // var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
//     // return {
//     //   height: h,
//     //   width: w
//     // }
//     return "\nelement[0]: " + document.querySelector("#kualiForm").elements[0].outerHTML.toString() + 
//     "\nelement[1]: " + document.querySelector("#kualiForm").elements[1].outerHTML.toString() + 
//     "\nelement[2]: " + document.querySelector("#kualiForm").elements[2].outerHTML.toString() + 
//       "\nelement[3]: " + document.querySelector("#kualiForm").elements[3].outerHTML.toString() + 
//       "\nelement[4]: " + document.querySelector("#kualiForm").elements[4].outerHTML.toString() + 
//         "\nelement[5]: " + document.querySelector("#kualiForm").elements[5].outerHTML.toString() + 
//         "\nelement[6]: " + document.querySelector("#kualiForm").elements[6].outerHTML.toString() + 
//           "\nelement[7]: " + document.querySelector("#kualiForm").elements[7].outerHTML.toString() + 
//           "\nelement[8]: " + document.querySelector("#kualiForm").elements[8].outerHTML.toString() + 
//             "\nelement[9]: " + document.querySelector("#kualiForm").elements[9].outerHTML.toString() + 
//             "\nelement[10]: " + document.querySelector("#kualiForm").elements[10].outerHTML.toString() + 
//               "\nelement[11]: " + document.querySelector("#kualiForm").elements[11].outerHTML.toString() + 
//               "\nelement[12]: " + document.querySelector("#kualiForm").elements[12].outerHTML.toString() + 
//                 "\nelement[13]: " + document.querySelector("#kualiForm").elements[13].outerHTML.toString() + 
//                 "\nelement[14]: " + document.querySelector("#kualiForm").elements[14].outerHTML.toString() ;
//   }, done)
// })

nightmare
  // first set the browser size/resolution to 1024X768
  .viewport(1024, 768)
  
  //login
  .goto('http://res-demo1.kuali.co/kc-dev/')
  .screenshot('screenshots/kuali1.png')

  .type('#username', 'quickstart')
  .screenshot('screenshots/kuali2.png')

  .type('#password', 'password')
  .screenshot('screenshots/kuali3.png')
  
  .click('#login')
  .wait(1000) // wait 1 seconds for login to happen and main kuali page to load
  .screenshot('screenshots/kuali4.png')
  // after redirect to main kuali welcome page
  
  
  // go to award add page URL - Going directly to inner IFRAME (that is the real award form), otherwise the selectors nightmareJS doesnt work to find the input fields
  .goto('https://res-demo1.kuali.co/kc-dev/awardHome.do?methodToCall=docHandler&command=initiate&docTypeName=AwardDocument&returnLocation=https://res-demo1.kuali.co:/kc-dev%2Fkc-krad%2FlandingPage%3FviewId%3DKc-LandingPage-RedirectView#topOfForm')
  .screenshot('screenshots/kuali5.png')
  
  //entering test description
  .type('#document\\.documentHeader\\.documentDescription', 'NightmareJS Typed in this Award Description!')
  .screenshot('screenshots/kuali6.png')  
  
  //.dumpdebuginfo()
  
  // .evaluate(function(){
  //   console.log('about to print document.title');
  //   console.log(document.title);
  // })
  

/*
  .evaluate(function () {
    return document.querySelector('#main .searchCenterMiddle li a').href
  })
  .screenshot('screenshots/yahoo5.png')
*/

  // .end()
  // .then(function(ip) { // This will log the your local IP
  //   console.log('local IP:', ip);
  // })  
  
  //.screenshot('screenshots/kualiend.png')
  
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });