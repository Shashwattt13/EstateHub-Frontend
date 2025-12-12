# 🏡 EstateHub – Real Estate Marketplace (Frontend)

EstateHub is a modern real-estate web platform built with **React + Tailwind CSS**.
It allows users to browse properties, view details, chat with sellers, save favorites, and for owners/brokers to list and manage properties.

---

## 🚀 Features

### 🔍 Public Features

* Browse all properties
* Search by city, deal type (Buy/Rent), BHK, property type, price
* View full property details
* Image gallery with fullscreen preview
* Reviews & Ratings
* Trending cities section
* Responsive UI with Tailwind

### 👤 User Features

* Login / Signup (JWT based)
* View personal dashboard
* Save / Unsave properties
* Quick enquiry form
* Demo chat interface

### 🏠 Owner/Broker Features

* List new properties (min 1 – max 3 images)
* Edit property details
* Delete property with confirmation
* View “My Listings” dashboard

---

## 📂 Project Structure

```
src/
 ├── components/     # UI components (cards, gallery, review modals, etc.)
 ├── context/        # Auth + Property global state
 ├── pages/          # Main pages (Home, Properties, Auth, Details, Dashboard)
 ├── services/       # API handler (Axios)
 ├── utils/          # Formatters (price, ratings)
 ├── assets/         # Static images (optional)
```

---

## 🔧 Tech Stack

* **React + Vite**
* **Tailwind CSS**
* **Axios**
* **React Router**
* **MERN Backend** (connected via `/api`)

---

## 🛠️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/YOUR_USERNAME/EstateHub-Frontend.git
cd EstateHub-Frontend
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Start development server

```
npm run dev
```

Frontend will run at:
👉 `http://localhost:5173`

---

## 🔗 API Configuration

Edit the API URL in:

```
src/services/api.js
```

Example:

```js
const API_URL = "http://localhost:5000/api";
```

---

## 📦 Build for Production

```
npm run build
```

---

## 🌐 Deployment (Netlify)

1. Run `npm run build`
2. Upload `dist/` folder to Netlify **or** connect GitHub repo
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables if needed

---

## 🔮 Upcoming Features

* Real backend chat (WebSockets)
* Cloudinary image storage
* Admin dashboard
* OTP-based password reset

---

## Author

**Shashwat Singh**
shashwatsingh.6912@gmail.com
Frontend of the EstateHub MERN project.

