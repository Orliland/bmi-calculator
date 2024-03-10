const imperial = document.querySelector("#imperial");
const metric = document.querySelector("#metric");

const selector = document.getElementsByName("unit");
display();

function display() {
  selector.forEach((e) => {
    if (e.checked == true) {
      document.getElementById(e.value).style.display = "flex";
    } else {
      document.getElementById(e.value).style.display = "none";
    }
  });
}

if (document.querySelector('input[name="unit"]')) {
  document.querySelectorAll('input[name="unit"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      display();
    });
  });
}
