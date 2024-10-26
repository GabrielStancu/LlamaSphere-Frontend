import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarOption } from 'src/app/models/sidebar-option.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  constructor(private router: Router) { }

  @Input() collapsed: boolean = false;
  public sidebarOptions: SidebarOption[] = [];

  ngOnInit(): void {
    this.initSidebarOptions();
  }

  initSidebarOptions(): void {
    // const userType = localStorage.getItem('nvision-userType');
    // if (userType === 'developer') {
      this.initDeveloperSidebarMenu();
    // } else {
    //   this.initRecruiterSidebarMenu();
    // }
  }

  onOptionMouseOver(sidebarOption: SidebarOption): void {
    this.sidebarOptions.forEach(option => option.isActive = false);
    sidebarOption.isActive = true;
  }

  onOptionClick(sidebarOption: SidebarOption): void {
    if (sidebarOption.isLogOutOption) {
      localStorage.removeItem('nvision-user');
      localStorage.removeItem('nvision-userId');
      localStorage.removeItem('nvision-jwt');
      localStorage.removeItem('nvision-userType');
    }
    this.router.navigate([sidebarOption.componentName]);
  }

  private initDeveloperSidebarMenu(): void {
    this.sidebarOptions = [
      new SidebarOption('NVision', 'logo-apple', '/watcher'),
      new SidebarOption('Dashboard', 'home', '/watcher', false, true),
      new SidebarOption('Account', 'person', '/watcher-account'),
      new SidebarOption('Jobs', 'business_center', '/watcher-subjects'),
      new SidebarOption('Log Out', 'power_off', '/login', true)
    ];
  }

  private initRecruiterSidebarMenu(): void {
    this.sidebarOptions = [
      new SidebarOption('NVision', 'logo-apple', '/watcher'),
      new SidebarOption('Dashboard', 'home', '/watcher', false, true),
      new SidebarOption('Account', 'person', '/watcher-account'),
      new SidebarOption('Appliants', 'business_center', '/watcher-subjects'),
      new SidebarOption('Log Out', 'power_off', '/login', true)
    ];
  }
}
