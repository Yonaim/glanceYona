import dotenv from "dotenv";
import express from "express";
import { WebClient } from "@slack/web-api";

dotenv.config("./");
const aaa = express();
const client = new WebClient(process.env.SLACK_TOKEN);

async function forAsyncRequests(func) {
	try {
		return await func()
	} catch(e) {throw Error('Error message');}
}

function getUser(name) {

}
// async function getUserList() {
// 	return await forAsyncRequests(async () => web.users.list());
// }
// async function postDM() {
// 	return await forAsyncRequests(async () => {
// 		return await web.chat.postMessage({1111, "Hello"});
// 	})
// }

let conversationsStore = {};

async function populateConversationStore() {
  try {
    // Call the conversations.list method using the WebClient
    const result = await client.conversations.list();
	result.channels.forEach((element) => {
		console.log(element["id"]);
  		})
	}
  catch (error) {
    console.error(error);
  }
}

// Put conversations into the JavaScript object
function saveConversations(conversationsArray) {
  let conversationId = '';
  
  conversationsArray.forEach(function(conversation){
    // Key conversation info on its unique ID
    conversationId = conversation["id"];
    
    // Store the entire conversation object (you may not need all of the info)
    conversationsStore[conversationId] = conversation;
  });
}

populateConversationStore().then(console.log);
// 1. 42api에 요청 보내서 필요한 정보 가지고 오기
// 2. 슬랙 봇과 연결해서 메세지 출력해보기