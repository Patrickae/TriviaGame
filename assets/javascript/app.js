//correct, incorrect, and unanswered questions to show at end
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

//variable to be used to hold the timer interval
var clock;

//timer which will count down from 30 seconds when each question begins
var timer = 5;


//currentQuestions. this var will match the current index in questionOptions. +1 after each question. this will move to the next question object
var currentQuestion = 0;

//question objects. the question, the answerOptions, the correct answer( as the index of answerOptions), the picture to be displayed
var question1 = { 
	question:"What is the first letter of the alphabet?", 
	answerOptions:[ "a", "b", "c", "d"],
	answer: "a",
	answerIndex: 0		
};

var question2 = { 
	question:"What is the capital of Georgia?", 
	answerOptions:[ "Phoenix", "Charlotte", "Atlanta", "Denver"],
	answer: "Atlanta",
	answerIndex: 2 
};

var question3 = { 
	question:"Who was the first President?", 
	answerOptions:[ "Nixon", "Washington", "Lincoln", "Garfield"],
	answer: "Washington",
	answerIndex: 1	
};

//question options array- this is where my question objects will be accessed
var questionOptions = [];

//placing the objects into an array
questionOptions[0] = question1;
questionOptions[1] = question2;
questionOptions[2] = question3;

// console.log(questionOptions[0].answerOptions[2]);

// console.log(questionOptions[2].question);




//this function displays the curent timer amount and then deletes one from timer. to be used in an interval.
function countDown(){
	//display timer value
	$("#countdown").text(timer);
	//minus one from timer
	timer--;

	//if timer gets below zero, default wrong answer and add one to unanswered
	if( timer < 0){
			
		$(".result").text("Sorry, the right answer was " + questionOptions[currentQuestion].answer);
		unanswered ++;
		postQuestion();
	};
	

};


//this function puts the question and answer options on the screen and 

function showQuestion(){

	console.log(questionOptions[currentQuestion].question);

	//display the current question
	$("#question").text(questionOptions[currentQuestion].question);

	//display all possible answers
	for (i = 0; i < questionOptions[currentQuestion].answerOptions.length; i++){

		$("#option"+ i).text(questionOptions[currentQuestion].answerOptions[i]);
	};
	
};


//this function will begin the game
function startGame(){

	//if no more question left, show the game results
	if (currentQuestion === questionOptions.length){
		$("#over").show();
		$("#q-and-a").hide();
		$("#post-question").hide();
		$("#correct").text("Correct answers: " + correctAnswers);
		$("#incorrect").text("Incorrect answers: " + incorrectAnswers);
		$("#unanswered").text("Unanswered questions: " + unanswered);
	}
	else{
		showQuestion();
		countDown();
		//run count down function every second
		clock = setInterval(countDown, 1000);
		//shows what you need to see, hides what you dont
		$("#over").hide();
		$("#q-and-a").show();
		$("#post-question").hide();
};


};

//function to start timeout and end interval after the answer is selected or timer gets to zero. adds one to current Question. sets timer back to 30
function postQuestion(){
	$("#q-and-a").hide();
	$("#post-question").show();
	//stops calling the countdown function every second
	clearInterval(clock);
	//add one to currentQuestion- move to next quesiton in the array
	currentQuestion++;
	//starts the next question in 3 seconds
	setTimeout(startGame, 3000);
	//reset timer
	timer = 5;


}


$("#over").hide();
//start game by clicking start
$(".start").on("click", function(){
	$(".start").hide();
	startGame();
});

//choosing your answer
$(".answer").on("click", function(){

	//hide question and show the result
	// $("#q-and-a").hide();
	// $("#post-question").show();

	//choice equals the value of the clicked div
	var choice = $(this).attr("value")

	console.log(choice);

	//determine if choice equals the correct answer index or not
	if(choice == questionOptions[currentQuestion].answerIndex){
		$(".result").text("THATS RIGHT!");
		correctAnswers++;
	}
	else{
		$(".result").text("Sorry, the right answer was " + questionOptions[currentQuestion].answer);
		incorrectAnswers++;
	};

	//set timer until next question shows, reset clock
	postQuestion();

});

if (currentQuestion === questionOptions.length){

	$("#correct").text("Correct answers: " + correctAnswers);
	$("#incorrect").text("Incorrect answers: " + incorrectAnswers);
	$("#unanswered").text("Unanswered questions: " + unanswered);
};

//result if clock runs out











