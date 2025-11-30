-- Create Database
CREATE DATABASE IF NOT EXISTS expand_db;
USE expand_db;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 1),
  image VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  username VARCHAR(255),
  email VARCHAR(255),
  items JSON NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Cart Table (optional, for storing carts)
CREATE TABLE IF NOT EXISTS cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert Sample Products
INSERT INTO products (name, price, rating, image, description) VALUES
('EXPAND Sonic Pro', 199, 4.8, '/images/pro1.jpg', 'High-fidelity noise-cancelling headphones built for pure clarity and comfort.'),
('EXPAND Ultra Bass', 249, 4.7, '/images/pro2.jpg', 'Deep bass powerhouse designed for gaming and music lovers.'),
('EXPAND Air Lite', 149, 4.5, '/images/pro3.jpg', 'Lightweight, breathable, and perfect for daily travel and workouts.'),
('EXPAND Max Studio', 299, 4.9, '/images/pro4.jpg', 'Studio-grade monitoring headphones for creators and professionals.'),
('EXPAND Wireless Elite', 179, 4.6, '/images/pro5.jpg', 'Premium wireless connectivity with 40-hour battery life and quick charging.'),
('EXPAND Retro Classic', 129, 4.4, '/images/pro6.jpg', 'Vintage-inspired design with modern sound quality and comfort.');
