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
}