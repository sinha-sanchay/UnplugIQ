# 🧠 UnplugIQ - Backend

An AI-powered backend system for **UnplugIQ**, a platform to enhance English communication skills through writing, speaking, and vocabulary — with intelligent feedback, scoring, and user progress tracking.

---

## 🚀 Features

- ✅ User Registration (working)
- 🔐 JWT-based Authentication
- 🔒 Secure Password Encryption
- 🗂️ Structured REST APIs
- 💾 PostgreSQL Database Integration
- 📈 User Progress & Points (tracked)
- 🧠 ML Integration Placeholder (writing evaluation, AI detection, etc.)
- ❌ Login via UI (pending; backend ready and tested in Postman)

---

## 📦 Tech Stack

| Layer         | Technology              |
|---------------|--------------------------|
| Language      | Java 17                  |
| Framework     | Spring Boot 3.x          |
| Security      | Spring Security + JWT    |
| Database      | PostgreSQL               |
| Build Tool    | Maven                    |
| Auth Logic    | CustomUserDetailsService |
| Token         | JWT                      |
| Dev Tools     | Lombok, Postman          |

---

## 📁 Project Structure

```
src/main/java/com/backend
├── controller       # REST Controllers
├── dto              # LoginRequest, LoginResponse, etc.
├── model            # User Entity
├── repository       # Spring Data JPA interfaces
├── security         # JWT Filter, Custom UserDetails, Config
├── service          # Business Logic (Registration, Login)
└── UnplugIqApplication.java
```

---

## 📬 API Endpoints

| Method | Endpoint                 | Description                       | Auth |
|--------|--------------------------|-----------------------------------|------|
| POST   | `/api/users/register`    | Register new user                 | ❌   |
| POST   | `/api/users/login`       | Login with username or email      | ❌   |
| GET    | `/api/users/me`          | Get logged-in user info           | ✅   |
| GET    | `/api/users/progress`    | Get points/stars/progress         | ✅   |

---

## ⚙️ How to Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/unplugiq-backend.git
cd unplugiq-backend
```

### 2️⃣ Configure `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/unplugiq
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

jwt.secret=your_super_secret_key
spring.jpa.hibernate.ddl-auto=update
```

Make sure PostgreSQL is running and the database `unplugiq` is created.

---

### 3️⃣ Run the App

```bash
./mvnw spring-boot:run
```

Or run `UnplugIqApplication.java` in IntelliJ/VS Code.

---

## 🧪 API Testing (Postman)

### ✅ Register (Works)

**POST** `http://localhost:8080/api/users/register`

```json
{
  "name": "Sanchay Sinha",
  "username": "sanchay123",
  "email": "sanchay@example.com",
  "password": "yourpassword"
}
```

### ✅ Login (Backend working)

**POST** `http://localhost:8080/api/users/login`

```json
{
  "identifier": "sanchay@example.com",  // or use username
  "password": "yourpassword"
}
```

Returns:

```json
{
  "token": "Bearer eyJhbGciOiJIUzI1NiIs..."
}
```

Set this in Postman headers:

```
Authorization: Bearer <token>
```

---

## 🖥️ Frontend Status

- ✅ Registration UI connected
- ❌ Login not fully working (token handling fix needed)
- 🧪 Backend login tested via Postman

---

## 🧠 Future Roadmap

- 📌 AI Feedback for writing (tone, grammar, etc.)
- 📌 Speaking analysis & transcription
- 📌 Vocabulary tracking & daily challenge
- 🌟 Points → Stars leveling like HackerRank
- 📈 Dashboard analytics

---

## 🧑‍💻 Author

**Sanchay Sinha**  
Backend Developer | Java | Spring Boot | PostgreSQL  
🔗 GitHub: [github.com/YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
