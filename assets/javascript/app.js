//correct, incorrect, and unanswered questions to show at end
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

//variable to be used to hold the timer interval
var clock;

//timer which will count down from 30 seconds when each question begins
var timer = 30;


//currentQuestions. this var will match the current index in questionOptions. +1 after each question. this will move to the next question object
var currentQuestion = 0;

//question objects. the question, the answerOptions, the correct answer( as the index of answerOptions), the picture to be displayed
var question1 = { 
	question:"What is the first letter of the alphabet?", 
	answerOptions:[ "a", "b", "c", "d"],
	answer: 0		
};

var question2 = { 
	question:"What is the capital of Georgia?", 
	answerOptions:[ "Phoenix", "Charlotte", "Atlanta", "Denver"],
	answer: 2 
};

var question3 = { 
	question:"Who was the first President?", 
	answerOptions:[ "Nixon", "Washington", "Lincoln", "Garfield"],
	answer: 1	
};

//question options array- this is where my question objects will be accessed
var questionOptions = [];

//placing the objects into an array
questionOptions[0] = question1;
questionOptions[1] = question2;
questionOptions[2] = question3;

// console.log(questionOptions[0].answerOptions[2]);

// console.log(questionOptions[2].question);


//this function will begin or reset the game
function startGame(){

	$(".start").hide(200);

	showQuestion();

};


//this function displays the curent timer amount and then deletes one from timer. to be used in an interval.
function countDown(){

	$("#countdown").text(timer);

	timer--;

};


//this function puts the question and answer options on the screen and 

function showQuestion(){

	console.log(questionOptions[currentQuestion].question);

	$("#question").text(questionOptions[currentQuestion].question);

	for (i = 0; i < questionOptions[currentQuestion].answerOptions.length; i++){

			$("#option"+ i).text(questionOptions[currentQuestion].answerOptions[i]);
	};
	
};





$(".start").on("click", function(){
	showQuestion();
	countDown();
	clock = setInterval(countDown, 1000);
});










