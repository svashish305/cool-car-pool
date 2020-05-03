import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';
import { DataService } from '@app/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-matched-users-list',
  templateUrl: './matched-users-list.component.html',
  styleUrls: ['./matched-users-list.component.scss']
})
export class MatchedUsersListComponent implements OnInit {
  @Input() user: User
  @Input() source: string
  @Input() destination: string
  @Output() private searchStatus = new EventEmitter<boolean>();
  foundDrivers: User[] = []
  notFound: boolean = true

  constructor(
    private router: Router,
    private accountService: AccountService,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.setOption('source', this.source)
    this.dataService.setOption('destination', this.destination)

    if (this.source.length == 0 || this.destination.length == 0)
      this.notFound = true
    else
      this.accountService.getAll()
        .pipe(first())
        .subscribe(users => {
          this.foundDrivers = users.filter(user => (user.id !== this.user.id) && (user.source === this.source) && (user.destination === this.destination))
          if (this.foundDrivers.length > 0) {
            this.searchStatus.emit(true)
            this.notFound = false
          }
        });
  }

  goToRideConfirmationPage() {
    this.router.navigate(['confirm-ride'])
  }

}
