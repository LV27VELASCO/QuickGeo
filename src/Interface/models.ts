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
    capturedat: string;
    city: string;
    latitude: number;
    longitude: number;
}

export interface Detail {
    codecountry: string;
    country: string;
    createdat: string;
    locations: Location[];
    phonenumber: string;
    codephone:string;
    smsStatus: number;
    status: boolean;
}

export interface responseData {
    details: Detail[];
}

export interface Location {
    capturedat: string;
    city: string;
    latitude: number;
    longitude: number;
}

export interface SendSms {
    code:string
    phone_number: string
    code_country:string
}

export interface resSendSms {
    status:string
    description: string
}