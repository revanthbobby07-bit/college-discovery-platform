import "dotenv/config";
import { db } from "../src/prisma/db";

interface CourseSeed {
  name: string;
  duration: string;
  degree: string;
  fees: number;
}

interface PlacementSeed {
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
}

interface ReviewSeed {
  studentName: string;
  rating: number;
  comment: string;
}

interface CutoffSeed {
  courseName: string;
  category: string;
  cutoffRank: number;
}

interface RelatedData {
  courses: CourseSeed[];
  placements: PlacementSeed[];
  reviews: ReviewSeed[];
  cutoffs: CutoffSeed[];
}

const collegeRelatedData: Record<string, RelatedData> = {
  "Indian Institute of Technology Bombay": {
    courses: [
      { name: "Computer Science & Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Electrical Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Mechanical Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Aerospace Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Data Science & Artificial Intelligence", duration: "2 Years", degree: "M.Tech", fees: 280000 },
    ],
    placements: [
      { averagePackage: 23.5, highestPackage: 168.0, placementRate: 98.2 },
    ],
    reviews: [
      {
        studentName: "Aarav Sharma",
        rating: 4.9,
        comment: "IIT Bombay offers world-class faculty, top-tier research opportunities, and an unbeatable campus life during Techfest and Mood Indigo.",
      },
      {
        studentName: "Priya Nair",
        rating: 4.8,
        comment: "Excellent placement record. Companies like Google, Microsoft, and Goldman Sachs hire heavily from campus.",
      },
      {
        studentName: "Rohan Verma",
        rating: 4.7,
        comment: "Rigorous academic curriculum with top-of-the-line lab facilities and strong alumni support network worldwide.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science & Engineering", category: "General", cutoffRank: 67 },
      { courseName: "Electrical Engineering", category: "General", cutoffRank: 290 },
      { courseName: "Computer Science & Engineering", category: "OBC", cutoffRank: 25 },
      { courseName: "Mechanical Engineering", category: "General", cutoffRank: 1250 },
    ],
  },

  "Indian Institute of Technology Delhi": {
    courses: [
      { name: "Computer Science & Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Electrical Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Chemical Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Mathematics & Computing", duration: "4 Years", degree: "B.Tech", fees: 250000 },
    ],
    placements: [
      { averagePackage: 22.8, highestPackage: 155.0, placementRate: 97.5 },
    ],
    reviews: [
      {
        studentName: "Siddharth Gupta",
        rating: 4.9,
        comment: "Located right in the capital, IIT Delhi has incredible industry exposure and startup incubation opportunities at FITT.",
      },
      {
        studentName: "Ananya Roy",
        rating: 4.8,
        comment: "Mathematics & Computing course is fantastic. Top financial firms and tech majors hire regularly with high packages.",
      },
      {
        studentName: "Karan Mehta",
        rating: 4.7,
        comment: "Highly competitive coding and robotics clubs. Professors are extremely helpful and active in cutting-edge research.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science & Engineering", category: "General", cutoffRank: 115 },
      { courseName: "Mathematics & Computing", category: "General", cutoffRank: 310 },
      { courseName: "Electrical Engineering", category: "General", cutoffRank: 580 },
    ],
  },

  "Indian Institute of Technology Madras": {
    courses: [
      { name: "Computer Science & Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Ocean Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Biotechnology", duration: "4 Years", degree: "B.Tech", fees: 250000 },
      { name: "Engineering Design", duration: "5 Years", degree: "Dual Degree", fees: 300000 },
    ],
    placements: [
      { averagePackage: 21.4, highestPackage: 140.0, placementRate: 96.8 },
    ],
    reviews: [
      {
        studentName: "Vikram Sundaram",
        rating: 4.9,
        comment: "Ranked #1 in NIRF consistently. The Research Park at IIT Madras is unmatched in innovation and industry partnerships.",
      },
      {
        studentName: "Sneha Iyer",
        rating: 4.9,
        comment: "Lush green campus with wildlife roaming around. Peaceful atmosphere paired with intense academic learning.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science & Engineering", category: "General", cutoffRank: 175 },
      { courseName: "Engineering Design", category: "General", cutoffRank: 2400 },
      { courseName: "Biotechnology", category: "General", cutoffRank: 4800 },
    ],
  },

  "National Institute of Technology Tiruchirappalli": {
    courses: [
      { name: "Computer Science & Engineering", duration: "4 Years", degree: "B.Tech", fees: 180000 },
      { name: "Electronics & Communication Engineering", duration: "4 Years", degree: "B.Tech", fees: 180000 },
      { name: "Civil Engineering", duration: "4 Years", degree: "B.Tech", fees: 180000 },
      { name: "Production Engineering", duration: "4 Years", degree: "B.Tech", fees: 180000 },
    ],
    placements: [
      { averagePackage: 15.2, highestPackage: 52.0, placementRate: 94.0 },
    ],
    reviews: [
      {
        studentName: "Karthik Raja",
        rating: 4.6,
        comment: "The top NIT in India. Great technical fests like Festember and Pragyan. Top MNCs hire directly for SDE roles.",
      },
      {
        studentName: "Meera Menon",
        rating: 4.6,
        comment: "Very strong alumni network across core engineering industries and software majors.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science & Engineering", category: "General", cutoffRank: 1500 },
      { courseName: "Electronics & Communication Engineering", category: "General", cutoffRank: 3200 },
      { courseName: "Civil Engineering", category: "General", cutoffRank: 14000 },
    ],
  },

  "Birla Institute of Technology and Science Pilani": {
    courses: [
      { name: "Computer Science", duration: "4 Years", degree: "B.E.", fees: 550000 },
      { name: "Electronics & Instrumentation", duration: "4 Years", degree: "B.E.", fees: 550000 },
      { name: "Mechanical Engineering", duration: "4 Years", degree: "B.E.", fees: 550000 },
      { name: "Economics", duration: "4 Years", degree: "M.Sc. (Dual)", fees: 550000 },
    ],
    placements: [
      { averagePackage: 20.1, highestPackage: 60.0, placementRate: 96.0 },
    ],
    reviews: [
      {
        studentName: "Aditya Joshi",
        rating: 4.6,
        comment: "Zero attendance policy teaches self-discipline. Practice School (PS-II) gives 6 months of corporate internship before graduation.",
      },
      {
        studentName: "Ritika Agarwal",
        rating: 4.5,
        comment: "High quality peer group. BitSAT entrance ensures meritorious batchmates from across the country.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science", category: "General (BITSAT)", cutoffRank: 331 },
      { courseName: "Electronics & Instrumentation", category: "General (BITSAT)", cutoffRank: 266 },
      { courseName: "Mechanical Engineering", category: "General (BITSAT)", cutoffRank: 223 },
    ],
  },

  "Vellore Institute of Technology": {
    courses: [
      { name: "Computer Science & Engineering (AI & ML)", duration: "4 Years", degree: "B.Tech", fees: 200000 },
      { name: "Information Technology", duration: "4 Years", degree: "B.Tech", fees: 200000 },
      { name: "Biomedical Engineering", duration: "4 Years", degree: "B.Tech", fees: 180000 },
    ],
    placements: [
      { averagePackage: 9.2, highestPackage: 102.0, placementRate: 91.5 },
    ],
    reviews: [
      {
        studentName: "Harsh Vardhan",
        rating: 4.4,
        comment: "FFCS (Fully Flexible Credit System) allows students to choose their own timetable and professors. Great infrastructure.",
      },
      {
        studentName: "Divya Patel",
        rating: 4.3,
        comment: "Massive placement drives with 800+ companies visiting campus each academic year.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science & Engineering", category: "VITEEE Cat 1", cutoffRank: 7000 },
      { courseName: "Computer Science & Engineering", category: "VITEEE Cat 2", cutoffRank: 14000 },
      { courseName: "Information Technology", category: "VITEEE Cat 1", cutoffRank: 12000 },
    ],
  },

  "Manipal Institute of Technology": {
    courses: [
      { name: "Computer Science & Engineering", duration: "4 Years", degree: "B.Tech", fees: 400000 },
      { name: "Aeronautical Engineering", duration: "4 Years", degree: "B.Tech", fees: 400000 },
      { name: "Mechatronics Engineering", duration: "4 Years", degree: "B.Tech", fees: 380000 },
    ],
    placements: [
      { averagePackage: 10.8, highestPackage: 54.0, placementRate: 92.0 },
    ],
    reviews: [
      {
        studentName: "Nikhil Kulkarni",
        rating: 4.5,
        comment: "Vibrant student life in Manipal coastal town. Excellent student project clubs like Formula Manipal and Mars Rover.",
      },
      {
        studentName: "Tanya Sen",
        rating: 4.4,
        comment: "Modern lab facilities, spacious campus, and good corporate exposure for internships.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science & Engineering", category: "MET General", cutoffRank: 1100 },
      { courseName: "Mechatronics Engineering", category: "MET General", cutoffRank: 6500 },
    ],
  },

  "SRM Institute of Science and Technology": {
    courses: [
      { name: "Computer Science & Engineering", duration: "4 Years", degree: "B.Tech", fees: 275000 },
      { name: "Cyber Security", duration: "4 Years", degree: "B.Tech", fees: 275000 },
      { name: "Aerospace Engineering", duration: "4 Years", degree: "B.Tech", fees: 250000 },
    ],
    placements: [
      { averagePackage: 7.8, highestPackage: 45.0, placementRate: 89.0 },
    ],
    reviews: [
      {
        studentName: "Rahul Das",
        rating: 4.3,
        comment: "Huge campus with state-of-the-art auditoriums and sports complexes. Good exposure for tech enthusiasts.",
      },
      {
        studentName: "Pooja Reddy",
        rating: 4.2,
        comment: "Decent placements for CS and IT branches with high recruiters count during placement season.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science & Engineering", category: "SRMJEEE Phase 1", cutoffRank: 9500 },
      { courseName: "Cyber Security", category: "SRMJEEE Phase 1", cutoffRank: 15000 },
    ],
  },

  "International Institute of Information Technology Hyderabad": {
    courses: [
      { name: "Computer Science & Engineering", duration: "4 Years", degree: "B.Tech", fees: 350000 },
      { name: "Electronics & Communication Engineering", duration: "4 Years", degree: "B.Tech", fees: 350000 },
      { name: "Computer Science + Human Sciences", duration: "5 Years", degree: "Dual Degree", fees: 350000 },
    ],
    placements: [
      { averagePackage: 30.2, highestPackage: 102.0, placementRate: 100.0 },
    ],
    reviews: [
      {
        studentName: "Varun Reddy",
        rating: 4.8,
        comment: "The coding culture here is legendary. IIIT-H dominates Competitive Programming and GSoC selections every single year.",
      },
      {
        studentName: "Shruti Saxena",
        rating: 4.7,
        comment: "Heavy research curriculum right from 1st year. Highest median package among all computer science institutes in India.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Science & Engineering", category: "JEE Main", cutoffRank: 850 },
      { courseName: "Electronics & Communication Engineering", category: "JEE Main", cutoffRank: 2200 },
      { courseName: "Computer Science (Dual Degree)", category: "UGEE Mode", cutoffRank: 150 },
    ],
  },

  "Delhi Technological University": {
    courses: [
      { name: "Computer Engineering", duration: "4 Years", degree: "B.Tech", fees: 200000 },
      { name: "Software Engineering", duration: "4 Years", degree: "B.Tech", fees: 200000 },
      { name: "Information Technology", duration: "4 Years", degree: "B.Tech", fees: 200000 },
      { name: "Environmental Engineering", duration: "4 Years", degree: "B.Tech", fees: 200000 },
    ],
    placements: [
      { averagePackage: 16.8, highestPackage: 82.0, placementRate: 95.0 },
    ],
    reviews: [
      {
        studentName: "Aman Tyagi",
        rating: 4.6,
        comment: "Formerly DCE. Magnificent campus in Rohini with immense brand value and strong Delhi region quota benefits.",
      },
      {
        studentName: "Simran Kaur",
        rating: 4.5,
        comment: "Outstanding placement stats for tech branches. Top tech giants visit every season.",
      },
    ],
    cutoffs: [
      { courseName: "Computer Engineering", category: "Delhi Region General", cutoffRank: 4200 },
      { courseName: "Software Engineering", category: "Delhi Region General", cutoffRank: 6500 },
      { courseName: "Computer Engineering", category: "Outside Delhi General", cutoffRank: 1800 },
    ],
  },
};

// Generic fallback data for any college not explicitly listed above
const defaultRelatedData: RelatedData = {
  courses: [
    { name: "Computer Science & Engineering", duration: "4 Years", degree: "B.Tech", fees: 200000 },
    { name: "Mechanical Engineering", duration: "4 Years", degree: "B.Tech", fees: 180000 },
  ],
  placements: [
    { averagePackage: 10.0, highestPackage: 40.0, placementRate: 90.0 },
  ],
  reviews: [
    { studentName: "Student User", rating: 4.5, comment: "Great campus environment and good faculty infrastructure." },
  ],
  cutoffs: [
    { courseName: "Computer Science & Engineering", category: "General", cutoffRank: 5000 },
  ],
};

async function main() {
  console.log("Fetching existing colleges from database...");
  const colleges = await db.orm.public.College.all();

  if (colleges.length === 0) {
    console.error("No colleges found in database. Run the primary seed script first!");
    await db.close();
    process.exit(1);
  }

  console.log(`Found ${colleges.length} colleges.`);

  console.log("Clearing existing related records for idempotency...");
  await db.orm.public.Course.where((c) => c.id.gt(0)).deleteAll();
  await db.orm.public.Placement.where((p) => p.id.gt(0)).deleteAll();
  await db.orm.public.Review.where((r) => r.id.gt(0)).deleteAll();
  await db.orm.public.Cutoff.where((c) => c.id.gt(0)).deleteAll();

  let totalCourses = 0;
  let totalPlacements = 0;
  let totalReviews = 0;
  let totalCutoffs = 0;

  for (const college of colleges) {
    const data = collegeRelatedData[college.name] || defaultRelatedData;

    // 1. Insert Courses
    const coursesToInsert = data.courses.map((course) => ({
      collegeId: college.id,
      name: course.name,
      duration: course.duration,
      degree: course.degree,
      fees: course.fees,
    }));
    const createdCourses = await db.orm.public.Course.createAll(coursesToInsert);
    totalCourses += createdCourses.length;

    // 2. Insert Placements
    const placementsToInsert = data.placements.map((placement) => ({
      collegeId: college.id,
      averagePackage: placement.averagePackage,
      highestPackage: placement.highestPackage,
      placementRate: placement.placementRate,
    }));
    const createdPlacements = await db.orm.public.Placement.createAll(placementsToInsert);
    totalPlacements += createdPlacements.length;

    // 3. Insert Reviews
    const reviewsToInsert = data.reviews.map((review) => ({
      collegeId: college.id,
      studentName: review.studentName,
      rating: review.rating,
      comment: review.comment,
    }));
    const createdReviews = await db.orm.public.Review.createAll(reviewsToInsert);
    totalReviews += createdReviews.length;

    // 4. Insert Cutoffs
    const cutoffsToInsert = data.cutoffs.map((cutoff) => ({
      collegeId: college.id,
      courseName: cutoff.courseName,
      category: cutoff.category,
      cutoffRank: cutoff.cutoffRank,
    }));
    const createdCutoffs = await db.orm.public.Cutoff.createAll(cutoffsToInsert);
    totalCutoffs += createdCutoffs.length;
  }

  console.log("\n=== Related Data Seeding Completed Successfully ===");
  console.log(`- Courses inserted: ${totalCourses}`);
  console.log(`- Placements inserted: ${totalPlacements}`);
  console.log(`- Reviews inserted: ${totalReviews}`);
  console.log(`- Cutoffs inserted: ${totalCutoffs}`);
  console.log("===================================================\n");

  await db.close();
}

main().catch(async (error) => {
  console.error("Related data seed failed:", error);
  await db.close();
  process.exit(1);
});
