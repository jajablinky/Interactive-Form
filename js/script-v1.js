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
const select = document.getElementById("title");
const textAreaOtherJob = () => {
  otherJobRole.hidden = true;
  select.addEventListener("change", (e) => {
    if (e.target.value === "other") {
      otherJobRole.hidden = false;
      otherJobRole.focus();
    } else {
      otherJobRole.hidden = true;
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
  const colorDropDown = document.getElementById("color");
  const designDropDown = document.getElementById("design");
  const colorChildren = colorDropDown.children;
  colorDropDown.disabled = true;
  designDropDown.addEventListener("change", (e) => {
    colorDropDown.disabled = false;
    colorDropDown.focus();
    for (i = 0; i < colorChildren.length; i++) {
      const designValue = e.target.value;
      const currentColorValue = colorChildren[i].getAttribute("data-theme");
      if (designValue === currentColorValue) {
        colorChildren[i].hidden = false;
        colorChildren[i].setAttribute("selected", true);
      } else if (colorValue !== currentColorValue) {
        colorChildren[i].hidden = true;
        colorChildren[i].removeAttribute("selected");
      }
      console.log(colorValue);
      console.log(currentColorValue);
    }
  });
};
tshirtDesignColor();

/* "Register for Activities" section:
    adding event listeners with a loop to find out if 
    inputs from different activity packages are checked or unchecked from user.
*/

const registerForActivities = document.getElementById("activities");
const allActivity = document.querySelectorAll("input[type='checkbox']");
const totalAmountEl = document.getElementById("activities-cost");
let totalAmount = 0;

registerForActivities.addEventListener("change", (e) => {
  const activityDataCost = +e.target.getAttribute("data-cost");

    if (e.target === allActivity[1] && allActivity[3].checked) {
    allActivity[3].checked = false;
  } else if (e.target === allActivity[3] && allActivity[1].checked) {
    allActivity[1].checked = false;
  } else if (e.target === allActivity[2] && allActivity[4].checked) {
    allActivity[4].checked = false;
  } else if (e.target === allActivity[4] && allActivity[2].checked) {
    allActivity[2].checked = false;
  }

    else if (e.target.checked && allActivity) {
    totalAmount += activityDataCost;
  } else if (!e.target.checked && allActivity) {
    totalAmount -= activityDataCost;
  } 

  console.log(totalAmount);
  totalAmountEl.innerHTML = `Total: $${totalAmount}`;
});

// listeners to add focus and blur to cycle through all activities
for (i = 0; i < allActivity.length; i++) {
  allActivity[i].addEventListener("focus", (e) => {
    e.target.parentElement.classList = "focus";
  });
  allActivity[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
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
paypal.hidden = true;
bitcoin.hidden = true;
const collectionSelect = payWithSelect.children;
collectionSelect[0].setAttribute("selected", true);
payWithSelect.addEventListener("change", (e) => {
  if (e.target.value === "credit-card") {
    creditCard.hidden = false;
    paypal.hidden = true;
    bitcoin.hidden = true;
  } else if (e.target.value === "paypal") {
    creditCard.hidden = true;
    paypal.hidden = false;
    bitcoin.hidden = true;
  } else if (e.target.value === "bitcoin") {
    creditCard.hidden = true;
    paypal.hidden = true;
    bitcoin.hidden = false;
  }
});

/*
 *  Form Validation:
 *    seeing if input content is valid and giving feedback to user.
 */
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const emailBlank = document.getElementById("email-hint2");

const inputValidator = (input, regex, e) => {
  const inputValue = input.value;
  const inputValid = regex.test(inputValue);
  if (inputValid) {
    input.parentElement.classList = "valid";
    input.parentElement.lastElementChild.style.display = "none";
    return true;
  } else {
    e.preventDefault();
    input.parentElement.classList = "not-valid";
    input.parentElement.lastElementChild.style.display = "inline";
    return false;
  }
};

const activityValidator = (e) => {
  const checked = document.querySelectorAll("input[type='checkbox']:checked");
  const checkedAmount = checked.length;
  if (checkedAmount === 0) {
    e.preventDefault();
    registerForActivities.classList += " not-valid";
    registerForActivities.classList.remove("valid");
    registerForActivities.lastElementChild.style.display = "inline";
    return false;
  } else {
    registerForActivities.classList += " valid";
    registerForActivities.classList.remove("not-valid");
    registerForActivities.lastElementChild.style.display = "none";
    return true;
  }
};

const formListener = (e) => {
  inputValidator(nameInput, /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/, e);
  activityValidator(e);
  if (payWithSelect.value === 'credit-card') {
    inputValidator(cardNumber, /^[0-9]{13,16}$/, e);
    inputValidator(zipCode, /^[0-9]{5}$/, e);
    inputValidator(cvv, /^[0-9]{3}$/, e);
  }
  if ((email.value === "")) {
    e.preventDefault();
    emailBlank.parentElement.classList = "not-valid";
    emailBlank.style.display = "block";
    return false;
  } else {
    emailBlank.parentElement.classList.remove('not-valid');
    emailBlank.style.display = "none";
    inputValidator(email, /^[^@]+@[^@.]+\.[a-z]+$/i, e);
  }
};

form.addEventListener("submit", formListener);
form.addEventListener("input", formListener);
