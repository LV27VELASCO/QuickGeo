import {Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFountComponent } from './components/not-fount/not-fount.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { 
    path: '', component:HeaderComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'pricing', loadComponent: () => import('./pages/pricing/pricing.component').then(mod => mod.PricingComponent) },
      { path: 'requentlyAskedQuestions', loadComponent: () => import('./pages/requently-asked-questions/requently-asked-questions.component').then(mod => mod.RequentlyAskedQuestionsComponent) },
      { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(mod => mod.ContactComponent) },
    ] 
  },
  { path: 'pre-checkout', loadComponent: () => import('./pages/pre-check-out/pre-check-out.component').then(mod => mod.PreCheckOutComponent), canActivate:[AuthGuard]},
  { path: 'loading', loadComponent: () => import('./pages/loading/loading.component').then(mod => mod.LoadingComponent), canActivate:[AuthGuard] },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(mod => mod.LoginComponent) },
  { path: '404', component: NotFountComponent }, 
  { path: '**', redirectTo:'404' }
];