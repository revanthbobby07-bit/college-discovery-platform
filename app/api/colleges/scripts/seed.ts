import "dotenv/config";
import { db } from "../../../../src/prisma/db";

async function main() {
    console.log("Adding colleges...");

    const colleges = await db.orm.public.College.createAll([
        {
            name: "Indian Institute of Technology Bombay",
            location: "Powai, Mumbai",
            city: "Mumbai",
            state: "Maharashtra",
            fees: 250000,
            rating: 4.8,
            overview:
                "A premier engineering institute offering undergraduate and postgraduate programs across engineering, technology, science, and management.",
        },
        {
            name: "Indian Institute of Technology Delhi",
            location: "Hauz Khas, New Delhi",
            city: "New Delhi",
            state: "Delhi",
            fees: 250000,
            rating: 4.8,
            overview:
                "A leading technical institute known for engineering education, research, innovation, and strong industry connections.",
        },
        {
            name: "Indian Institute of Technology Madras",
            location: "Chennai, Tamil Nadu",
            city: "Chennai",
            state: "Tamil Nadu",
            fees: 250000,
            rating: 4.9,
            overview:
                "A premier institute offering high-quality education and research opportunities in engineering, science, technology, and related fields.",
        },
        {
            name: "National Institute of Technology Tiruchirappalli",
            location: "Tiruchirappalli, Tamil Nadu",
            city: "Tiruchirappalli",
            state: "Tamil Nadu",
            fees: 180000,
            rating: 4.6,
            overview:
                "A leading NIT offering undergraduate and postgraduate programs with a strong focus on engineering education and research.",
        },
        {
            name: "Birla Institute of Technology and Science Pilani",
            location: "Pilani, Rajasthan",
            city: "Pilani",
            state: "Rajasthan",
            fees: 550000,
            rating: 4.5,
            overview:
                "A private technical university known for engineering, science, research, innovation, and its practice-oriented academic programs.",
        },
        {
            name: "Vellore Institute of Technology",
            location: "Vellore, Tamil Nadu",
            city: "Vellore",
            state: "Tamil Nadu",
            fees: 200000,
            rating: 4.4,
            overview:
                "A private university offering a wide range of engineering and technology programs with modern campus facilities.",
        },
        {
            name: "Manipal Institute of Technology",
            location: "Manipal, Karnataka",
            city: "Manipal",
            state: "Karnataka",
            fees: 400000,
            rating: 4.4,
            overview:
                "An engineering institute offering undergraduate and postgraduate programs with emphasis on technology, innovation, and research.",
        },
        {
            name: "SRM Institute of Science and Technology",
            location: "Kattankulathur, Tamil Nadu",
            city: "Kattankulathur",
            state: "Tamil Nadu",
            fees: 275000,
            rating: 4.3,
            overview:
                "A multidisciplinary university offering engineering, technology, science, management, and other higher education programs.",
        },
        {
            name: "International Institute of Information Technology Hyderabad",
            location: "Gachibowli, Hyderabad",
            city: "Hyderabad",
            state: "Telangana",
            fees: 350000,
            rating: 4.7,
            overview:
                "A research-focused institute specializing in computer science, information technology, artificial intelligence, and related areas.",
        },
        {
            name: "Delhi Technological University",
            location: "Rohini, New Delhi",
            city: "New Delhi",
            state: "Delhi",
            fees: 200000,
            rating: 4.5,
            overview:
                "A public technical university offering engineering and technology programs with a strong academic and industry orientation.",
        },
    ]);

    console.log(`Added ${colleges.length} colleges.`);

    await db.close();
}

main().catch(async (error) => {
    console.error("Seed failed:", error);
    await db.close();
    process.exit(1);
});