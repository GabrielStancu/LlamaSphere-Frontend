import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatchingService } from 'src/app/services/matching.service';
import { AppAcceptRejectDialogComponent } from '../app-accept-reject-dialog/app-accept-reject-dialog.component';

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
displayedColumns: string[] = ['name', 'score', 'explanation', 'actions'];
loadingJobs: boolean = false;
errorLoadingJobs: string = '';
filterCriteria: string = '';

// Properties for the FAQ Chat
isChatVisible: boolean = false;
userQuestion: string = '';
chatMessages: { sender: string, message: string }[] = [];
hideChatTimeout: any;
selectedJobTitle: string = 'Select Job';

constructor(private dialog: MatDialog, private matchingService: MatchingService) { }

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
      const requestData = {
        jobId: this.selectedJob,
        filter: this.filterCriteria // Add filter criteria to request
      };
      
      // Make a request using MatchingService with jobId and filterCriteria
      this.matchingService.getMatchedCandidates(requestData).subscribe(
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

  sendAcceptEmail(dev: any): void {
    // Fetch initial response text for "Accept" email from backend
    this.matchingService.getAcceptEmailTemplate(dev.id).subscribe((response: string) => {
      const dialogRef = this.dialog.open(AppAcceptRejectDialogComponent, {
        width: '400px',
        data: { message: response, action: 'Accept' }
      });

      dialogRef.afterClosed().subscribe((editedMessage: string) => {
        if (editedMessage) {
          this.matchingService.sendEmail(dev.id, editedMessage).subscribe(() => {
            console.log('Accept email sent successfully');
          });
        }
      });
    });
  }

  sendRejectEmail(dev: any): void {
    // Fetch initial response text for "Reject" email from backend
    this.matchingService.getRejectEmailTemplate(dev.id).subscribe((response: string) => {
      const dialogRef = this.dialog.open(AppAcceptRejectDialogComponent, {
        width: '400px',
        data: { message: response, action: 'Reject' }
      });
      dialogRef.afterClosed().subscribe((editedMessage: string) => {
        if (editedMessage) {
          this.matchingService.sendEmail(dev.id, editedMessage).subscribe(() => {
            console.log('Reject email sent successfully');
          });
        }
      });
    });
  }

}
