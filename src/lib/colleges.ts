export type Course = {
  name: string;
  duration: string;
  fees: string;
};

export type College = {
  id: number;
  slug: string;
  name: string;
  city: string;
  state: string;
  type: string;
  ranking: number;
  rating: number;
  image: string;
  description: string;
  feesRange: [number, number];
  acceptance: "High" | "Medium" | "Low";
  courses: Course[];
  placements: {
    salaryRange: string;
    topRecruiters: string[];
    placementRate: string;
  };
  facilities: string[];
  tags: string[];
};

export const colleges: College[] = [
  {
    id: 1,
    slug: "sharda-university",
    name: "Sharda University",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    type: "Private",
    ranking: 48,
    rating: 4.3,
    image: "/images/Sharda University.jpg",
    description:
      "A large private university offering engineering, management, and health-science courses with strong campus facilities.",
    feesRange: [295000, 322000],
    acceptance: "Medium",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹2.95L–₹3.22L/yr" },
      { name: "MBA", duration: "2 years", fees: "₹3L–₹6L total" },
      { name: "BBA", duration: "3 years", fees: "₹1.2L–₹1.6L total" },
    ],
    placements: {
      salaryRange: "₹3.1L–₹10L",
      topRecruiters: ["TCS", "Amazon", "Deloitte", "Cognizant"],
      placementRate: "82%",
    },
    facilities: ["Hostel", "Labs", "Sports", "Medical Center", "Library"],
    tags: ["Engineering", "Management", "Medical", "Law", "Commerce"],
  },
  {
    id: 2,
    slug: "amity-university-noida",
    name: "Amity University, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    type: "Private",
    ranking: 22,
    rating: 4.4,
    image: "/images/Amity University.jpg",
    description:
      "Popular for technology and management programs with strong industry engagement and campus infrastructure.",
    feesRange: [290000, 450000],
    acceptance: "Medium",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹2.9L–₹4.5L/yr" },
      { name: "MBA", duration: "2 years", fees: "₹4.5L total" },
      { name: "BBA", duration: "3 years", fees: "₹2.25L total" },
    ],
    placements: {
      salaryRange: "₹3.5L–₹13L",
      topRecruiters: ["Accenture", "Capgemini", "KPMG", "Microsoft"],
      placementRate: "87%",
    },
    facilities: ["Auditorium", "Research Labs", "Entrepreneurship Cell", "Cafeteria"],
    tags: ["Engineering", "Management", "Law", "Commerce"],
  },
  {
    id: 3,
    slug: "galgotias-university",
    name: "Galgotias University",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    type: "Private",
    ranking: 67,
    rating: 4.0,
    image: "/images/Galgotias University.jpg",
    description:
      "A value-driven campus with affordable fees, strong placement support, and good connectivity to Delhi NCR.",
    feesRange: [220000, 350000],
    acceptance: "High",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹2.2L–₹3.5L/yr" },
      { name: "BBA", duration: "3 years", fees: "₹1.1L total" },
      { name: "BCA", duration: "3 years", fees: "₹1.15L total" },
    ],
    placements: {
      salaryRange: "₹2.8L–₹9L",
      topRecruiters: ["IBM", "Wipro", "L&T Infotech", "HCL"],
      placementRate: "78%",
    },
    facilities: ["Campus Shuttle", "Healthcare", "Wi-Fi", "Gym"],
    tags: ["Engineering", "Management"],
  },
  {
    id: 4,
    slug: "jamia-millia-islamia",
    name: "Jamia Millia Islamia",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    ranking: 12,
    rating: 4.5,
    image: "/images/Jamia Millia Islamia.jpg",
    description:
      "A respected government university offering strong science, arts, and professional courses at affordable fees.",
    feesRange: [60000, 160000],
    acceptance: "Low",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹1L–₹1.6L/yr" },
      { name: "BA", duration: "3 years", fees: "₹60K–₹90K/yr" },
      { name: "BBA", duration: "3 years", fees: "₹90K total" },
    ],
    placements: {
      salaryRange: "₹4L–₹14L",
      topRecruiters: ["Google", "JP Morgan", "EY", "Samsung"],
      placementRate: "91%",
    },
    facilities: ["Library", "Hostel", "Sports Complex", "Campus Health Center"],
    tags: ["Medical", "Arts", "Commerce"],
  },
  {
    id: 5,
    slug: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Government",
    ranking: 2,
    rating: 4.9,
    image: "/images/Indian Institute of Technology Bombay.jpg",
    description:
      "Premier engineering institute known for excellence in technology education and research.",
    feesRange: [200000, 250000],
    acceptance: "Low",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹2L–₹2.5L/yr" },
      { name: "M.Tech", duration: "2 years", fees: "₹1L–₹1.5L/yr" },
    ],
    placements: {
      salaryRange: "₹8L–₹25L",
      topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs"],
      placementRate: "95%",
    },
    facilities: ["Research Labs", "Sports Complex", "Hostel", "Library"],
    tags: ["Engineering"],
  },
  {
    id: 6,
    slug: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    ranking: 3,
    rating: 4.8,
    image: "/images/Indian Institute of Technology Delhi.jpg",
    description:
      "Leading technical institute with world-class faculty and infrastructure.",
    feesRange: [200000, 250000],
    acceptance: "Low",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹2L–₹2.5L/yr" },
      { name: "MBA", duration: "2 years", fees: "₹5L total" },
    ],
    placements: {
      salaryRange: "₹7L–₹22L",
      topRecruiters: ["Facebook", "Adobe", "Flipkart", "Morgan Stanley"],
      placementRate: "94%",
    },
    facilities: ["Innovation Hub", "Sports", "Medical Center", "Cafeteria"],
    tags: ["Engineering"],
  },
  {
    id: 7,
    slug: "iit-madras",
    name: "Indian Institute of Technology Madras",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Government",
    ranking: 1,
    rating: 4.9,
    image: "/images/Indian Institute of Technology Madras.jpg",
    description:
      "Top-ranked IIT with excellent academic programs and research facilities.",
    feesRange: [200000, 250000],
    acceptance: "Low",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹2L–₹2.5L/yr" },
      { name: "M.Tech", duration: "2 years", fees: "₹1L–₹1.5L/yr" },
    ],
    placements: {
      salaryRange: "₹8L–₹24L",
      topRecruiters: ["Apple", "Netflix", "Tesla", "Qualcomm"],
      placementRate: "96%",
    },
    facilities: ["Ocean Engineering Lab", "Sports", "Hostel", "Library"],
    tags: ["Engineering"],
  },
  {
    id: 8,
    slug: "bits-pilani",
    name: "Birla Institute of Technology and Science",
    city: "Pilani",
    state: "Rajasthan",
    type: "Private",
    ranking: 25,
    rating: 4.6,
    image: "/images/Birla Institute of Technology and Science.jpg",
    description:
      "Deemed university known for its integrated curriculum and strong industry connections.",
    feesRange: [400000, 600000],
    acceptance: "Medium",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹4L–₹6L/yr" },
      { name: "MBA", duration: "2 years", fees: "₹8L total" },
    ],
    placements: {
      salaryRange: "₹6L–₹18L",
      topRecruiters: ["Cisco", "Oracle", "Deloitte", "TCS"],
      placementRate: "88%",
    },
    facilities: ["Innovation Labs", "Sports", "Hostel", "Medical Center"],
    tags: ["Engineering"],
  },
  {
    id: 9,
    slug: "vit-vellore",
    name: "VIT University",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Private",
    ranking: 15,
    rating: 4.4,
    image: "/images/VIT University.jpg",
    description:
      "Leading private university with strong engineering and technology programs.",
    feesRange: [350000, 500000],
    acceptance: "Medium",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹3.5L–₹5L/yr" },
      { name: "MBA", duration: "2 years", fees: "₹6L total" },
    ],
    placements: {
      salaryRange: "₹5L–₹15L",
      topRecruiters: ["Infosys", "Wipro", "Accenture", "Cognizant"],
      placementRate: "85%",
    },
    facilities: ["Smart Campus", "Sports", "Hostel", "Research Centers"],
    tags: ["Engineering", "Law"],
  },
  {
    id: 10,
    slug: "iim-ahmedabad",
    name: "Indian Institute of Management Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    type: "Government",
    ranking: 1,
    rating: 4.9,
    image: "/images/Indian Institute of Management Ahmedabad.jpg",
    description:
      "Premier management institute known for excellence in business education.",
    feesRange: [2000000, 2500000],
    acceptance: "Low",
    courses: [
      { name: "MBA", duration: "2 years", fees: "₹20L–₹25L total" },
      { name: "PhD", duration: "4-5 years", fees: "₹5L–₹10L total" },
    ],
    placements: {
      salaryRange: "₹20L–₹40L",
      topRecruiters: ["McKinsey", "BCG", "Goldman Sachs", "Amazon"],
      placementRate: "98%",
    },
    facilities: ["Case Study Rooms", "Sports", "Hostel", "Library"],
    tags: ["Management"],
  },
  {
    id: 11,
    slug: "iim-bangalore",
    name: "Indian Institute of Management Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    type: "Government",
    ranking: 2,
    rating: 4.8,
    image: "/images/Indian Institute of Management Bangalore.jpg",
    description:
      "Top IIM with strong focus on entrepreneurship and innovation.",
    feesRange: [2000000, 2500000],
    acceptance: "Low",
    courses: [
      { name: "MBA", duration: "2 years", fees: "₹20L–₹25L total" },
      { name: "PhD", duration: "4-5 years", fees: "₹5L–₹10L total" },
    ],
    placements: {
      salaryRange: "₹18L–₹35L",
      topRecruiters: ["Google", "Microsoft", "Flipkart", "Uber"],
      placementRate: "97%",
    },
    facilities: ["Innovation Center", "Sports", "Hostel", "Cafeteria"],
    tags: ["Management"],
  },
  {
    id: 12,
    slug: "iim-kolkata",
    name: "Indian Institute of Management Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    type: "Government",
    ranking: 3,
    rating: 4.7,
    image: "/images/Indian Institute of Management Kolkata.jpg",
    description:
      "Historic IIM with strong alumni network and academic excellence.",
    feesRange: [2000000, 2500000],
    acceptance: "Low",
    courses: [
      { name: "MBA", duration: "2 years", fees: "₹20L–₹25L total" },
      { name: "PhD", duration: "4-5 years", fees: "₹5L–₹10L total" },
    ],
    placements: {
      salaryRange: "₹16L–₹32L",
      topRecruiters: ["PWC", "EY", "Deloitte", "TCS"],
      placementRate: "96%",
    },
    facilities: ["Heritage Building", "Sports", "Hostel", "Library"],
    tags: ["Management"],
  },
  {
    id: 13,
    slug: "aiims-delhi",
    name: "All India Institute of Medical Sciences",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    ranking: 1,
    rating: 4.9,
    image: "/images/All India Institute of Medical Sciences.jpg",
    description:
      "Premier medical institute providing world-class healthcare education.",
    feesRange: [10000, 50000],
    acceptance: "Low",
    courses: [
      { name: "MBBS", duration: "5.5 years", fees: "₹10K–₹50K/yr" },
      { name: "MD", duration: "3 years", fees: "₹20K–₹1L/yr" },
    ],
    placements: {
      salaryRange: "₹8L–₹20L",
      topRecruiters: ["Apollo Hospitals", "Max Healthcare", "Fortis"],
      placementRate: "90%",
    },
    facilities: ["Hospital", "Research Labs", "Hostel", "Sports"],
    tags: ["Medical"],
  },
  {
    id: 14,
    slug: "christ-university",
    name: "Christ University",
    city: "Bangalore",
    state: "Karnataka",
    type: "Private",
    ranking: 35,
    rating: 4.3,
    image: "/images/Christ University.jpg",
    description:
      "NAAC accredited university offering diverse programs in arts, commerce, and science.",
    feesRange: [150000, 300000],
    acceptance: "Medium",
    courses: [
      { name: "BBA", duration: "3 years", fees: "₹1.5L–₹3L/yr" },
      { name: "MBA", duration: "2 years", fees: "₹5L total" },
      { name: "BA", duration: "3 years", fees: "₹1L–₹2L/yr" },
    ],
    placements: {
      salaryRange: "₹4L–₹12L",
      topRecruiters: ["Infosys", "Wipro", "Accenture", "Deloitte"],
      placementRate: "82%",
    },
    facilities: ["Campus", "Sports", "Hostel", "Library"],
    tags: ["Management", "Arts", "Commerce"],
  },
  {
    id: 15,
    slug: "jnu-delhi",
    name: "Jawaharlal Nehru University",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    ranking: 8,
    rating: 4.5,
    image: "/images/Jawaharlal Nehru University.jpg",
    description:
      "Central university known for social sciences and humanities programs.",
    feesRange: [5000, 20000],
    acceptance: "Medium",
    courses: [
      { name: "MA", duration: "2 years", fees: "₹5K–₹20K/yr" },
      { name: "PhD", duration: "4-5 years", fees: "₹10K–₹30K/yr" },
    ],
    placements: {
      salaryRange: "₹5L–₹15L",
      topRecruiters: ["Government", "NGOs", "Research Institutes"],
      placementRate: "75%",
    },
    facilities: ["Library", "Hostel", "Sports", "Auditorium"],
    tags: ["Arts"],
  },
  {
    id: 16,
    slug: "banaras-hindu-university",
    name: "Banaras Hindu University",
    city: "Varanasi",
    state: "Uttar Pradesh",
    type: "Government",
    ranking: 10,
    rating: 4.4,
    image: "/images/Banaras Hindu University.jpg",
    description:
      "Ancient university offering comprehensive education in various disciplines.",
    feesRange: [20000, 100000],
    acceptance: "Medium",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹50K–₹1L/yr" },
      { name: "MBA", duration: "2 years", fees: "₹2L total" },
      { name: "MBBS", duration: "5.5 years", fees: "₹20K–₹50K/yr" },
    ],
    placements: {
      salaryRange: "₹4L–₹14L",
      topRecruiters: ["TCS", "Wipro", "Government Jobs"],
      placementRate: "80%",
    },
    facilities: ["Temple", "Sports", "Hostel", "Medical Center"],
    tags: ["Engineering", "Arts", "Commerce"],
  },
  {
    id: 17,
    slug: "university-of-hyderabad",
    name: "University of Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    type: "Government",
    ranking: 18,
    rating: 4.3,
    image: "/images/University of Hyderabad.jpg",
    description:
      "Central university recognized for research and academic excellence.",
    feesRange: [10000, 50000],
    acceptance: "Medium",
    courses: [
      { name: "MA", duration: "2 years", fees: "₹10K–₹50K/yr" },
      { name: "PhD", duration: "4-5 years", fees: "₹20K–₹1L/yr" },
    ],
    placements: {
      salaryRange: "₹5L–₹12L",
      topRecruiters: ["Research", "Academia", "Government"],
      placementRate: "78%",
    },
    facilities: ["Research Labs", "Library", "Hostel", "Sports"],
    tags: ["Arts"],
  },
  {
    id: 18,
    slug: "iiser-pune",
    name: "Indian Institute of Science Education and Research Pune",
    city: "Pune",
    state: "Maharashtra",
    type: "Government",
    ranking: 5,
    rating: 4.7,
    image: "/images/Indian Institute of Science Education and Research Pune.jpg",
    description:
      "IISER focused on science education and research at undergraduate level.",
    feesRange: [50000, 100000],
    acceptance: "Low",
    courses: [
      { name: "BS-MS", duration: "5 years", fees: "₹50K–₹1L/yr" },
      { name: "PhD", duration: "5 years", fees: "₹50K–₹1L/yr" },
    ],
    placements: {
      salaryRange: "₹6L–₹18L",
      topRecruiters: ["Research Institutes", "Pharma", "Tech"],
      placementRate: "85%",
    },
    facilities: ["Labs", "Library", "Hostel", "Sports"],
    tags: ["Arts", "Science"],
  },
  {
    id: 19,
    slug: "tiss-mumbai",
    name: "Tata Institute of Social Sciences",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Government",
    ranking: 40,
    rating: 4.2,
    image: "/images/Tata Institute of Social Sciences.jpg",
    description:
      "Premier institute for social work and development studies.",
    feesRange: [50000, 150000],
    acceptance: "Medium",
    courses: [
      { name: "MA", duration: "2 years", fees: "₹50K–₹1.5L/yr" },
      { name: "PhD", duration: "4-5 years", fees: "₹50K–₹1L/yr" },
    ],
    placements: {
      salaryRange: "₹4L–₹10L",
      topRecruiters: ["NGOs", "Government", "UN"],
      placementRate: "80%",
    },
    facilities: ["Library", "Hostel", "Sports", "Auditorium"],
    tags: ["Arts"],
  },
  {
    id: 20,
    slug: "iit-kharagpur",
    name: "Indian Institute of Technology Kharagpur",
    city: "Kharagpur",
    state: "West Bengal",
    type: "Government",
    ranking: 4,
    rating: 4.8,
    image: "/images/Indian Institute of Technology Kharagpur.jpg",
    description:
      "Oldest IIT with comprehensive engineering and technology programs.",
    feesRange: [200000, 250000],
    acceptance: "Low",
    courses: [
      { name: "B.Tech", duration: "4 years", fees: "₹2L–₹2.5L/yr" },
      { name: "MBA", duration: "2 years", fees: "₹5L total" },
    ],
    placements: {
      salaryRange: "₹7L–₹20L",
      topRecruiters: ["TCS", "Microsoft", "Google", "ISRO"],
      placementRate: "93%",
    },
    facilities: ["Rajendra Prasad Hall", "Sports", "Hostel", "Library"],
    tags: ["Engineering"],
  },
];

export function getCollegeBySlug(slug: string) {
  return colleges.find((college) => college.slug === slug);
}

