let questionslist = {};
let trivia = {};

let questions;
let answers = ["A", "D", "A", "B", "C", "D", "A", "D"];

let intervalID;

// Timer Object ========================================================================================================
timer = {

    time: 120,

    start: function () {
        $("#timer-display").text("02:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
        /*console.log("countdown");*/
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        /*console.log(currentTime);*/
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
            /*$(".question-block").hide();*/
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 120;
        $("#timer-display").text("02:00");
        clearInterval(intervalID);
        /*console.log("Reset");*/
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};

// Question Object =====================================================================================================

function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "Which nation finished third in the first World Cup in 1930?",
            A: "USA",
            B: "Brazil",
            C: "France",
            D: "Japan",
        },
        q1: {
            question: "Where was the first-ever World Cup held?",
            A: "England",
            B: "Germany",
            C: "Mexico",
            D: "Uruguay",
        },
        q2: {
            question: "Who scored the highest number of goals in World Cups 2002 and 2006 combined?",
            A: "Ronaldo",
            B: "Klose",
            C: "Vieri",
            D: "Ronaldinho",
        },
        q3: {
            question: "Which country hosted the 1966 World Cup?",
            A: "Spain",
            B: "England",
            C: "China",
            D: "USA",
        },
        q4: {
            question: " Italy came second in the fabulous World Cup of 1970. Who won it?",
            A: "France",
            B: "Argentina",
            C: "Brazil",
            D: "Germany",
        },
        q5: {
            question: "Which of these players did not score more than 10 goals?",
            A: "Jurgen Klinsmann",
            B: "Gerd Muller",
            C: "Pele",
            D: "Gary Linker",
        },
        q6: {
            question: "When was the first penalty shoot-out?",
            A: "1982",
            B: "1950",
            C: "1966",
            D: "1986",
        },
        q7: {
            question: " What country won the 1998 World Cup?",
            A: "Germany",
            B: "Italy",
            C: "Brasil",
            D: "France",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    /*console.log($("input:radio[name='q0']:checked").val());*/
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

// Question Time =======================================================================================================

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});