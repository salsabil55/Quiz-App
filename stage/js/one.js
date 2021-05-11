// home page

// const start_btn = document.querySelectorAll(".start-btn button");
// const info_box = document.querySelectorAll(".info_box");
// const exit_btn = info_box.querySelectorAll(".quiz-buttons .quit");
// const continue_btn = info_box.querySelectorAll(".quiz-buttons .continue");
let que_count = 0;
let que_number = 1;
let time_value = 15;
let width_value = 0;
let user_score = 0;
let counter;
let option_list = document.querySelector(".option-list");
let timeCount = document.querySelector(".timer .timer_sec");
let next_btn = document.querySelector(".next_btn");
let result_box = document.querySelector(".result_box");
let quiz_box = document.querySelector(".quiz-box");
let restart_quiz = document.querySelector(".result_box .buttons .restart");
let quit = document.querySelector(".result_box .buttons .quit");
let timeLine = document.querySelector(".timer .time_line");
let timeOff = document.querySelector(".time_text");

$(function () {
  $(".quiz-block .start-btn button").on("click", function () {
    $(".quiz-block .info-box").addClass("activeInfo");
  });

  $(".quiz-block .quiz-buttons button.quit").on("click", function () {
    $(".quiz-block .info-box").removeClass("activeInfo");
  });

  //quit quiz

  $(".result_box .buttons .restart").on("click", function () {
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");

    let que_count = 0;
    let que_number = 1;
    let time_value = 15;
    let width_value = 0;
    let user_score = 0;
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
    showQuestion(que_count);
    queCounter(que_number);
    clearInterval(counter);
    startTimer(time_value);
    clearInterval(counterLine);
    startTimerLine(width_value);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
  });
  // restart quiz

  $(".result_box .buttons .quit").on("click", function () {
    window.location.reload();
  });

  $(".quiz-block .quiz-buttons button.continue").on("click", function () {
    $(".quiz-block .info-box").removeClass("activeInfo");
    $(".quiz-block .quiz-box").addClass("activeQuiz");
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
  });

  $(".next_btn").on("click", function () {
    if (que_count < questions.length - 1) {
      que_count++;
      que_number++;
      showQuestion(que_count);
      queCounter(que_number);
      clearInterval(counter);
      startTimer(time_value);
      clearInterval(counterLine);
      startTimerLine(width_value);
      next_btn.style.display = "none";
      timeOff.textContent = "Time Left";
    } else {
      clearInterval(counter);
      clearInterval(counterLine);
      console.log("questions end");
      showResultBox();
    }
  });
});

// get question array

function showQuestion(index) {
  $(".que_text").html(
    "<span>" +
      questions[index].numb +
      ". " +
      questions[index].question +
      "</span>"
  );
  $(".option-list ").html(
    "<div class='option'>" +
      questions[index].options[0] +
      "<span></span></div>" +
      "<div class='option'>" +
      questions[index].options[1] +
      "<span></span></div>" +
      "<div class='option'>" +
      questions[index].options[2] +
      "<span></span></div>" +
      "<div class='option'>" +
      questions[index].options[3] +
      "<span></span></div>"
  );

  $(".quiz-box .option-list .option").each(function () {
    $(this).attr("onclick", "optionSelected(this)");
  });
}

// icons

let corricon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>';
// get correct answer
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);

  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = $(".option-list").children.length;
  if (userAns == correctAns) {
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", corricon);
    user_score += 1;
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossicon);
    //if answer incorrect then automaic show correct answer
    for (let i = 0; i < option_list.children.length; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", corricon);
      }
    }
  }

  // once select option cant select another
  for (let i = 0; i < option_list.children.length; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

//show result
function showResultBox() {
  $(".quiz-block .info-box").removeClass("activeInfo");
  $(".quiz-block .quiz-box").removeClass("activeQuiz");
  $(".result_box").addClass("activeResult");

  if (user_score > 3) {
    let scoreTag =
      "<span> and Congrats! <img src= '../../img/good.png'>, you got<p>" +
      user_score +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    $(".score_text").html(scoreTag);
  } else if (user_score > 1) {
    let scoreTag =
      "<span> and nice <img src= '../../img/nice (2).png'>, you got<p>" +
      user_score +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    $(".score_text").html(scoreTag);
  } else {
    let scoreTag =
      "<span> and Sorry ! <img src= '../../img/sad.png'>, you got only <p>" +
      user_score +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    $(".score_text").html(scoreTag);
  }
}
// start timer
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off";

      //if not answer ant time end
      let correctAns = questions[que_count].answer;
      let allOptions = $(".option-list").children.length;
      for (let i = 0; i < option_list.children.length; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", corricon);
        }
      }
      for (let i = 0; i < option_list.children.length; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "block";
    }
  }
}

// complete line
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}
