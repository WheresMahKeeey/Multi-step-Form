function submitApplication() {
	console.log("loading...");
  document.getElementById("applicationForm").style.display = "none";
  document.getElementById("loader-wrapper").style.display = "block";
  loadSuccessPage();
}

function loadSuccessPage() {
	setTimeout(showSuccessPage, 3000);
}

function showSuccessPage() {
  document.getElementById("loader-wrapper").style.display = "none";
  document.getElementById("successPage").style.display = "block";
  document.getElementById("applicationNumber").innerHTML = "2019300" + getRandomNumber();
}

function getRandomNumber() {
	var numbers = "0123456789";
	var numCode = "";

	for (var i = 0; i < 3; i++) 
		numCode += numbers.charAt(Math.floor(Math.random() * numbers.length));
	
	return numCode;	
}