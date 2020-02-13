var tabs = document.getElementsByClassName("tab");

var currentTab = 0;
showTab(currentTab);

var isFormViewed = false;
document.getElementById("student-consent").disabled = true;

function nextTab(val) {
  topFunction();
  if (val == 1 && !formValidation()) return false;
  // console.log(formValidation());
	tabs[currentTab].style.display = "none";

	currentTab = currentTab + val;
	showTab(currentTab);
}

function showTab(tabVal) {
  tabs[tabVal].style.display = "block";

	if (tabVal == 0) 
    document.getElementById("prev").style.display = "none";
  else 
    document.getElementById("prev").style.display = "inline";
  

  if (tabVal == tabs.length-1) {
    document.getElementById("next").innerHTML = "Submit";
    enableSubmitBtn();
    document.getElementById("next").onclick = function () { submitApplication(); return false };
  }
  else {
    document.getElementById("next").innerHTML = "Next";
    document.getElementById("next").disabled = false;
    document.getElementById("next").onclick = function () { nextTab(1); return false };
  }

  formStepActive(tabVal);
}

function formSteps(val) {
  // set steps
  var steps = document.getElementById("steps");
  $(steps).empty();
  for (var i = 0; i < tabs.length; i++) {
    var step = document.createElement("span");
    step.className = "step mx-4";
    steps.appendChild(step);
  }
  formStepActive(currentTab);
}

function formStepActive(current) {
  var steps = document.getElementsByClassName("step");
  for (var i = 0; i < steps.length; i++) 
    steps[i].className = steps[i].className.replace(" active", "");
  $(steps[current]).addClass("active");
}

function formValidation() {
  var inputs, valid = true;
  rows = $(".tab>div>.row:visible" );
  for (var i = 0; i < rows.length; i++) {
    inputs = rows[i].getElementsByTagName("input");
    selects = rows[i].getElementsByTagName("select");

    if (selects.length > 0) {
      if ($("#firstChoice option:selected").val() == "" || $("#firstChoice option:selected").val() == $("#secondChoice option:selected").val() || $("#firstChoice option:selected").val() == $("#thirdChoice option:selected").val()) {
        $("#firstChoice").addClass("invalid");
        valid = false;        
      }
      else
        $("#firstChoice").removeClass("invalid");

      if ($("#secondChoice").is(":visible") && ($("#secondChoice option:selected").val() == "" || $("#secondChoice option:selected").val() == $("#firstChoice option:selected").val() || $("#secondChoice option:selected").val() == $("#thirdChoice option:selected").val())) {
        $("#secondChoice").addClass("invalid");
        valid = false;        
      }
      else
        $("#secondChoice").removeClass("invalid");

      if ($("#thirdChoice").is(":visible") && ($("#thirdChoice option:selected").val() == "" || $("#thirdChoice option:selected").val() == $("#firstChoice option:selected").val() || $("#thirdChoice option:selected").val() == $("#secondChoice option:selected").val())) {
        $("#thirdChoice").addClass("invalid");
        valid = false;        
      }
      else
        $("#thirdChoice").removeClass("invalid");
    }

    for (var j = 0; j < inputs.length; j++) {
      // make blanks invalid except for optional fields
      if (inputs[j].value == "" && !inputs[j].classList.contains("optional")) {
        $(inputs[j]).addClass("invalid");
        valid = false;
      }
      else
        $(inputs[j]).removeClass("invalid");
      // invalid email input
      if (inputs[j].value != "" && $(inputs[j]).hasClass("email")) {
        if (!isEmail(inputs[j].value)) {
          $(inputs[j]).addClass("invalid");
          valid = false;
        }
        else
          $(inputs[j]).removeClass("invalid");
      }
      // invalid number input
      if (inputs[j].value != "" && $(inputs[j]).hasClass("number")) {
        if (!isNumber(inputs[j].value)) {
          $(inputs[j]).addClass("invalid");
          valid = false;
        }
        else
          $(inputs[j]).removeClass("invalid");
      }
      // check password match
      if (inputs[j].value != "" && $(inputs[j]).hasClass("password")) {
        if (!isPasswordMatch($("#password").val(), $("#confirm").val())) {
          $(inputs[j]).addClass("invalid");
          valid = false;
        }
        else
          $(inputs[j]).removeClass("invalid");
      }
    }
  }
  if (valid) {
    console.log(document.getElementsByClassName("step")[currentTab-1], document.getElementsByClassName("step")[currentTab]);
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function isPasswordMatch(pass1, pass2) {
  // var passPtn = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  // if (passPtn.test(pass1)) {
  //   if (pass1 === pass2) 
  //     return true;
  //   else
  //     return false;
  // }
  // else
  //   return false;
    return pass1 === pass2;
}

function isEmail(email) {
  var emailPtn = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPtn.test(email);
}

function isNumber(number) {
  return !isNaN(number);
}

function enableSubmitBtn() {
  if(isFormViewed && $(".student-consent").is(":checked"))
    document.getElementById("next").disabled = false;
  else
    document.getElementById("next").disabled = true;
}

function closeModal() {
  $('.modal-backdrop').remove();
  $('body').removeClass("modal-open");    
  $('.modal').removeClass("show");  
  $('.modal').hide(); 
}

function formViewed() {
  isFormViewed = true; 
  document.getElementById("student-consent").disabled = false;
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}