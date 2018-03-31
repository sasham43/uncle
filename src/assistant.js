var router = require('express').Router();
var q = require('q');
const path = require('path');
const GoogleAssistant = require('google-assistant');
const config = {
  auth: {
    keyFilePath: path.resolve(__dirname, 'credentials.json'),
    // where you want the tokens to be saved
    // will create the directory if not already there
    savedTokensPath: path.resolve(__dirname, 'tokens.json'),
  },
  // this param is optional, but all options will be shown
  conversation: {
    audio: {
      encodingIn: 'LINEAR16', // supported are LINEAR16 / FLAC (defaults to LINEAR16)
      sampleRateIn: 16000, // supported rates are between 16000-24000 (defaults to 16000)
      encodingOut: 'LINEAR16', // supported are LINEAR16 / MP3 / OPUS_IN_OGG (defaults to LINEAR16)
      sampleRateOut: 24000, // supported are 16000 / 24000 (defaults to 24000)
    },
    lang: 'en-US', // language code for input/output (defaults to en-US)
    deviceModelId: 'xxxxxxxx', // use if you've gone through the Device Registration process
    deviceId: 'xxxxxx', // use if you've gone through the Device Registration process
    textQuery: 'What time is it?', // if this is set, audio input is ignored
  },
};

const assistant = new GoogleAssistant(config.auth);

router.get('/message/:message', function(req, res, next){
    // start the conversation
    console.log('conversating', req.params.message);
    config.conversation.textQuery = req.params.message;
    assistant.start(config.conversation, (conversation) => {
        conversation
          .on('response', (text) => {
              console.log('Assistant Response:', text)
              // d.resolve(text);
              res.status(200).send(text);
          })
          .on('ended', (error, continueConversation) => {
            // once the conversation is ended, see if we need to follow up
            if (error) console.log('Conversation Ended Error:', error);
            else if (continueConversation) assistant.start();
            else console.log('Conversation Complete');
          })
          .on('error', (error) => {
              console.log('assistant error', error);
              // d.reject(err);
              next(err);
          });
    })
    // .then(function(resp){
    //     res.status(200).send(resp);
    // }).catch(function(err){
    //     return next(err);
    // });
});

// starts a new conversation with the assistant
const startConversation = (conversation) => {
    var d = q.defer();

  conversation
    .on('response', (text) => {
        console.log('Assistant Response:', text)
        d.resolve(text);
    })
    .on('ended', (error, continueConversation) => {
      // once the conversation is ended, see if we need to follow up
      if (error) console.log('Conversation Ended Error:', error);
      else if (continueConversation) assistant.start();
      else console.log('Conversation Complete');
    })
    .on('error', (error) => {
        console.log('assistant error', error);
        d.reject(err);
    });

    return d.promise;
};

// will start a conversation and wait for audio data
// as soon as it's ready
// assistant
//   .on('ready', () => assistant.start())
//   .on('started', startConversation);

module.exports = router;
