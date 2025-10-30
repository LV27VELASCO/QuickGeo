import { Component, inject } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {

  constructor(private api:ApiService, private router: Router){}

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  fb = inject(FormBuilder);
  resultado!: string;
  success!: string;
  loader=false;
  timeoutId:any = null;
  checkoutForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    terms: [false, Validators.requiredTrue]
    });

  async ngAfterViewInit() {
    this.stripe = await loadStripe(environment.pkStripe);

    if (!this.stripe) {
      console.error('Stripe no se pudo inicializar');
      return;
    }

    const appearance = {
      theme: "night",
      variables: {
        fontFamily: "Sohne, system-ui, sans-serif",
        fontWeightNormal: "500",
        borderRadius: "8px",
        colorBackground: "#0A2540",
        colorPrimary: "#EFC078",
        accessibleColorOnColorPrimary: "#1A1B25",
        colorText: "white",
        colorTextSecondary: "white",
        colorTextPlaceholder: "#ABB2BF",
        tabIconColor: "white",
        logoColor: "dark",
      },
      rules: {
        ".Input": {
          backgroundColor: "#212D63",
          border: "1px solid var(--colorPrimary)",
        },
      },
    } as const; // 👈 importante

    this.elements = this.stripe.elements({
      appearance:appearance,
      locale: 'es', // puedes ponerlo dinámico
    });

    const cardNumber = this.elements.create('cardNumber');
    cardNumber.mount('#card-number');

    const cardExpiry = this.elements.create('cardExpiry');
    cardExpiry.mount('#card-expiry');

    const cardCvc = this.elements.create('cardCvc');
    cardCvc.mount('#card-cvc');
  }

  async onSubmit() {
    if (!this.stripe || !this.elements) return;

    if (!this.checkoutForm.valid){
      this.showAlert("🚨 Hay datos inválidos en el formulario")
      return
    }

    const email = (document.getElementById('card-email') as HTMLInputElement).value;
    const name = (document.getElementById('card-name') as HTMLInputElement).value;

    this.loader = true;
    // 1️⃣ Llamar al backend para obtener el clientSecret
    try {

      // 1️⃣ Crear el Payment Method en Stripe (desde el cliente)
      const { paymentMethod, error: pmError } = await this.stripe!.createPaymentMethod({
        type: 'card',
        card: this.elements!.getElement('cardNumber')!
      });

      if (pmError) {
        console.error('❌ Error creando PaymentMethod:', pmError.message);
        this.showAlert(`🚨 ${pmError.message}`);
        this.loader = false;
        return;
      }

      const response: any = await this.api.OnCheckout({
          email,
          name,
        }).toPromise();

      const clientSecret = response.clientSecret;

      const { error, paymentIntent } = await this.stripe!.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id
      });

      if (error) {
        console.error('❌ Error en el pago:', error.message);
        this.showAlert(`🚨 ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        this.showSuccess('✅ Pago realizado con éxito...');
        setTimeout(() => {
          this.router.navigate([`/success`]);
        }, 3000);
      }
    } catch (err: any) {
      console.error('Error llamando al backend:', err);
      this.showAlert('🚨 Hubo un error al procesar el pago.');
    }
    this.loader = false;
  }

  showAlert(message:string){
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.resultado = message;

      this.timeoutId = setTimeout(() => {
        this.resultado = "";
        this.timeoutId = null; // opcional: limpia la referencia
      }, 3000);
  }

  showSuccess(message:string){
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.success = message;

      this.timeoutId = setTimeout(() => {
        this.success = "";
        this.timeoutId = null; // opcional: limpia la referencia
      }, 3000);
  }

}
