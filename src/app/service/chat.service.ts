import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  conversation = new Subject<Message[]>();
  messageMap: any= {
    "Hi":"Hello! Welcome to our website. Let me know How may i help you?",
    "hi":"Hello! Welcome to our website. Let me know How may i help you?",
    "tell me about yourself":"I am a SaaS product providing whole e-commerce services to the end user",
    "Tell me about yourself":"I am a SaaS product providing whole e-commerce services to the end user",
    "What is angular": "Angular is best ever framework currently used by many developers in India",
    "How do i create an account": "Simply click on Sign Up button, enter your mobile number and verify with the OTP send to the mobile. Once verified, your account will get created",
    "What is an OTP or verification code": "OTP is the code used to verify tour mobile to authentivate you when login into our website",
    "How to i place an order": "Simply click on item you want to order. Then enter your address with payment methods as per your convienience. Check the amount and finally place the order.",
    "default": "Sorry, I am unable to understand your message. Can you please repeat otherwise contact with our support team"
  }
  getBotAnswer(msg: any){
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage])
    }, 1500);
  }
  getBotMessage(question: any){
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }
}
