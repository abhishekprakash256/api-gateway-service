import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Gateway Service</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #121212;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                color: #e0e0e0;
            }
            h1 {
                color: #ffffff;
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            p {
                color: #b0b0b0;
                font-size: 1.2rem;
            }
            .container {
                background: #1e1e1e;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                text-align: center;
                max-width: 600px;
            }
            a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #2196F3;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            a:hover {
                background-color: #1769aa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to the API Gateway Service</h1>
            <p>Your centralized access point for all API services.</p>
            <a href="/search?keyword=example">Try a Sample Search</a>
        </div>
    </body>
    </html>
    `;
  }
}
