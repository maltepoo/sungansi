import { resetData, changeNumbers, getTimeformat } from "./module.js";

let NEXT = 1;
let ARR = [];
let HISTORY_ARR = [];
let MILLISECONDS = 0;

const gameTime = document.getElementById("gameTime");
const bestTime = document.getElementById("bestTime");
const average = document.getElementById("average");
const history = document.getElementById("history");
const stBtn = document.getElementById("stBtn");
const resetBtn = document.getElementById("resetBtn");
const playboard = document.getElementById("playboard");

const nums = document.querySelectorAll(".nums");

let numbers = Array.from({ length: 25 }, (_, i) => i + 1);

stBtn.addEventListener("click", (e) => {
  if (e.target.innerText === "게임시작") {
    gameStart();

    stBtn.innerText = "게임끝내기";
  } else if (e.target.innerText === "게임끝내기") {
    gameEnd();
  }
});

function recordTime() {
  function setTime(ms) {
    ms += 1;
    gameTime.innerText = getTimeformat(MILLISECONDS);
  }

  if (stBtn.innerText === "게임끝내기") {
    setTime(MILLISECONDS);
    requestAnimationFrame(recordTime);
  }
}

const validateNums = (e) => {
  const num = e.target.dataset.num;
  // for test :
  // const num = e.target.innerText;

  if (num === undefined) {
    return;
  }

  if (parseInt(num) === NEXT) {
    ARR.push(NEXT);
    NEXT = NEXT + 1;
    e.target.animate([{ opacity: "100%" }, { opacity: "0%" }, { opacity: "100%" }], { duration: 300 });
  } else {
    e.target.animate([{ background: "none" }, { background: "red" }, { background: "none" }], { duration: 200 });
  }

  if (NEXT === 26 || ARR.length === 25) {
    gameEnd();

    alert("게임종료!");
    recordHistory();
    recordAverageTime();
    recordBestTime();
    resetData(NEXT, ARR, MILLISECONDS);
  }
};

function gameStart() {
  console.log("== GAME START ==");

  resetData(NEXT, ARR, MILLISECONDS);
  changeNumbers(numbers);
  requestAnimationFrame(recordTime);

  playboard.addEventListener("click", validateNums);
}

function gameEnd() {
  console.log("== GAME END ==");

  cancelAnimationFrame(recordTime);

  nums.forEach((n) => {
    n.classList.remove("pop");
  });

  stBtn.innerText = "게임시작";
}

function recordHistory() {
  HISTORY_ARR.push({
    time_stamp: gameTime.innerText,
    ms: MILLISECONDS,
  });

  const historyTimeList = history.querySelector(".timeList");
  historyTimeList.innerHTML = "";
  HISTORY_ARR.forEach((time) => {
    const timeEntry = document.createElement("div");
    timeEntry.textContent = time.time_stamp;
    historyTimeList.appendChild(timeEntry);
  });
}

function recordBestTime() {
  const SORTED = HISTORY_ARR.slice().sort((a, b) => a.ms - b.ms);
  // console.log("SORTED", SORTED);
  bestTime.querySelector(".timeList").innerText = SORTED[0].time_stamp;
}

function recordAverageTime() {
  if (HISTORY_ARR.length > 1) {
    const totalMs = HISTORY_ARR.slice().reduce((pv, cv) => ({ ms: pv.ms + cv.ms }), { ms: 0 }).ms;
    // console.log(totalMs);
    average.querySelector(".timeList").innerText = getTimeformat(totalMs / HISTORY_ARR.length);
  }
}

resetBtn.addEventListener("click", () => {
  const conf = confirm("모든 기록이 초기화됩니다.");
  if (conf === true) {
    gameTime.innerText = "00:00:00";
    document.querySelectorAll(".timeList").forEach((t) => {
      t.innerText = "00:00:00";
    });
  }
});
