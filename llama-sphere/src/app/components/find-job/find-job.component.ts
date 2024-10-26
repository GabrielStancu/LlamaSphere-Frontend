import { Component } from '@angular/core';
import { MatchingService } from 'src/app/services/matching.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.css']
})
export class FindJobComponent {
  // Existing properties and methods
  allJobs: any[] = [];
  displayedColumns: string[] = ['job_name', 'score'];
  loadingJobs: boolean = false;
  errorLoadingJobs: string = '';
  currentCvId: string = '';

  // Properties for the FAQ Chat
  isChatVisible: boolean = false;
  userQuestion: string = '';
  chatMessages: { sender: string, message: string }[] = [];
  hideChatTimeout: any;

  constructor(private matchingService: MatchingService, private uploadService: UploadService) { }

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

  onGetMatchedJobs(): void {
    this.loadingJobs = true;
    this.errorLoadingJobs = '';
    this.allJobs = [];

    const requestData = {
      CvId: this.currentCvId,
    };

    this.matchingService.getMatchedJobs(requestData).subscribe(
      (jobs) => {
        this.allJobs = jobs;
        this.loadingJobs = false;
        console.log('Matching jobs:', this.allJobs);
      },
      (error) => {
        console.error('Error fetching matching jobs:', error);
        this.errorLoadingJobs = 'An error occurred while fetching matching jobs.';
        this.loadingJobs = false;
      }
    );
  }

  public receiveFile(file: File) {
    this.uploadService.uploadCv(file).subscribe(result => {
        this.currentCvId = result.id;
      }
    );
  }
}
