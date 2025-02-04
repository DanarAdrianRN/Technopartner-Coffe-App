// src/services/api.js

// Fungsi untuk login
export async function loginUser(email, password) {
    const formData = new URLSearchParams({
      grant_type: 'password',
      client_secret: '0a40f69db4e5fd2f4ac65a090f31b823',
      client_id: 'e78869f77986684a',
      username: email,
      password: password,
    });
  
    const response = await fetch('https://soal.staging.id/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    return response.json();
  }
  
  // Fungsi untuk ambil data Home
  export async function getHomeData(token_type, access_token) {
    const response = await fetch('https://soal.staging.id/api/home', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token_type} ${access_token}`,
      },
    });
    return response.json();
  }
  
  // Fungsi untuk ambil data Menu
  export async function getMenuData(token_type, access_token) {
    const body = JSON.stringify({ show_all: "1" });
    const response = await fetch('https://soal.staging.id/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token_type} ${access_token}`,
      },
      body: body,
    });
    return response.json();
  }
  