[LINK DRIVE MBTI DAN SCREENSHOT APLIKASI](https://drive.google.com/drive/u/1/folders/1j4J-2KcZhKxmD06X1MsVMHfEW_3sdOX-)



##  Fitur

- **CRUD Product**: Bisa create, read, update produk
- **Search & Filter**: Cari produk berdasarkan nama, deskripsi, atau kategori
- **Pagination**: Pagination buat list produk
- **Authentication**: Login/Register pake Firebase Auth
- **Protected Routes**: Halaman produk cuma bisa diakses kalo udah login
- **Responsive Design**: Bisa dibuka di mobile dan desktop

##  Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Ant Design (antd)
- **HTTP Client**: Axios
- **Authentication**: Firebase Auth
- **State Management**: React Context + TanStack Query (React Query)
- **Styling**: Tailwind CSS



## 📦 Persyaratan Sistem

Sebelum mulai, pastikan sistem kamu udah penuhi requirements berikut:

### Minimum Requirements:
- **Node.js**: v18.17.0 atau lebih baru (recommended: v20.x LTS)
- **npm**: v9.0.0 atau lebih baru (otomatis include sama Node.js)
- **yarn** (optional): v1.22.0 atau lebih baru
- **RAM**: Minimal 4GB
- **Storage**: Minimal 500MB free space

### Cara Ngecek Versi:

```bash
# Cek versi Node.js
node --version
# Output contoh: v20.11.0

# Cek versi npm
npm --version
# Output contoh: 10.2.4


### Install Node.js (kalo belum ada):

- Download installer dari [nodejs.org](https://nodejs.org/)
- Pilih versi LTS (Long Term Support)
- Jalanin installer dan ikutin instruksinya


**Verify Installation:**
```bash
node --version
npm --version
```

### Install Yarn (Optional):

```bash
# Via npm
npm install -g yarn

# Verify
yarn --version
```

##  Installation

### 1. Clone Repository

Clone repo ini ke local machine kamu:

```bash
# Clone via HTTPS
git clone https://github.com/username/technical-sgt.git



# Masuk ke folder project
cd technical-sgt

#gunakan branch main saja, branch lain untuk development
```

### 2. Install Dependencies

Install semua package yang dibutuhin project:

**Pake npm:**
```bash
npm install
```


### 3. Setup Environment Variables

Buat file `.env` atau `.env.local` di root folder project:



```env
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8001/api/web/v1

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Dapetin Firebase Config:**
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project kamu (atau buat baru)
3. Masuk ke Project Settings → General
4. Scroll ke bawah ke bagian "Your apps"
5. Pilih web app atau tambah web app baru
6. Copy semua config values ke `.env.local`

### 4. Setup & Jalanin Backend API

**PENTING:** Project ini butuh backend API buat jalan. Backend harus running sebelum jalanin frontend.

**Clone Backend Repository:**
```bash
# Di folder terpisah (bukan di folder frontend)
cd ..
git clone <backend-repo-url>
cd technical-test-be

# Install dependencies backend
npm install
```

**Setup Backend Environment:**
Buat file `.env.dev` di folder backend sesuai instruksi di README backend.

**Jalanin Backend:**
```bash
# Dengan Firebase Auth (recommended)
npm run dev:firebase

# Atau tanpa Firebase (untuk testing)
npm run dev
```

Backend harus jalan di `http://localhost:8001`.

**Verify backend jalan:**
```bash
curl http://localhost:8001/api/web/v1/products
```

### 5. Run Development Server (Frontend)

Balik ke folder frontend project dan jalanin development server:

**Pake npm:**
```bash
npm run dev
```

**Atau pake yarn:**
```bash
yarn dev
```

Server akan jalan di `http://localhost:3000`.

**Expected Output:**
```
▲ Next.js 14.2.18
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in 1.5s
```

### 6. Buka di Browser

Buka browser dan akses:
```
http://localhost:3000
```

Kamu akan di-redirect otomatis ke halaman login.

---

## 🎮 Available Commands

Setelah instalasi selesai, ini command-command yang bisa dipake:

### Development
```bash
# Jalanin development server
npm run dev

# Build aplikasi
npm run build




## Authentication Flow

1. User buka app `/`, Auto redirect ke `/login`
2. User login pake email & password
3. Firebase return ID token
4. Token disimpen di localStorage
5. AuthGuard check token sebelum akses protected routes
6. Setiap API call kirim token di Authorization header
7. Backend verify token pake Firebase Admin SDK`

##  API Architecture

```
Frontend (Axios) → Next.js API Routes → Backend API (External)
```

Frontend gak langsung call backend API, tapi lewat Next.js API routes sebagai proxy:

- `GET /api/products` → Backend: `GET /api/web/v1/products`
- `GET /api/product` → Backend: `GET /api/web/v1/product`
- `POST /api/product` → Backend: `POST /api/web/v1/product`
- `PUT /api/product` → Backend: `PUT /api/web/v1/product`


### Product Management

- **List Products**: Table dengan pagination, search, dan filter
- **Create Product**: Modal form buat tambah produk baru
- **Edit Product**: Modal form buat update produk
- **Detail Product**: Modal buat liat detail produk
- **Search**: Real-time search dengan debounce 300ms
- **Pagination**: Pagination buat navigate antar halaman

### Authentication

- **Login**: Email/password authentication pake Firebase
- **Register**: Daftar akun baru
- **Protected Routes**: Auto redirect ke login kalo belum login
- **Auto Logout**: Token expired → otomatis logout
- **Persistent Session**: Token disimpen di localStorage


### Code Structure

- **API Routes**: Semua API calls lewat Next.js API routes sebagai proxy
- **State Management**: React Context buat auth, React Query buat data fetching
- **Form Handling**: Ant Design Form dengan validation
- **Error Handling**: Error message ditampilin pake Ant Design message component
- **Loading States**: Loading indicator di setiap async operation
