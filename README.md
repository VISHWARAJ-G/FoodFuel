# FoodFuel  
### Transforming Food Waste into Meals for the Hungry

> A full-stack food waste management platform designed to reduce food wastage and combat hunger by connecting restaurants, donors, volunteers, and NGOs through a centralized digital ecosystem.

---

## Problem Statement

India faces a massive food wastage crisis while millions of people continue to suffer from hunger every day. A significant portion of surplus food from restaurants, hotels, grocery stores, and events goes to waste due to lack of efficient redistribution systems.

**FoodFuel** aims to bridge this gap by creating a technology-driven platform that enables:

- Efficient food donation management
- NGO coordination
- Volunteer-based food delivery
- Real-time donation tracking
- Sustainable food redistribution workflows

---

# Features

## Donor Management
- Restaurants and food providers can donate surplus food
- Easy food listing and donation workflow
- Real-time food availability updates

## NGO Integration
- NGOs can browse and accept available food donations
- Verified coordination between donors and receivers

## Volunteer Coordination
- Volunteers assist in food pickup and delivery
- Streamlined transportation workflow

## Authentication System
- Secure login and user validation
- Role-based access management

## Real-Time Tracking
- Monitor food collection and delivery activities
- Improve operational transparency

## Responsive User Interface
- Mobile-friendly and responsive frontend
- Cross-browser compatibility

---

# System Workflow

```text
Donor Registration
        ↓
Food Verification
        ↓
Donation Posting
        ↓
NGO Acceptance
        ↓
Volunteer Pickup
        ↓
Food Delivery
        ↓
People in Need Receive Food
```

---

# Tech Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Tailwind CSS

## Backend
- Flask
- Python
- REST APIs
- Flask-CORS

## Database
- MariaDB

## Tools & Technologies
- Git
- GitHub
- Postman
- VS Code

---

# Project Structure

```bash
FoodFuel/
│
├── backend/
│   ├── venv/
│   ├── dbconnect.py
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/VISHWARAJ-G/FoodFuel.git
```

---

## 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
```

### Activate Virtual Environment (Windows)

```bash
.\venv\Scripts\Activate.ps1
```

### Install Dependencies

```bash
pip install flask flask-cors mariadb python-dotenv
```

### Run Backend Server

```bash
python dbconnect.py
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
---

# Objectives

- Reduce food wastage through efficient redistribution
- Combat hunger by connecting food donors with NGOs
- Promote sustainability and responsible food management
- Encourage community participation and volunteer engagement
- Ensure safe and organized food distribution

---

# Future Enhancements

- Live GPS tracking for deliveries
- AI-based food demand prediction
- Notification system for nearby NGOs
- Cloud deployment using AWS/Azure
- Analytics dashboard for food waste insights
- Mobile application support

---

# Contributors

- **Geerthivash J D**  
  Team Lead & Backend Developer

- **Vishwaraj G**  
  Full Stack Developer

- **Dineshkarthik N**  
  Research & Resource Management

- **Vijey K S**  
  UI/UX Designer

- **Santhosh T**  
  Documentation & Presentation
---

---

# ⭐ Support

If you found this project valuable, consider giving it a ⭐ on GitHub.

Together, technology can help reduce hunger and food waste.