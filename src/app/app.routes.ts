import {Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pricing', loadComponent: () => import(`./pages/pricing/pricing.component`).then(mod => mod.PricingComponent)},
  { path: 'requentlyAskedQuestions', loadComponent: () => import(`./pages/requently-asked-questions/requently-asked-questions.component`).then(mod => mod.RequentlyAskedQuestionsComponent)},
  { path: 'contact', loadComponent: () => import(`./pages/contact/contact.component`).then(mod => mod.ContactComponent)},
  { path: 'login', loadComponent: () => import(`./pages/login/login.component`).then(mod => mod.LoginComponent)},
];