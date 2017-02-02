// 'use strict';
//
// var expect = require('chai').expect;
// var index = require('../src/index');
// const context = require('aws-lambda-mock-context');
// const ctx = context();
//
// describe('Testing a session with the StartIntent', function() {
//   var speechResponse = null;
//   var speechError = null;
//   before(function(done){
//     index.handler({
//       'session': {
//         'sessionId': 'SessionId.f72f5aea-0d4f-4e4b-a8bc-8edededc71ef',
//         'application': {
//           'applicationId': ''
//         },
//         'attributes': {},
//         'user': {
//           'userId': 'amzn1.ask.account.AFSUVTTXTVCK7SWR75X34HMDIXQ2AXPNT23NHGFP542UMTQHCVRPOABNOJ75M2UEONTY3BH37NMIYC3QDR2GYOU4GY2R25JYOGZCGD5ETNA4VPUN5QHZNUHK2RSJXQKZ6JGGYHUMEBGHY3XK2HUCLT35PA52DOD4P3BOI7V3THJGJJIFXFHHLC67KCYUMYEICA5RNMB7DQ4IRAY'
//         },
//         'new': true
//       },
//       'request': {
//         'type': 'IntentRequest',
//         'requestId': 'EdwRequestId.39281767-3653-4613-ad49-b501fbf95aa5',
//         'locale': 'en-US',
//         'timestamp': '2017-01-12T17:28:59Z',
//         'intent': {
//           'name': 'AMAZON.StartOverIntent',
//           'slots': {}
//         }
//       },
//       'version': '1.0'
//     }, ctx);
//     ctx.Promise
//     .then(resp => { speechResponse = resp; done(); })
//     .catch(err => { speechError = err; done(); });
//   });
//   describe('The response is structurally correct for Alexa Speech Services', function() {
//     it('should not have errored',function() {
//       expect(speechError).to.be.null;
//     });
//     it('should have a version', function() {
//       expect(speechResponse.version).not.to.be.null;
//     });
//     it('should have a speechlet response', function() {
//       expect(speechResponse.response).not.to.be.null;
//     });
//     it('should have a spoken response', () => {
//       expect(speechResponse.response.outputSpeech).not.to.be.null;
//     });
//     it('should end the alexa session', function() {
//       expect(speechResponse.response.shouldEndSession).not.to.be.null;
//     });
//   });
//   describe('The repsopnse is structurally incorrect', function() {
//     var speechResponse = null;
//     var speechError = null;
//     before(function(done){
//       index.handler({
//         'session': {
//           'sessionId': 'SessionId.f72f5aea-0d4f-4e4b-a8bc-8edededc71ef',
//           'application': {
//             'applicationId': 'amzn1.ask.skill.03de07b6-5d34-4571-aec7-4b21e08a28af'
//           },
//           'attributes': {},
//           'user': {
//             'userId': 'amzn1.ask.account.AFSUVTTXTVCK7SWR75X34HMDIXQ2AXPNT23NHGFP542UMTQHCVRPOABNOJ75M2UEONTY3BH37NMIYC3QDR2GYOU4GY2R25JYOGZCGD5ETNA4VPUN5QHZNUHK2RSJXQKZ6JGGYHUMEBGHY3XK2HUCLT35PA52DOD4P3BOI7V3THJGJJIFXFHHLC67KCYUMYEICA5RNMB7DQ4IRAY'
//           },
//           'new': true
//         },
//         'request': {
//           'type': 'IntentRequest',
//           'requestId': 'EdwRequestId.39281767-3653-4613-ad49-b501fbf95aa5',
//           'locale': 'en-US',
//           'timestamp': '2017-01-12T17:28:59Z',
//           'intent': {
//             'name': 'AMAZON.StartOverIntent',
//             'slots': {}
//           }
//         },
//         'version': '1.0'
//       }, ctx);
//       ctx.Promise
//       .then(resp => { speechResponse = resp; done(); })
//       .catch(err => { speechError = err; done(); });
//     });
//     it('should have an error', done => {
//       expect(session.application.applicationId).to.equal('Invalid');
//     });
//   });
// });
