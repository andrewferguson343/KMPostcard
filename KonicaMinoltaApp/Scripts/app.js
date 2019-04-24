//when document is ready, add an event listener to the file
//input which is hit when the user uplaods file, callback populates the
//canvas with the users image
var img = new Image();


$('#fileUploader').change(function (e) {
  img.onload = PopulateCanvas;
  img.src = URL.createObjectURL(this.files[0]);
  var msg = msg = $('#canvasText').val();
  GetDataUrl();
});

function PopulateCanvas() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var fontSize = $('#fontSize').val();
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.canvas.width = img.width;
  context.canvas.height = img.height;
  context.drawImage(img, 0, 0);

  msg = $('#canvasText').val();
  context.textAlign = 'center';
  context.fillStyle = $('#fontColor').val();
  context.font = fontSize + " Arial";
  context.fillText(msg, context.canvas.width / 2, context.canvas.height - 40);
  GetDataUrl();
}

function GetDataUrl() {
  var canvas = document.getElementById('canvas');  
  var dataUrl = canvas.toDataURL("image/png");
  var image = document.createElement('img');
  image.src = dataUrl;
  $('#canvasImageURL').val(dataUrl);
 
}


function PopulateErrorPanel(message) {
  var errorPanel = $('#errorPanel');
  if (message != "") {
    errorPanel.html('<p>' + message + '</p>')
    errorPanel.css("border", "1px solid red");
  }
}

function RestoreHistoryImage(data) {
  img.src = data;
  PopulateCanvas();
}

function ValidateSendEmail(prevImage) {
  var errorFlag = false;
  var errorMessage = "";
  var email = $('#sendEmail-Reciever').val();
  var data = $('#canvasImageURL').val();

  if (email === "" | !email.includes("@")) {
    errorFlag = true;
    PopulateErrorPanel("Email is not entered correctly");
  }
  if (data === "" | data == prevImage) {
    errorFlag = true;
    PopulateErrorPanel("No image is loaded");
  }
  return !errorFlag;
}

function HandleSendEmail(e) {

  location.reload();
  


}