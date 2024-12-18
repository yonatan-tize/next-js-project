import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/usersModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest){
  try {
    // find user by email
    const {email, password} = await request.json()
    const user = await User.findOne({email})
  
    if (!user){
      return NextResponse.json({ error: "invalid credential"}, {status: 401});
    };
  
    //validate password
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "invalid credential"}, {status: 401});
    };
  
    //generate jwt and return to the user
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email
    }
    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET_KEY!, {expiresIn: '1d'})
  
  } catch (error) {
    return NextResponse.json({ error}, {status: 500});
    
  }
} 