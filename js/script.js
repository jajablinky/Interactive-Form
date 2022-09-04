/* 
Focus on Name text field on document referesh
*/
window.onload = document.getElementById("name").focus();

/*
Job Role Section
'Other' section  hidden unless 'other' is selected in job role drop-down menu
hide other-job-role by default
*/
const textAreaOtherJob = () => {
  const otherJobRole = document.getElementById("other-job-role");
  const select = document.getElementById("title");
  otherJobRole.style.display = "none";
  select.addEventListener("input", (e) => {
    if (e.target.value === "other") {
      otherJobRole.style.display = "block";
    } else {
      otherJobRole.style.display = "none";
    }
    console.log(otherJobRole.style.display);
  });
};

textAreaOtherJob();

/* T-Shirt Design Color Section
the color drop down and design drop down are dynamically connected to display the proper things available for each style
*/
const tshirtDesignColor = () => {
  const colorDropDownDiv = document.getElementById("shirt-colors");
  const colorDropDown = document.getElementById("color");
  const designDropDown = document.getElementById("design");
  colorDropDownDiv.style.display = "none";
  designDropDown.addEventListener("input", (e) => {
    colorDropDownDiv.style.display = "inline";
    colorDropDown.focus();
    if (e.target.value === "js puns") {
      colorDropDown[1].style.display = "inline";
      colorDropDown[2].style.display = "inline";
      colorDropDown[3].style.display = "inline";
      colorDropDown[4].style.display = "none";
      colorDropDown[5].style.display = "none";
      colorDropDown[6].style.display = "none";
    } else if (e.target.value === "heart js") {
      colorDropDown[1].style.display = "none";
      colorDropDown[2].style.display = "none";
      colorDropDown[3].style.display = "none";
      colorDropDown[4].style.display = "inline";
      colorDropDown[5].style.display = "inline";
      colorDropDown[6].style.display = "inline";
    }
  });
};

tshirtDesignColor();
