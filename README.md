

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



##  Installation

1. **Clone repo ini**

```bash
git clone <repo-url>
cd technical-sgt
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Setup Environment Variables**

Buat file `.env` di root folder:

```env
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

4. **Jalanin Backend API**

Pastikan backend API udah jalan di `http://localhost:8001`, gunakan yang npm run dev:firebase

5. **Run Development Server**

```bash
npm run dev
# atau
yarn dev
```



## Authentication Flow

1. User buka app `/`, Auto redirect ke `/login`
2. User login pake email & password
3. Firebase return ID token
4. Token disimpen di localStorage
5. AuthGuard check token sebelum akses protected routes
6. Setiap API call kirim token di Authorization header
7. Backend verify token pake Firebase Admin SDK`

## 🌐 API Architecture

```
Frontend (Axios) → Next.js API Routes → Backend API (External)
```

Frontend gak langsung call backend API, tapi lewat Next.js API routes sebagai proxy:

- `GET /api/products` → Backend: `GET /api/web/v1/products`
- `GET /api/product` → Backend: `GET /api/web/v1/product`
- `POST /api/product` → Backend: `POST /api/web/v1/product`
- `PUT /api/product` → Backend: `PUT /api/web/v1/product`

## 🎨 Fitur Detail

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
