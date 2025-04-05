// app/api/users/register/route.js

import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';  // Adjust path
import User from '@/models/User';  // Adjust path

export async function POST(req) {
  await connectToDatabase();
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: 'Name, email, and password are required' }), { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();

  return new Response(JSON.stringify(newUser), { status: 201 });
}
