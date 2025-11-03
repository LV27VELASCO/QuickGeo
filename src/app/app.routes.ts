import {Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFountComponent } from './components/not-fount/not-fount.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthLoginGuard } from './guard/auth-login.guard';
import { HeaderHomeComponent } from './components/header/header.component';
import { LanguageGuard } from './guard/language.guard';

export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [LanguageGuard], // 👈 detecta y configura el idioma según la URL
    children: [
      {
        path: '',
        component: HeaderHomeComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'pricing', loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent) },
          { path: 'frequentlyAskedQuestions', loadComponent: () => import('./pages/requently-asked-questions/requently-asked-questions.component').then(m => m.RequentlyAskedQuestionsComponent) },
          { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
          { path: 'unsubscribe', loadComponent: () => import('./pages/unsubscribe/unsubscribe.component').then(m => m.UnsubscribeComponent) },
          { path: 'legals', loadComponent: () => import('./pages/legals/legals.component').then(m => m.LegalsComponent) },
          { path: 'confidentiality', loadComponent: () => import('./pages/confidentiality/confidentiality.component').then(m => m.ConfidentialityComponent) },
          { path: 'cgu', loadComponent: () => import('./pages/cgu/cgu.component').then(m => m.CguComponent) },
        ],
      },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthLoginGuard] },
      { path: 'pre-checkout', loadComponent: () => import('./pages/pre-check-out/pre-check-out.component').then(m => m.PreCheckOutComponent), canActivate: [AuthGuard] },
      { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [AuthGuard] },
      { path: 'success', loadComponent: () => import('./pages/success-pay/success-pay.component').then(m => m.SuccessPayComponent) },
      { path: 'loading', loadComponent: () => import('./pages/loading/loading.component').then(m => m.LoadingComponent) },
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
      { path: '404', component: NotFountComponent },
      { path: '**', redirectTo: '404' }
    ]
  },
  // Redirección raíz: sin idioma → idioma por defecto (es)
  { path: '', redirectTo: '/es', pathMatch: 'full' },
  // Fallback si todo falla
  { path: '**', redirectTo: '/es/404' }
];

