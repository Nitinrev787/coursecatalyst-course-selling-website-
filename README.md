# 🎓 CourseCat – Course Selling Web App

**CourseCat** is a full-stack course-selling platform where users can register, log in, explore available courses, purchase them using Razorpay, and access the course videos securely. It’s built using a simple frontend (HTML + CSS + Bootstrap + PHP for some views) and a robust Node.js + Express backend with MongoDB.

---

## ✨ Key Features

- 🔐 **User Authentication (JWT)**
  - Secure registration and login
  - JWT stored in HTTP-only cookies for safe session management

- 💳 **Razorpay Payment Gateway**
  - Test mode integration with order creation
  - Webhook setup for payment verification
  - Course access granted only after successful payment

- 📚 **"My Courses" Page**
  - Logged-in users can view purchased courses
  - Course video access controlled by payment + JWT

- 🔁 **Buy Button Flow**
  - After successful payment, users are redirected to "My Courses"

- 🎨 **Frontend**
  - Built with Bootstrap and custom CSS
  - Responsive and simple UI for user interaction

---

## 🧰 Tech Stack

| Layer     | Technology                     |
|-----------|---------------------------------|
| Frontend  | HTML, CSS, Bootstrap, PHP views|
| Backend   | Node.js, Express.js             |
| Database  | MongoDB                         |
| Auth      | JWT, bcrypt                     |
| Payment   | Razorpay                        |

---

## 📂 Folder Structure

