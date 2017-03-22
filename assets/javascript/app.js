//correct, incorrect, and unanswered questions to show at end
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

//variable to be used to hold the timer interval
var clock;

//timer which will count down from 30 seconds when each question begins
var timer = 20;


//currentQuestions. this var will match the current index in questionOptions. +1 after each question. this will move to the next question object
var currentQuestion = 0;

//question objects. the question, the answerOptions, the correct answer( as the index of answerOptions), the picture to be displayed
var question1 = { 
		question:"Rock star, flier than an ostrich.", 
		answerOptions:[ "Juelz Santana", "Red Man", "Freeway", "N.O.R.E."],
		answer: "Juelz Santana",
		answerIndex: 0,	
		image: "assets/images/juelzsantana.jpg"	

};

var question2 = { 
		question:"We from two different cities, Minnesota and Philly", 
		answerOptions:[ "Red Man", "2 Chainz", "Freeway", "Nicki Minaj"],
		answer: "Freeway",
		answerIndex: 2,
		image: "assets/images/freeway.jpg" 
};

var question3 = { 
		question:"Always been them horizontal lines through them 'S's/ That's a dollar sign.", 
		answerOptions:[ "Juelz Santana", "Chamillionaire", "Jay-Z", "Kanye West"],
		answer: "Chamillionaire",
		answerIndex: 1,
		image: "assets/images/chamillionaire.jpg"	
};

var question4 = { 
		question:"My paragraph alone is worth five mics/ A twelve song LP, that's thirty-six mics", 
		answerOptions:[ "N.O.R.E.", "Chamillionaire", "Red Man", "Kanye West"],
		answer: "Red Man",
		answerIndex: 2,
		image: "assets/images/redman.jpg"
};

var question5 = { 
		question:"Bikinis, zucchinis, martinis. No weenies", 
		answerOptions:[ "Jay-z", "Method-Man", "Kanye West", "Snoop-Dogg"],
		answer: "Snoop-Dogg",
		answerIndex: 3,
		image: "assets/images/snoopdogg.jpg"
};

var question6 = { 
		question:"My wrist deserve a shout-out, I'm like 'What up, wrist?'", 
		answerOptions:[ "2 Chainz", "Kanye West", "Jay-z", "Camron"],
		answer: "2 Chainz",
		answerIndex: 0,
		image: "assets/images/2chainz.jpg"
};



//question options array- this is where my question objects will be accessed
var questionOptions = [];

//placing the objects into an array
questionOptions[0] = question1;
questionOptions[1] = question2;
questionOptions[2] = question3;
questionOptions[3] = question4;
questionOptions[4] = question5;
questionOptions[5] = question6;

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

//this function will be called when no more questions are left. It displays the results
function gameOver (){
	$("#over").show();
	$("#q-and-a").hide();
	$("#post-question").hide();
	$("#correct").text("Correct answers: " + correctAnswers);
	$("#incorrect").text("Incorrect answers: " + incorrectAnswers);
	$("#unanswered").text("Unanswered questions: " + unanswered);
};

//this function puts the current question and answer options on the screen

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
		gameOver();
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

//createds an image with the source coresponding to the current object in use and puts it in the '.picture' div
function postImage(){

	newImage=$("<img>");
	newImage.attr("src", questionOptions[currentQuestion].image);
	$(".picture").html(newImage);
};

//function to start timeout and end interval after the answer is selected or timer gets to zero. adds one to current Question. sets timer back to 30
function postQuestion(){
	$("#q-and-a").hide();
	$("#post-question").show();
	//displays the image
	postImage();

	//stops calling the countdown function every second
	clearInterval(clock);

	//add one to currentQuestion- move to next quesiton in the array
	currentQuestion++;

	//starts the next question in 3 seconds
	setTimeout(startGame, 3000);

	//reset timer
	timer = 20;


};

function reset(){

	correctAnswers = 0;
	incorrectAnswers = 0;
	unanswered = 0;
	currentQuestion = 0;
};




$("#over").hide();

//start game by clicking start
$(".start").on("click", function(){
	$(".start").hide();
	startGame();
});

//choosing your answer
$(".answer").on("click", function(){

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



$(".replay").on("click", function(){
	reset();
	startGame();
});












