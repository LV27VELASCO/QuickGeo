export interface Country {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
}

export interface PhoneInfo {
    code:string;
    phone_number: string;
    code_lang: string;
}

export interface resPhoneInfo {
    country: string;
    operator: string;
    img:string;
    flag:string;
    phoneText:string;
    date:string;
}

export interface CreateUser {
    session_id: string;
}

export interface resCreateUser {
    status: boolean;
}

export interface Login {
    email: string;
    password:string;
}

export interface resLogin {
    message:string
    token:string
}


export interface Location {
    created_at: string;
    city: string;
    latitude: number;
    longitude: number;
}

export interface Reslocation {
    credits: number;
    history: Detail[];
}

export interface Detail {
    codecountry: string;
    country: string;
    created_at: string;
    locations: Location[];
    phonenumber: string;
    codephone:string;
    smsStatus: number;
    status: boolean;
}

export interface responseData {
    details: Reslocation;
}

export interface Location {
    created_at: string;
    city: string;
    latitude: number;
    longitude: number;
}

export interface SendSms {
    code:string
    phone_number: string
    code_country:string
    message:string,
    credits:number
}

export interface resSendSms {
    status:string
    description: string
}

export interface ChatBot {
  message:string
}

export interface ChatBotOut {
  response:string
}

export interface resUnsubscribe {
  message:string
}

export interface Unsubscribe {
  email:string
}

export interface Checkout {
  email:string,
  name:string,
  locale:string,
}

export interface ResetPsw {
  email:string
}

export interface resResetPsw {
  message:string,
}
