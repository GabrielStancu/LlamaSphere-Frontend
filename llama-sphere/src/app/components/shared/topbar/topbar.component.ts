import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserDisplayData } from 'src/app/models/user-display.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit{
  public collapsedSidebar = true;
  @Output() sidebarChanged = new EventEmitter<{collapsed: boolean}>();
  private readonly userId = Number(localStorage.getItem("devmatch-userId"));
  private readonly userType = localStorage.getItem("devmatch-userType");
  public displayUser?: UserDisplayData;

  ngOnInit(): void {
    // const request = new UserDisplayDataRequest(this.userType, this.userId);
    // this.accountService.getUserDisplayData(request).subscribe(resp => {
    //   this.displayUser = resp;
    // });
    this.displayUser = new UserDisplayData("John", "https://i.pravatar.cc/300");
  }

  toggleSidebar(): void {
    this.collapsedSidebar = !this.collapsedSidebar;
    this.sidebarChanged.emit({
      collapsed: this.collapsedSidebar
    });
  }
}
