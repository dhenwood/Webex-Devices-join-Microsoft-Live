import xapi from 'xapi';
var code = "abc"

//STEP 1: Create a button on UI Designer with id as "Live"
//STEP 2: Add and save this Js file as a macro on webex device 
// Supported on devices running Room OS 11

//bring up textinput to enter PPT Live Code
function getMeetingID(){
  xapi.Command.UserInterface.Message.TextInput.Display({
    Placeholder: `enter the code`,
    Title: "PowerPoint Live", /* Create a custom title for your meeting Input Display here */
    Text: "Join a PowerPoint Live",
    InputText: "",
    SubmitText: "Join",
    FeedbackId: 123,
    })
  .catch((error) => console.error(error));
}
xapi.Event.UserInterface.Extensions.Panel.Clicked.on((event) => {
    if(event.PanelId === "Live"){ 
         getMeetingID();
    }
});


//open PPT Live webapp with user entered code 
xapi.Event.UserInterface.Message.TextInput.Response.on((event) => {
    switch(event.FeedbackId){
        case "123": 
        console.log(event)
        code=event.Text
        xapi.Command.UserInterface.WebView.Display({Url: "https://ppt.ms/"+code})
          break;
    }
});