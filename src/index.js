'use strict';

var questions = [
  {
    'Javascript is...': [
      'Object based',
      'Subjective',
      'Objective',
      'Evil'
    ]
  },
  {
    'Primitive types are passed by...': [
      'Value',
      'Pointer',
      'Reference'
    ]
  },
  {
    'Which is not a Primitive data type in javascript?': [
      'Character',
      'Boolean',
      'Number',
      'String'
    ]
  },
  {
    'Which of the following variable types does not exist in Javascipt?': [
      'Double',
      'Boolean',
      'Number',
      'Object',
      'String'
    ]
  },
  {
    'Which of these operators compares two variables by value and type?': [
      'Triple equal sign',
      'None of these',
      'Single equal sign',
      'Double equal sign'
    ]
  },
  {
    'The if statement is used to...': [
      'Deal with logic that should execute only when a condition is true',
      'Deal with logic that should execute only when a condition is false',
      'Convert an integer value to a boolean',
      'Create a loop that runs as long as a condition is true'
    ]
  },
  {
    'String literals are written using...': [
      'Either double quotes or single quotes',
      'Just single quotes',
      'Just double quotes',
      'None of these'
    ]
  },
  {
    'JavaScript supports dynamic typing, you can assign different types of values to the same variable...': [
      'true',
      'false',
      'depends on context',
      'none of these'
    ]
  },
  {
    'Which of the following is not a reserved word?': [
      'program',
      'let',
      'return',
      'throw'
    ]
  },
  {
    'String concatenation is...': [
      'the combination of two or more text Strings',
      'the splitting of a String into two or more Strings',
      'a complex String',
      'an elemental String'
    ]
  },
  {
    'What is the value of dog dot length?': [
      'Three',
      'Four',
      'Two',
      'None of these'
    ]
  },
  {
    'In an array object, what is the key of the first value?': [
      '0',
      '1',
      '-1',
      'None of these'
    ]
  },
  {
    'The var statement is used to...': [
      'Create a new variable',
      'Retrieve a variable descriptor',
      'Declare a member of a class',
      'Change a constant'
    ]
  },
  {
    'What does the “break” statement do?': [
      'Aborts the current loop or switch statement.',
      'Cancels the current event.',
      'Aborts the current function.',
      'Simulates a JavaScript crash.'
    ]
  },
  {
    'What character ends a javascript statement?': [
      'A semicolon',
      'An exclamation point',
      'A period',
      'A colon'
    ]
  },
  {
    'Which of the following primitive values exist in JavaScript?': [
      'All the Above',
      'boolean',
      'number',
      'string'
    ]
  },
  {
    'What keyword is used to begin a conditional statement?': [
      'if',
      'when',
      'how',
      'equal'
    ]
  },
  {
    'What character combination is used to create a single line comment?': [
      'backslash backslash',
      'exclamation point exclamation point',
      'dash dash',
      'colon colon'
    ]
  },
  {
    'Properties of objects may be accessed using...': [
      'the dot notation',
      'the redirect notation',
      'the array notation',
      'None of the these'
    ]
  },
  {
    'What keyword is used to define the alternative path to take in a conditional statement?': [
      'Else',
      'Or',
      'Next',
      'Reject'
    ]
  }
];

exports.handler = function (event, context) {
  try {
    console.log('event.session.application.applicationId=' + event.session.application.applicationId);
    if (event.session.application.applicationId !== 'amzn1.ask.skill.03de07b6-5d34-4571-aec7-4b21e08a28af') {
      context.fail('Invalid Application ID');
    }
    if (event.session.new) {
      onSessionStarted({requestId: event.request.requestId}, event.session);
    }
    if (event.request.type === 'LaunchRequest') {
      onLaunch(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
        context.succeed(buildResponse(sessionAttributes, speechletResponse));
      });
    } else if (event.request.type === 'IntentRequest') {
      onIntent(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
        context.succeed(buildResponse(sessionAttributes, speechletResponse));
      });
    } else if (event.request.type === 'SessionEndedRequest') {
      onSessionEnded(event.request, event.session);
      context.succeed();
    }
  } catch (e) {
    context.fail('Exception: ' + e);
  }
};

function onSessionStarted(sessionStartedRequest, session) {
  console.log('onSessionStarted requestId=' + sessionStartedRequest.requestId
      + ', sessionId=' + session.sessionId);
}

function onLaunch(launchRequest, session, callback) {
  console.log('onLaunch requestId=' + launchRequest.requestId
  + ', sessionId=' + session.sessionId);
  getWelcomeResponse(callback);
}
    /**
    * Called when the user specifies an intent for this skill.
    */
function onIntent(intentRequest, session, callback) {
  console.log('onIntent requestId=' + intentRequest.requestId + ', sessionId=' + session.sessionId);

  var intent = intentRequest.intent, intentName = intentRequest.intent.name;
      // handle yes/no intent after the user has been prompted
  if (session.attributes && session.attributes.userPromptedToContinue) {
    delete session.attributes.userPromptedToContinue;
    if ('AMAZON.NoIntent' === intentName) {
      handleFinishSessionRequest(intent, session, callback);
    } else if ('AMAZON.YesIntent' === intentName) {
      handleRepeatRequest(intent, session, callback);
    }
  }
      // dispatch custom intents to handlers here
  if ('AnswerIntent' === intentName) {
    handleAnswerRequest(intent, session, callback);
  } else if ('AnswerOnlyIntent' === intentName) {
    handleAnswerRequest(intent, session, callback);
  } else if ('DontKnowIntent' === intentName) {
    handleAnswerRequest(intent, session, callback);
  } else if ('AMAZON.YesIntent' === intentName) {
    handleAnswerRequest(intent, session, callback);
  } else if ('AMAZON.NoIntent' === intentName) {
    handleAnswerRequest(intent, session, callback);
  } else if ('AMAZON.StartOverIntent' === intentName) {
    getWelcomeResponse(callback);
  } else if ('AMAZON.RepeatIntent' === intentName) {
    handleRepeatRequest(intent, session, callback);
  } else if ('AMAZON.HelpIntent' === intentName) {
    handleGetHelpRequest(intent, session, callback);
  } else if ('AMAZON.StopIntent' === intentName) {
    handleFinishSessionRequest(intent, session, callback);
  } else if ('AMAZON.CancelIntent' === intentName) {
    handleFinishSessionRequest(intent, session, callback);
  } else {
    throw 'Invalid intent';
  }
}
    /**
    * Called when the user ends the session.
    * Is not called when the skill returns shouldEndSession=true.
    */
function onSessionEnded(sessionEndedRequest, session) {
  console.log('onSessionEnded requestId=' + sessionEndedRequest.requestId
  + ', sessionId=' + session.sessionId);
  // Add any cleanup logic here
}
    // ------- Skill specific business logic -------
var ANSWER_COUNT = 4;
var GAME_LENGTH = 20;
var CARD_TITLE = 'JavaScript Interview Quiz';

function getWelcomeResponse(callback) {
  var sessionAttributes = {}, speechOutput = 'I will ask you ' + GAME_LENGTH.toString() + ' questions, try to get as many right as you can. Just say the number of the answer. Lets begin. ',
    shouldEndSession = false,
    gameQuestions = populateGameQuestions(),
    correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
    roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),
    currentQuestionIndex = 0,
    spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
    repromptText = 'Question 1. ' + spokenQuestion + ' ', i, j;

  for (i = 0; i < ANSWER_COUNT; i++) {
    repromptText += (i+1).toString() + '. ' + roundAnswers[i] + '. ';
  }
  speechOutput += repromptText;
  sessionAttributes = {
    'speechOutput': repromptText,
    'repromptText': repromptText,
    'currentQuestionIndex': currentQuestionIndex,
    'correctAnswerIndex': correctAnswerIndex + 1,
    'questions': gameQuestions,
    'score': 0,
    'correctAnswerText': questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
  };
  callback(sessionAttributes,
    buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
  var gameQuestions = [];
  var indexList = [];
  var index = questions.length;
  if (GAME_LENGTH > index){
    throw 'Invalid Game Length.';
  }
  for (var i = 0; i < questions.length; i++){
    indexList.push(i);
  }
  // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
  for (var j = 0; j < GAME_LENGTH; j++){
    var rand = Math.floor(Math.random() * index);
    index -= 1;

    var temp = indexList[index];
    indexList[index] = indexList[rand];
    indexList[rand] = temp;
    gameQuestions.push(indexList[index]);
  }
  return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
  // Get the answers for a given question, and place the correct answer at the spot marked by the
  // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
  // only ANSWER_COUNT will be selected.
  var answers = [],
    answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
    temp, i;

  var index = answersCopy.length;

  if (index < ANSWER_COUNT){
    throw 'Not enough answers for question.';
  }
        // Shuffle the answers, excluding the first element.
  for (var j = 1; j < answersCopy.length; j++){
    var rand = Math.floor(Math.random() * (index - 1)) + 1;
    index -= 1;

    temp = answersCopy[index];
    answersCopy[index] = answersCopy[rand];
    answersCopy[rand] = temp;
  }
        // Swap the correct answer into the target location
  for (i = 0; i < ANSWER_COUNT; i++) {
    answers[i] = answersCopy[i];
  }
  temp = answers[0];
  answers[0] = answers[correctAnswerTargetLocation];
  answers[correctAnswerTargetLocation] = temp;
  return answers;
}

function handleAnswerRequest(intent, session, callback) {
  var speechOutput = '';
  var sessionAttributes = {};
  var gameInProgress = session.attributes && session.attributes.questions;
  var answerSlotValid = isAnswerSlotValid(intent);
  var userGaveUp = intent.name === 'DontKnowIntent';

  if (!gameInProgress) {
    // If the user responded with an answer but there is no game in progress, ask the user
    // if they want to start a new game. Set a flag to track that we've prompted the user.
    sessionAttributes.userPromptedToContinue = true;
    speechOutput = 'There is no game in progress. Do you want to start a new game? ';
    callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
  } else if (!answerSlotValid && !userGaveUp) {
      // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
      // return an error message to the user. Remember to guide the user into providing correct values.
    var reprompt = session.attributes.speechOutput;
    speechOutput = 'Your answer must be a number between 1 and ' + ANSWER_COUNT + '. ' + reprompt; callback(session.attributes, buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
  } else {
    var gameQuestions = session.attributes.questions,
      correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
      currentScore = parseInt(session.attributes.score),
      currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
      correctAnswerText = session.attributes.correctAnswerText;

    var speechOutputAnalysis = '';

    if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
      currentScore++;
      speechOutputAnalysis = 'correct. ';
    } else {
      if (!userGaveUp) {
        speechOutputAnalysis = 'wrong. ';
      }
      speechOutputAnalysis += 'The correct answer is ' + correctAnswerIndex + ': ' + correctAnswerText + '. ';
    }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
    if (currentQuestionIndex == GAME_LENGTH - 1) {
      speechOutput = userGaveUp ? '' : 'That answer is ';
      speechOutput += speechOutputAnalysis + 'You got ' + currentScore.toString() + ' out of ' + GAME_LENGTH.toString() + ' questions correct. Thank you for playing!';
      callback(session.attributes, buildSpeechletResponse(CARD_TITLE, speechOutput, '', true));
    } else {
      currentQuestionIndex += 1;
      var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
      correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
      var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),
        questionIndexForSpeech = currentQuestionIndex + 1,
        repromptText = 'Question ' + questionIndexForSpeech.toString() + '. ' + spokenQuestion + ' ';

      for (var i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + '. ' + roundAnswers[i] + '. ';
      }
      speechOutput += userGaveUp ? '' : 'That answer is ';
      speechOutput += speechOutputAnalysis + 'You have answered ' + currentScore.toString() + ' questions correctly. ' + repromptText;

      sessionAttributes = {
        'speechOutput': repromptText,
        'repromptText': repromptText,
        'currentQuestionIndex': currentQuestionIndex,
        'correctAnswerIndex': correctAnswerIndex + 1,
        'questions': gameQuestions,
        'score': currentScore,
        'correctAnswerText':
        questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
      };
      callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
    }
  }
}

function handleRepeatRequest(intent, session, callback) {
  // Repeat the previous speechOutput and repromptText from the session attributes if available
  // else start a new game session
  if (!session.attributes || !session.attributes.speechOutput) {
    getWelcomeResponse(callback);
  } else {
    callback(session.attributes,
      buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
  }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Ensure that session.attributes has been initialized
  if (!session.attributes) {
    session.attributes = {};
  }
    // Set a flag to track that we're in the Help state.
  session.attributes.userPromptedToContinue = true;
    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.
  var speechOutput = 'I will ask you ' + GAME_LENGTH + ' multiple choice questions. Respond with the number of the answer. '
    + 'For example, say one, two, three, or four. To start a new game at any time, say, start game. '
    + 'To repeat the last question, say, repeat. '
    + 'Would you like to keep playing?',
    repromptText = 'To give an answer to a question, respond with the number of the answer . '
    + 'Would you like to keep playing?';
  var shouldEndSession = false;
  callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}
function handleFinishSessionRequest(intent, session, callback) {
  // End the session with a 'Good bye!' if the user wants to quit the game
  callback(session.attributes, buildSpeechletResponseWithoutCard('Good bye!', '', true));
}

function isAnswerSlotValid(intent) {
  var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
  var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
  return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}
    // ------- Helper functions to build responses -------
function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output
    },
    card: {
      type: 'Simple',
      title: title,
      content: output
    },
    reprompt: {
      outputSpeech: {
        type: 'PlainText',
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output
    },
    reprompt: {
      outputSpeech: {
        type: 'PlainText',
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: '1.0',
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}
