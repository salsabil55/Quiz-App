let questions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multilple Language",
      "Hyper Tool Multilanguage",
    ],
  },
  {
    numb: 2,
    question: "What does Css stand for?",
    answer: "Cascade Style Sheet",
    options: [
      "Cascade Style Sheet",
      "Cascade Style Link",
      "Cascade Style file",
      "Common Style sheet",
    ],
  },
  {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hyper Text Preprocessor",
    options: [
      "Hyper Text Preprogramming",
      "Hyper Text Programming",
      "Hyper Text Preprocessor",
      "Common Style sheet",
    ],
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Query Language",
      "Structured Question Language",
      "Statement Query Language",
      "Structured Query Language",
    ],
  },
  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "Extensible Markup Language",
    options: [
      "Extra Multi program language",
      "Extensible Multiple Language",
      "Extensible Markup Language",
      "Excutable Multi language",
    ],
  },
];

// count questions
function queCounter(index) {
  $(".total_que").html(
    "<span> <p>" +
      index +
      "</p> of <p>" +
      questions.length +
      "</p> Questions</span>"
  );
}
