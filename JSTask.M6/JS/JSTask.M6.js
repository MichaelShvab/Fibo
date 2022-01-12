// Calculator
let button = document.getElementById("calcButton");
let errorWindow = document.getElementById("errWindow");
let inputWindow = document.getElementById("inputNum");
let serverUrl = "http://localhost:5050/fibonacci/";
let outputValue = document.getElementById("outputNum");
let error42 = document.getElementById("err42");

// Result History
let resultContainer = document.getElementById("resContainer");
let list = document.createElement("ul")
list.classList.add("resDisplay", "list-group")
list.length = 5;
resultContainer.appendChild(list);
for (i = 0; i < list.length; ++i) {
  let ulItem = document.createElement("li");
  ulItem.classList.add("text-decoration-underline", "fs-5", "list-inline")
  list.appendChild(ulItem)
}


button.addEventListener("click", () => {
  // Calculator
  let inputValue = document.getElementById("inputNum").value;
  outputValue.classList.add("spinner-border", "d-none")
  errorWindow.classList.add("d-none")
  error42.classList.add("d-none")
  inputWindow.classList.remove("text-danger", "is-invalid")

  fetch(serverUrl + inputValue)
    .then((res) => {

      if (res.status >= 400) {
        return res.text();
      }
      return res.json();

    })

    .then((res) => {
      outputValue.classList.remove("spinner-border")

      if (typeof res === "object") {
        errorWindow.innerText = "";
        outputValue.classList.remove("d-none")
        outputValue.innerText = res.result;
        return;
      }

      if (inputValue > 50) {
        outputValue.innerText = "";
        errorWindow.classList.remove("d-none");
        inputWindow.classList.add("text-danger", "is-invalid");
        errorWindow.innerText = "Can't be larger than 50";

      } else if (inputValue == 42) {
        errorWindow.innerText = "";
        error42.classList.remove("d-none")
        error42.innerText = "Server Error: " + res;

      } else {
        error42.innerText = "";
      }
    });

  // Result History
  let historyUrl = "http://localhost:5050/getFibonacciResults"
  fetch(historyUrl)
    .then((response => {
      return response.json()
    }))

    .then((response => {

      let history = response;
      let sortedHis = history.results.sort((a, b) => b.createdDate - a.createdDate);
      let lastFive = sortedHis.slice(0, 5)
      let listItems = document.querySelectorAll("li");
      let hisArray = [];

      for (let i = 0; i < lastFive.length; ++i) {

        let sortedNum = lastFive[i].number;
        let sortedRes = lastFive[i].result;
        let sortedDate = new Date(lastFive[i].createdDate);
        latestSearch = `The Fibonnaci of <strong>${sortedNum}</strong> is <strong>${sortedRes}</strong>. Calculated at: ${sortedDate}`;
        hisArray[i] = latestSearch
        listItems[i].innerHTML = hisArray[i]

      };
    }));
});