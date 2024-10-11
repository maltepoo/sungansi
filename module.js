function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function resetData(next, arr, ms) {
  next = 1;
  arr = [];
  ms = 0;
}

export function changeNumbers(numberArray) {
  const shuffledNumbers = shuffle(numberArray);
  for (let i = 0; i < nums.length; i++) {
    nums[i].innerText = shuffledNumbers[i];
    nums[i].dataset.num = shuffledNumbers[i];
  }
}

export function getTimeformat(givenMs) {
  let ms = Math.floor(givenMs % 60);
  let seconds = Math.floor(givenMs / 60) % 60;
  let minutes = Math.floor(givenMs / 6000);

  let formattedMs = ms.toString().padStart(2, "0");
  let formattedSeconds = seconds.toString().padStart(2, "0");
  let formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}:${formattedMs}`;
}
