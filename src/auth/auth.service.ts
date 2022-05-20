import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signup(email: string){
        return {'signup': 'signup success 1.'}
    }

    login(email: string) {
        return { 'login': 'login success.' };
    }
}