getStudentLevel(); 
generalFields();
foreignStudent();

function generalFields() {
	var civilStatus = [	"Single", "Married", "Legally Separated", "Widow/Widower"];
	var gender = ["Male", "Female"];

	var civilStatusSelectElement = document.getElementById("select-civil-status");
	var genderSelectElement = document.getElementById("select-gender");

	setOptions(civilStatusSelectElement, civilStatus);
	setOptions(genderSelectElement, gender);
}

function setOptions(select, options) {
	for (var i = 0; i < options.length; i++) {
		var option = document.createElement("option");
		option.text = options[i];
		option.value = options[i];
		select.add(option);	
	}
}

function getStudentLevel() {
	var studentLevel = document.getElementById('studentLevel').value;
	setDynamicFields(studentLevel);
}

function setDynamicFields(level) {

	var jhsChoices = ["Grade 7", "Grade 8", "Grade 9", "Grade 10"];

	var shsChoices = ["ABM - Accountancy, Business & Management", 
	"STEM - Science, Technology, Engineering & Math", 
	"HUMESS - Humanities, Education & Social Sciences"];

	var collegeChoices = [ "Bachelor of Arts in Broadcasting", 
		"Bachelor of Arts in Business Administration", 
		"Bachelor of Arts in Communication",
		"Bachelor of Early Childhood Education",
		"Bachelor of Special Needs Education",
		"Bachelor of Secondary Education",
		"Bachelor of Science in Accountancy",
		"Bachelor of Science in Biology",
		"Bachelor of Science in Business Administration",
		"Bachelor of Science in Computer Engineering",
		"Bachelor of Science in Hospitality Management",
		"Bachelor of Science in Information Technology",
		"Bachelor of Science in Medical Technology",
		"Bachelor of Science in Nursing",
		"Bachelor of Science in Pharmacy",
		"Bachelor of Science in Psychology",
		"Bachelor of Science in Radiologic Technology",
		"Bachelor of Science in Real Estate Management",
		"Bachelor of Science in Respiratory Therapy",
		"Bachelor of Science in Tourism Management"];

	var gradChoices = [	"Doctor of Education (EdD)", 
		"Doctor of Public Administration (DPA)", 
		"Doctor in Nursing Management (DNM)",
		"Master in Business Administration (MBA)",
		"Master in Management (MM)",
		"Master of Science in Medical Technology (MSMT)",
		"Master in Hospital Management (MHM)",
		"Master in Public Administration (MPA)",
		"Master of Arts in Education (MAEd)",
		"Master of Arts in Nursing (MAN)"]


	// set fields for jhs
	if (level == "jhs") {
		setChoices(jhsChoices);
		setGradSchoolFields(false);
		setJHSFields(true);
	}

	// set fields for shs
	else if (level == "shs") {
		setChoices(shsChoices);
		setGradSchoolFields(false);
		setJHSFields(false);
	}

	// set fields for college
	else if (level == "college") {
		setChoices(collegeChoices);
		setGradSchoolFields(false);
		setJHSFields(false);
	}

	// set fields for gradschool
	else if (level == "gradschool") {
		setChoices(gradChoices);
		setGradSchoolFields(true);
		setJHSFields(false);
	}
}

function setChoices(choices) {
	emptyChoices();
	var choicesSelectElement = document.getElementsByClassName("select-choices");
	for (var n = 0; n < choicesSelectElement.length; n++) {
		var optionInitial = document.createElement("option");

		if (n == 0)
			optionInitial.text = "Please select first choice";
		if (n == 1)
			optionInitial.text = "Please select second choice";
		if (n == 2)
			optionInitial.text = "Please select third choice";

		optionInitial.value = "";
		choicesSelectElement[n].add(optionInitial);

		for (var i = 0; i < choices.length; i++) {
			var option = document.createElement("option");
			option.text = choices[i];
			option.value = choices[i];
			choicesSelectElement[n].add(option);
		}			
	}
}

function emptyChoices() {
	document.querySelectorAll('.select-choices option').forEach(option => option.remove());
}

function setJHSFields(boolean) {
	if (boolean) 
		$(".non-jhs-field").hide();	
	else 
		$(".non-jhs-field").show();	
}

function setGradSchoolFields(boolean) {
	if (boolean) {
		$(".gradschool-field").show();
		$(".non-gradschool-field").hide();

	}
	else {
		$(".gradschool-field").hide();
		$(".non-gradschool-field").show();
	}
}

function foreignStudent() {
	var isForeignStudent = $("input[name=isForeignStudent]:checked").val();

	if (isForeignStudent == 'true') {
		$(".foreign-student-details").addClass("tab");
		$(".foreign-student-details").removeClass("hidden-tab");
	}

	else {
		$(".foreign-student-details").removeClass("tab");
		$(".foreign-student-details").addClass("hidden-tab");
	}

	formSteps();
	var prevStep = document.getElementsByClassName("step")[currentTab-1];
	$(prevStep).addClass("finish");
	formStepActive(currentTab);
}