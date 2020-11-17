import socket from './ws-client';
import {UserStore} from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR ='[data-chat="message-list"]';
let userStore = new UserStore('x-chattrbox/u');


class ChatApp {
  constructor() {
    let username = userStore.get();
if (!this.username) {
this.username = promptForUsername();
userStore.set(username);

}
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);

    
    socket.registerOpenHandler(() => {
      this.chatForm.init((text) => {
        console.log(text);
        let message = new ChatMessage({message: text});

        socket.sendMessage(message.serialize());
      });
      this.chatList.init();
    });
      socket.registerMessageHandler((data) => {
        console.log(data);
        let message = new ChatMessage({message: data});
        this.chatList.drawMessage(message.serialize());
    });
  }
}

class ChatMessage {
constructor({message: m,user: username,timestamp: t=(new Date()).getTime()})
{
  this.user =username;
  this.message = m;
  this.timestamp =t;
}
serialize(){
  return{
    user: this.user,
    message: this.message,
    timestamp: this.timestamp
    };
  }
}

export default ChatApp;