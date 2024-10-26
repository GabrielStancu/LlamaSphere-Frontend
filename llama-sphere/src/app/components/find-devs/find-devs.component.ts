import { Component } from '@angular/core';
import { MatchingService } from 'src/app/services/matching.service';

@Component({
  selector: 'app-find-devs',
  templateUrl: './find-devs.component.html',
  styleUrls: ['./find-devs.component.css']
})
export class FindDevsComponent {
// Existing properties and methods
matchedDevs: any[] = [];
availableJobs: { id: string, title: string }[] = [];
selectedJob: string | null = null;
displayedColumns: string[] = ['name', 'score', 'explanation'];
loadingJobs: boolean = false;
errorLoadingJobs: string = '';

// Properties for the FAQ Chat
isChatVisible: boolean = false;
userQuestion: string = '';
chatMessages: { sender: string, message: string }[] = [];
hideChatTimeout: any;
selectedJobTitle: string = 'Select Job';

constructor(private matchingService: MatchingService) { }

ngOnInit(): void {
  // Initialization logic
  this.fetchAvailableJobs();
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

  onGetMatchedJobs(): void {
    if (this.selectedJob) {
      // Fetch matching candidates for the selected job
      this.matchingService.getMatchedCandidates(this.selectedJob).subscribe(
        (candidates) => {
          this.matchedDevs = candidates;
        },
        (error) => {
          this.errorLoadingJobs = 'An error occurred while fetching matching candidates.';
          console.error(error);
        }
      );
    } else {
      alert('Please select a job to find matching candidates.');
    }
  }

  fetchAvailableJobs(): void {
    this.matchingService.getAllJobs().subscribe(
      (jobs) => {
        this.availableJobs = jobs;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  onJobSelectChange(jobId: string): void {
    // Find the selected job title based on the selected job ID
    const selectedJob = this.availableJobs.find(job => job.id === jobId);
    this.selectedJobTitle = selectedJob ? selectedJob.title : 'Select Job';
  }
}
