// ---------- EMAIL VALIDATION HELPER ----------

function isValidEmail(stringToTest) {
  const emailRegex =
    /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
  // Regex from https://colinhacks.com/essays/reasonable-email-regex
  return emailRegex.test(stringToTest);
}

// ---------- FORM VALIDATION ----------

const form = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const topicsFieldset = document.getElementById("topics-fieldset");

if (form === null) {
} 
else {
  form.addEventListener("submit", (myEventObject) => {
    clearEmailError();
    clearTopicsError();

    let allValid = true;
    let focusTarget = null;

    // ----- Email check -----
    const emailValue = emailInput.value.trim();
    const emailHasText = emailValue.length > 0;
    const emailLooksValid = isValidEmail(emailValue);

    if (emailHasText === false || emailLooksValid === false) {
      allValid = false;
      showEmailError("Please enter a valid email address.");
      focusTarget = emailInput;
    }

    // ----- Checkbox group check -----
    const checkboxes = document.querySelectorAll('input[name="topics"]');

    let anyChecked = false;
    for (const checkbox of checkboxes) {
      if (checkbox.checked === true) {
        anyChecked = true;
      }
    }

    if (anyChecked === false) {
      allValid = false;
      showTopicsError("Please select at least one of these options.");

      if (focusTarget === null && checkboxes.length > 0) {
        focusTarget = checkboxes[0];
      }
    }

    console.log("All inputs valid?", allValid);

    if (allValid === false) {
      myEventObject.preventDefault();
      if (focusTarget !== null) {
        focusTarget.focus();
      }
    }
  });
}

// ---------- ERROR HELPERS ----------

function clearEmailError() {
  emailInput.removeAttribute("aria-invalid");
  emailInput.removeAttribute("aria-describedby");

  const emailError = document.getElementById("email-error");
  if (emailError !== null) {
    emailError.remove();
  }
}

function showEmailError(message) {
  let emailError = document.getElementById("email-error");

  if (emailError === null) {
    emailError = document.createElement("p");
    emailError.id = "email-error";
    emailError.setAttribute("role", "alert");
    emailError.style.color = "red";
    emailError.style.marginTop = "0.25rem";

    emailInput.insertAdjacentElement("afterend", emailError);
  }

  emailError.innerText = message;

  emailInput.setAttribute("aria-invalid", "true");
  emailInput.setAttribute("aria-describedby", "email-error");
}

function clearTopicsError() {
  const checkboxes = document.querySelectorAll('input[name="topics"]');

  for (const checkbox of checkboxes) {
    checkbox.removeAttribute("aria-invalid");
    checkbox.removeAttribute("aria-describedby");
  }

  const topicsError = document.getElementById("topics-error");
  if (topicsError !== null) {
    topicsError.remove();
  }
}

function showTopicsError(message) {
  let topicsError = document.getElementById("topics-error");

  if (topicsError === null) {
    topicsError = document.createElement("p");
    topicsError.id = "topics-error";
    topicsError.setAttribute("role", "alert");
    topicsError.style.color = "red";
    topicsError.style.marginTop = "0.25rem";

    topicsFieldset.appendChild(topicsError);
  }

  topicsError.innerText = message;

  const checkboxes = document.querySelectorAll('input[name="topics"]');
  for (const checkbox of checkboxes) {
    checkbox.setAttribute("aria-invalid", "true");
    checkbox.setAttribute("aria-describedby", "topics-error");
  }
}
