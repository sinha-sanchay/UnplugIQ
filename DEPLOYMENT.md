# Challenge Platform - Deployment Guide

A simple, deployable challenge platform with React frontend and Spring Boot backend.

## 🚀 Quick Deploy

### Frontend (React)
The frontend is built and ready for deployment to any static hosting service.

**Free Hosting Options:**
- **Netlify**: Drag & drop the `frontend/dist` folder
- **Vercel**: Connect your GitHub repo
- **GitHub Pages**: Upload dist folder to gh-pages branch
- **Firebase Hosting**: `firebase deploy`

**Build Commands:**
```bash
cd frontend
npm install
npm run build
# Upload the 'dist' folder to your hosting service
```

### Backend (Spring Boot)
The backend can be deployed to various platforms.

**Free Hosting Options:**
- **Railway**: Connect GitHub repo, auto-deploy
- **Render**: Free tier with PostgreSQL
- **Heroku**: Free tier (with limitations)

## 🗄️ Database Setup

You'll need a database for the backend. Here are free options:

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Get connection details from Railway dashboard
4. Update `backend/src/main/resources/application.properties`

### Option 2: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get PostgreSQL connection string
4. Update backend configuration

### Option 3: PlanetScale (MySQL)
1. Go to [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Update backend configuration

## ⚙️ Configuration

### Backend Configuration
Update `backend/src/main/resources/application.properties`:

```properties
# Database Configuration (example for PostgreSQL)
spring.datasource.url=jdbc:postgresql://your-host:5432/your-database
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update

# Server Configuration
server.port=8080
```

### Frontend Configuration
Update `frontend/.env.production`:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_APP_NAME=Challenge Platform
```

## 📁 Project Structure

```
challenge-platform/
├── frontend/                 # React frontend
│   ├── dist/                # Built files (deploy this)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── target/
└── DEPLOYMENT.md
```

## 🔧 Local Development

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.6+

### Setup
1. **Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

## 🌐 Environment Variables

### Required for Production

**Frontend (.env.production):**
- `VITE_API_BASE_URL` - Your backend API URL

**Backend (application.properties):**
- Database connection details
- Server port (default: 8080)

## 📋 Deployment Checklist

- [ ] Database created and configured
- [ ] Backend deployed and running
- [ ] Frontend built (`npm run build`)
- [ ] Frontend environment variables updated
- [ ] Frontend deployed to hosting service
- [ ] CORS configured in backend for frontend domain
- [ ] Test login/registration functionality
- [ ] Test challenge creation and submission

## 🆘 Troubleshooting

**Common Issues:**

1. **CORS Errors**: Update backend CORS configuration
2. **API Connection Failed**: Check VITE_API_BASE_URL
3. **Database Connection**: Verify database credentials
4. **Build Errors**: Run `npm install` and try again

## 📞 Need Help?

If you need specific database credentials or have deployment questions, please provide:
1. Your preferred database type (PostgreSQL, MySQL, SQLite)
2. Your preferred hosting platform
3. Any specific requirements

The platform is designed to work with any standard SQL database and can be deployed to most hosting services.