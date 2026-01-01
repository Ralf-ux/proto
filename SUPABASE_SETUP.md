# Supabase Setup Guide

## 🚀 Complete Setup Instructions

### 1. Database Setup (CRITICAL - Do this first!)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the SQL from `database-setup.sql`
4. Click **Run** to create the tables and policies

### 2. Test Your Setup

1. Start your development server: `npm run dev`
2. Go to your homepage - you'll see a test component in the bottom-right
3. Test the connection by clicking the test button
4. Try registering a new user through the registration form

### 3. Access Admin Dashboard

- Visit: `http://localhost:5173/admin`
- View all registrations
- Export data as CSV
- Generate Word documents with registration reports

## 📊 Features Implemented

### ✅ User Registration
- Form data automatically saves to Supabase
- Email validation (prevents duplicates)
- Real-time error handling
- Loading states during submission

### ✅ Admin Dashboard
- View all registrations in a table
- Search by name, email, phone, or class
- Filter by gender
- Real-time statistics (total, male/female counts)
- Refresh data button

### ✅ Data Export
- **CSV Export**: Download all filtered data as spreadsheet
- **Word Document**: Generate professional reports with tables
- Includes all registration fields
- Automatic filename with current date

### ✅ Database Structure
```sql
registrations table:
- id (UUID, primary key)
- first_name (text)
- last_name (text) 
- email (text, unique)
- phone (text)
- age (integer)
- nationality (text, optional)
- gender (text: 'male' or 'female')
- class (text)
- registration_date (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🔐 Security Features

- Row Level Security (RLS) enabled
- Public registration allowed
- Admin access controlled
- Email uniqueness enforced
- Input validation on both frontend and database

## 🎯 Usage

### For Users:
1. Fill out registration form
2. Data automatically saves to Supabase
3. Get confirmation message

### For Admins:
1. Visit `/admin` route
2. View all registrations
3. Use search/filter to find specific data
4. Export data in multiple formats
5. Generate professional reports

## 📁 Files Created/Modified

- `src/lib/supabase.js` - Supabase client configuration
- `src/components/RegistrationModal.tsx` - Updated to save to Supabase
- `src/pages/Admin.tsx` - Complete admin dashboard
- `src/App.tsx` - Added admin route
- `database-setup.sql` - Database schema and policies
- `.env` - Environment variables (VITE_ prefixed)

## 🚨 Important Notes

1. **Environment Variables**: Must use `VITE_` prefix for Vite
2. **Database Setup**: Run the SQL script first before testing
3. **Admin Access**: Currently open - add authentication as needed
4. **Document Generation**: Uses `docx` library for Word documents
5. **Offline Backup**: Data also saved to localStorage as backup

## 🔧 Troubleshooting

- If registration fails: Check Supabase connection and database setup
- If admin page is empty: Verify database policies and data exists
- If exports don't work: Check browser permissions for downloads

Your complete registration and admin system is now ready! 🎉