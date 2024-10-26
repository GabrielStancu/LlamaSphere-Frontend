import { Component } from '@angular/core';
import { MatchingService } from 'src/app/services/matching.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
    // Existing properties and methods
    matchingJobs: any[] = [];

    // Properties for the FAQ Chat
    isChatVisible: boolean = false;
    userQuestion: string = '';
    chatMessages: { sender: string, message: string }[] = [];
    hideChatTimeout: any;
  
    constructor(private matchingService: MatchingService) { }
  
    ngOnInit(): void {
      // Initialization logic
    }
  
    // Existing methods
    onGetMatchingJobs(): void {
      // Your existing code
    }
  
    // Methods to control chat visibility
    showChat(): void {
      clearTimeout(this.hideChatTimeout);
      this.isChatVisible = true;
    }
  
    scheduleHideChat(): void {
      this.hideChatTimeout = setTimeout(() => {
        this.isChatVisible = false;
      }, 300); // Delay to allow moving cursor to chat window
    }
  
    // Method to send the user's question
    sendQuestion(): void {
      if (this.userQuestion.trim()) {
        // Add the user's question to the chat
        this.chatMessages.push({ sender: 'user', message: this.userQuestion });
  
        // Send the question to the backend
        this.matchingService.sendFaqQuestion(this.userQuestion).subscribe(
          (response) => {
            // Add the bot's response to the chat
            this.chatMessages.push({ sender: 'bot', message: response.answer });
          },
          (error) => {
            console.error('Error sending FAQ question:', error);
            // Handle error, possibly add an error message to the chat
            this.chatMessages.push({ sender: 'bot', message: 'Sorry, an error occurred.' });
          }
        );
  
        // Clear the input field after sending
        this.userQuestion = '';
      }
    }
}
