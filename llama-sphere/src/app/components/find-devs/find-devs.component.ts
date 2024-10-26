import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatchingService } from 'src/app/services/matching.service';
import { AppAcceptRejectDialogComponent } from '../app-accept-reject-dialog/app-accept-reject-dialog.component';
import { UploadService } from 'src/app/services/upload.service';

interface FilterWeightPair {
  filter: string;
  weight: number | null;
}

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
displayedColumns: string[] = ['candidate_name', 'score', 'general_reasoning'];
loadingJobs: boolean = false;
errorLoadingJobs: string = '';
filterCriteria: string = '';
currentJobId: string = '';

// Properties for the FAQ Chat
isChatVisible: boolean = false;
userQuestion: string = '';
chatMessages: { sender: string, message: string }[] = [];
hideChatTimeout: any;
selectedJobTitle: string = 'Select Job';

newFilter: string = '';
newWeight: number | null = null;
filterWeights: FilterWeightPair[] = [];
weightError: string | null = null;

constructor(private dialog: MatDialog, private matchingService: MatchingService, private uploadService : UploadService) { }

ngOnInit(): void {
  this.fetchAvailableJobs();
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

  onGetMatchedDevs(): void {
    if (this.selectedJob) {
      const requestData = {
          ProjectId: this.currentJobId,
          Keywords: this.constructKeywordsObject()
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

  private constructKeywordsObject(): { [key: string]: number } {
    const keywords: { [key: string]: number } = {};

    this.filterWeights.forEach(pair => {
      keywords[pair.filter] = pair.weight || 0; // Assign weight or default to 0
    });

    return keywords;
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
    const requestData = {
      reasoning_1: dev.general_reasoning,
      reasoning_2: dev.tehnical_reasoning,
      reasoning_3: dev.domain_reasoning,
      accepted: true
    };
    // Fetch initial response text for "Accept" email from backend
    this.matchingService.getEmailTemplate(requestData).subscribe((response: string) => {
      const dialogRef = this.dialog.open(AppAcceptRejectDialogComponent, {
        width: '400px',
        data: { reasoning: response}
      });

      dialogRef.afterClosed().subscribe((editedMessage: string) => {
        if (editedMessage) {
          this.matchingService.sendEmail(editedMessage).subscribe(() => {
            console.log('Accept email sent successfully');
          });
        }
      });
    });
  }

  sendRejectEmail(dev: any): void {
    const requestData = {
      reasoning_1: dev.general_reasoning,
      reasoning_2: dev.tehnical_reasoning,
      reasoning_3: dev.domain_reasoning,
      accepted: false
    };
    // Fetch initial response text for "Reject" email from backend
    this.matchingService.getEmailTemplate(requestData).subscribe((response: string) => {
      const dialogRef = this.dialog.open(AppAcceptRejectDialogComponent, {
        width: '400px',
        data: { message: response, action: 'Reject' }
      });
      dialogRef.afterClosed().subscribe((editedMessage: string) => {
        if (editedMessage) {
          this.matchingService.sendEmail(editedMessage).subscribe(() => {
            console.log('Reject email sent successfully');
          });
        }
      });
    });
  }

  public receiveFile(file: File) {
    this.uploadService.uploadJob(file).subscribe(result =>
      this.currentJobId = result.id
    );
  }

  // Add new filter-weight pair
  addFilterWeightPair(): void {
    // Check if weight exceeds 100
    const currentTotalWeight = this.filterWeights.reduce((acc, pair) => acc + (pair.weight || 0), 0);
    const newWeightValue = this.newWeight || 0;
    if (currentTotalWeight + newWeightValue > 100) {
      this.weightError = 'Total weight cannot exceed 100%';
      return;
    }

    // Add new filter-weight pair to the list
    this.filterWeights.push({ filter: this.newFilter, weight: this.newWeight });
    this.newFilter = '';
    this.newWeight = null;
    this.weightError = null; // Clear any previous error
  }

  // Remove a filter-weight pair
  removeFilterWeightPair(index: number): void {
    this.filterWeights.splice(index, 1);
    this.validateWeights();
  }

  // Check if weights sum to 100
  isWeightValid(): boolean {
    const totalWeight = this.filterWeights.reduce((acc, pair) => acc + (pair.weight || 0), 0);
    return totalWeight === 100;
  }

  // Validate weights and adjust if necessary
  validateWeights(): void {
    const totalWeight = this.filterWeights.reduce((acc, pair) => acc + (pair.weight || 0), 0);

    if (totalWeight > 100) {
      this.weightError = 'Total weight cannot exceed 100%';
    } else if (totalWeight < 100) {
      this.weightError = 'Total weight must be exactly 100%';
    } else {
      this.weightError = null; // Clear any error if weights are valid
    }
  }

}
