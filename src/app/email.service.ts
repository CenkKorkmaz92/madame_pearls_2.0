import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // TODO: Replace with your EmailJS credentials
  // Get them from: https://dashboard.emailjs.com/
  // 
  // ⚠️ IMPORTANT: After adding real credentials:
  // 1. Do NOT commit this file with real values to GitHub
  // 2. Or better: Move to environment.ts and add to .gitignore
  private readonly SERVICE_ID = 'YOUR_SERVICE_ID';
  private readonly TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  private readonly PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  constructor() {
    // Initialize EmailJS with public key
    emailjs.init(this.PUBLIC_KEY);
  }

  async sendContactEmail(
    name: string,
    email: string,
    message: string,
    favoriteImages: string[] = []
  ): Promise<EmailJSResponseStatus> {
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      favorites_count: favoriteImages.length,
      favorites_list: favoriteImages.length > 0 
        ? favoriteImages.map((img, i) => `${i + 1}. ${img}`).join('\n') 
        : 'No favorites selected'
    };

    return emailjs.send(
      this.SERVICE_ID,
      this.TEMPLATE_ID,
      templateParams
    );
  }
}
