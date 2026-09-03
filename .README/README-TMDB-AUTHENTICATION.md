# TMDB Authentication Flow

Aplikasi ini menggunakan **TMDB sebagai Identity Provider** untuk proses login user.

Saat ini aplikasi dirancang sebagai **single-user application**, sehingga tidak menggunakan database, sistem signup sendiri, maupun password authentication. User melakukan login menggunakan akun TMDB mereka.

## Overview

Alur authentication menggunakan **TMDB v3 Session Authentication**:

```text
┌──────────────┐
│    User      │
└──────┬───────┘
       │
       │ Click "Login"
       ▼
┌──────────────────────┐
│    Our Application   │
│    /auth/login       │
└──────────┬───────────┘
           │
           │ 1. Create Request Token
           ▼
┌──────────────────────┐
│       TMDB API       │
│ /authentication/     │
│      token/new       │
└──────────┬───────────┘
           │
           │ request_token
           ▼
┌──────────────────────┐
│       TMDB           │
│ Authorization Page   │
└──────────┬───────────┘
           │
           │ User Login & Approve
           ▼
┌──────────────────────┐
│    Our Application   │
│    /auth/callback    │
└──────────┬───────────┘
           │
           │ 2. Create Session
           ▼
┌──────────────────────┐
│       TMDB API       │
│ /authentication/     │
│      session/new     │
└──────────┬───────────┘
           │
           │ session_id
           ▼
┌──────────────────────┐
│    Our Application   │
│                      │
│ Secure HTTP-only     │
│ Cookie                │
└──────────┬───────────┘
           │
           ▼
      Authenticated
         User
```

TMDB authentication documentation:

- [Create Request Token](https://developer.themoviedb.org/reference/authentication-create-request-token)
- [How to Generate a Session ID](https://developer.themoviedb.org/reference/authentication-how-do-i-generate-a-session-id)
- [Create Session](https://developer.themoviedb.org/reference/authentication-create-session)

---

## Authentication Concepts

Ada beberapa credential yang perlu dibedakan.

### 1. `TMDB_API_READ_ACCESS_TOKEN`

Ini adalah credential milik **aplikasi**, bukan milik user.

```text
TMDB_API_READ_ACCESS_TOKEN
        │
        ▼
    TMDB API
        │
        └── Identifies the application
```

Token ini disimpan sebagai environment variable:

```env
TMDB_API_READ_ACCESS_TOKEN=...
```

Token **tidak boleh** menggunakan prefix `NEXT_PUBLIC_`.

```env
# Correct
TMDB_API_READ_ACCESS_TOKEN=...

# Incorrect
NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN=...
```

`TMDB_API_READ_ACCESS_TOKEN` hanya boleh digunakan di server-side code.

Jangan expose token ini ke:

- Browser
- Client Components
- React state
- `localStorage`
- `sessionStorage`
- URL
- Client-side JavaScript bundle

---

### 2. `request_token`

`request_token` adalah token sementara yang diberikan TMDB untuk memulai proses authorization.

Token ini digunakan untuk:

1. Meminta user melakukan authorization di TMDB.
2. Setelah user menyetujui authorization, menukar token tersebut menjadi `session_id`.

Request token bersifat sementara dan memiliki masa berlaku.

```text
Application
    │
    │ Create Request Token
    ▼
  TMDB
    │
    ▼
request_token
```

Request token bukan identitas permanen user dan bukan session aplikasi.

---

### 3. `session_id`

`session_id` adalah credential yang merepresentasikan session user TMDB yang sudah ter-authenticate.

```text
request_token
      │
      │ User approves
      ▼
session_id
```

`session_id` digunakan ketika aplikasi perlu melakukan operasi yang membutuhkan autentikasi user, misalnya operasi terhadap data akun TMDB.

TMDB menyatakan bahwa `session_id` harus diperlakukan seperti password.

Karena itu, `session_id` tidak boleh diekspos ke client.

---

### 4. `account_id`

`account_id` adalah identifier akun TMDB.

```text
account_id
    │
    ▼
TMDB Account
```

`account_id` bukan credential dan bukan pengganti `session_id`.

Hubungannya:

```text
TMDB Account
     │
     ├── account_id
     │
     └── authenticated session
             │
             └── session_id
```

Aplikasi tidak perlu meminta user memasukkan `account_id`. Informasi account dapat diperoleh dari authenticated TMDB session jika diperlukan.

---

# Login Flow

## Step 1 — User Clicks Login

Navbar menyediakan tombol:

```text
[ Login ]
```

Ketika user menekan tombol tersebut, aplikasi mengarahkan user ke route authentication:

```text
/auth/login
```

Route ini berjalan di server.

---

## Step 2 — Create Request Token

Server memanggil TMDB:

```http
GET https://api.themoviedb.org/3/authentication/token/new
```

Dengan header:

```http
Authorization: Bearer <TMDB_API_READ_ACCESS_TOKEN>
```

TMDB mengembalikan:

```json
{
  "success": true,
  "expires_at": "...",
  "request_token": "..."
}
```

Aplikasi mengambil:

```text
request_token
```

---

## Step 3 — Redirect User to TMDB

Aplikasi kemudian mengarahkan user ke halaman authorization TMDB:

```text
https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}
```

Dengan callback:

```text
https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to={CALLBACK_URL}
```

Contoh development:

```text
https://www.themoviedb.org/authenticate/abc123?redirect_to=http://localhost:3000/auth/callback
```

Pada tahap ini user meninggalkan aplikasi sementara dan berada di website TMDB.

---

## Step 4 — User Login and Approves

TMDB menangani proses login.

User:

```text
Login to TMDB
       │
       ▼
Authorize Application
       │
       ▼
      Allow
```

Aplikasi tidak meminta atau menangani password TMDB user.

Setelah user menyetujui authorization, TMDB mengarahkan user kembali ke:

```text
/auth/callback
```

---

## Step 5 — Create Session

Callback kemudian menggunakan request token yang sudah di-authorize untuk membuat session:

```http
POST https://api.themoviedb.org/3/authentication/session/new
```

Request body:

```json
{
  "request_token": "..."
}
```

TMDB mengembalikan:

```json
{
  "success": true,
  "session_id": "..."
}
```

Aplikasi sekarang memiliki:

```text
session_id
```

---

## Step 6 — Store Session Securely

`session_id` tidak dikirim ke client sebagai response data.

Sebaliknya, aplikasi menyimpannya melalui secure HTTP-only cookie.

Konsepnya:

```text
TMDB
 │
 │ session_id
 ▼
Next.js Server
 │
 │ Set-Cookie
 ▼
Browser
 │
 └── HttpOnly Cookie
```

Cookie sebaiknya menggunakan:

```text
HttpOnly
Secure
SameSite=Lax
```

Sesuai kebutuhan environment aplikasi.

Tujuannya agar JavaScript yang berjalan di browser tidak dapat membaca `session_id`.

---

# Authentication State

Client tidak perlu mengetahui `session_id`.

Client cukup mengetahui apakah user sudah authenticated.

Aplikasi menggunakan endpoint seperti:

```text
/auth/me
```

untuk mendapatkan authentication state.

Contoh authenticated response:

```json
{
  "authenticated": true,
  "account": {
    "id": 123456,
    "username": "example",
    "name": "Example"
  }
}
```

Contoh unauthenticated response:

```json
{
  "authenticated": false,
  "account": null
}
```

`session_id` tidak boleh dikembalikan dari endpoint tersebut.

---

# SWR Authentication State

Aplikasi menggunakan **Vercel SWR** untuk mengelola authentication state pada client.

Konsepnya:

```text
/auth/me
     │
     ▼
    SWR
     │
     ▼
Authentication State
     │
     ▼
   Navbar
```

Contoh:

```ts
const { data, isLoading } = useCurrentUser();
```

SWR menyimpan state UI seperti:

```ts
{
  authenticated: true,
  account: {
    id,
    username,
    name
  }
}
```

SWR **tidak menyimpan `session_id`**.

---

# Navbar State

Sebelum login:

```text
┌─────────────────────────────────────────────┐
│ MovieDB    Home   Movies   TV   Search Login │
└─────────────────────────────────────────────┘
```

Setelah login:

```text
┌────────────────────────────────────────────────────┐
│ MovieDB    Home   Movies   TV   Search   Account ▼ │
└────────────────────────────────────────────────────┘
```

Navbar memperoleh state tersebut dari authentication state yang dikelola melalui SWR.

---

# Logout Flow

Ketika user memilih:

```text
Account
   │
   └── Logout
```

aplikasi melakukan dua hal:

1. Menghapus session TMDB menggunakan endpoint TMDB.
2. Menghapus authentication cookie aplikasi.

Flow:

```text
User
 │
 │ Logout
 ▼
Application
 │
 ├── Delete TMDB Session
 │
 └── Delete HTTP-only Cookie
        │
        ▼
     Logged Out
        │
        ▼
     SWR revalidate
        │
        ▼
 Navbar → Login
```

TMDB session deletion:

```http
DELETE https://api.themoviedb.org/3/authentication/session
```

---

# Service Layer

Semua operasi TMDB harus mengikuti arsitektur service yang digunakan project.

Service ditempatkan pada:

```text
shared/service/
```

TMDB API call tidak boleh ditulis langsung di komponen UI.

Konsep:

```text
UI
 │
 ▼
shared/service
 │
 ▼
Next.js Server
 │
 ▼
TMDB API
```

Service authentication secara konseptual menangani:

```text
createRequestToken()
createSession(requestToken)
deleteSession(sessionId)
getCurrentAccount(sessionId)
```

Implementasi aktual harus mengikuti struktur dan naming convention yang sudah digunakan project.

---

# Security Model

Credential aplikasi:

```text
TMDB_API_READ_ACCESS_TOKEN
```

berada di:

```text
.env.local
```

dan hanya digunakan server-side.

Credential user:

```text
session_id
```

disimpan menggunakan secure HTTP-only cookie.

Model keamanan:

```text
                         Browser
                            │
                            │ HTTP-only Cookie
                            │
                            ▼
                     Next.js Server
                      │           │
                      │           │
          TMDB session_id         │
                      │           │
                      │    TMDB API Read Access Token
                      │           │
                      └─────┬─────┘
                            ▼
                           TMDB
```

Browser tidak boleh menerima:

```text
TMDB_API_READ_ACCESS_TOKEN
session_id
```

---

# Why No Database?

Aplikasi saat ini bersifat single-user.

Karena itu aplikasi tidak membutuhkan:

- `users` table
- signup
- password authentication
- user management
- session database
- multi-user account mapping

TMDB menjadi identity provider.

Konsepnya:

```text
Application
     │
     │
     ▼
TMDB Account
     │
     ├── account_id
     └── session_id
```

Database dapat ditambahkan di masa depan jika aplikasi berubah menjadi multi-user atau membutuhkan data aplikasi sendiri.

---

# Complete Flow

```text
┌────────────────┐
│     Navbar     │
│   [ Login ]    │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  /auth/login   │
└───────┬────────┘
        │
        │ GET /authentication/token/new
        ▼
┌────────────────┐
│    TMDB API    │
└───────┬────────┘
        │
        │ request_token
        ▼
┌─────────────────────────┐
│ TMDB Authorization Page │
└───────────┬─────────────┘
            │
            │ User Login
            │ User Approves
            ▼
┌────────────────┐
│ /auth/callback │
└───────┬────────┘
        │
        │ POST /authentication/session/new
        ▼
┌────────────────┐
│    TMDB API    │
└───────┬────────┘
        │
        │ session_id
        ▼
┌────────────────────────┐
│ HTTP-only Cookie       │
│                        │
│ authenticated session  │
└───────────┬────────────┘
            │
            ▼
       /auth/me
            │
            ▼
           SWR
            │
            ▼
          Navbar
            │
            ▼
      [ Account ▼ ]
```

---

# Summary

Authentication aplikasi menggunakan TMDB sebagai identity provider dengan flow:

```text
Login
  ↓
Create Request Token
  ↓
TMDB Authorization
  ↓
Create Session
  ↓
session_id
  ↓
HTTP-only Cookie
  ↓
/auth/me
  ↓
SWR
  ↓
Authenticated Navbar
```

Credential yang digunakan:

| Credential | Fungsi | Penyimpanan |
|---|---|---|
| `TMDB_API_READ_ACCESS_TOKEN` | Credential aplikasi | Server environment variable |
| `request_token` | Token sementara authorization | Temporary / server-side flow |
| `session_id` | Authenticated TMDB session | Secure HTTP-only cookie |
| `account_id` | Identitas akun TMDB | Tidak perlu disimpan untuk flow dasar |

## Prinsip Utama

> **TMDB menangani identity dan login. Aplikasi hanya menangani authentication flow, secure session management, dan UI authentication state.**

Tidak ada password TMDB yang pernah masuk ke aplikasi.

Tidak ada `session_id` yang dikirim ke browser JavaScript.

Tidak ada database user yang diperlukan untuk arsitektur single-user saat ini.
