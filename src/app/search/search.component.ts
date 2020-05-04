import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@app/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() user: User
  source: string
  destination: string
  showMatches: boolean = false
  foundDrivers: User[] = []
  found: boolean = false
  clear: boolean = false

  searchForm = new FormGroup({
    source: new FormControl(''),
    destination: new FormControl('')
  })

  constructor(private accountService: AccountService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.source = this.searchForm.value.source
    this.destination = this.searchForm.value.destination
  }

  fetchDrivers() {
    if (this.source.length == 0 || this.destination.length == 0) {
      this.found = false
    }
    this.dataService.setOption('source', this.searchForm.value.source)
    this.dataService.setOption('destination', this.searchForm.value.destination)
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => {
        this.foundDrivers = users.filter(user => (user.id !== this.user.id) && (user.source.toUpperCase() === this.source.toUpperCase()) && (user.destination.toUpperCase() === this.destination.toUpperCase()))
        if (this.foundDrivers.length > 0) {
          this.found = true;
        } else {
          this.found = false;
          alert('No Drivers Found!')
        }
      });
  }

  goToRideConfirmationPage() {
    this.router.navigate(['confirm-ride'])
  }

  clearInput() {
    this.source = ''
    this.destination = ''
    this.clear = true
    // this.showMatches = false
  }

  // handleSearch(searchStatus: boolean) {
  //   this.showMatches = searchStatus
  // }

}
