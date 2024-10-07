let NEXT = 1;
let arr = [];
let BEST_TIME;
let AVERAGE;
let HISTORY_ARR = [];
let milliseconds = 0;

const gameTime = document.getElementById("gameTime");
const bestTime = document.getElementById("bestTime");
const average = document.getElementById("average");
const history = document.getElementById("history");
const stBtn = document.getElementById("stBtn");
const resetBtn = document.getElementById("resetBtn");
const playboard = document.getElementById("playboard");

const nums = document.querySelectorAll(".nums");

let numbers = Array.from({ length: 25 }, (_, i) => i + 1);
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const changeNumbers = () => {
  const shuffledNumbers = shuffle(numbers);
  for (let i = 0; i < nums.length; i++) {
    nums[i].innerText = shuffledNumbers[i];
    nums[i].dataset.num = shuffledNumbers[i];
  }
};

stBtn.addEventListener("click", (e) => {
  if (e.target.innerText === "게임시작") {
    gameStart();

    stBtn.innerText = "게임끝내기";
  } else if (e.target.innerText === "게임끝내기") {
    gameEnd();
  }
});

const recordTime = () => {
  function setTime() {
    milliseconds += 1;
    gameTime.innerText = getTimeformat(milliseconds);
  }

  if (stBtn.innerText === "게임끝내기") {
    setTime();
    requestAnimationFrame(recordTime);
  }
};

const validateNums = (e) => {
  const num = e.target.dataset.num;
  // for test : 
  // const num = e.target.innerText;

  if (num === undefined) {
    return;
  }

  if (parseInt(num) === NEXT) {
    arr.push(NEXT);
    NEXT = NEXT + 1;
    e.target.animate([{ opacity: "100%" }, { opacity: "0%" }, { opacity: "100%" }], { duration: 300 });
  } else {
    e.target.animate([{ background: "none" }, { background: "red" }, { background: "none" }], { duration: 200 });
  }

  if (NEXT === 26 || arr.length === 25) {
    gameEnd();

    alert("게임종료!");
    recordHistory();
    recordAverageTime();
    recordBestTime();
    resetData();
  }
};

const resetData = () => {
  NEXT = 1;
  arr = [];
  milliseconds = 0;
}

const gameStart = () => {
  console.log("== GAME START ==");

  resetData();
  changeNumbers();
  requestAnimationFrame(recordTime);

  playboard.addEventListener("click", validateNums);
};

const gameEnd = () => {
  console.log("== GAME END ==");
  
  cancelAnimationFrame(recordTime);

  nums.forEach((n) => {
    n.classList.remove("pop");
  });

  stBtn.innerText = "게임시작";
};

const recordHistory = () => {
  HISTORY_ARR.push({
    time_stamp: gameTime.innerText,
    ms: milliseconds,
  });

  const historyTimeList = history.querySelector(".timeList");
  historyTimeList.innerHTML = "";
  HISTORY_ARR.forEach((time) => {
    const timeEntry = document.createElement("div");
    timeEntry.textContent = time.time_stamp;
    historyTimeList.appendChild(timeEntry);
  });
};

const recordBestTime = () => {
  const SORTED = HISTORY_ARR.slice().sort((a, b) => a.ms - b.ms);
  // console.log("SORTED", SORTED);
  bestTime.querySelector(".timeList").innerText = SORTED[0].time_stamp;
};

const recordAverageTime = () => {
  if (HISTORY_ARR.length > 1) {
    const totalMs = HISTORY_ARR.slice().reduce((pv, cv) => ({ ms: pv.ms + cv.ms }), { ms: 0 }).ms;
    // console.log(totalMs);
    average.querySelector(".timeList").innerText = getTimeformat(totalMs / HISTORY_ARR.length);
  }
};

const getTimeformat = (givenMs) => {
  let ms = givenMs % 60;
  let seconds = Math.floor(givenMs / 60) % 60;
  let minutes = Math.floor(givenMs / 6000);

  let formattedMs = ms.toString().padStart(2, "0");
  let formattedSeconds = seconds.toString().padStart(2, "0");
  let formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}:${formattedMs}`;
};

resetBtn.addEventListener("click", () => {
  const conf = confirm("모든 기록이 초기화됩니다.");
  if (conf === true) {
    gameTime.innerText = "00:00:00";
    document.querySelectorAll(".timeList").forEach((t) => {
      t.innerText = "00:00:00";
    });
  }
});
