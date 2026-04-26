# 🌍 My Travel Map

**My Travel Map** is an interactive web project created as part of a web programming course.  
The project helps users plan their travels, save favorite destinations, and visualize visited places on a personal interactive map.

---

## 🔗 Live Website  
👉 [Visit the website](https://vygodinaola-sys.github.io/My-Travel-Map/)  

---

## 📌 Project Description

The project aims to simplify travel planning and management of personal destinations:

- Search for new destinations  
- View destination information  
- Add destinations to favorites  
- Mark visited places  
- Upload personal photos  
- View all visited destinations on an interactive map

---

## 🧭 Website Screens (6 Pages)

### 1️⃣ Home Page – Plan a New Trip
- Hero section with search bar  
- Short explanation of how the system works  
- Popular destinations carousel  
- Call-to-action to view the personal map  
- Feedback for non-implemented links (tooltip on hover)  

✅ **Implemented**

---

### 2️⃣ Destinations Page – Browse All Destinations
- Grid/cards layout for multiple destinations  
- Each card is clickable  
- Leads to the destination details page  

✅ **Implemented**

---

### 3️⃣ Destination Details Page – Destination Guide
- Full-page hero with city name and country  
- Large background image of the city  
- Action buttons:
  - **Mark as Visited**  
  - **Add to Favorites**
- About section:
  - Detailed description of the destination  
  - Inline gallery of notable landmarks
- Sidebar:
  - **Fast Facts**: language, currency, transport, etc.  
  - **My Travel Journal**:
    - Upload personal photos  
    - Add experience: name, rating, title, description, tips  
    - Submit reviews stored and displayed on the map popup
- Fully interactive with LocalStorage to store visited/favorite destinations and user content  

✅ **Implemented**  
*(Pages include: Barcelona, London, New York, Paris, Rome, Tokyo)*

---

### 4️⃣ My Map Page – Personal Map
- Interactive map using [Leaflet.js](https://leafletjs.com/)  
- Markers for each visited city  
- Popup showing city name and user-uploaded photos  
- Uses LocalStorage to store visited destinations and photos  

✅ **Implemented (basic functionality)**

---

### 5️⃣ Favorites Page – Saved Destinations
- List of favorite destinations  
- Filters by continent, category, rating, and budget  
- Search by destination name  
- Option to remove a destination from favorites  
- Navigation to destination page or personal map  

✅ **Implemented**

---

### 6️⃣ Login / Sign Up Pages – Authentication
- Login form with email and password validation  
- Sign-up form with password confirmation and email validation  
- Navigation between login and registration pages  

✅ **Implemented**

---

### 7️⃣ About Page – Project Vision
- Information about the platform's mission and "Who is it for?"
- Highlights the unique value of organizing travel memories visually
- Call-to-action for the travel quiz

✅ **Implemented**

---

### 8️⃣ Quiz Page – Discover Your Travel Style
- Interactive 3-step quiz (Travel style, Budget, View preference)
- Analyzes user preferences to suggest matching destinations
- Features a progress bar and visual selection cards
  
✅ **Implemented**

---

## 🧱 Technologies Used

- **HTML5**  
  - Semantic structure (`header`, `nav`, `main`, `section`, `footer`)  
- **CSS3**  
  - Flexbox, Grid  
  - Responsive design  
  - Gradients, shadows, hover effects, and transitions  
- **JavaScript**  
  - Vanilla JS for interactivity  
  - jQuery for Favorites and form handling  
  - LocalStorage for favorites and personal photos  
- **Leaflet.js** — interactive map  
- **Font Awesome** — icons  

---

## 📱 Responsive Design

- Fully responsive layout  
- Optimized for:  
  - Desktop  
  - Tablet  
  - Mobile (≤ 768px)  
- Separate responsive styles using media queries  

---

## 🎯 Course Requirements – Covered

✔️ 8 different screens  
✔️ Complex layouts with multiple sections  
✔️ Different content and structure per page  
✔️ Responsive design  
✔️ Semantic HTML structure  
✔️ User feedback for non-implemented links  
✔️ Filters, search, removal of favorites, interactive map  
✔️ Form validation for login and registration  
✔️ Popups with photos on the map  

---

## 👩‍💻 Author

- **Olya Vygodina**  
- **Adi Oknin**  
- **Amir Doh**  

Web Programming Course Project, 2025–2026
