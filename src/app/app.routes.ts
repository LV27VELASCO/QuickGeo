import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { LoginComponent } from './pages/login/login.component';
import { RequentlyAskedQuestionsComponent } from './pages/requently-asked-questions/requently-asked-questions.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pricing', component: PricingComponent},
  { path: 'requentlyAskedQuestions', component: RequentlyAskedQuestionsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'login', component: LoginComponent},
];