import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { NgbTypeaheadConfig, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LimitToPipe } from './shared/limit-to.pipe';
import { TrendsComponent } from './trends/trends.component';
import { YoutubeComponent } from './trends/youtube/youtube.component';

import { ContextService } from './shared/context.service';
import { YoutubeService } from './trends/youtube/youtube.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LimitToPipe,
    TrendsComponent,
    YoutubeComponent,
    TrendsComponent,
    YoutubeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbTypeaheadModule,
    NgbModule,
    Ng2Bs3ModalModule,
    MomentModule
  ],
  providers: [
    NgbTypeaheadConfig,
    ContextService,
    YoutubeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
