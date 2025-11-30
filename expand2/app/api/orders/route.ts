import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const connection = await pool.getConnection();
    const [orders] = await connection.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
    connection.release();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_id, username, email, items, total, status } = await req.json();
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'INSERT INTO orders (user_id, username, email, items, total, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [user_id, username, email, JSON.stringify(items), total, status]
    );
    
    connection.release();
    return NextResponse.json({ id: (result as any).insertId, username, total, status });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
