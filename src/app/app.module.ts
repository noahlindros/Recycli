import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { SectionsModule } from './sections/sections.module';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { PresentationModule } from './presentation/presentation.module';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignoutComponent } from './pages/signout/signout.component';
import { PickupComponent } from './pages/pickup/pickup.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AddpickupComponent } from './pages/addpickup/addpickup.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        DashboardComponent,
        RegisterComponent,
        AboutComponent,
        LoginComponent,
        ContactusComponent,        
        SignoutComponent, PickupComponent, AddpickupComponent
    ],
    imports: [
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyC03c9TQ6KxXiH5mX9DqLn_moqbIcj6x3s",
            authDomain: "recycliuf.firebaseapp.com",
            databaseURL: "https://recycliuf.firebaseio.com",
            projectId: "recycliuf",
            storageBucket: "recycliuf.appspot.com",
            messagingSenderId: "248278027791",
            appId: "1:248278027791:web:818c0c3d32410135d69d7a",
            measurementId: "G-3CPNF4KYZB"
        }),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        PresentationModule,
        SectionsModule,
        ComponentsModule,
        ExamplesModule,
        AngularFireModule,
        AngularFireAuthModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
