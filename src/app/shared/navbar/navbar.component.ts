import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    public isAuthenticated: boolean = false;
    public isAdmin: boolean = false;

    constructor(public auth: AuthService, public location: Location, private element: ElementRef, private db: AngularFireDatabase) {
        this.sidebarVisible = false;



        this.auth.authChange.subscribe((result) => {
            this.isAuthenticated = result;
        });
        this.auth.adminChange.subscribe((result) => {
            console.log("adminChange", result);
            this.isAdmin = result;
        });
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.isAuthenticated = this.auth.isAuthenticated;


        this.auth.angularFireAuth.user.subscribe((user) =>{

            if (user){
                this.auth.isAuthenticated = true;
                this.auth.user = user;
                this.auth.authChange.emit(true);
                
                let admin_check_subscription = this.db.object<boolean>('data/admin/' + this.auth.user.uid).valueChanges().subscribe((result) =>{
                    if (result){
                        this.auth.adminChange.emit(true);
                        this.auth.isAdmin  = true;
                    }
                    else{
                        this.auth.adminChange.emit(false);
                        this.auth.isAdmin = false;
                    }
                    admin_check_subscription.unsubscribe();
                });

            }
            else{
                this.auth.isAuthenticated = false;
                this.auth.user = null;
                this.auth.authChange.emit(false);

                
            }            

        });

    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === '/home') {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }
}
