# Challenge Platform

A modern web application for creating and participating in various types of challenges (Writing, Speaking, Logical).

## 🌟 Features

- **User Authentication**: Secure login and registration
- **Challenge Management**: Browse and participate in different challenge types
- **Submission System**: Submit responses to challenges with rich text support
- **User Dashboard**: Track your submissions and progress
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Feedback**: Instant validation and error handling

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and building
- CSS3 with responsive design
- Axios for API communication

**Backend:**
- Spring Boot (Java)
- JPA/Hibernate for database operations
- RESTful API design
- JWT authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.6+

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd challenge-platform
   ```

2. **Start the backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Start the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

## 📦 Deployment

This project is designed for easy deployment to free hosting services:

- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Railway, Render, Heroku
- **Database**: Railway PostgreSQL, Supabase, PlanetScale

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🎯 Challenge Types

- **Writing**: Creative writing prompts and exercises
- **Speaking**: Presentation and communication challenges
- **Logical**: Problem-solving and analytical thinking tasks

## 📁 Project Structure

```
challenge-platform/
├── frontend/                 # React frontend
│   ├── dist/                # Built files (ready to deploy)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # React context providers
│   │   └── styles/          # CSS styles
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Spring Boot backend
│   ├── src/
│   │   └── main/java/com/backend/
│   │       ├── controller/  # REST Controllers
│   │       ├── model/       # JPA Entities
│   │       ├── repository/  # Data repositories
│   │       └── service/     # Business logic
│   ├── pom.xml
│   └── target/
└── DEPLOYMENT.md            # Deployment guide
```

## 🗄️ Database Setup

The application requires a SQL database. For development, you can use:

### Quick Setup with Railway (Free)
1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy the connection details
4. Update `backend/src/main/resources/application.properties`

### Database Configuration
```properties
# PostgreSQL (recommended)
spring.datasource.url=jdbc:postgresql://your-host:5432/your-database
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update
```

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | ❌ |
| POST | `/api/users/login` | User login | ❌ |
| GET | `/api/challenges` | Get all challenges | ❌ |
| GET | `/api/challenges/{id}` | Get challenge by ID | ❌ |
| POST | `/api/submissions` | Submit challenge response | ✅ |
| GET | `/api/submissions/user/{userId}` | Get user submissions | ✅ |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This project was created with the assistance of Kiro AI.