function isValidForm(form) {
  let valid = true;

  const nameRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/gi;

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

  const phoneRegex =
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/gi;

  const formInputs = form.querySelectorAll("input");
  formInputs.forEach((input) => {
    input.parentElement.classList.remove("required");

    if (input.value.length <= 0) {
      valid = false;
      input.parentElement.classList.add("required");
      input.parentElement.querySelector("span").innerHTML =
        "This field is required";
    } else {
      if (input.id === "name" && !nameRegex.test(input.value)) {
        valid = false;
        input.parentElement.classList.add("required");
        input.parentElement.querySelector("span").innerHTML =
          "Please enter a valid name using only letters and spaces.";
      } else if (input.id === "email" && !emailRegex.test(input.value)) {
        valid = false;
        input.parentElement.classList.add("required");
        input.parentElement.querySelector("span").innerHTML =
          "Please enter a valid email address, e.g., name@example.com";
      } else if (input.id === "phone" && !phoneRegex.test(input.value)) {
        valid = false;
        input.parentElement.classList.add("required");
        input.parentElement.querySelector("span").innerHTML =
          "Please enter a valid international phone number, starting with a '+' followed by the country code and up to 14 digits.";
      }
    }
  });

  return valid;
}

let nextStepNumber = 2;
let previousStepNumber = nextStepNumber - 1;

function stepsHandler(btn) {
  function nextStepFn() {
    if (nextStepNumber < 6) {
      const currentStep = document.querySelector(".current-step > .shown");
      currentStep?.classList.remove("shown");
      const nextStep = document.querySelector(
        `.current-step > .step-${nextStepNumber}`
      );
      nextStep?.classList.add("shown");

      const currentSidebarStep = document.querySelector(
        ".sidebar .step .number.active"
      );
      currentSidebarStep?.classList.remove("active");
      const nextSidebarStep = document.querySelector(
        `.sidebar > .step-${nextStepNumber} .number`
      );
      nextSidebarStep?.classList.add("active");
    }

    nextStepNumber++;
    previousStepNumber = nextStepNumber - 2;
  }

  function previousStepFn() {
    if (nextStepNumber > 0 && nextStepNumber < 6) {
      const currentStep = document.querySelector(".current-step > .shown");
      currentStep.classList.remove("shown");

      const previousStep = document.querySelector(
        `.current-step > .step-${previousStepNumber}`
      );
      previousStep?.classList.add("shown");

      const currentSidebarStep = document.querySelector(
        ".sidebar .step .number.active"
      );
      currentSidebarStep.classList.remove("active");

      const previousSidebarStep = document.querySelector(
        `.sidebar > .step-${previousStepNumber} .number`
      );
      previousSidebarStep?.classList.add("active");
    }

    nextStepNumber--;
    previousStepNumber = nextStepNumber - 2;
  }

  function confirmFn() {
    console.log("confirm purchase");
  }

  if (btn && btn.classList.contains("next")) {
    nextStepFn();
  } else if (btn && btn.classList.contains("confirm")) {
    confirmFn();
  } else {
    previousStepFn();
  }
}

const forms = document.querySelectorAll("form");
forms.forEach((form, index) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formInputs = form.querySelectorAll("input");

    if (!isValidForm(form)) {
      formInputs.forEach((input) => {
        input.addEventListener("focus", () => {
          input.parentElement.classList.remove("required");
        });
      });
    } else {
      if (index === forms.length - 1) {
        stepsHandler(form.querySelector(".confirm"));
      } else {
        stepsHandler(form.querySelector(".next"));
      }
    }
  });

  const previousBtn = form.querySelector(".previous");
  if (previousBtn) {
    previousBtn.addEventListener("click", function () {
      stepsHandler(this);
    });
  }
});
// Finish step 1 logic

let currentPlan = "arcade-plan";

const plansRadioInputs = document.querySelectorAll(`input[name="plan"]`);
plansRadioInputs.forEach((input) => {
  input.addEventListener("change", () => (currentPlan = input.id));
});

const monthlyYearlyCheckbox = document.getElementById("monthly-yearly");
let isYearly = false;

monthlyYearlyCheckbox.addEventListener("change", function () {
  const monthsFreeSpans = document.querySelectorAll(".months-free");
  const monthlyPrices = document.querySelectorAll(".plan-price.monthly");
  const yearlyPrices = document.querySelectorAll(".plan-price.yearly");

  if (this.checked) {
    isYearly = true;

    for (let i = 0; i < monthsFreeSpans.length; i++) {
      monthsFreeSpans[i].classList.add("shown");
      monthlyPrices[i].classList.add("d-none");
      yearlyPrices[i].classList.remove("d-none");
    }
  } else {
    isYearly = false;

    for (let i = 0; i < monthsFreeSpans.length; i++) {
      monthsFreeSpans[i].classList.remove("shown");
      monthlyPrices[i].classList.remove("d-none");
      yearlyPrices[i].classList.add("d-none");
    }
  }
});
// Finish step 2 logic
