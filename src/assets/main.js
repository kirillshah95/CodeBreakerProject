let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == ''){
       setHiddenFields();
    }

    if(!validateInput(input.value)){
      return;
    } else {
      attempt.value++;

      if(getResults(input.value)){
        setMessage('You Win!');
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage('You Lose!');
        showAnswer(false);
        showReplay();
    } else {
      setMessage('Incorrect, try again.');
    }

    }
}
//implement new functions here
function setHiddenFields() {
  attempt.value = '0';
  answer.value = Math.floor(Math.random()*10000).toString();

  while (answer.length < 4) {
    answer.vaule = '0' + answer.vaule;
  }
}

//

function setMessage(message) {
  let messageId = document.getElementById('message');
  messageId.innerHTML = message;
}

//

function validateInput(input) {
  if(input.length == 4){
    return true;
  }
  setMessage('Guesses must be exactly 4 characters long.');
  return false;
}

function getResults(input) {
  let result = '<span class="col-md-6">' + input + '</span><div class="col-md-6">';
  for(let i = 0; i < input.length; i++){
    if(input.charAt(i) == answer.value.charAt(i)){
      result += '<span class="glyphicon glyphicon-ok"></span>'
    } else if (answer.value.indexOf(input.charAt(i)) > -1) {
      result += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      result += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  result += '</div></div>';
  document.getElementById('results').innerHTML += result;

  if (input == answer.value) {
    return true;
  }
  return false;
}

function showAnswer(success){
  let code = document.getElementById('code');
  if (success) {
    code.className += ' success';
  } else {
    code.className += ' failure';
  }
  code.innerHTML = answer.value;
}

function showReplay() {
  document.getElementById('guessing-div').style.display = "none";
  document.getElementById('replay-div').style.display = "block";
}
