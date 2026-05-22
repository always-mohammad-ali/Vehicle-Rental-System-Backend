# Vehicle Rental System Backend

A production-style RESTful backend API for a Vehicle Rental System built with Node.js, Express.js, TypeScript, and PostgreSQL.  
The system supports authentication, role-based authorization, vehicle management, and a complete booking workflow with real-time status updates.

---

## Live API

https://vehicle-rental-system-backend-alpha.vercel.app

---

## Repository

https://github.com/always-mohammad-ali/Vehicle-Rental-System-Backend

---

# Architecture Overview

This backend follows a modular layered architecture pattern:


Client → Routes → Controllers → Services → Database (PostgreSQL)


Each layer is separated to ensure:

- Clean code structure
- Scalability
- Maintainability
- Testability

---

# Core Features

## Authentication & Authorization

- JWT-based authentication system
- Secure password hashing using bcrypt
- Role-based access control (Admin / Customer)
- Protected routes using middleware
- Token-based session validation

---

## User Management

- User registration and login
- Role assignment (admin / customer)
- Secure credential storage
- Auth middleware validation

---

## Vehicle Management (Admin)

- Create new vehicles
- Update vehicle details
- Delete vehicles
- View all vehicles
- Manage availability status

---

## Booking System

- Book a vehicle for a specific duration
- Cancel booking (customer-owned only)
- Mark vehicle as returned (admin only)
- Automatic vehicle availability update
- Booking ownership validation

---

## Business Logic

- Prevent unauthorized booking modification
- Enforce ownership-based access control
- Auto-update vehicle availability on booking status change
- Maintain booking lifecycle states:
  - Active
  - Cancelled
  - Returned

---

# Technology Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Neon (cloud database)

## Authentication & Security

- JWT (JSON Web Token)
- bcrypt password hashing

## Deployment

- Vercel (Serverless Functions)
- Neon PostgreSQL (Cloud DB)

---

# System Design

## Database Flow


## User → Booking → Vehicle


Each booking:

- belongs to a user
- references a vehicle
- controls vehicle availability

---

## Booking Lifecycle


Active → Cancelled
Active → Returned


Rules:

- Customers can only cancel their own bookings
- Admins can mark bookings as returned
- Vehicle availability updates automatically

---

# API Endpoints

## Auth Routes

### Register User

POST /api/v1/auth/register


### Login User

POST /api/v1/auth/login


---

## Vehicle Routes

### Get All Vehicles

GET /api/v1/vehicles


### Get Vehicle By ID

GET /api/v1/vehicles/:id


### Create Vehicle (Admin Only)

POST /api/v1/vehicles


### Update Vehicle (Admin Only)

PATCH /api/v1/vehicles/:id


### Delete Vehicle (Admin Only)

DELETE /api/v1/vehicles/:id


---

## Booking Routes

### Create Booking

POST /api/v1/bookings


### Get All Bookings

GET /api/v1/bookings


### Update Booking Status

PATCH /api/v1/bookings/:id


---

# Authentication Flow


User Login
↓
JWT Token Generated
↓
Client Stores Token
↓
Protected Routes Validate Token
↓
Role-Based Access Applied


---

# Role Permissions

## Admin

- Manage all vehicles
- View all bookings
- Mark bookings as returned
- Full system access (restricted business logic only)

## Customer

- View available vehicles
- Create bookings
- Cancel own bookings only
- View own booking history

---

# Database Schema Overview

## Users

- id
- name
- email
- password
- role

## Vehicles

- id
- name
- type
- registration number
- daily rent price
- availability status

## Bookings

- id
- user id
- vehicle id
- start date
- end date
- status

---

# Security Considerations

- Password hashing using bcrypt
- JWT token authentication
- SQL injection prevention using parameterized queries
- Role-based access enforcement
- Ownership validation for sensitive operations

---

# Deployment

## Production Environment

- Hosted on Vercel Serverless Architecture
- PostgreSQL hosted on Neon cloud database

## Live API

https://vehicle-rental-system-backend-alpha.vercel.app

---

# Future Improvements

- Pagination & filtering system
- Advanced search (vehicle type, price range)
- Payment gateway integration
- Email notifications (booking confirmation)
- Admin analytics dashboard
- Unit and integration testing
- Logging system (Winston / Pino)

---

# Tech Highlights

- Clean layered architecture
- Secure authentication system
- Real-world booking lifecycle management
- Production-ready database design
- Scalable serverless deployment

---

# Author

Mohammad Ali

---

# License

This project is intended for educational and portfolio demonstration purposes.