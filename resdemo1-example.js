const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: false });
const dateFormat = require("dateformat"); // get pretty dates, times
const fs = require("fs");

//some helpful variables to record

//used in the file name to indicate current module
const currModule = "Awd";

//store current date time - used for foldernames so cant change, need time when program first run
const now = new Date();

//believe I figured out this is the URL (inside the IFRAME) used to create a new award
const newAwardURL = "https://res-demo1.kuali.co/kc-dev/awardHome.do?methodToCall=docHandler&command=initiate&docTypeName=AwardDocument&returnLocation=https://res-demo1.kuali.co:/kc-dev%2Fkc-krad%2FlandingPage%3FviewId%3DKc-LandingPage-RedirectView#topOfForm";


// start up nightmare
nightmare

// NIGHTMARE/BROWSER SETTINGS
// --------------------------------------------------.

  // first set the browser size/resolution to 1024X2200 (the reason its 2200 is that way we capture the whole long scrolling page down to the save button)
  .viewport(1024, 2200)
  
// LOGIN TO KUALI
// --------------------------------------------------.
  .goto("http://res-demo1.kuali.co/kc-dev/")
  .screenshot(getUniqScreenshotName()).wait(1) //wait one millisecond just so screenshots have different names

  .type("#username", "quickstart")
  .screenshot(getUniqScreenshotName()).wait(1)

  .type("#password", "password")
  .screenshot(getUniqScreenshotName()).wait(1)
  
  .click("#login") //will open the Kuali Research welcome page after login
  .wait("#Uif-ApplicationHeader-Wrapper") // wait until the banner at the top of the Kuali Wrapper on the main page loads
  .screenshot(getUniqScreenshotName()).wait(1)

// CREATE NEW AWARD
// --------------------------------------------------.

  // go to award add page URL - Going directly to inner IFRAME (that is the real award form), otherwise the selectors nightmareJS doesnt work to find the input fields
  .goto(newAwardURL)
  .screenshot(getUniqScreenshotName()).wait(1)
  
  
// AWARD (AWARD TAB) - DOCUMENT OVERVIEW SECTION
// --------------------------------------------------.  
  //enter Document Overview - Description text field
  .type("#document\\.documentHeader\\.documentDescription", "NightmareJS Entered " +  dateFormat(now))
  .screenshot(getUniqScreenshotName()).wait(1) 
  
    //enter Document Overview - Explanation text area
  .type("#document\\.documentHeader\\.explanation", "NightmareJS Entered this automatically on " + dateFormat(now) +"!")
  .screenshot(getUniqScreenshotName()).wait(1)
  
  
// AWARD (AWARD TAB) - DETAILS AND DATES SECTION
// --------------------------------------------------.   
  //Select from dropdown Transaction Type 1 (Administrative Amendment)
  .select("#document\\.awardList\\[0\\]\\.awardTransactionTypeCode", 1)
  .screenshot(getUniqScreenshotName()).wait(1)  

// AWARD (AWARD TAB) - INSTITUTION SECTION
// --------------------------------------------------.   

  //Select from dropdown Award Status 2 (Inactive)
  .select("#document\\.awardList\\[0\\]\\.statusCode", 2)
  .screenshot(getUniqScreenshotName()).wait(1)  

  //type lead unit number 000001
  .type("#document\\.awardList\\[0\\]\\.unitNumber", "000001")
  .screenshot(getUniqScreenshotName()).wait(1)

  //enter award title "Award entered by nightmareJS " and todays date time
  .type("#document\\.awardList\\[0\\]\\.title", "Award entered by nightmareJS " +  dateFormat(now))
  .screenshot(getUniqScreenshotName()).wait(1)

  //Select from dropdown Activity type 3 (Public Service)
  .select("#document\\.awardList\\[0\\]\\.activityTypeCode", 3)
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //Select from dropdown Award Type 11 (Gift)
  .select("#document\\.awardList\\[0\\]\\.awardTypeCode", 11)
  .screenshot(getUniqScreenshotName()).wait(1) 

// AWARD (AWARD TAB) - SPONSOR SECTION
// --------------------------------------------------.     
  //enter sponsor code (using NSFs code of 000500)
  .type("#document\\.awardList\\[0\\]\\.sponsorCode", "000500")
  .screenshot(getUniqScreenshotName()).wait(1)  
  

// AWARD (AWARD TAB) - TIME AND MONEY SECTION
// --------------------------------------------------. 
  //enter project end date of 07/28/2017
  .type("#document\\.awardList\\[0\\]\\.awardAmountInfos\\[0\\]\\.finalExpirationDate", "07/28/2017")
  .screenshot(getUniqScreenshotName()).wait(1)
  
// AWARD (AWARD TAB) - SAVE
// --------------------------------------------------. 
  //click the save button on the bottom
  .click("input.globalbuttons")
  //take a screenshot right away to hopefully catch the saving box
  .screenshot(getUniqScreenshotName()).wait(1)
  //wait three seconds for save to finish
  .wait(4000)
  //take another screenshot after the save just to make sure there wasn't an error displayed
  .screenshot(getUniqScreenshotName()).wait(1)


// AWARD CONTACTS TAB - CLICK ON CONTACTS TAB
// --------------------------------------------------. 
  //click on contacts tab
  .click("input[name='methodToCall\\.headerTab\\.headerDispatch\\.save\\.navigateTo\\.contacts'")
  //wait three seconds for contacts tab loading to finish
  .wait(2000)
  //take screenshot of contacts tab after it loaded
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //click expand all button to show all fields on the tab
  .click("input[name='methodToCall\\.showAllTabs']")
  //take a screenshot of expanded tabs
  .screenshot(getUniqScreenshotName()).wait(1)

// AWARD CONTACTS TAB - UNIT CONTACTS
// --------------------------------------------------.
  //click first on search magnifier (seems to be the only way/option)
  .click("input[name='methodToCall\\.performLookup\\.\\(\\!\\!org\\.kuali\\.coeus\\.common\\.framework\\.person\\.KcPerson\\!\\!\\)\\.\\(\\(\\(personId\\:unitContactsBean\\.personId\\)\\)\\)\\.\\(\\(\\`unitContactsBean\\.personId\\:personId\\`\\)\\)\\.\\(\\(\\<\\>\\)\\)\\.\\(\\(\\[\\]\\)\\)\\.\\(\\(\\*\\*\\)\\)\\.\\(\\(\\^\\^\\)\\)\\.\\(\\(\\&\\&\\)\\)\\.\\(\\(\\/\\/\\)\\)\\.\\(\\(\\~\\~\\)\\)\\.\\(\\:\\:\\:\\:\\;\\;\\:\\:\\:\\:\\)\\.anchorUnitContacts']")
  //wait 2 seconds for lookup screen to load
  .wait(2000)
  //take a screenshot of lookup screen after
  .screenshot(getUniqScreenshotName()).wait(1)

  //enter personid of 10009 (Rosemary Hanlon)
  .type("#personId", "10009")
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //BRINGS UP PERSON LOOKUP SCREEN
  //click search button
  .click("input[name='methodToCall\\.search']")
  //wait 2 seconds for search results to load
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //click "return value" link to return back to contacts page
  .click("a[title='return valueKcPerson Id=10009 ']")
  //wait 2 seconds for results to return
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //BACK TO CONTACTS PAGE
  //click the add button to add rosemary
  .click("input[name='methodToCall\\.addUnitContact']")
  //wait 2 seconds for search results to load
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)  
  
  //save the contacts info
  .click("input[name='methodToCall\\.save']")
  //wait 2 seconds for search results to load
  .wait(3000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)  
  
  
// AFTER RUNNING THE TEST - CLEANUP 
// --------------------------------------------------.  
  .then(function (result) {
    console.log("Test Finished Running(see screenshots like [" + getUniqScreenshotName() + "]! \nany results? " + result)
  })
  .catch(function (error) {
    console.error("Search failed:", error);
  });
  
  
  





//set up filename (and folder path) - broke this out into a function 
//so people could just copy/paste the screenshot line over and over
function getUniqScreenshotName() {
  //use the current date/time "now" variable captured when the program first ran 
  //for the folder names
  const todaysDate = dateFormat(now, "mm_dd_yy");
  const startTime = dateFormat(now, "h_MM_ss_TT");
  
  //folder to store the screenshots
  const baseScreenshotFolder = "screenshots";
  const subFolder =  todaysDate + "__" + startTime;
  const folderpath = baseScreenshotFolder + "/" + subFolder + "/";
  //create folders if they dont exist
  if (!fs.existsSync(baseScreenshotFolder)){fs.mkdirSync(baseScreenshotFolder);}
  if (!fs.existsSync(folderpath)){fs.mkdirSync(folderpath);}  
  return folderpath + currModule + new Date().valueOf() + ".png";
}
