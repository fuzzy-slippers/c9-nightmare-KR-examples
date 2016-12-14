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

  // first set the browser size/resolution to 1024X768
  .viewport(1024, 768)
  
// LOGIN TO KUALI
// --------------------------------------------------.
  .goto("http://res-demo1.kuali.co/kc-dev/")
  .screenshot(getUniqScreenshotName())

  .type("#username", "quickstart")
  .screenshot(getUniqScreenshotName())

  .type("#password", "password")
  .screenshot(getUniqScreenshotName())
  
  .click("#login") //will open the Kuali Research welcome page after login
  .wait("#Uif-ApplicationHeader-Wrapper") // wait until the banner at the top of the Kuali Wrapper on the main page loads
  .screenshot(getUniqScreenshotName())

// CREATE NEW AWARD
// --------------------------------------------------.

  // go to award add page URL - Going directly to inner IFRAME (that is the real award form), otherwise the selectors nightmareJS doesnt work to find the input fields
  .goto(newAwardURL)
  .screenshot(getUniqScreenshotName())
  
  
// AWARD (AWARD TAB) - DOCUMENT OVERVIEW SECTION
// --------------------------------------------------.  
  //enter Document Overview - Description text field
  .type("#document\\.documentHeader\\.documentDescription", "NightmareJS Entered " +  dateFormat(now))
  .screenshot(getUniqScreenshotName()) 
  
    //enter Document Overview - Explanation text area
  .type("#document\\.documentHeader\\.explanation", "NightmareJS Entered this automatically on " + dateFormat(now) +"!")
  .screenshot(getUniqScreenshotName())

  

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