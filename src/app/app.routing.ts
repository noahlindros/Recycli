import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { PresentationComponent } from './presentation/presentation.component';
import { ComponentsComponent } from './components/components.component';
import { SectionsComponent } from './sections/sections.component';
import { AboutusComponent } from './examples/aboutus/aboutus.component';
import { AddproductComponent } from './examples/addproduct/addproduct.component';
import { BlogpostComponent } from './examples/blogpost/blogpost.component';
import { BlogpostsComponent } from './examples/blogposts/blogposts.component';
import { ContactusComponent as ContactusExample } from './examples/contactus/contactus.component';
import { DiscoverComponent } from './examples/discover/discover.component';
import { EcommerceComponent } from './examples/ecommerce/ecommerce.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent as LoginExample } from './examples/login/login.component';
import { ProductpageComponent } from './examples/productpage/productpage.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { RegisterComponent as RegisterExample} from './examples/register/register.component';
import { SearchComponent } from './examples/search/search.component';
import { SettingsComponent } from './examples/settings/settings.component';
import { TwitterComponent } from './examples/twitter/twitter.component';
import { Page404Component } from './examples/page404/page404.component';
import { Page422Component } from './examples/page422/page422.component';
import { Page500Component } from './examples/page500/page500.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { AuthGuard } from './services/auth.guard';
import { PickupComponent } from './pages/pickup/pickup.component';
import { AddpickupComponent } from './pages/addpickup/addpickup.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { PerformpickupComponent } from './pages/performpickup/performpickup.component';
import { PerformpickupdetailComponent } from './pages/performpickupdetail/performpickupdetail.component';
import { PricesComponent } from './pages/prices/prices.component';
import { HowtoComponent } from './pages/howto/howto.component';


const routes: Routes =[

    { path: 'howto',            component: HowtoComponent },
    { path: 'prices',           component: PricesComponent },
    { path: 'home',             component: HomeComponent },
    { path: 'register',         component: RegisterComponent },
    { path: 'about',            component: AboutComponent },
    { path: 'dashboard',        component: DashboardComponent, canActivate: [AuthGuard], data: {admin: false} },
    { path: 'addpickup',        component: AddpickupComponent, canActivate: [AuthGuard], data: {admin: false} },
    { path: 'pickup',           component: PickupComponent, canActivate: [AuthGuard], data: {admin: false} },

    { path: 'customers',            component: CustomersComponent, canActivate: [AuthGuard], data: {admin: true} },
    { path: 'payments',             component: PaymentsComponent, canActivate: [AuthGuard], data: {admin: true} },
    { path: 'performpickup',        component: PerformpickupComponent, canActivate: [AuthGuard], data: {admin: true} },
    { path: 'performpickup/:key',   component: PerformpickupdetailComponent, canActivate: [AuthGuard], data: {admin: true} },
    
    
    { path: 'login',            component: LoginComponent },
    { path: 'signout',          component: SignoutComponent },
    { path: 'contactus',        component: ContactusComponent },
    
    { path: 'presentation',         component: PresentationComponent },
    { path: 'components',           component: ComponentsComponent },
    { path: 'sections',             component: SectionsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/aboutus',     component: AboutusComponent },
    { path: 'examples/addproduct',  component: AddproductComponent },
    { path: 'examples/blogpost',    component: BlogpostComponent },
    { path: 'examples/blogposts',   component: BlogpostsComponent },
    { path: 'examples/contactus',   component: ContactusExample },
    { path: 'examples/discover',    component: DiscoverComponent },
    { path: 'examples/ecommerce',   component: EcommerceComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginExample },
    { path: 'examples/productpage', component: ProductpageComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'examples/register',    component: RegisterExample },
    { path: 'examples/search',      component: SearchComponent },
    { path: 'examples/settings',    component: SettingsComponent },
    { path: 'examples/twitter',     component: TwitterComponent },
    { path: 'examples/page404',     component: Page404Component },
    { path: 'examples/page422',     component: Page422Component },
    { path: 'examples/page500',     component: Page500Component },

    
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes,{
          useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
