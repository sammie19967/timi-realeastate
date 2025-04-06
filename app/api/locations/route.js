import Location from "@/models/Location";
import { connectDB } from "@/lib/dbConnect";


export async function GET() {
  await connectDB();
  const locations = await Location.find();
  return Response.json(locations);
}
