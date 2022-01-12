const button = document.getElementById("calcButton");
const serverUrl = "http://localhost:5050/fibonacci/";
const outputValue = document.getElementById("outputNum");
const error42 = document.getElementById("err42");
const historyUrl = "http://localhost:5050/getFibonacciResults";
const checkBox = document.getElementById("checkBox");
const errorWindow = document.getElementById("errWindow");
const resultContainer = document.getElementById("resContainer");
const inputWindow = document.getElementById("inputNum");
errorWindow.classList.add("d-none");

listItemCreator();
resultHis(historyUrl);

button.addEventListener("click", async () => {
  error42.innerText = "";
  outputValue.innerText = "";
  errorWindow.classList.add("d-none");
  inputWindow.classList.remove("is-invalid", "text-danger");
  const inputValue = document.getElementById("inputNum").value;

  // Didn't know if i should let the regular function let you calculate over 51 so i can remove the 2nd condition and it won't let you
  if (inputValue > 50 && checkBox.checked === true) {
    errorWindow.classList.remove("d-none");
    inputWindow.classList.add("is-invalid", "text-danger");
    errorWindow.innerText = "Can't be larger than 50";
  } else if (inputValue < 1) {
    errorWindow.classList.remove("d-none");
    errorWindow.innerText = "Can't be lower than 1";
  } else {
    if (checkBox.checked == true) {
      resSpinner.classList.add("spinner-border")
      hisSpinner.classList.add("spinner-border")
      serverFetch(serverUrl, inputValue);
      resultHis(historyUrl);
    } else {
      fiboCalc(inputValue);
    }
  }
});

async function serverFetch(url, input) {

  try {
    const serverRes = await fetch(url + input);
    if (serverRes.ok) {
      const serverAns = await serverRes.json();
      outputValue.innerText = serverAns.result;
      resSpinner.classList.remove("spinner-border")
      hisSpinner.classList.remove("spinner-border")
    } else {
      const errorRes = await serverRes.text();
      throw errorRes;
    }
  } catch (error) {
    error42.innerText = `Server Error: ${error}`;
    resSpinner.classList.remove("spinner-border")
    hisSpinner.classList.remove("spinner-border")
  }
}

function fiboCalc(value) {
  let fib = [0, 1];
  let input = [];

  for (i = 0; i <= value; i++) {
    fib[i + 2] = fib[i] + fib[i + 1];
    input.push(fib[i]);
  }

  let ans = input.slice(-1);
  outputValue.innerText = ans;
}

// Geekout 3.1, can replace the regular function to get recursion

// function fiboRecursion(value) {
//   console.log(fiboRecursion(value))
//   return value < 2
//     ? value
//     : fiboRecursion(value - 1) + fiboRecursion(value - 2);
// }

function listItemCreator() {
  const resultContainer = document.getElementById("resContainer");
  let list = document.createElement("ul");
  resultContainer.appendChild(list);
  list.length = 15;
  list.classList.add("list-group", "list-group-flush", "fs-5");

  for (i = 0; i < list.length; ++i) {
    let ulItem = document.createElement("li");
    list.appendChild(ulItem);
    ulItem.classList.add("list-group-item", "d-none");
  }
  return;
}

const historySortBy = document.querySelector("#sortWindow")
historySortBy.addEventListener("change", (event) => {
  resultHis(historyUrl);
});

function sortHistory(data) {
  const sortType = document.getElementById("sortWindow").value
  switch (sortType) {
    case "Number Asc":
      return data.results.sort((a, b) => a.number - b.number);
    case "Number Desc":
      return data.results.sort((a, b) => b.number - a.number);
    case "Date Asc":
      return data.results.sort((a, b) => a.createdDate - b.createdDate);
    case "dateDesc":
      return data.results.sort((a, b) => b.createdDate - a.createdDate);
    default:
      return data.results.sort((a, b) => b.createdDate - a.createdDate);
  }
}

async function resultHis(url) {
  let ulItem = document.querySelectorAll("li");
  const serverHis = await fetch(url);
  const serverJson = await serverHis.json();

  const sortedHis = sortHistory(serverJson)

  const latestHistory = sortedHis.slice(0, 15);
  let hisArray = [];

  for (let i = 0; i < latestHistory.length; ++i) {
    const sortedNum = latestHistory[i].number;
    const sortedRes = latestHistory[i].result;
    const sortedDate = new Date(latestHistory[i].createdDate);
    latestSearch = `The Fibonnaci of <strong>${sortedNum}</strong> is <strong>${sortedRes}</strong>. Calculated at: ${sortedDate}`;
    hisArray[i] = latestSearch;
    ulItem[i].innerHTML = hisArray[i];
    ulItem[i].classList.remove("d-none");
  }
  return;
}
