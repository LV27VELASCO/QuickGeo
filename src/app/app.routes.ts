import {Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFountComponent } from './components/not-fount/not-fount.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthLoginGuard } from './guard/auth-login.guard';
import { HeaderHomeComponent } from './components/headers/header-home/header-home.component';

export const routes: Routes = [
  {
    path: '', component:HeaderHomeComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'pricing', loadComponent: () => import('./pages/pricing/pricing.component').then(mod => mod.PricingComponent) },
      { path: 'requentlyAskedQuestions', loadComponent: () => import('./pages/requently-asked-questions/requently-asked-questions.component').then(mod => mod.RequentlyAskedQuestionsComponent) },
      { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(mod => mod.ContactComponent) },
      { path: 'unsubscribe', loadComponent: () => import('./pages/unsubscribe/unsubscribe.component').then(mod => mod.UnsubscribeComponent) },
    ]
  },
  { path: 'dashboard', component:DashboardComponent, canActivate:[AuthLoginGuard], },
  { path: 'pre-checkout', loadComponent: () => import('./pages/pre-check-out/pre-check-out.component').then(mod => mod.PreCheckOutComponent), canActivate:[AuthGuard]},
  { path: 'success', loadComponent: () => import('./pages/success-pay/success-pay.component').then(mod => mod.SuccessPayComponent)},
  { path: 'loading', loadComponent: () => import('./pages/loading/loading.component').then(mod => mod.LoadingComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(mod => mod.LoginComponent) },

  { path: '404', component: NotFountComponent },
  { path: '**', redirectTo:'404' }
];
