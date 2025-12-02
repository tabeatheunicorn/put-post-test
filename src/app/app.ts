import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <h1>HTTP Test App</h1>

    <div>
      <label>URL:</label><br>
      <input [(ngModel)]="url" style="width: 400px">
    </div>

    <div style="margin-top: 10px">
      <label>JSON Body:</label><br>
      <textarea [(ngModel)]="jsonBody" rows="10" cols="60"></textarea>
    </div>

    <div style="margin-top: 10px; display: flex; gap: 10px">
      <button (click)="sendPutJson()">PUT + application/json</button>
      <button (click)="sendPutText()">PUT + text/plain</button>
      <button (click)="sendPostJson()">POST + application/json</button>
      <button (click)="sendPostText()">POST + text/plain</button>
    </div>

    <div style="margin-top: 20px">
      <h3>Response:</h3>
      <pre style="background: #eee; padding: 10px">{{ response }}</pre>
    </div>

    <div style="margin-top: 10px">
      <h3>Error:</h3>
      <pre style="background: #fdd; padding: 10px">{{ error }}</pre>
    </div>
  `,
})
export class App {
  private http = inject(HttpClient);

  url = 'http://10.0.0.52:8199/file/product.json';
  jsonBody = JSON.stringify({
    metadata: {},
    payload: { filecontent: { test: true } },
    type: 'add-or-replace-config'
  }, null, 2);

  response = '';
  error = '';

  sendPutJson() {
    this.clearOutput();
    this.http.put(this.url, JSON.parse(this.jsonBody)).subscribe({
      next: (res) => this.response = JSON.stringify(res, null, 2),
      error: (err) => this.error = JSON.stringify(err, null, 2)
    });
  }

  sendPutText() {
    this.clearOutput();
    this.http.put(this.url, this.jsonBody, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text'
    }).subscribe({
      next: (res) => this.response = res,
      error: (err) => this.error = JSON.stringify(err, null, 2)
    });
  }

  sendPostJson() {
    this.clearOutput();
    this.http.post(this.url, JSON.parse(this.jsonBody)).subscribe({
      next: (res) => this.response = JSON.stringify(res, null, 2),
      error: (err) => this.error = JSON.stringify(err, null, 2)
    });
  }

  sendPostText() {
    this.clearOutput();
    this.http.post(this.url, this.jsonBody, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text'
    }).subscribe({
      next: (res) => this.response = res,
      error: (err) => this.error = JSON.stringify(err, null, 2)
    });
  }

  private clearOutput() {
    this.response = '';
    this.error = '';
  }
}
