let targetBoxSize = 80; // #targetBox {width & height} from home.scss
let counter;
let timer;
let currentTime;

window.onload = () => {
  if (document.getElementById("playScreen")) {
    start();
  }
};

function start() {
  currentTime = 0; // start value for timer in seconds
  // Start the countdown
  timer = setInterval(function() {
    clock();
  }, 1000);

  let pictureId = JSON.parse(
    document.getElementById("pictureId").getAttribute("data-pictureId")
  );

  let characterData = JSON.parse(
    document.getElementById("characters").getAttribute("data-characters")
  );
  let characterNames = characterData.map(c => {
    return c.name;
  });
  counter = characterNames.length;
  let characterOffsetXs = characterData.map(c => {
    return c.offsetX;
  });
  let characterOffsetYs = characterData.map(c => {
    return c.offsetY;
  });
  let picWaldo = document.getElementById("picWaldoSearch");

  picWaldo.addEventListener("click", evt => {
    showTargetBox(evt, characterNames, characterOffsetXs, characterOffsetYs);
  });
}

function showTargetBox(
  evt,
  characterNames,
  characterOffsetXs,
  characterOffsetYs
) {
  let container = document.getElementById("containerWaldoSearch");

  // Remove the previous targetBox and dropDown if present
  let oldTargetBox = document.getElementById("targetBox");
  if (oldTargetBox) {
    container.removeChild(oldTargetBox);
  }
  let oldDropDown = document.getElementById("dropDown");
  if (oldDropDown) {
    container.removeChild(oldDropDown);
  }

  //Create a new targetBox
  let targetBox = document.createElement("div");
  targetBox.id = "targetBox";
  targetBox.style.left = evt.offsetX - targetBoxSize / 2 + "px";
  targetBox.style.top = evt.offsetY - targetBoxSize / 2 + "px";
  container.appendChild(targetBox);
  showDropDown(
    evt,
    container,
    characterNames,
    characterOffsetXs,
    characterOffsetYs
  );
}

function showDropDown(
  evt,
  container,
  characterNames,
  characterOffsetXs,
  characterOffsetYs
) {
  let clickedOffsetX = evt.offsetX;
  let clickedOffsetY = evt.offsetY;
  let dropDown = document.createElement("div");
  dropDown.id = "dropDown";
  dropDown.style.left = clickedOffsetX + targetBoxSize / 2 + 15 + "px";
  dropDown.style.top = clickedOffsetY - targetBoxSize / 2 + "px";
  container.appendChild(dropDown);
  for (let i = 0; i < characterNames.length; i++) {
    let item = document.createElement("div");
    item.innerHTML = characterNames[i];
    item.classList.add("characterName");
    item.addEventListener("click", () => {
      compareCoordinates(
        evt,
        clickedOffsetX,
        clickedOffsetY,
        characterNames[i],
        characterNames,
        characterOffsetXs,
        characterOffsetYs
      );
    });
    dropDown.appendChild(item);
  }
}

function compareCoordinates(
  evt,
  clickedOffsetX,
  clickedOffsetY,
  selectedCharacterName,
  characterNames,
  characterOffsetXs,
  characterOffsetYs
) {
  let characterIndex = characterNames.findIndex(characterName => {
    return selectedCharacterName === characterName;
  });
  let lowerLimitX = characterOffsetXs[characterIndex] - targetBoxSize / 2;
  let upperLimitX = characterOffsetXs[characterIndex] + targetBoxSize / 2;
  let lowerLimitY = characterOffsetYs[characterIndex] - targetBoxSize / 2;
  let upperLimitY = characterOffsetYs[characterIndex] + targetBoxSize / 2;
  if (
    clickedOffsetX >= lowerLimitX &&
    clickedOffsetX <= upperLimitX &&
    clickedOffsetY >= lowerLimitY &&
    clickedOffsetY <= upperLimitY
  ) {
    counter -= 1;

    fixBox(
      characterOffsetXs[characterIndex],
      characterOffsetYs[characterIndex]
    );
    if (counter > 0) {
      alert("Correct! " + counter + " Characters left.");
    } else {
      // Stop timer
      stopClock();
      let timer = document.getElementById("timer");
      let time = timer.innerHTML;

      alert("Congratulations! You identified all characters.");
      // Clear screen
      let playScreen = document.getElementById("playScreen");
      while (playScreen.firstChild) {
        playScreen.removeChild(playScreen.firstChild);
      }
      showFormScore(time);
    }
  } else {
    alert("Error! Try again.");
  }
}

function fixBox(offsetX, offsetY) {
  let container = document.getElementById("containerWaldoSearch");

  // Remove targetBox & dropDown if present
  let targetBox = document.getElementById("targetBox");
  if (targetBox) {
    container.removeChild(targetBox);
  }
  let dropDown = document.getElementById("dropDown");
  if (dropDown) {
    container.removeChild(dropDown);
  }
  // Create fixedBox
  let fixedBox = document.createElement("div");
  fixedBox.classList.add("fixedBox");
  fixedBox.style.left = offsetX - targetBoxSize / 2 + "px";
  fixedBox.style.top = offsetY - targetBoxSize / 2 + "px";
  container.appendChild(fixedBox);
}

function clock() {
  // Increase the seconds by 1
  currentTime += 1;

  // Calculate minutes and seconds
  let minutes = Math.floor((currentTime % (60 * 60)) / 60);
  let seconds = Math.floor(currentTime % 60);

  // Show time with two digits for minutes and seconds
  let minutesLeftString = minutes < 10 ? "0" + minutes : minutes;
  let secondsLeftString = seconds < 10 ? "0" + seconds : seconds;

  // Remove current time from display
  let timer = document.getElementById("timer");
  timer.innerHTML = minutesLeftString + ":" + secondsLeftString;
}

function stopClock() {
  clearInterval(timer);
}

function showFormScore(time) {
  let formScore = document.getElementById("formScore");
  formScore.classList.remove("invisible");
  let timeResult = document.getElementById("timeResult");
  timeResult.innerHTML = time;
  let score =
    1000 - (parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3)));
  let hiddenField = document.getElementById("player_score");
  hiddenField.setAttribute("value", score);
}
