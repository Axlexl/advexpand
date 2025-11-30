import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.query('SELECT * FROM products ORDER BY id');
    connection.release();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, rating, image, description } = await req.json();
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'INSERT INTO products (name, price, rating, image, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, price, rating, image, description]
    );
    
    connection.release();
    return NextResponse.json({ id: (result as any).insertId, name, price, rating, image, description });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
