// import { Injectable } from "@nestjs/common";
// var AWS = require('aws-sdk');

//     //
//     var json = {
//       "title": "new Moneyball",
//       "director": "Bennett Miller",
//       "year": "2011"
//     }
//     const res = await this..indexDocument(json)
//     console.log(res)
//     //

// export class AwsClient{
//   constructor(){

//   }

//   async indexDocument(document) {

    
//     var region = process.env.AWS_REGION
//     var domain = process.env.AWS_DOMAIN

//     var index = 'node-test';
//     var type = '_doc';
//     var id = '5';
//     //

//     var endpoint = new AWS.Endpoint(domain);
//     var request = new AWS.HttpRequest(endpoint, region);
  
//     request.method = 'PUT';
//     request.path += index + '/' + type + '/' + id;
//     request.body = JSON.stringify(document);
//     request.headers['host'] = domain;
//     request.headers['Content-Type'] = 'application/json';
//     request.headers['Content-Length'] = Buffer.byteLength(request.body);


//     var credentials = new AWS.EnvironmentCredentials('AWS');

//     var signer = new AWS.Signers.V4(request, 'es');
//     signer.addAuthorization(credentials, new Date());
  
//     var client = new AWS.HttpClient();
//     client.handleRequest(request, null, function(response) {
//       console.log(response.statusCode + ' ' + response.statusMessage);
//       var responseBody = '';
//       response.on('data', function (chunk) {
//         responseBody += chunk;
//       });
//       response.on('end', function (chunk) {
//         console.log('Response body: ' + responseBody);
//       });
//     }, function(error) {
//       console.log('Error: ' + error);
//     });
//   }

// }






// // @Injectable()
// // export class AwsService {
    
// //     async indexDocument(document) {
// //         var endpoint = new AWS.Endpoint(domain);
// //         var request = new AWS.HttpRequest(endpoint, region);
      
// //         request.method = 'PUT';
// //         request.path += index + '/' + type + '/' + id;
// //         request.body = JSON.stringify(document);
// //         request.headers['host'] = domain;
// //         request.headers['Content-Type'] = 'application/json';
// //         request.headers['Content-Length'] = Buffer.byteLength(request.body);
      
// //         var credentials = new AWS.EnvironmentCredentials('AWS');
// //         var signer = new AWS.Signers.V4(request, 'es');
// //         signer.addAuthorization(credentials, new Date());
      
// //         var client = new AWS.HttpClient();
// //         client.handleRequest(request, null, function(response) {
// //           console.log(response.statusCode + ' ' + response.statusMessage);
// //           var responseBody = '';
// //           response.on('data', function (chunk) {
// //             responseBody += chunk;
// //           });
// //           response.on('end', function (chunk) {
// //             console.log('Response body: ' + responseBody);
// //           });
// //         }, function(error) {
// //           console.log('Error: ' + error);
// //         });
// //       }
// // }