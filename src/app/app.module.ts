import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component'
import { MaterialModule } from './material/material.module'
import { MatchedUsersListComponent } from './matched-users-list/matched-users-list.component';
import { ConfirmRideComponent } from './confirm-ride/confirm-ride.component'
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { environment } from '@environments/environment'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AgmCoreModule.forRoot({ // @agm/core
            apiKey: environment.googleMapApiKey,
        }),
        AgmDirectionModule,
        NgbModule      // agm-direction
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        SearchComponent,
        MatchedUsersListComponent,
        ConfirmRideComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        fakeBackendProvider,
        GoogleMapsAPIWrapper
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };