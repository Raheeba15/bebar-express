# 🍺 BeBar — Bar & Brewery Web App

A full-stack bar-themed web application built with Node.js, Express, EJS, and MongoDB. Features a customer-facing storefront, product catalogue, order flow, and a complete admin dashboard for product management.

🔗 **Live Demo:
https://be-bar-express.vercel.app/

Screenshots:
<img width="1344" height="596" alt="Screenshot (124)" src="https://github.com/user-attachments/assets/74bd4414-4cf8-4052-b7d3-bde2d16b4ad5" />
<img width="1366" height="595" alt="Screenshot (125)" src="https://github.com/user-attachments/assets/13c8a4f8-560e-443f-a485-d8179ab77526" />
<img width="1366" height="606" alt="Screenshot (127)" src="https://github.com/user-attachments/assets/8eac870e-c857-4154-bf24-d7fd3a52338b" />


## Features

**Customer Side**
- Homepage with hero section, happenings/events, and customer testimonials carousel
- Bar & Menu page with drinks, meals, and games catalogue
- Buy Now flow with payment and order success pages
- Contact page with enquiry form
- Responsive design across all screen sizes

**Admin Dashboard** (`/admin`)
- Product management with full CRUD (Create, Read, Update, Delete)
- Dashboard with live stats — total products, categories, average & max price
- Paginated product listings
- Add/edit product forms with validation

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Templating | EJS + express-ejs-layouts |
| Database | MongoDB + Mongoose |
| Styling | Vanilla CSS + Font Awesome |
| Fonts | Google Fonts (Alegreya) |
| Dev Tools | Nodemon |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

# Clone the repo
git clone https://github.com/Raheeba15/BeBar-Express.git

# Project Structure

```
bebar-express/
├── models/
│   ├── Product.js
│   ├── order.js
│   └── user.js
├── routes/
│   ├── adminRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── views/
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── products.ejs
│   │   └── product-form.ejs
│   ├── partials/
│   ├── index.ejs
│   ├── barandmenu.ejs
│   ├── happenings.ejs
│   ├── contact.ejs
│   └── layout.ejs
├── public/
│   ├── css/
│   └── js/
├── db.js
├── server.js
└── vercel.json
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/barandmenu` | Bar & Menu catalogue |
| `/happenings` | Events & happenings |
| `/contact` | Contact form |
| `/buynow` | Purchase flow |
| `/payment` | Payment page |
| `/success` | Order success |
| `/admin` | Admin dashboard |
| `/admin/products` | Product management |

---
## Author

**Raheeba Aamir**  
Final Year CS Student @ COMSATS University  
