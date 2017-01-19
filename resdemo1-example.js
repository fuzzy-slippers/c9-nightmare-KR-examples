const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: false });
const dateFormat = require("dateformat"); // get pretty dates, times
const fs = require("fs");

//some helpful variables to record

//used in the file name to indicate current module
const currModule = "Awd";

//store current date time - used for foldernames so cant change, need time when program first run
const now = new Date();
//counter for the individual screenshots (milliseconds wasn't working because a number happen within the same millisecond)
var screenshotCounter = 0;

//believe I figured out this is the URL (inside the IFRAME) used to create a new award
const newAwardURL = "https://res-demo1.kuali.co/kc-dev/awardHome.do?methodToCall=docHandler&command=initiate&docTypeName=AwardDocument&returnLocation=https://res-demo1.kuali.co:/kc-dev%2Fkc-krad%2FlandingPage%3FviewId%3DKc-LandingPage-RedirectView#topOfForm";


// start up nightmare
nightmare

// NIGHTMARE/BROWSER SETTINGS
// --------------------------------------------------.

  // first set the browser size/resolution to 1280X3500 (the reason its 300 is that way we capture the whole long scrolling page down to the save button)
  .viewport(1280, 3500)
  
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
  
  
// AWARD (AWARD TAB) - FUNDING PROPOSALS SECTION
// --------------------------------------------------.   
//*SKIP* if not adding proposal

  //expand funding proposal section
  .click("input[name='methodToCall\\.toggleTab\\.tabFundingProposals']")
  
  //take a screenshot of expanded tabs
  .screenshot(getUniqScreenshotName()).wait(1)

  //enter funding proposal number
  .type("#fundingProposalBean\\.newFundingProposal\\.proposalNumber", "00003518")
  .screenshot(getUniqScreenshotName()).wait(1)

  //click the add button to apply proposal
  .click("input[name='methodToCall\\.addFundingProposal\\.anchorFundingProposals']")
    
  //wait 6 seconds for proposal to be applied
  .wait(6000)
    
  //take screenshot of contacts tab after it loaded
  .screenshot(getUniqScreenshotName()).wait(1)



  
// AWARD (AWARD TAB) - DETAILS AND DATES SECTION
// --------------------------------------------------.  
  //Select from dropdown Transaction Type
  //1 - Administrative Amendment
  //2 - Allotment (Increment)
  //3 - Continuation (Amendment)
  //4 - Correction
  //5 - Date Change
  //6 - Deobligation
  //7 - F&A Rate Change
  //8 - Investigator Change
  //9 - New
  //10 - No Cost Extension
  //11 - Restriction Change
  //12 - Subaward Change
  //13 - Supplement
  //14 - Suspension (Stop Work Order)
  //15 - Unit Change
  //16 - Termination
  .select("#document\\.awardList\\[0\\]\\.awardTransactionTypeCode", 9)
  .screenshot(getUniqScreenshotName()).wait(1)  
  
// AWARD (AWARD TAB) - NOTICE DATE
  .type("#document\\.awardList\\[0\\]\\.noticeDate", "01/10/2017")
  .screenshot(getUniqScreenshotName()).wait(1)
  
// AWARD (AWARD TAB) - COMMENT
  .type("#document\\.awardList\\[0\\]\\.awardCurrentActionComments\\.comments", "Award Doc Comment")
  .screenshot(getUniqScreenshotName()).wait(1)
  


// AWARD (AWARD TAB) - INSTITUTION SECTION
// --------------------------------------------------.   
  //Select from dropdown Award Status
  //1 - Active
  //2 - Inactive
  //3 - Pending
  //4 - Terminated
  //5 - Closed
  //6 - Hold
  .select("#document\\.awardList\\[0\\]\\.statusCode", 1)
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  
  //enter account number
  .type("#document\\.awardList\\[0\\]\\.accountNumber", "5212345")
  .screenshot(getUniqScreenshotName()).wait(1)

  //type lead unit number BL-RCEN Research Centers
  //*SKIP* if added from proposal
  //.type("#document\\.awardList\\[0\\]\\.unitNumber", "BL-RCEN")
  //.screenshot(getUniqScreenshotName()).wait(1)

  //enter award title "Award entered by nightmareJS " and todays date time
  .type("#document\\.awardList\\[0\\]\\.title", "Award entered by nightmareJS " +  dateFormat(now))
  .screenshot(getUniqScreenshotName()).wait(1)

  //Select from dropdown Account Type
  //6 - Conversion Account
  //4 - Core Grant Administration
  //3 - Draper Fellowship
  //2 - Fabricated Equipment
  //5 - Gift
  //10 - No Account
  //7 - Off-campus account
  //1 - Regular
  //8 - SBIR
  //9 - STTR
  //11 - Service Facilities
  .select("#document\\.awardList\\[0\\]\\.accountTypeCode", 1)
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //Select from dropdown Activity Type
  //4 - Clinical Trial
  //9 - Construction
  //7 - Fellowship - Post-Doctoral
  //6 - Fellowship - Pre-Doctoral
  //2 - Instruction
  //3 - Public Service
  //1 - Research
  //8 - Student Services
  //5 - other
  .select("#document\\.awardList\\[0\\]\\.activityTypeCode", 1)
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //Select from dropdown Award Type
  //13 - Budget Office WBS
  //12 - Consortium Expenditures
  //8 - Consortium Membership
  //3 - Contract
  //5 - Cooperative Agreement
  //6 - Facilities Agreement
  //7 - Fellowship
  //11- Gift
  //1 - Grant
  //4 - Indefinite Delivery Contract 
  //2 - NIH Training Grant 
  //9 - Other Transaction Agreement
  //10 - Student Financial Aid
  //99 - Sub
  .select("#document\\.awardList\\[0\\]\\.awardTypeCode", 1)
  .screenshot(getUniqScreenshotName()).wait(1) 

// AWARD (AWARD TAB) - SPONSOR SECTION
// --------------------------------------------------.     
  //enter sponsor code (using NSFs code of 000500)
  .type("#document\\.awardList\\[0\\]\\.sponsorCode", "000500")
  .screenshot(getUniqScreenshotName()).wait(1)  

  //enter sponsor award number
  .type("#document\\.awardList\\[0\\]\\.sponsorAwardNumber", "SPN123456789")
  .screenshot(getUniqScreenshotName()).wait(1)    

  //enter cfda number
  .type("#document\\.awardList\\[0\\]\\.cfdaNumber", "93.000")
  .screenshot(getUniqScreenshotName()).wait(1)    


// AWARD (AWARD TAB) - TIME AND MONEY SECTION
// --------------------------------------------------. 
  //enter project start date of 01/01/2017
  .type("#document\\.awardList\\[0\\]\\.awardEffectiveDate", "01/01/2017")
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //enter project end date of 12/31/2020
  .type("#document\\.awardList\\[0\\]\\.awardAmountInfos\\[0\\]\\.finalExpirationDate", "12/31/2020")
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //enter execution date of 01/01/2017
  .type("#document\\.awardList\\[0\\]\\.awardExecutionDate", "01/01/2017")
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
  
// AWARD (AWARD TAB) - SPONSOR TEMPLATE
// --------------------------------------------------. 

//click on sponsor template lookup
.click("input[name='methodToCall\\.performLookup\\.\\(\\!\\!org\\.kuali\\.kra\\.award\\.home\\.AwardTemplate\\!\\!\\)\\.\\(\\(\\(templateCode\\:document\\.award\\.templateCode\\,description\\:document\\.award\\.awardTemplate\\.description\\)\\)\\)\\.\\(\\(\\`\\`\\)\\)\\.\\(\\(\\<\\>\\)\\)\\.\\(\\(\\[\\]\\)\\)\\.\\(\\(\\*\\*\\)\\)\\.\\(\\(\\^\\^\\)\\)\\.\\(\\(\\&\\&\\)\\)\\.\\(\\(\\/\\/\\)\\)\\.\\(\\(\\~\\~\\)\\)\\.\\(\\:\\:\\:\\:\\;\\;\\:\\:\\:\\:\\)\\.anchor46']")

//wait 2 seconds for lookup screen to load
.wait(2000)
//take a screenshot of lookup screen after
.screenshot(getUniqScreenshotName()).wait(1)

//enter template code 61 (NIH)
.type("#templateCode", "61")
.screenshot(getUniqScreenshotName()).wait(1) 
  
//click search button
.click("input[name='methodToCall\\.search']")
//wait 2 seconds for search results to load
.wait(2000)
//take screenshot
.screenshot(getUniqScreenshotName()).wait(1)  

//click "return value" link to return back to contacts page
.click("a[title='return valueDescription=!NIH-FDP Sponsor Template Code=61 ']")

//BACK TO AWARD (AWARD TAB)
//wait 2 seconds for search results to load
.wait(2000)
//take screenshot
.screenshot(getUniqScreenshotName()).wait(1)

//click the apply button to apply the template
.click("input[name='methodToCall\\.applySponsorTemplate']")
  
//wait 2 seconds for search results to load
.wait(2000)
//take screenshot
.screenshot(getUniqScreenshotName()).wait(1)

//click apply button
.click("input[name='methodToCall\\.processAnswer\\.button0']")
  
//wait three seconds
.wait(3000)
//take another screenshot after the save just to make sure there wasn't an error displayed
.screenshot(getUniqScreenshotName()).wait(1)
  
//click apply button
.click("input[name='methodToCall\\.processAnswer\\.button0']")
  
//wait three seconds
.wait(3000)
//take another screenshot after the save just to make sure there wasn't an error displayed
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


// AWARD CONTACTS TAB - KEY PERSON (PI)
// --------------------------------------------------.

  //click on Employee User Name Key Personnel Lookup
  //.click("input[name='methodToCall\\.performLookup\\.\\(\\!\\!org\\.kuali\\.coeus\\.common\\.framework\\.person\\.KcPerson\\!\\!\\)\\.\\(\\(\\(personId\\:projectPersonnelBean\\.personId\\)\\)\\)\\.\\(\\(\\`projectPersonnelBean\\.newProjectPerson\\.person\\.fullName\\:lastName\\`\\)\\)\\.\\(\\(\\<\\>\\)\\)\\.\\(\\(\\[\\]\\)\\)\\.\\(\\(\\*\\*\\)\\)\\.\\(\\(\\^\\^\\)\\)\\.\\(\\(\\&\\&\\)\\)\\.\\(\\(\\/\\/\\)\\)\\.\\(\\(\\~\\~\\)\\)\\.\\(\\:\\:\\:\\:\\;\\;\\:\\:\\:\\:\\)\\.anchorKeyPersonnelandCreditSplit']")
  
  //wait 2 seconds for lookup screen to load
  //.wait(2000)
  //take a screenshot of lookup screen after
  //.screenshot(getUniqScreenshotName()).wait(1)
  
  //enter personid of 10000000030 (Emory Eagle)
  //.type("#personId", "10000000030")
  //.screenshot(getUniqScreenshotName()).wait(1) 
  
  //BRINGS UP PERSON LOOKUP SCREEN
  //click search button
  //.click("input[name='methodToCall\\.search']")
  //wait 2 seconds for search results to load
  //.wait(2000)
  //take screenshot
  //.screenshot(getUniqScreenshotName()).wait(1)
  
  //click "return value" link to return back to contacts page
  //.click("a[title='return valueKcPerson Id=10000000030 ']")
  //wait 2 seconds for results to return
  //.wait(2000)
  //take screenshot
  //.screenshot(getUniqScreenshotName()).wait(1)
  
  //BACK TO CONTACTS PAGE
  //click the add button to add Emory
  //.click("input[name='methodToCall\\.addProjectPerson']")
  //wait 2 seconds for search results to load
  //.wait(2000)
  //take screenshot
  //.screenshot(getUniqScreenshotName()).wait(1)  
  
// AWARD CONTACTS TAB - KEY PERSON UNIT (PI)
// --------------------------------------------------.
  
  //click expand all button to show all fields on the tab
  //.click("input[name='methodToCall\\.showAllTabs']")
  //take a screenshot of expanded tabs
  
  //.screenshot(getUniqScreenshotName()).wait(1)
  //enter unit of BL-BL (BLOOMINGTON CAMPUS)
  //.type("#projectPersonnelBean\\.newAwardPersonUnit\\[0\\]\\.unitNumber", "BL-BL")
  //take screenshot
  //.screenshot(getUniqScreenshotName()).wait(1)
  
  //click the add button to add the unit
  //.click("input[name='methodToCall\\.addNewProjectPersonUnit\\.line0']")
  //wait 2 seconds for search results to load
  //.wait(2000)
  //take screenshot
  //.screenshot(getUniqScreenshotName()).wait(1)  


// AWARD CONTACTS TAB - KEY PERSON (CO-PI)
// --------------------------------------------------.

  //click on Employee User Name Key Personnel Lookup
  .click("input[name='methodToCall\\.performLookup\\.\\(\\!\\!org\\.kuali\\.coeus\\.common\\.framework\\.person\\.KcPerson\\!\\!\\)\\.\\(\\(\\(personId\\:projectPersonnelBean\\.personId\\)\\)\\)\\.\\(\\(\\`projectPersonnelBean\\.newProjectPerson\\.person\\.fullName\\:lastName\\`\\)\\)\\.\\(\\(\\<\\>\\)\\)\\.\\(\\(\\[\\]\\)\\)\\.\\(\\(\\*\\*\\)\\)\\.\\(\\(\\^\\^\\)\\)\\.\\(\\(\\&\\&\\)\\)\\.\\(\\(\\/\\/\\)\\)\\.\\(\\(\\~\\~\\)\\)\\.\\(\\:\\:\\:\\:\\;\\;\\:\\:\\:\\:\\)\\.anchorKeyPersonnelandCreditSplit']")
  
  //wait 2 seconds for lookup screen to load
  .wait(2000)
  //take a screenshot of lookup screen after
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //enter personid of 10000000040 (Logan Clinkscales)
  .type("#personId", "10000000040")
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //BRINGS UP PERSON LOOKUP SCREEN
  //click search button
  .click("input[name='methodToCall\\.search']")
  //wait 2 seconds for search results to load
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //click "return value" link to return back to contacts page
  .click("a[title='return valueKcPerson Id=10000000040 ']")
  //wait 2 seconds for results to return
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //Select from dropdown Project Role
  //PI - Principal Investigator
  //COI - Co-Investigator
  //KP - Key Person
  .select("#projectPersonnelBean\\.contactRoleCode", "COI")
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //BACK TO CONTACTS PAGE
  //click the add button to add Logan
  .click("input[name='methodToCall\\.addProjectPerson']")
  //wait 2 seconds for search results to load
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)  
  
// AWARD CONTACTS TAB - KEY PERSON UNIT (CO-PI)
// --------------------------------------------------.
  
  //click expand all button to show all fields on the tab
  .click("input[name='methodToCall\\.showAllTabs']")
  //take a screenshot of expanded tabs
  
  .screenshot(getUniqScreenshotName()).wait(1)
  //enter unit of BL-BL (BLOOMINGTON CAMPUS)
  .type("#projectPersonnelBean\\.newAwardPersonUnit\\[1\\]\\.unitNumber", "IN-CARR")
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //click the add button to add the unit
  //NOTE: The line# changes for each additional person listed
  .click("input[name='methodToCall\\.addNewProjectPersonUnit\\.line1']")
  //wait 2 seconds for search results to load
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1) 
  

// AWARD CONTACTS TAB - CREDIT SPLIT 
// --------------------------------------------------.

//RESPONSIBILITY (.CREDIT = 0)
//First Person Investigator Total	  document.awardList[0].projectPersons[0].creditSplits[0].credit
//First Person First Unit Total		  document.awardList[0].projectPersons[0].units[0].creditSplits[0].credit
//First Person Second Unit Total	  document.awardList[0].projectPersons[0].units[1].creditSplits[0].credit
//Second Person Investigator Total	document.awardList[0].projectPersons[1].creditSplits[0].credit
//Second Person First Unit Total	  document.awardList[0].projectPersons[1].units[0].creditSplits[0].credit
//Second Person Second Unit Total	  document.awardList[0].projectPersons[1].units[1].creditSplits[0].credit

//SPACE (.CREDIT = 1)
//First Person Investigator Total 	document.awardList[0].projectPersons[0].creditSplits[1].credit
//First Person First Unit Total		  document.awardList[0].projectPersons[0].units[0].creditSplits[1].credit
//First Person Second Unit Total	  document.awardList[0].projectPersons[0].units[1].creditSplits[1].credit
//Second Person Investigator Total	document.awardList[0].projectPersons[1].creditSplits[1].credit
//Second Person First Unit Total	  document.awardList[0].projectPersons[1].units[0].creditSplits[1].credit
//Second Person Second Unit Total	  document.awardList[0].projectPersons[1].units[1].creditSplits[1].credit

//Financial (.CREDIT = 2)
//First Person Investigator Total	  document.awardList[0].projectPersons[0].creditSplits[2].credit
//First Person First Unit Total		  document.awardList[0].projectPersons[0].units[0].creditSplits[2].credit
//First Person Second Unit Total	  document.awardList[0].projectPersons[0].units[1].creditSplits[2].credit
//Second Person Investigator Total	document.awardList[0].projectPersons[1].creditSplits[2].credit
//Second Person First Unit Total	  document.awardList[0].projectPersons[1].units[0].creditSplits[2].credit
//Second Person Second Unit Total 	document.awardList[0].projectPersons[1].units[1].creditSplits[2].credit

  //First Person Investigator Total - Responsibility
  //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.creditSplits\\[0\\]\\.credit", "7")
  //take screenshot
  //.screenshot(getUniqScreenshotName()).wait(1) 
  
        //First Person First Unit Total - Responsibility
        //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.units\\[0\\]\\.creditSplits\\[0\\]\\.credit", "5")
        //take screenshot
        //.screenshot(getUniqScreenshotName()).wait(1) 
        
        //First Person Second Unit Total - Responsibility
        //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.units\\[1\\]\\.creditSplits\\[0\\]\\.credit", "5")
         //take screenshot
        //.screenshot(getUniqScreenshotName()).wait(1) 

  //First Person Investigator Total - Space
  //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.creditSplits\\[1\\]\\.credit", "7")
  //take screenshot
  //.screenshot(getUniqScreenshotName()).wait(1) 
  
        //First Person First Unit Total - Space
        //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.units\\[0\\]\\.creditSplits\\[1\\]\\.credit", "5")
        //take screenshot
        //.screenshot(getUniqScreenshotName()).wait(1) 
        
        //First Person Second Unit Total - Space
        //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.units\\[1\\]\\.creditSplits\\[1\\]\\.credit", "5")
        //take screenshot
        //.screenshot(getUniqScreenshotName()).wait(1) 
  
  //First Person Investigator Total - Financial
  //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.creditSplits\\[2\\]\\.credit", "7")
  //.screenshot(getUniqScreenshotName()).wait(1) 
  
        //First Person First Unit Total - Financial
        //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.units\\[0\\]\\.creditSplits\\[2\\]\\.credit", "5")
        //.screenshot(getUniqScreenshotName()).wait(1) 
        
        //First Person Second Unit Total - Financial
        //.type("#document\\.awardList\\[0\\]\\.projectPersons\\[0\\]\\.units\\[1\\]\\.creditSplits\\[2\\]\\.credit", "5")
        //.screenshot(getUniqScreenshotName()).wait(1)


  //Second Person Investigator Total - Responsibility
  .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.creditSplits\\[0\\]\\.credit", "0")
  .screenshot(getUniqScreenshotName()).wait(1) 
  
        //Second Person First Unit Total - Responsibility
        .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.units\\[0\\]\\.creditSplits\\[0\\]\\.credit", "0")
        .screenshot(getUniqScreenshotName()).wait(1) 
        
        //Second Person Second Unit Total - Responsibility
        .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.units\\[1\\]\\.creditSplits\\[0\\]\\.credit", "10")
        .screenshot(getUniqScreenshotName()).wait(1) 
        
  //Second Person Investigator Total - Space
  .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.creditSplits\\[1\\]\\.credit", "0")
  .screenshot(getUniqScreenshotName()).wait(1)  
  
        //Second Person First Unit Total - Space
        .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.units\\[0\\]\\.creditSplits\\[1\\]\\.credit", "0")
        .screenshot(getUniqScreenshotName()).wait(1) 
        
        //Second Person Second Unit Total - Space
        .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.units\\[1\\]\\.creditSplits\\[1\\]\\.credit", "10")
         .screenshot(getUniqScreenshotName()).wait(1) 
         
  //Second Person Investigator Total - Financial
  .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.creditSplits\\[2\\]\\.credit", "0")
  .screenshot(getUniqScreenshotName()).wait(1) 
  
        //Second Person First Unit Total - Financial
        .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.units\\[0\\]\\.creditSplits\\[2\\]\\.credit", "0")
        .screenshot(getUniqScreenshotName()).wait(1) 
        
        //Second Person Second Unit Total - Financial
        .type("#document\\.awardList\\[0\\]\\.projectPersons\\[1\\]\\.units\\[1\\]\\.creditSplits\\[2\\]\\.credit", "10")
        .screenshot(getUniqScreenshotName()).wait(1) 
  
//click recalculate button to verify correct entry
.click("input[name='methodToCall\\.recalculateCreditSplit']")

//wait 4 seconds for lookup screen to load
.wait(4000)
.screenshot(getUniqScreenshotName()).wait(1) 
  
//save the contacts info
.click("input[name='methodToCall\\.save']")

//wait 4 seconds for lookup screen to load
.wait(4000)
.screenshot(getUniqScreenshotName()).wait(1) 


// AWARD CONTACTS TAB - UNIT CONTACTS  
// --------------------------------------------------.
//click first on search magnifier (seems to be the only way/option)
//.click("input[name='methodToCall\\.performLookup\\.\\(\\!\\!org\\.kuali\\.coeus\\.common\\.framework\\.person\\.KcPerson\\!\\!\\)\\.\\(\\(\\(personId\\:unitContactsBean\\.personId\\)\\)\\)\\.\\(\\(\\`unitContactsBean\\.personId\\:personId\\`\\)\\)\\.\\(\\(\\<\\>\\)\\)\\.\\(\\(\\[\\]\\)\\)\\.\\(\\(\\*\\*\\)\\)\\.\\(\\(\\^\\^\\)\\)\\.\\(\\(\\&\\&\\)\\)\\.\\(\\(\\/\\/\\)\\)\\.\\(\\(\\~\\~\\)\\)\\.\\(\\:\\:\\:\\:\\;\\;\\:\\:\\:\\:\\)\\.anchorUnitContacts']")
  
//wait 4 seconds for lookup screen to load
//.wait(4000)
  
//take a screenshot of lookup screen after
//.screenshot(getUniqScreenshotName()).wait(1)

//enter personid of 10009 (Rosemary Hanlon)
//.type("#personId", "10009")
//.screenshot(getUniqScreenshotName()).wait(1) 
  
//BRINGS UP PERSON LOOKUP SCREEN
//click search button
//.click("input[name='methodToCall\\.search']")
//wait 2 seconds for search results to load
//.wait(2000)
//take screenshot
//.screenshot(getUniqScreenshotName()).wait(1)

//wait 4 seconds for lookup screen to load
//.wait(4000)

//click return value link to return back to contacts page
//.click("a[title='return valueKcPerson Id=10009 ']")

//wait 2 seconds for results to return
//.wait(2000)
//take screenshot
//.screenshot(getUniqScreenshotName()).wait(1)
  
//BACK TO CONTACTS PAGE
//click the add button to add rosemary
//.click("input[name='methodToCall\\.addUnitContact']")
//wait 2 seconds for search results to load
//.wait(2000)
//take screenshot
//.screenshot(getUniqScreenshotName()).wait(1)  
  
//save the contacts info
//.click("input[name='methodToCall\\.save']")

//wait 2 seconds for search results to load
//.wait(3000)

//take screenshot
//.screenshot(getUniqScreenshotName()).wait(1)


// AWARD CONTACTS TAB - SPONSOR CONTACTS  
// --------------------------------------------------.
  
//click on Person or Org Lookup
.click("input[name='methodToCall\\.toggleTab\\.tabKeyPersonnelandCreditSplit']")
//wait 2 seconds for lookup screen to load
.wait(2000)
//take a screenshot of lookup screen after
.screenshot(getUniqScreenshotName()).wait(1)

  //click on Person or Org Lookup
  .click("input[name='methodToCall\\.performLookup\\.\\(\\!\\!org\\.kuali\\.coeus\\.common\\.framework\\.rolodex\\.Rolodex\\!\\!\\)\\.\\(\\(\\(rolodexId\\:sponsorContactsBean\\.rolodexId\\)\\)\\)\\.\\(\\(\\`sponsorContactsBean\\.rolodexId\\:rolodexId\\`\\)\\)\\.\\(\\(\\<\\>\\)\\)\\.\\(\\(\\[\\]\\)\\)\\.\\(\\(\\*\\*\\)\\)\\.\\(\\(\\^\\^\\)\\)\\.\\(\\(\\&\\&\\)\\)\\.\\(\\(\\/\\/\\)\\)\\.\\(\\(\\~\\~\\)\\)\\.\\(\\:\\:\\:\\:\\;\\;\\:\\:\\:\\:\\)\\.anchorSponsorContacts']")
  //wait 2 seconds for lookup screen to load
  .wait(2000)
  //take a screenshot of lookup screen after
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //BRINGS UP LOOKUP SCREEN
  //enter rolodexId
  .type("#rolodexId", "191")
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //click search button
  .click("input[name='methodToCall\\.search']")
  //wait 2 seconds for search results to load
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //click "return value" link to return back to contacts page)
  .click("a[title='return valueAddress Book Id=191 ']")
  
  //wait 2 seconds for results to return
  .wait(2000)
  //take screenshot
  .screenshot(getUniqScreenshotName()).wait(1)
  
  //Select from dropdown Project Role
  //PI - Principal Investigator
  //COI - Co-Investigator
  //KP - Key Person
  .select("#sponsorContactsBean\\.contactRoleCode", "22")
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //click the add button to add sponsor contact
  .click("input[name='methodToCall\\.addSponsorContact']")
  //wait 2 seconds for search results to load
  .click("input[name='methodToCall.save']")
  .wait(3000)
  .screenshot(getUniqScreenshotName()).wait(1) 
  
  //click expand all button to show all fields on the contacts tab AGAIN
  .click("input[name='methodToCall\\.showAllTabs']")
  //take a screenshot of expanded tabs
  .screenshot(getUniqScreenshotName()).wait(1)  
  

// AWARD (COMMITMENTS TAB) - CLICK ON COMMITMENTS TAB
// --------------------------------------------------. 
//click on commitments tab
.click("input[name='methodToCall\\.headerTab\\.headerDispatch\\.save\\.navigateTo\\.commitments'")
.wait(10000)
.screenshot(getUniqScreenshotName()).wait(1)

//click expand all button to show all fields on the commitments tab
// .click("input[name='methodToCall\\.showAllTabs']")
// //take a screenshot of expanded tabs
// .screenshot(getUniqScreenshotName()).wait(1)  

// //click expand all button to show all fields on the tab
// .click("input[name='methodToCall\\.showAllTabs']")
// //take a screenshot of expanded tabs
// .screenshot(getUniqScreenshotName()).wait(1)

//click expand all button to show all fields on the tab DOESNT WORK
//.click("input[name='methodToCall\\.toggleTab\\.tabRates']")
//   OR
// .click("input[name='methodToCall\\.showAllTabs']")

//click expand to show cost sharing
// .click("input[name='methodToCall\\.toggleTab\\.tabCostSharing']")
// .wait(3000)
// .screenshot(getUniqScreenshotName()).wait(1)

//click expand to show rates
// .click("input[name='methodToCall\\.toggleTab\\.tabRates']")
// .wait(3000)
// .screenshot(getUniqScreenshotName()).wait(1)

//Enter destination accounts for F&A Rates
//.type("#document.awardList\\[0\\]\\.awardFandaRate\\[0\\]\\.destinationAccount", "TBD3")
//.type("#document.awardList\\[0\\]\\.awardFandaRate\\[1\\]\\.destinationAccount", "TBD4")


//Enter destination accounts for F&A Rate Comment
//.type("#document\\.award\\.awardFandaRateComment\\.comments", "JD")
//.wait(3000)
//.screenshot(getUniqScreenshotName()).wait(1)


//click expand to show Preaward Authorizations
//.click("input[name='methodToCall\\.toggleTab\\.tabPreawardAuthorizations']")


// LAST SAVE BEFORE ENDING
// --------------------------------------------------. 
//save, wait, screenshot
// .click("input[name='methodToCall.save']")
// .wait(3000)
// .screenshot(getUniqScreenshotName()).wait(1) 

// AWARD (PAYMENT REPORTS TERMS) - CLICK ON TAB
// --------------------------------------------------. 
//click on payment repots and terms tab
//.click("input[name='methodToCall\\.headerTab\\.headerDispatch\\.save\\.navigateTo\\.paymentReportsAndTerms'")
//.wait(3000)
//.screenshot(getUniqScreenshotName()).wait(1)


//.click("input[name='methodToCall\\.toggleTab\\.tabTerms'")
//.wait(3000)
//.screenshot(getUniqScreenshotName()).wait(1)

//save
//.click("input[name='methodToCall\\.save']")
//.wait(3000)
//.screenshot(getUniqScreenshotName()).wait(1)


// AFTER RUNNING THE TEST - CLEANUP 
// --------------------------------------------------.  
  // end the automated testing robot/program
  .url()
  .visible("input[name='methodToCall\\.headerTab\\.headerDispatch\\.save\\.navigateTo\\.commitments'")
  .evaluate(function () {
    console.log("document.querySelector(#document.award.awardFandaRateComment.comments).value is: " + document.querySelector("#document\\.award\\.awardFandaRateComment\\.comments").value)
    return document.querySelector("#document\\.award\\.awardFandaRateComment\\.comments").value;
  })
  .end()
  //.on('page', function(type="error", message, stack){console.log("message: " + message + "\n" + "stack: " + stack);})
  //display any results or errors returned back
  .then(function(result) {
    console.log("Test Finished Running(see screenshots like [" + getUniqScreenshotName() + "]! \nany results? " + result);
  }, function(err) {
    console.error("Failed with error:", err);
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
  
  // increment the screenshot counter, i.e Awd3.png
  screenshotCounter = screenshotCounter + 1;
  console.log("should be creating screenshot: " + folderpath + currModule + screenshotCounter + ".png");
  return folderpath + currModule + screenshotCounter + ".png";
}
