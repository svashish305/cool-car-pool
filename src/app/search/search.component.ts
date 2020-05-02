import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() user: User
  users: User[] = []
  foundDrivers: any[] = []
  searchForm = new FormGroup({
    source: new FormControl(''),
    destination: new FormControl('')
  })

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  fetchList() {
    this.foundDrivers = this.users.filter(user => (user.id !== this.user.id) && (user.source === this.searchForm.value.source) && (user.destination === this.searchForm.value.destination))
    console.log('matched with ', this.foundDrivers)

    console.table(this.users)
  }

}
