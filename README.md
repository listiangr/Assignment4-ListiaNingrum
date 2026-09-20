# Assignment 4 - Automation Testing

Project ini dibuat untuk memenuhi **Assignment 4 AfterOffice** dengan implementasi automation testing menggunakan **Cypress**.

Automation testing pada project ini mencakup:

- API Testing
- UI Testing
- Login Testing
- CRUD Script Labs

---

## Tools

- Cypress
- JavaScript
- Node.js

---

## Target Testing

### UI

https://labs.hendri.me/

### API

https://api-script-labs.hendri.me/api-docs/

---

## Struktur Project

```text
cypress/
└── e2e/
    ├── api/
    │   └── ...
    └── ui/
        ├── login-ui.cy.js
        └── crud-labs.cy.js
```

---

## API Automation Testing

Automation testing API dilakukan menggunakan Cypress terhadap endpoint Script Labs API.

Method yang diuji:

- GET
- POST
- PUT
- DELETE

Pengujian dilakukan untuk memastikan endpoint dapat menerima request dan memberikan response sesuai dengan skenario testing.

---

## UI Automation Testing

UI automation testing dilakukan pada website Script Labs.

### Login Testing

Skenario yang diuji:

- Validasi tampilan halaman login
- Login dengan credential yang salah
- Login dengan credential yang benar

Credential yang digunakan untuk pengujian:

```text
Email    : standard_user@example.com
Password : script_sauce
```

Pada skenario login berhasil dilakukan validasi terhadap beberapa elemen setelah login, seperti:

- Greeting user
- Tombol Logout
- Halaman Product Shop

---

## CRUD Script Labs

Pengujian CRUD dilakukan dalam satu flow automation.

Skenario yang dijalankan:

1. Login menggunakan credential yang valid
2. Membuka menu Script CRUD
3. Membuat data Script Lab baru
4. Memastikan data berhasil dibuat
5. Mengubah description data
6. Memastikan data berhasil diperbarui
7. Menghapus data
8. Memastikan data berhasil dihapus

Title Script Lab dibuat secara dinamis menggunakan timestamp agar data tetap unik ketika automation dijalankan berulang kali.

Contoh:

```text
Cypress Test 1789831910773
```

---

## Menjalankan Project

Pastikan Node.js dan npm sudah terinstall.

Install dependency:

```bash
npm install
```

Buka Cypress Test Runner:

```bash
npx cypress open
```

Kemudian pilih:

```text
E2E Testing
```

dan jalankan test yang tersedia.

---

## Menjalankan UI Testing

### Login Testing

```bash
npx cypress run --spec "cypress/e2e/ui/login-ui.cy.js"
```

### CRUD Testing

```bash
npx cypress run --spec "cypress/e2e/ui/crud-labs.cy.js"
```

---

## Menjalankan Seluruh Testing

```bash
npx cypress run
```

---

## Test Coverage

| Kategori | Skenario |
|---|---|
| API | GET |
| API | POST |
| API | PUT |
| API | DELETE |
| UI | Validasi Halaman Login |
| UI | Login Gagal |
| UI | Login Berhasil |
| UI | Create Script Lab |
| UI | Update Script Lab |
| UI | Delete Script Lab |

---

## Author

**Listia Ningrum**

Assignment 4 - Automation Testing
