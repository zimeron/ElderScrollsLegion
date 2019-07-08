import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

// Generated App Imports
import { AppComponent } from './app.component';
import { FeaturesModule } from './Features/features.module';
import { AppRoutingModule } from './app-routing.module';
import { GlobalNavigationComponent } from './global-navigation/global-navigation.component';
import { MessageComponent } from './message/message.component';
import { CharacterClassesModule } from './character-classes/character-classes.module';

@NgModule({
  declarations: [
    AppComponent,
    GlobalNavigationComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    ReactiveFormsModule,
    FeaturesModule,
    CharacterClassesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
