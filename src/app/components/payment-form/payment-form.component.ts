import { Component, inject } from '@angular/core';
import { loadStripe, Stripe, StripeElementLocale, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LANGUAGES_OBJECT } from '../../config/languajes';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,TranslateModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {

  nombreLang = 'Español';
  langActual: string = 'es';

 TRANSLATIONS:any = {
  es: {
    fillFields: "🚨 Por favor, completa todos los campos y acepta las políticas antes de continuar.",
    paymentMethodError: "❌ Error creando PaymentMethod:",
    paymentError: "❌ Error en el pago:",
    backendError: "🚨 Hubo un error al procesar el pago.",
    paymentSuccess: "✅ Pago realizado con éxito..."
  },
  en: {
    fillFields: "🚨 Please complete all fields and accept the policies before continuing.",
    paymentMethodError: "❌ Error creating PaymentMethod:",
    paymentError: "❌ Payment error:",
    backendError: "🚨 There was an error processing the payment.",
    paymentSuccess: "✅ Payment completed successfully..."
  },
  fr: {
    fillFields: "🚨 Veuillez remplir tous les champs et accepter les politiques avant de continuer.",
    paymentMethodError: "❌ Erreur lors de la création du PaymentMethod :",
    paymentError: "❌ Erreur lors du paiement :",
    backendError: "🚨 Une erreur est survenue lors du traitement du paiement.",
    paymentSuccess: "✅ Paiement effectué avec succès..."
  }
};

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute, private utils:UtilitiesService){}

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

  ngOnInit() {
      // Detecta idioma actual desde la URL
      this.route.paramMap.subscribe(params => {
        const lang = params.get('lang') || 'es';
        this.langActual = lang;
        const index = LANGUAGES_OBJECT.id.indexOf(lang);
        this.nombreLang = index >= 0 ? LANGUAGES_OBJECT.nombre[index] : 'Español';
      });
    }

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
      locale: this.langActual as StripeElementLocale, // puedes ponerlo dinámico
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

    const t = this.TRANSLATIONS[this.langActual || 'es'];

    if (!this.checkoutForm.valid){
      this.showAlert(t.fillFields);
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
        console.error(`${t.paymentMethodError} ${pmError.message}`);
        this.showAlert(`🚨 ${pmError.message}`);
        this.loader = false;
        return;
      }

      const response: any = await this.api.OnCheckout({
          email,
          name,
          locale:this.langActual
        }).toPromise();

      const clientSecret = response.clientSecret;

      const { error, paymentIntent } = await this.stripe!.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id
      });

      if (error) {
        console.error(`${t.paymentError} ${error.message}`);
        this.showAlert(`🚨 ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        this.showSuccess(t.paymentSuccess);
        setTimeout(() => {
          this.navegar("/success");
        }, 2500);
      }
    } catch (err: any) {
      console.error('Backend error:', err);
      this.showAlert(t.backendError);
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

  navegar(ruta: string): void {

    // Llamamos a UtilsService para navegar
    this.utils.navigate(ruta)
      .then(() => {
        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => console.error('Navigation error:', err));
  }

}
