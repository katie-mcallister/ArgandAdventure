function askQuestion(treasureIndex) {
  waitingForAnswer = true;
  currentTreasureIndex = treasureIndex;
  const treasure = treasures[treasureIndex];

  // Hide the tower treasure display if it exists
  const treasureDisplay = document.getElementById("treasureCountDisplay");
    if (treasureDisplay) {
      treasureDisplay.style.display = "none";
    }

  // Set question and correct answer
  if (levelNumber === 0) {
    currentCorrectRe = treasure.re;
    currentCorrectIm = treasure.im;
    setQuestionText("You’ve found a gem! What complex number is it located at?");
  } 
else if (levelNumber === 1) {
    const playerRe = player.re;
    const playerIm = player.im;
    const treasureRe = treasure.re;
    const treasureIm = treasure.im;

    const operation = Math.random() < 0.5 ? "add" : "subtract";

    let questionText, correctRe, correctIm;

    if (operation === "add") {
      correctRe = treasureRe - playerRe;
      correctIm = treasureIm - playerIm;
      questionText = `You are at (${formatComplex(playerRe, playerIm)}). Which complex number should you <strong>add</strong> to reach the key at (${formatComplex(treasureRe, treasureIm)}?)`;
    } else {
      correctRe = playerRe - treasureRe;
      correctIm = playerIm - treasureIm;
      questionText = `You are at (${formatComplex(playerRe, playerIm)}). Which complex number should you <strong>subtract</strong> to reach the key at (${formatComplex(treasureRe, treasureIm)}?)`;
    }

    currentCorrectRe = correctRe;
    currentCorrectIm = correctIm;
    setQuestionText(questionText);
  }
if (levelNumber === 2) {
  const treasure = treasures[treasureIndex];

  const r = treasure.re * treasure.re + treasure.im * treasure.im; 
  let theta = Math.atan2(treasure.im, treasure.re) * 180 / Math.PI; 
  if (theta < 0) theta += 360;

  currentCorrectR = r;     
  currentCorrectTheta = theta;

  setQuestionText(
    `What is the value of r and θ for this tornados location?`
  );

  const polarInputs = document.getElementById("polarInputs");
  if (polarInputs) polarInputs.style.display = "flex";

  const answerInput = document.getElementById("answerInput");
  if (answerInput) answerInput.style.display = "none";

  preparePopupUI(); 
  showPopup();
} else {
  const polarInputs = document.getElementById("polarInputs");
  if (polarInputs) polarInputs.style.display = "none";

  const answerInput = document.getElementById("answerInput");
  if (answerInput) {
    answerInput.style.display = "inline-block";
    answerInput.value = "";
    answerInput.focus();
  }

  preparePopupUI(); 
  showPopup();
} 
if (levelNumber === 3) {
  setQuestionText(
    "To reach each point of the spiral, would you multiply by the same number each time or different?"
  );

  const polarInputs = document.getElementById("polarInputs");
  const answerInput = document.getElementById("answerInput");
  if (polarInputs) polarInputs.style.display = "none";
  if (answerInput) answerInput.style.display = "none";

  preparePopupUI();
  showPopup();
}

  preparePopupUI(false);
  showPopup();
}

function formatComplex(re, im) {
  const sign = im >= 0 ? "+" : "-";
  return `${re} ${sign} ${Math.abs(im)}i`;
}

function askTowerQuestion() {
  waitingForAnswer = true;
  currentTreasureIndex = null;

  let a = int(random(-10, 11));
  let b = int(random(-10, 11));
  let c = int(random(-10, 11));
  let d = int(random(-10, 11));
  let e = int(random(-10, 11));
  let f = int(random(-10, 11));

  let pattern = random() < 0.5 ? "add_sub" : "sub_add";

  if (pattern === "add_sub") {
    currentCorrectRe = a + c - e;
    currentCorrectIm = b + d - f;
    setQuestionText(
      `Solve (${formatComplex(a, b)}) + (${formatComplex(c, d)}) - (${formatComplex(e, f)})`
    );
  } else {
    currentCorrectRe = a - c + e;
    currentCorrectIm = b - d + f;
    setQuestionText(
      `Solve (${formatComplex(a, b)}) - (${formatComplex(c, d)}) + (${formatComplex(e, f)})`
    );
  }

  preparePopupUI();
  showPopup();
}

function showTowerLockedPopup() {
  waitingForAnswer = true;

  setQuestionText("Not enough key fragments.");

  const treasureDisplay = document.getElementById("treasureCountDisplay");
  treasureDisplay.textContent = `${treasuresCollected}/3`;
  treasureDisplay.style.display = "block";
  treasureDisplay.style.display = "block";
  treasureDisplay.style.marginTop = "12px";
  treasureDisplay.style.fontWeight = "bold";
  treasureDisplay.style.fontSize = "26px";

  const answerInput = document.getElementById("answerInput");
  const submitBtn = document.getElementById("submitAnswer");
  const errorMsg = document.getElementById("errorMsg");

  answerInput.style.display = "none";
  submitBtn.style.display = "none";
  errorMsg.textContent = "";

  showPopup();
}

function preparePopupUI() {
  const rInput = document.getElementById("rInput");
  const thetaInput = document.getElementById("thetaInput");
  const answerInput = document.getElementById("answerInput");
  const submitBtn = document.getElementById("submitAnswer");
  const errorMsg = document.getElementById("errorMsg");
  const feedbackMsg = document.getElementById("feedbackMsg");

  if (levelNumber === 2 || levelNumber === 3) {
    if (rInput) rInput.value = "";
    if (thetaInput) thetaInput.value = "";
    if (rInput) rInput.focus();
    if (document.getElementById("polarInputs")) document.getElementById("polarInputs").style.display = "flex";
    if (answerInput) answerInput.style.display = "none";
  } else {
    if (answerInput) {
      answerInput.value = "";
      answerInput.style.display = "inline-block";
      answerInput.focus();
    }
    if (document.getElementById("polarInputs")) document.getElementById("polarInputs").style.display = "none";
  }

  if (submitBtn) submitBtn.style.display = "inline-block";
  if (errorMsg) {
    errorMsg.textContent = "";
    errorMsg.style.height = "20px";
  }
  if (feedbackMsg) feedbackMsg.style.display = "none";
  if (feedbackMsg) feedbackMsg.textContent = "";
}


function setQuestionText(text) {
  document.getElementById("questionText").innerHTML = text;
}
