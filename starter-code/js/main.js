const imperial = document.querySelector("#imperial");
const metric = document.querySelector("#metric");

const selector = document.getElementsByName("unit");
const score = document.querySelector("#score");
const range = document.querySelector("#range");
const classification = document.querySelector("#classification");

let actualUnit = "metric";

display();

function display() {
  selector.forEach((e) => {
    if (e.checked == true) {
      document.getElementById(e.value).style.display = "flex";
      actualUnit = e.value;
    } else {
      document.getElementById(e.value).style.display = "none";
    }
  });
  score.textContent = "00.0";
  range.textContent = "<type your data>";
  classification.textContent = "<type your data>";
}

if (document.querySelector('input[name="unit"]')) {
  document.querySelectorAll('input[name="unit"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      display();
    });
  });
}

// Listen inputs
const heightCM = document.querySelector("#height--cm");
const weightKG = document.querySelector("#weight--kg");

const heightFT = document.querySelector("#height--ft");
const heightIN = document.querySelector("#height--in");
const weightST = document.querySelector("#weight--st");
const weightLBS = document.querySelector("#weight--lbs");

function getClassification(bmi) {
  const ranges = [
    [0, 18.5, "underweight"],
    [18.5, 24.9, "healthy weight"],
    [25, 29.9, "overweight"],
    [30, 100, "obesity"],
  ];
  const result = ranges.filter((e) => {
    return bmi >= e[0] && bmi <= e[1];
  });
  return result;
}

function getIdealWeight(height) {
  let idealWeight;
  if (actualUnit == "metric") {
    const minWeight = (height ** 2 * 18.5).toFixed(1);
    const maxWeight = (height ** 2 * 24.9).toFixed(1);
    idealWeight = `${rangeWeight[0]}kgs - ${rangeWeight[1]}kgs`;
  } else if (actualUnit == "imperial") {
    const minWeight = (18.5 / 703) * height ** 2;
    const maxWeight = (24.9 / 703) * height ** 2;
    const rangeMinWeight = `${
      (minWeight - (minWeight % 14)) / 14
    }st ${Math.trunc(minWeight % 14)}lbs`;
    const rangeMaxWeight = `${
      (maxWeight - (maxWeight % 14)) / 14
    }st ${Math.trunc(maxWeight % 14)}lbs`;
    idealWeight = rangeMinWeight + " - " + rangeMaxWeight;
    console.log(minWeight % 14);
    console.log(maxWeight % 14);
  }
  return idealWeight;
}

function getBMI() {
  let bmi;
  let idealWeight;
  if (actualUnit == "metric") {
    const height = Number(heightCM.value) / 100;
    const weight = Number(weightKG.value);
    idealWeight = getIdealWeight(height);

    bmi = (weight / height ** 2).toFixed(1);
  } else if (actualUnit == "imperial") {
    const ftToIn = Number(heightFT.value) * 12;
    const height = ftToIn + Number(heightIN.value);

    const stToLbs = Number(weightST.value) * 14;
    const weight = stToLbs + Number(weightLBS.value);
    idealWeight = getIdealWeight(height);

    bmi = ((weight / height ** 2) * 703).toFixed(1);
  }
  const result = getClassification(bmi)[0];
  classification.textContent = result[2];
  range.textContent = idealWeight;
  score.textContent = bmi;
}

function checkValues() {
  if (actualUnit == "metric") {
    if (heightCM.value != "" && weightKG.value != "") {
      getBMI();
    } else {
      score.textContent = "00.0";
      range.textContent = "<type your data>";
      classification.textContent = "<type your data>";
    }
  } else if (actualUnit == "imperial") {
    if (
      (heightFT.value != "" || heightIN.value != "") &&
      (weightST.value != "" || weightLBS.value != "")
    ) {
      getBMI();
    } else {
      score.textContent = "00.0";
      range.textContent = "<type your data>";
      classification.textContent = "<type your data>";
    }
  }
}

if (document.querySelector(".field__input")) {
  document.querySelectorAll(".field__input").forEach((elem) => {
    elem.addEventListener("keyup", function (event) {
      checkValues();
    });
  });
}
