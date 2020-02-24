
const startButton = document.getElementById("Start-Reset");
const timer = document.getElementById("time");
const scoreBoard = document.getElementById("scoreid");
const gameOver = document.getElementById("gameOver");
const question = document.getElementById("question");
const options = document.getElementsByClassName("option");
const click = document.getElementById("click");
const len = options.length;

console.log(options);
var isPlaying = false;
var score = 0;
var counter = 60;
var action, result, clicked = 0;

startButton.onclick = ()=>{

    if(isPlaying){
        location.reload();
    }

    else{
        show("timer");
        hide("gameOver");
        scoreBoard.innerHTML = score;
        startButton.innerHTML = "Reset Game";
        isPlaying = true;

        timer.innerHTML = counter;

        generateQA();  // This Function Genarates Questions & Answers

        checkingAnswer(); // This Function Checks The Answers
 
        startCounter();   // This Function Starts The Countdown
    }
    
}


function generateQA(){
    var Q1 = Math.floor(Math.random() * 9) + 1;
    var Q2 = Math.floor(Math.random() * 9) + 1;
    var randomIndex = Math.floor(Math.random() * 4);
    
    question.innerHTML = Q1 + "x" + Q2;
    result = Q1 * Q2;
    var resultArray = [result];
    options[randomIndex].innerHTML = result;

    for(let i = 0; i < len; i++){
        if(i !== randomIndex){

            do{
                var wrong = (Math.floor(Math.random() * 9) + 1) * (Math.floor(Math.random() * 9) + 1);
                console.log(wrong);
            }while(resultArray.indexOf(wrong) > -1);

            resultArray.push(wrong);

            options[i].innerHTML = wrong;

        }
    }
}

function checkingAnswer(){
    for(let i = 0; i < len; i++){
            
        options[i].onclick = function(div){
            clicked++;

            if(div.target.innerHTML == result & isPlaying){
                hide("try");
                show("correct");

                setTimeout(()=> hide("correct"), 1000);

                document.getElementById("correct").style.zIndex = 3;
                score++;
                scoreBoard.innerHTML = score;
                generateQA();
            }
            else{
                hide("correct");
                show("try");

                setTimeout(()=> hide("try"), 1000);

                document.getElementById("try").style.zIndex = 2;
            };
        };
    }
}


function startCounter(){

    action = setInterval(()=>{
           
        counter--;
        timer.innerHTML = counter;
        
        
        if(counter === 0){
            clearInterval(action);
            gameScore.innerHTML = score;
            click.innerHTML = clicked;
            
            show("gameOver");
            hide("timer");
            hide("try");
            hide("correct");
    
            startButton.innerHTML = "Start Game";

        }
    }, 1000)
}



function show(id){
    document.getElementById(id).style.display = "block";
}

function hide(id){
    document.getElementById(id).style.display = "none";
}
