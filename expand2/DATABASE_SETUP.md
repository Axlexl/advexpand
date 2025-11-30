# EXPAND App - Database Setup Guide

## 📋 Prerequisites
- phpMyAdmin or MySQL installed
- Localhost MySQL running (typically on port 3306)
- Default user: root (no password)

## 🗄️ Step 1: Create Database

### Using phpMyAdmin:
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click "SQL" tab
3. Copy the entire contents of `database.sql` file from the root directory
4. Paste it into the SQL input field
5. Click "Go" to execute

### Using MySQL Command Line:
```bash
mysql -u root
source C:\path\to\expand2\database.sql
```

## ⚙️ Step 2: Configure Environment Variables

The `.env.local` file is already created with these settings:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=expand_db
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**If your MySQL has a password, update it:**
```
DB_PASSWORD=your_mysql_password
```

## 🚀 Step 3: Start the App

```bash
cd expand2
npm run dev
```

The app will run on `http://localhost:3000`

## 📊 Database Structure

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed with bcryptjs)
- created_at

### Products Table
- id (Primary Key)
- name
- price
- rating
- image
- description
- created_at
- updated_at

### Orders Table
- id (Primary Key)
- user_id (Foreign Key)
- username
- email
- items (JSON)
- total
- status
- created_at

### Cart Items Table
- id (Primary Key)
- user_id (Foreign Key)
- product_id (Foreign Key)
- quantity
- created_at

## 🔗 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order

## 🧪 Test the Connection

1. Register a new user at `/register`
2. Try adding a product from the `/products` page
3. Add to cart and checkout
4. Check the orders in `/orders` page
5. As admin (username: adminexpand), manage products from `/admin`

## ❌ Troubleshooting

### Error: "Unable to acquire lock"
- Stop the dev server: `Ctrl+C`
- Kill any running node processes
- Restart: `npm run dev`

### Error: "Connection refused"
- Check if MySQL is running
- Verify DB credentials in `.env.local`
- Ensure database name matches in `.env.local`

### Error: "Table doesn't exist"
- Re-run the SQL script from `database.sql`
- Check that you're in the correct database

## 📝 Notes
- Current setup uses localStorage fallback if database connection fails
- All passwords are hashed with bcryptjs
- Cart items can be stored in database or localStorage
- Orders are permanently stored in the database
