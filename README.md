# Profile Management and Location Mapping Web Application

## Description
This is a web application built using **React** for the frontend, **Tailwind CSS**, **Shadcn UI**, **Magic UI** for design, and **Supabase** for the backend. The application allows users to view a collection of profiles, interactively explore the addresses of each profile on an integrated map (using Google Maps or Mapbox), and provides features such as profile creation, editing, and deletion. It also offers a search bar to filter profiles based on different criteria.

### Key Features:
- **Profile Display**: View a collection of profiles with essential information such as name, photograph, email, phone number, description, and gender.
- **Interactive Mapping**: Visualize the geographic location of each profile on a map (Google Maps or Mapbox integration).
- **Summary Integration**: Clicking the “Summary” button displays the map component with a marker indicating the precise address of the selected profile.
- **Admin Panel**: Admin users can manage profiles, including adding, editing, and deleting profiles.
- **Search and Filter**: The user section allows searching and filtering profiles by name, location, phone number, email, gender, and last signed-in.
- **Responsive Design**: The application is mobile-friendly and works seamlessly on smartphones and tablets.
- **Profile Details**: A separate view for each profile providing additional details like contact information, interests, etc.
- **Login/Signup**: Users can register, log in, and admins have predefined credentials for easy access (`admin@admin.com`, `user@user.com`) **Password**: (`123456789`).

---

## Technologies Used:
- **Frontend**: React, Tailwind CSS, Shadcn UI, Magic UI
- **Backend**: Supabase (for Database, Authentication, and File Storage)
- **Map Integration**: Google Maps or Mapbox API
- **Authentication**: Supabase Auth
- **State Management**: React Context API (or Zustand)

---

## Installation Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/DevanshBajpai09/bynry-assignment.git
npm install
npm run dev
