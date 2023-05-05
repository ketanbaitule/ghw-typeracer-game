var questions = new Array();
questions.push("There is no reason to adjust the long-standing advice of the earlier editions of this book: The core of every portfolio should consist of low-cost, tax-efficient, broad-based index funds.");
questions.push("There are few people whom I really love, and still fewer of whom I think well. The more I see of the world, the more am I dissatisfied with it; and every day confirms my belief of the inconsistency of all human characters, and of the little dependence that can be placed on the appearance of merit or sense.")
questions.push("Every time you practice a technique incorrectly, you're increasing your chances of doing it wrong again. It's easy to become very experienced at repeating the same mistakes. Practice doesn't make perfect; only perfect practice makes perfect.")
var problem_statement = questions[Math.floor(Math.random() * questions.length)];
var problem = document.getElementById("problem");
var solution = document.getElementById("solution");
var play_btn = document.getElementById("play");
var stats_div = document.getElementById("stats");
var high_score = 0;

// Accuray will only be changed if after wrong word entered will have key.length == 1 else it will be some other key.
var wrong_letters = 0;
var total_letters = 0;
var is_wrong = false;
var is_game_started = false;
var start_time = null;
var end_time = null;
function update_stats(e) {
	if(!start_time){
		start_time = Date.now();
	}

	let solution_length = solution.value.length;
	let highlighted_text_success = problem_statement.slice(0,solution_length);
	let highlighted_text_error = "";
	let remaining_text = problem_statement.slice(solution_length, problem_statement.length);
	if(e.key.length == 1){
		total_letters++;
	}
	if(highlighted_text_success != solution.value){
		// For Accuracy Calculation
		is_wrong = true;
		if(is_wrong && e.key.length == 1){
			wrong_letters++;
		}

		// Creation of Seperate Right And Wrong Part
		for(let i=0; i<solution_length; i++){
			if(highlighted_text_success[i] != solution.value[i]){
				highlighted_text_error = highlighted_text_success.slice(i);
				highlighted_text_success = highlighted_text_success.slice(0, i);
				break;
			}
		}
	}else if(problem_statement.length == solution_length){
		is_game_started = false;
		end_time = Date.now();
		solution.removeEventListener("keyup", update_stats);
		solution.disabled = true;
		create_stats();
	}
	is_wrong = false;
	problem.innerHTML=`<span class="success"> ${highlighted_text_success} </span> <span class="error"> ${highlighted_text_error} </span> ${remaining_text}`;
}

function start_game() {
	problem_statement = questions[Math.floor(Math.random() * questions.length)];
	play_btn.style.display = "none";
	stats_div.style.display = "none";
	problem.innerHTML = problem_statement;
	is_game_started = true;
	start_time = false;
	solution.value = "";
	solution.disabled = false;
	solution.addEventListener("keyup", update_stats);
}

function create_stats(){
	if(!start_time && !end_time)
		return
	play_btn.style.display = "block";
	play_btn.innerText = "Play Again";
	let accuracy = (1 - wrong_letters/ total_letters) * 100;
	let time_taken = ((end_time - start_time) / 1000);
	let wpm = problem_statement.split(" ").length / time_taken * 60;
	let score = Math.round(accuracy + wpm);
	document.getElementById("accuracy").innerText = Math.round(accuracy);
	document.getElementById("word_count").innerText = Math.round(wpm);
	document.getElementById("time_taken").innerText = Math.round(time_taken);
	document.getElementById("score").innerText = score;

	if(score > high_score){
		alert("Woah!! New High Score "+ score+", Previous High Score: "+ high_score);
		high_score = score;
		document.getElementById("high_score").innerText = high_score;
	}
	stats_div.style.display = "block";
}

play_btn.addEventListener("click", start_game);