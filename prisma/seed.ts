import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding authentic database...');
  
  await prisma.college.deleteMany();

  await prisma.college.create({
    data: {
      name: 'Indian Institute of Technology (IIT) Bombay',
      location: 'Mumbai, Maharashtra',
      description: 'IIT Bombay is recognized worldwide as a leader in the field of engineering education and research. Established in 1958, it is renowned for its exceptional faculty and outstanding students.',
      fees: 250000, 
      rating: 4.9,
      placement: 95.5,
      averagePackage: 21.82,
      highestPackage: 367.0,
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2886&auto=format&fit=crop',
      courses: {
        create: [
          { name: 'B.Tech Computer Science and Engineering', duration: '4 Years', fees: 250000 },
          { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: 250000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 250000 }
        ]
      }
    }
  });

  await prisma.college.create({
    data: {
      name: 'Delhi University',
      location: 'New Delhi',
      description: 'The University of Delhi is a premier university of the country with a venerable legacy and international acclaim for highest academic standards.',
      fees: 15000,
      rating: 4.6,
      placement: 85.0,
      averagePackage: 9.5,
      highestPackage: 35.0,
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop',
      courses: {
        create: [
          { name: 'B.Com (Hons)', duration: '3 Years', fees: 15000 },
          { name: 'B.A. Economics (Hons)', duration: '3 Years', fees: 14000 }
        ]
      }
    }
  });

  await prisma.college.create({
    data: {
      name: 'Birla Institute of Technology and Science (BITS)',
      location: 'Pilani, Rajasthan',
      description: 'BITS Pilani is an all-India Institute for higher education. The primary motive of BITS is to train young men and women able and eager to create and put into action such ideas.',
      fees: 541000,
      rating: 4.8,
      placement: 94.0,
      averagePackage: 30.37,
      highestPackage: 60.75,
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format&fit=crop',
      courses: {
        create: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 541000 },
          { name: 'B.E. Electronics & Instrumentation', duration: '4 Years', fees: 541000 }
        ]
      }
    }
  });

  await prisma.college.create({
    data: {
      name: 'Vellore Institute of Technology (VIT)',
      location: 'Vellore, Tamil Nadu',
      description: 'VIT was established with the aim of providing quality higher education on par with international standards. It persistently seeks and adopts innovative methods to improve the quality of higher education.',
      fees: 295000,
      rating: 4.2,
      placement: 88.0,
      averagePackage: 9.23,
      highestPackage: 102.0,
      imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2874&auto=format&fit=crop',
      courses: {
        create: [
          { name: 'B.Tech Information Technology', duration: '4 Years', fees: 295000 },
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 295000 }
        ]
      }
    }
  });

  console.log('Authentic data seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
