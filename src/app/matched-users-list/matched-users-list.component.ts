import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from '@app/map-dialog/map-dialog.component';

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

  constructor(private accountService: AccountService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
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

  openDialog(id) {
    const dialogRef = this.dialog.open(MapDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
