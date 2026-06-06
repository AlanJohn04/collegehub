import { prisma } from "@/lib/db";
import CompareClient from "./CompareClient";

export default async function ComparePage() {
  const colleges = await prisma.college.findMany({
    orderBy: { name: 'asc' },
    select: { 
      id: true, 
      name: true, 
      location: true, 
      fees: true, 
      rating: true, 
      placement: true, 
      averagePackage: true, 
      highestPackage: true, 
      imageUrl: true 
    }
  });

  return <CompareClient colleges={colleges} />;
}
