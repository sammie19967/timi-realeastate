// app/api/users/login/route.js

import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';  // Adjust path
import User from '@/models/User';  // Adjust path

export async function POST(req) {
  await connectToDatabase();
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  // Generate JWT token (You can use `jsonwebtoken` package here)
   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return new Response(JSON.stringify({ user: { name: user.name, email: user.email, role: user.role } }), { status: 200 });
}
