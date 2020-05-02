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
  source: string
  destination: string
  showMatches: boolean = false

  searchForm = new FormGroup({
    source: new FormControl(''),
    destination: new FormControl('')
  })

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.source = this.searchForm.value.source
    this.destination = this.searchForm.value.destination
  }

  clearInput() {
    this.source = ''
    this.destination = ''
    this.showMatches = false
  }

  handleSearch(searchStatus: boolean) {
    this.showMatches = searchStatus
  }

}
