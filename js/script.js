/* 
Focus on Name text field on document referesh
*/
window.onload = document.getElementById("name").focus();

/*
Job Role Section
'Other' section  hidden unless 'other' is selected in job role drop-down menu
hide other-job-role by default
*/
const otherJobRole = document.getElementById("other-job-role");
const textAreaOtherJob = () => {
  const select = document.getElementById("title");
  otherJobRole.style.display = "none";
  select.addEventListener("input", (e) => {
    if (e.target.value === "other") {
      otherJobRole.style.display = "block";
      otherJobRole.focus();
    } else {
      otherJobRole.style.display = "none";
    }
    console.log(otherJobRole.style.display);
  });
};

textAreaOtherJob();

/* T-Shirt Design Color Section
      the color drop down and design drop down are dynamically connected to display the proper things available 
      for each style.
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

/* "Register for Activities" section:
    adding event listeners with a loop to find out if 
    inputs from different activity packages are checked or unchecked from user.
*/

let totalAmount = 0;
const allCheckbox = document.querySelectorAll("input[type='checkbox']");
const totalAmountEl = document.getElementById("activities-cost");
for (let i = 0; i < allCheckbox.length; i++) {
  allCheckbox[i].addEventListener("change", (e) => {
    if (e.target.checked) {
      totalAmount += parseInt(allCheckbox[i].getAttribute("data-cost"));
      allCheckbox[i].parentElement.focus()
      allCheckbox[i].parentElement.classList = 'focus';
      console.log(totalAmount);
      totalAmountEl.textContent = `Total: $${totalAmount}`;
    } else {
      totalAmount -= parseInt(allCheckbox[i].getAttribute("data-cost"));
      allCheckbox[i].parentElement.blur()
      allCheckbox[i].parentElement.classList = '';
      console.log(totalAmount);
      totalAmountEl.textContent = `Total: $${totalAmount}`;
    }
  });
}

/* Payment Info Section:
  hides bitcoin and paypal on website refresh and credit card as default
  when (option) is selected it will display only that payment option on site
*/

const payWithSelect = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
paypal.style.display = "none";
bitcoin.style.display = "none";
payWithSelect.addEventListener("change", (e) => {
  if (e.target.value === 'credit-card') {
    creditCard.style.display = "inline";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  } else if (e.target.value === 'paypal') {
    creditCard.style.display = "none";
    paypal.style.display = "block";
    bitcoin.style.display = "none";
  } else if (e.target.value === 'bitcoin') {
    creditCard.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "block";
  }
  console.log(e.target);
});

/* 
  *  Form Validation:
  *    seeing if input content is valid and giving feedback to user.
*/
const email = document.getElementById('email');
const registerForActivities = document.getElementById('activities');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const activitiesCost = document.getElementById('activities-cost');

/* Validator functions to test if user submitted correctly */
function isValidName(name) {
  return /\S+/.test(name);
};

function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
};

function isValidActivity(activity){
  return (activity !== 'Total: $0');
};

function isValidCardNumber(number){
  return /^[0-9]{13,16}$/.test(number);
};

function isValidZipCode(zipCode){
  return /^[0-9]{5}$/.test(zipCode);
};

function isValidCVV(cvv){
  return /^[0-9]{3}$/.test(cvv);
};

/*  when user error/incomplete submission is true show tool tip, hide when false  */

function showOrHideTip(show, element) {
  if (show) {
    element.style.display = "inherit";
    element.parentElement.className = 'not-valid';
  } else {
    element.style.display = "none";
    element.parentElement.className = 'valid';
  }
}

function showOrHideTipActivity(show, element) {
  if (show) {
    element.style.display = "inherit";
    element.parentElement.className = 'activities not-valid';
  } else {
    element.style.display = "none";
    element.parentElement.className = 'activities valid';
  }
}

/* create listener functions to show tooltips if information is not submitted correctly 
using the validators */
function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    console.log(e.target.value);
    showOrHideTip(showTip, tooltip);
  };
}

function createListenerActivity(validator) {
  return e => {
    const text = activitiesCost.textContent;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = activitiesCost.nextElementSibling;
    showOrHideTipActivity(showTip, tooltip);
  };
}

/* event listners to listen for submits using the validators and listener functions */

nameInput.addEventListener("input", createListener(isValidName));

email.addEventListener("input", createListener(isValidEmail));

registerForActivities.addEventListener("change", createListenerActivity(isValidActivity));

cardNumber.addEventListener('input', createListener(isValidCardNumber));

zipCode.addEventListener('input', createListener(isValidZipCode));

cvv.addEventListener('input', createListener(isValidCVV));

form.addEventListener('submit', createListener(isValidName));