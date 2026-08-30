# LMS App — React + DummyJSON API

Aplikasi Learning Management System (LMS) sederhana berbasis React yang mengonsumsi [DummyJSON API](https://dummyjson.com/docs).

---

## Library yang Digunakan

| Library | Versi | Kegunaan |
|---|---|---|
| [React](https://react.dev) | ^19 | UI framework |
| [React DOM](https://react.dev) | ^19 | Rendering ke browser |
| [React Router DOM](https://reactrouter.com) | ^7 | Client-side routing & protected routes |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Utility-first styling |
| [Vite](https://vite.dev) | ^8 | Build tool & dev server |

---

## Fitur Utama (Minimum Requirement)

- **Daftar User** — menampilkan data user dari `GET /users` dengan limit per halaman
- **Detail User** — halaman detail tiap user via `GET /users/:id` (foto, email, telepon, alamat, dll)
- **Pagination** — navigasi halaman dengan tombol Prev/Next dan nomor halaman (ellipsis otomatis)
- **Responsive Design** — tampilan optimal di desktop dan mobile

---

## Fitur Tambahan

- **Authentication** — login via `POST /auth/login` dengan validasi form, token disimpan di `localStorage`, session persist saat refresh
- **Protected Routes** — halaman `/dashboard`, `/users`, dan `/users/:id` hanya bisa diakses saat sudah login
- **Role-based Authorization** — halaman `/admin` hanya bisa diakses oleh user dengan role `admin`
- **CRUD Users** — Create (`POST /users/add`), Read, Update (`PUT /users/:id`), Delete (`DELETE /users/:id`)
- **Dashboard Tugas** — CRUD tugas lokal (tanpa API) dengan state management React
- **Reusable Components** — `Button` (5 variant), `Card`, `Navbar`, `ProtectedRoute`, `RoleRoute`
- **Custom Hook** — `useFetch` untuk abstraksi GET/POST/PUT/DELETE ke API

---

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

**Akun demo:** `emilys` / `emilyspass`

---

## Struktur Project

```
src/
├── components/
│   ├── Button.jsx        # Reusable button (5 variant)
│   ├── Card.jsx          # Reusable card container
│   ├── Navbar.jsx        # Navigasi dengan conditional links
│   ├── ProtectedRoute.jsx
│   ├── RoleRoute.jsx
│   ├── TugasList.jsx
│   └── TugasItem.jsx
├── hooks/
│   └── useFetch.js       # Custom hook GET/POST/PUT/DELETE
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Users.jsx         # CRUD + pagination
│   ├── UserDetail.jsx    # Detail user
│   ├── About.jsx
│   └── AdminPanel.jsx
└── App.jsx               # Routing & auth state
```

---

## Link Repository

[https://github.com/febrikayuseta/fwd-12](https://github.com/febrikayuseta/fwd-12)
