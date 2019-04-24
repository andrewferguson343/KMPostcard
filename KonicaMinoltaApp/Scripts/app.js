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

function AddText() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var msg = "";
  context.clearRect(20, 100, 20, 100);
}

function RestoreHistoryImage(data) {
  alert(data);
  img.src = data;
  PopulateCanvas();
}

function ValidateSendEmail() {
  var errorFlag = false;
  var email = $('#sendEmail-Reciever').val();
  var data = $('#canvasImageURL').val();

  alert(email);
  if (email === "" | !email.includes("@")) {
    errorFlag = true;
    alert("Email is not entered correctly");
  }
  alert(data);
  if (data === "") {
    errorFlag = true;
    alert("No image is loaded");
  }
  alert(errorFlag);
  return !errorFlag;
}

function HandleSendEmail(e) {
  location.reload();
}