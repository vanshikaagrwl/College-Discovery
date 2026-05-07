"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CollegeListingCard from "@/components/CollegeListingCard";
import Link from "next/link";

const collegeData: Record<string, any[]> = {
  usa: [
    {
      name: "Massachusetts Institute of Technology, Cambridge",
      location: "Massachusetts, USA",
      image: "/images/usa-colleges/massachusetts-institute-technology.webp",
      rating: "9.0",
      featuredCourse: "MS Electrical Engineering & Computer Science",
      fees: "₹61.1L/Yr",
      duration: "2 Years",
      exam: "TOEFL 100",
      ranking: "1 by College Discovery Study Abroad",
      description: "MIT is a world-class institution known for its rigorous academic programs and groundbreaking research in science and technology.",
      admissionRate: "7%",
      founded: "1861"
    },
    {
      name: "Harvard University, Cambridge",
      location: "Massachusetts, USA",
      image: "/images/usa-colleges/Harvard-University.jpg",
      rating: "10.0",
      featuredCourse: "LLM",
      fees: "₹76.73L/Yr",
      duration: "1 Year",
      exam: "Duolingo 125 | TOEFL 100 | PTE",
      ranking: "2 by College Discovery Study Abroad",
      description: "Harvard is the oldest institution of higher learning in the United States and is legendary for its academic excellence.",
      admissionRate: "5%",
      founded: "1636"
    },
    {
      name: "Stanford University, Stanford",
      location: "California, USA",
      image: "/images/usa-colleges/Stanford University.webp",
      rating: "9.3",
      featuredCourse: "MBA",
      fees: "₹81.48L/Yr",
      duration: "2 Years",
      exam: "GMAT 738 | TOEFL 5.5 | PTE 68",
      ranking: "4 by College Discovery Study Abroad",
      description: "Stanford is located in the heart of Silicon Valley and is a leader in innovation and entrepreneurship.",
      admissionRate: "4%",
      founded: "1885"
    },
    {
      name: "Princeton University, Princeton",
      location: "New Jersey, USA",
      image: "/images/usa-colleges/Princeton University.webp",
      rating: "9.4",
      featuredCourse: "MS Computer Science",
      fees: "₹45.5L/Yr",
      duration: "2 Years",
      exam: "TOEFL 105",
      ranking: "5 by Global Rankings",
      description: "Princeton is world-renowned for its commitment to undergraduate teaching and research excellence.",
      admissionRate: "6%",
      founded: "1746"
    },
    {
      name: "Yale University, New Haven",
      location: "Connecticut, USA",
      image: "/images/usa-colleges/Yale University.webp",
      rating: "9.2",
      featuredCourse: "Masters in Law",
      fees: "₹68.2L/Yr",
      duration: "1 Year",
      exam: "IELTS 7.5",
      ranking: "8 by Global Rankings",
      description: "Yale is famous for its residential college system and its top-ranked schools of law, management, and drama.",
      admissionRate: "6%",
      founded: "1701"
    },
    {
      name: "Columbia University, New York",
      location: "New York, USA",
      image: "/images/usa-colleges/Columbia University.webp",
      rating: "8.9",
      featuredCourse: "MSc Finance",
      fees: "₹72.4L/Yr",
      duration: "1.5 Years",
      exam: "GMAT 710",
      ranking: "12 by Global Rankings",
      description: "Columbia's location in New York City provides students with unparalleled opportunities for research and professional experience.",
      admissionRate: "6%",
      founded: "1754"
    },
    {
      name: "University of Pennsylvania, Philadelphia",
      location: "Pennsylvania, USA",
      image: "/images/usa-colleges/University of Pennsylvania.webp",
      rating: "9.1",
      featuredCourse: "Master of Architecture",
      fees: "₹55.8L/Yr",
      duration: "3 Years",
      exam: "GRE 320",
      ranking: "15 by Global Rankings",
      description: "UPenn is home to the world's first collegiate business school, Wharton, and is a pioneer in interdisciplinary education.",
      admissionRate: "8%",
      founded: "1740"
    },
    {
      name: "California Institute of Technology, Pasadena",
      location: "California, USA",
      image: "/images/usa-colleges/California Institute of Technology.webp",
      rating: "9.5",
      featuredCourse: "PhD in Physics",
      fees: "₹48.2L/Yr",
      duration: "5 Years",
      exam: "TOEFL 110",
      ranking: "2 by Global Rankings",
      description: "Caltech is a world-renowned science and engineering institute that marshals some of the world's brightest minds.",
      admissionRate: "7%",
      founded: "1891"
    }
  ],
  uk: [
    {
      name: "University of Oxford, Oxford",
      location: "Oxfordshire, UK",
      image: "/images/uk-colleges/Oxford%20University.webp",
      rating: "9.8",
      featuredCourse: "MSc Computer Science",
      fees: "£32.5K/Yr",
      duration: "1 Year",
      exam: "IELTS 7.5 | TOEFL 110",
      ranking: "1 by UK University Guide"
    },
    {
      name: "University of Cambridge, Cambridge",
      location: "Cambridgeshire, UK",
      image: "/images/uk-colleges/University%20of%20Cambridge.webp",
      rating: "9.7",
      featuredCourse: "Master of Finance",
      fees: "£48.2K/Yr",
      duration: "1 Year",
      exam: "IELTS 7.5 | TOEFL 110",
      ranking: "2 by UK University Guide"
    },
    {
      name: "Imperial College London, London",
      location: "London, UK",
      image: "/images/uk-colleges/Imperial%20College%20London.webp",
      rating: "9.5",
      featuredCourse: "MSc Mechanical Engineering",
      fees: "£35.4K/Yr",
      duration: "1 Year",
      exam: "IELTS 7.0 | TOEFL 100",
      ranking: "3 by UK University Guide"
    },
    {
      name: "University College London (UCL), London",
      location: "London, UK",
      image: "/images/uk-colleges/University%20College%20London%20(UCL).webp",
      rating: "9.4",
      featuredCourse: "MSc Data Science",
      fees: "£31.2K/Yr",
      duration: "1 Year",
      exam: "IELTS 7.0 | TOEFL 100",
      ranking: "4 by UK University Guide"
    },
    {
      name: "University of Edinburgh, Edinburgh",
      location: "Scotland, UK",
      image: "/images/uk-colleges/University%20of%20Edinburgh.webp",
      rating: "9.2",
      featuredCourse: "MSc Artificial Intelligence",
      fees: "£29.8K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5 | TOEFL 92",
      ranking: "5 by UK University Guide"
    },
    {
      name: "University of Manchester, Manchester",
      location: "Manchester, UK",
      image: "/images/uk-colleges/University%20of%20Manchester.webp",
      rating: "9.0",
      featuredCourse: "MSc International Business",
      fees: "£27.5K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "6 by UK University Guide"
    },
    {
      name: "King's College London, London",
      location: "London, UK",
      image: "/images/uk-colleges/King's%20College%20London.webp",
      rating: "8.9",
      featuredCourse: "LLM",
      fees: "£30.4K/Yr",
      duration: "1 Year",
      exam: "IELTS 7.0 | TOEFL 100",
      ranking: "7 by UK University Guide"
    },
    {
      name: "London School of Economics (LSE), London",
      location: "London, UK",
      image: "/images/uk-colleges/London%20School%20of%20Economics%20(LSE).webp",
      rating: "9.6",
      featuredCourse: "MSc Economics",
      fees: "£34.2K/Yr",
      duration: "1 Year",
      exam: "IELTS 7.5 | TOEFL 110",
      ranking: "8 by UK University Guide"
    }
  ],
  canada: [
    {
      name: "University of Toronto, Toronto",
      location: "Ontario, Canada",
      image: "/images/canada-colleges/University%20of%20Toronto.webp",
      rating: "9.1",
      featuredCourse: "Master of Applied Science",
      fees: "CAD 45K/Yr",
      duration: "2 Years",
      exam: "IELTS 7.0 | TOEFL 93",
      ranking: "1 in Canada"
    },
    {
      name: "University of British Columbia, Vancouver",
      location: "British Columbia, Canada",
      image: "/images/canada-colleges/University%20of%20British%20Columbia.webp",
      rating: "9.0",
      featuredCourse: "Master of Engineering",
      fees: "CAD 42K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "2 in Canada"
    },
    {
      name: "McGill University, Montreal",
      location: "Quebec, Canada",
      image: "/images/canada-colleges/McGill%20University.webp",
      rating: "8.9",
      featuredCourse: "MBA",
      fees: "CAD 58K/Yr",
      duration: "2 Years",
      exam: "IELTS 7.0 | GMAT 670",
      ranking: "3 in Canada"
    },
    {
      name: "University of Waterloo, Waterloo",
      location: "Ontario, Canada",
      image: "/images/canada-colleges/University%20of%20Waterloo.webp",
      rating: "8.8",
      featuredCourse: "MMath Computer Science",
      fees: "CAD 38K/Yr",
      duration: "2 Years",
      exam: "IELTS 7.0 | TOEFL 95",
      ranking: "4 in Canada"
    },
    {
      name: "University of Alberta, Edmonton",
      location: "Alberta, Canada",
      image: "/images/canada-colleges/University%20of%20Alberta.webp",
      rating: "8.6",
      featuredCourse: "MSc Civil Engineering",
      fees: "CAD 32K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 88",
      ranking: "5 in Canada"
    },
    {
      name: "McMaster University, Hamilton",
      location: "Ontario, Canada",
      image: "/images/canada-colleges/McMaster%20University.webp",
      rating: "8.5",
      featuredCourse: "MSc Health Sciences",
      fees: "CAD 34K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "6 in Canada"
    },
    {
      name: "University of Montreal, Montreal",
      location: "Quebec, Canada",
      image: "/images/canada-colleges/University%20of%20Montreal.webp",
      rating: "8.4",
      featuredCourse: "MSc Information Technology",
      fees: "CAD 31K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | French B2",
      ranking: "7 in Canada"
    }
  ],
  australia: [
    {
      name: "University of Melbourne, Melbourne",
      location: "Victoria, Australia",
      image: "/images/australia-colleges/University%20of%20Melbourne.webp",
      rating: "9.3",
      featuredCourse: "Master of Data Science",
      fees: "AUD 48K/Yr",
      duration: "2 Years",
      exam: "IELTS 7.0 | TOEFL 94",
      ranking: "1 in Australia"
    },
    {
      name: "University of Sydney, Sydney",
      location: "NSW, Australia",
      image: "/images/australia-colleges/University%20of%20Sydney.webp",
      rating: "9.2",
      featuredCourse: "Master of Commerce",
      fees: "AUD 52K/Yr",
      duration: "1.5 Years",
      exam: "IELTS 7.0 | TOEFL 96",
      ranking: "2 in Australia"
    },
    {
      name: "University of New South Wales (UNSW), Sydney",
      location: "NSW, Australia",
      image: "/images/australia-colleges/University%20of%20New%20South%20Wales%20(UNSW).webp",
      rating: "9.1",
      featuredCourse: "Master of Engineering",
      fees: "AUD 50K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "3 in Australia"
    },
    {
      name: "Australian National University (ANU), Canberra",
      location: "ACT, Australia",
      image: "/images/australia-colleges/Australian%20National%20University%20(ANU).jpg",
      rating: "9.0",
      featuredCourse: "Master of International Relations",
      fees: "AUD 46K/Yr",
      duration: "2 Years",
      exam: "IELTS 7.0 | TOEFL 94",
      ranking: "4 in Australia"
    },
    {
      name: "University of Queensland, Brisbane",
      location: "Queensland, Australia",
      image: "/images/australia-colleges/University%20of%20Queensland.webp",
      rating: "8.9",
      featuredCourse: "Master of Biotechnology",
      fees: "AUD 44K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 87",
      ranking: "5 in Australia"
    },
    {
      name: "Monash University, Melbourne",
      location: "Victoria, Australia",
      image: "/images/australia-colleges/Monash%20University.webp",
      rating: "8.8",
      featuredCourse: "Master of Business Information Systems",
      fees: "AUD 45K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 79",
      ranking: "6 in Australia"
    },
    {
      name: "University of Western Australia, Perth",
      location: "Western Australia, Australia",
      image: "/images/australia-colleges/University%20of%20Western%20Australia.webp",
      rating: "8.7",
      featuredCourse: "Master of Professional Engineering",
      fees: "AUD 43K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 82",
      ranking: "7 in Australia"
    }
  ],
  germany: [
    {
      name: "Technical University of Munich (TUM), Munich",
      location: "Bavaria, Germany",
      image: "/images/germany-colleges/Technical%20University%20of%20Munich%20(TUM).webp",
      rating: "9.4",
      featuredCourse: "MSc Informatics",
      fees: "€0 (Tuition-free)",
      duration: "2 Years",
      exam: "GRE | TOEFL 88 | IELTS 6.5",
      ranking: "1 in Germany"
    },
    {
      name: "LMU Munich, Munich",
      location: "Bavaria, Germany",
      image: "/images/germany-colleges/LMU%20Munich.webp",
      rating: "9.3",
      featuredCourse: "MSc Economics",
      fees: "€0 (Tuition-free)",
      duration: "2 Years",
      exam: "GRE | IELTS 7.0",
      ranking: "2 in Germany"
    },
    {
      name: "Heidelberg University, Heidelberg",
      location: "Baden-Württemberg, Germany",
      image: "/images/germany-colleges/Heidelberg%20University.webp",
      rating: "9.2",
      featuredCourse: "MSc Biomedical Sciences",
      fees: "€0 (Tuition-free)",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "3 in Germany"
    },
    {
      name: "Humboldt University of Berlin, Berlin",
      location: "Berlin, Germany",
      image: "/images/germany-colleges/Humboldt%20University%20of%20Berlin.webp",
      rating: "9.1",
      featuredCourse: "MSc Statistics",
      fees: "€0 (Tuition-free)",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 87",
      ranking: "4 in Germany"
    },
    {
      name: "Karlsruhe Institute of Technology (KIT), Karlsruhe",
      location: "Baden-Württemberg, Germany",
      image: "/images/germany-colleges/Karlsruhe%20Institute%20of%20Technology%20(KIT).webp",
      rating: "9.0",
      featuredCourse: "MSc Electrical Engineering",
      fees: "€3K/Yr (International)",
      duration: "2 Years",
      exam: "IELTS 6.5 | German C1",
      ranking: "5 in Germany"
    },
    {
      name: "RWTH Aachen University, Aachen",
      location: "North Rhine-Westphalia, Germany",
      image: "/images/germany-colleges/RWTH%20Aachen%20University.webp",
      rating: "8.9",
      featuredCourse: "MSc Automotive Engineering",
      fees: "€0 (Tuition-free)",
      duration: "2 Years",
      exam: "GRE | IELTS 6.5",
      ranking: "6 in Germany"
    }
  ],
  uae: [
    {
      name: "Khalifa University, Abu Dhabi",
      location: "Abu Dhabi, UAE",
      image: "/images/uae-colleges/Khalifa%20University.webp",
      rating: "9.0",
      featuredCourse: "MSc Petroleum Engineering",
      fees: "AED 90K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | GRE",
      ranking: "1 in UAE"
    },
    {
      name: "UAE University, Al Ain",
      location: "Abu Dhabi, UAE",
      image: "/images/uae-colleges/UAE%20University.webp",
      rating: "8.8",
      featuredCourse: "MBA",
      fees: "AED 85K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.0",
      ranking: "2 in UAE"
    },
    {
      name: "American University of Sharjah, Sharjah",
      location: "Sharjah, UAE",
      image: "/images/uae-colleges/American%20University%20of%20Sharjah.jpg",
      rating: "8.7",
      featuredCourse: "MSc Business Analytics",
      fees: "AED 95K/Yr",
      duration: "1.5 Years",
      exam: "IELTS 6.5",
      ranking: "3 in UAE"
    },
    {
      name: "New York University Abu Dhabi (NYUAD)",
      location: "Abu Dhabi, UAE",
      image: "/images/uae-colleges/New%20York%20University%20Abu%20Dhabi%20(NYUAD).webp",
      rating: "9.2",
      featuredCourse: "MSc Economics",
      fees: "AED 120K/Yr",
      duration: "2 Years",
      exam: "IELTS 7.0 | GRE",
      ranking: "4 in UAE"
    },
    {
      name: "University of Wollongong in Dubai",
      location: "Dubai, UAE",
      image: "/images/uae-colleges/University%20of%20Wollongong.webp",
      rating: "8.5",
      featuredCourse: "Master of International Business",
      fees: "AED 80K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5",
      ranking: "5 in UAE"
    }
  ],
  singapore: [
    {
      name: "National University of Singapore (NUS)",
      location: "Singapore",
      image: "/images/singapore-colleges/National%20University%20of%20Singapore%20(NUS).webp",
      rating: "9.7",
      featuredCourse: "MSc Computer Science",
      fees: "SGD 45K/Yr",
      duration: "1.5 Years",
      exam: "IELTS 7.0 | GRE",
      ranking: "1 in Singapore"
    },
    {
      name: "Nanyang Technological University (NTU)",
      location: "Singapore",
      image: "/images/singapore-colleges/Nanyang%20Technological%20University%20(NTU).webp",
      rating: "9.6",
      featuredCourse: "MSc Artificial Intelligence",
      fees: "SGD 42K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5 | GMAT 650",
      ranking: "2 in Singapore"
    },
    {
      name: "Singapore Management University (SMU)",
      location: "Singapore",
      image: "/images/singapore-colleges/Singapore%20Management%20University%20(SMU).webp",
      rating: "9.2",
      featuredCourse: "Master of Wealth Management",
      fees: "SGD 55K/Yr",
      duration: "1 Year",
      exam: "IELTS 7.0 | GMAT 700",
      ranking: "3 in Singapore"
    },
    {
      name: "Singapore University of Technology and Design (SUTD)",
      location: "Singapore",
      image: "/images/singapore-colleges/Singapore%20University%20of%20Technology%20and%20Design%20(SUTD).webp",
      rating: "8.9",
      featuredCourse: "Master of Engineering (Research)",
      fees: "SGD 38K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | GRE",
      ranking: "4 in Singapore"
    },
    {
      name: "Singapore Institute of Management (SIM)",
      location: "Singapore",
      image: "/images/singapore-colleges/Singapore%20Institute%20of%20Management%20(SIM).webp",
      rating: "8.2",
      featuredCourse: "MSc International Business",
      fees: "SGD 28K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5",
      ranking: "5 in Singapore"
    }
  ],
  sweden: [
    {
      name: "KTH Royal Institute of Technology, Stockholm",
      location: "Stockholm, Sweden",
      image: "/images/sweden-colleges/KTH%20Royal%20Institute%20of%20Technology.webp",
      rating: "9.2",
      featuredCourse: "MSc Sustainable Energy Engineering",
      fees: "SEK 155K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "1 in Sweden"
    },
    {
      name: "Karolinska Institute, Stockholm",
      location: "Stockholm, Sweden",
      image: "/images/sweden-colleges/Karolinska%20Institute.webp",
      rating: "9.5",
      featuredCourse: "MSc Global Health",
      fees: "SEK 180K/Yr",
      duration: "1 Year",
      exam: "IELTS 7.0 | TOEFL 100",
      ranking: "2 in Sweden"
    },
    {
      name: "Lund University, Lund",
      location: "Scania, Sweden",
      image: "/images/sweden-colleges/Lund%20University.webp",
      rating: "9.1",
      featuredCourse: "MSc Physics",
      fees: "SEK 145K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "3 in Sweden"
    },
    {
      name: "Uppsala University, Uppsala",
      location: "Uppsala, Sweden",
      image: "/images/sweden-colleges/Uppsala%20University.webp",
      rating: "9.0",
      featuredCourse: "MSc Biology",
      fees: "SEK 140K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "4 in Sweden"
    },
    {
      name: "Stockholm University, Stockholm",
      location: "Stockholm, Sweden",
      image: "/images/sweden-colleges/Stockholm%20University.webp",
      rating: "8.8",
      featuredCourse: "MSc Environmental Science",
      fees: "SEK 135K/Yr",
      duration: "2 Years",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "5 in Sweden"
    }
  ],
  ireland: [
    {
      name: "Trinity College Dublin, Dublin",
      location: "Dublin, Ireland",
      image: "/images/ireland-colleges/Trinity%20College%20Dublin%2C%20Dublin.webp",
      rating: "9.3",
      featuredCourse: "MSc Computer Science",
      fees: "€24.5K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "1 in Ireland"
    },
    {
      name: "University College Dublin (UCD), Dublin",
      location: "Dublin, Ireland",
      image: "/images/ireland-colleges/University%20College%20Dublin%20(UCD).webp",
      rating: "9.1",
      featuredCourse: "MSc Finance",
      fees: "€22.8K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5 | TOEFL 90",
      ranking: "2 in Ireland"
    },
    {
      name: "University College Cork (UCC), Cork",
      location: "Cork, Ireland",
      image: "/images/ireland-colleges/University%20College%20Cork%20(UCC).webp",
      rating: "8.9",
      featuredCourse: "MSc Information Systems",
      fees: "€18.5K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5 | TOEFL 88",
      ranking: "3 in Ireland"
    },
    {
      name: "National University of Ireland Galway",
      location: "Galway, Ireland",
      image: "/images/ireland-colleges/National%20University%20of%20Ireland%20Galway.webp",
      rating: "8.7",
      featuredCourse: "MSc Software Engineering",
      fees: "€17.2K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5 | TOEFL 88",
      ranking: "4 in Ireland"
    },
    {
      name: "Dublin City University (DCU), Dublin",
      location: "Dublin, Ireland",
      image: "/images/ireland-colleges/Dublin%20City%20University%20(DCU).webp",
      rating: "8.6",
      featuredCourse: "MSc Digital Marketing",
      fees: "€16.8K/Yr",
      duration: "1 Year",
      exam: "IELTS 6.5 | TOEFL 92",
      ranking: "5 in Ireland"
    }
  ]
};

export default function CollegesListingPage() {
  const params = useParams();
  const country = (params.country as string).toLowerCase();
  
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [comparisonList, setComparisonList] = useState<any[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  
  const colleges = collegeData[country] || [];
  const countryName = country.toUpperCase();

  const handleApply = (college: any) => {
    setSelectedCollege(college);
    setShowApplyForm(true);
  };

  const handleDetails = (college: any) => {
    setSelectedCollege(college);
    setShowDetails(true);
  };

  const handleCompare = (college: any) => {
    if (comparisonList.length >= 3) {
      alert("You can compare up to 3 colleges at a time.");
      return;
    }
    if (comparisonList.some(c => c.name === college.name)) {
      alert("Already in comparison list.");
      return;
    }
    setComparisonList([...comparisonList, college]);
  };

  const removeFromComparison = (name: string) => {
    setComparisonList(comparisonList.filter(c => c.name !== name));
  };

  const countryLogos: Record<string, string> = {
    usa: "/images/logos/USA.webp",
    uk: "/images/logos/UK.webp",
    canada: "/images/logos/Canada.webp",
    australia: "/images/logos/Australia.webp",
    germany: "/images/logos/Germany.webp",
    uae: "/images/logos/UAE.webp",
    singapore: "/images/logos/Singapore.webp",
    sweden: "/images/logos/Sweden.webp",
    ireland: "/images/logos/Ireland.webp",
    hongkong: "/images/logos/HongKong.webp"
  };

  const countryLogo = countryLogos[country] || "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative">
      <header className="relative bg-transparent border-b border-slate-800/50 py-10 shadow-none sticky top-0 z-40 overflow-hidden">
        {/* Background Country Logo */}
        {countryLogo && (
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
            <img 
              src={countryLogo} 
              alt="" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="mb-6 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-sky-400 transition-colors">Home</Link>
            <span className="text-slate-700">/</span>
            <Link href="/study-abroad" className="hover:text-sky-400 transition-colors">Study Abroad</Link>
            <span className="text-slate-700">/</span>
            <span className="text-sky-400 font-bold">{countryName} Colleges</span>
          </nav>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">Top Colleges in {countryName}</h1>
              <p className="mt-3 text-slate-400 max-w-2xl">Discover world-class education opportunities in {countryName}.</p>
            </div>
            <div className="flex items-center gap-4">
              {comparisonList.length > 0 && (
                <button 
                  onClick={() => setShowComparison(true)}
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-4 rounded-2xl border border-orange-400/30 flex items-center gap-2 transition-transform active:scale-95"
                >
                  <span className="font-bold text-white">Compare ({comparisonList.length})</span>
                </button>
              )}
              <div className="bg-slate-800/50 px-6 py-4 rounded-2xl border border-slate-700/50 backdrop-blur-md">
                <p className="text-sm font-medium text-slate-400">Total Results</p>
                <p className="text-2xl font-bold text-sky-400">{colleges.length} Institutions</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {colleges.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college, idx) => (
              <CollegeListingCard 
                key={idx} 
                {...college} 
                onApply={() => handleApply(college)}
                onDetails={() => handleDetails(college)}
                onCompare={() => handleCompare(college)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-slate-900/50 rounded-[3rem] border border-slate-800 border-dashed">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-white">No colleges found for {countryName}</h2>
            <p className="mt-3 text-slate-400 max-w-sm mx-auto">We are currently updating our database for this destination.</p>
            <Link href="/study-abroad" className="mt-10 inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3 text-sm font-bold text-white transition hover:bg-sky-400">
              Explore Others
            </Link>
          </div>
        )}
      </main>

      {/* Details Modal */}
      {showDetails && selectedCollege && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowDetails(false)}></div>
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <button className="absolute right-8 top-8 text-slate-400 hover:text-white text-xl" onClick={() => setShowDetails(false)}>✕</button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden relative mb-6">
              <img src={selectedCollege.image} alt={selectedCollege.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <h2 className="absolute bottom-6 left-6 text-3xl font-bold text-white">{selectedCollege.name}</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <section>
                  <h3 className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-3">About the Institution</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedCollege.description || "Leading international university with state-of-the-art facilities and world-renowned faculty."}</p>
                </section>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                    <p className="text-xs text-slate-500 uppercase font-bold">Admission Rate</p>
                    <p className="text-xl font-bold text-white">{selectedCollege.admissionRate || "N/A"}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                    <p className="text-xs text-slate-500 uppercase font-bold">Founded</p>
                    <p className="text-xl font-bold text-white">{selectedCollege.founded || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/30 p-6 rounded-[2rem] border border-slate-700/50 space-y-4 h-fit">
                <h3 className="font-bold text-white">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Rating</span>
                    <span className="text-sky-400 font-bold">{selectedCollege.rating}/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Fees</span>
                    <span className="text-orange-400 font-bold">{selectedCollege.fees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Exams</span>
                    <span className="text-white font-medium">{selectedCollege.exam}</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setShowDetails(false); setShowApplyForm(true); }}
                  className="w-full py-3 bg-orange-500 rounded-xl font-bold text-sm hover:bg-orange-400 transition-colors"
                >
                  Apply to this College
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowComparison(false)}></div>
          <div className="relative w-full max-w-6xl rounded-[2.5rem] border border-slate-800 bg-slate-900 p-10 shadow-2xl overflow-x-auto">
            <button className="absolute right-8 top-8 text-slate-400 hover:text-white text-xl" onClick={() => setShowComparison(false)}>✕</button>
            <h2 className="text-3xl font-bold text-white mb-10 text-center">College Comparison</h2>
            
            <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-6 min-w-[800px]">
              {/* Labels Column */}
              <div className="space-y-12 pt-[220px] font-bold text-slate-500 uppercase text-xs tracking-widest">
                <div>Course</div>
                <div>Fees</div>
                <div>Exams</div>
                <div>Rating</div>
                <div>Location</div>
              </div>

              {/* College Columns */}
              {comparisonList.map((college, idx) => (
                <div key={idx} className="space-y-8 text-center bg-slate-800/20 rounded-3xl p-6 border border-slate-700/30 relative group">
                  <button 
                    onClick={() => removeFromComparison(college.name)}
                    className="absolute -top-3 -right-3 bg-red-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >✕</button>
                  <div className="h-[200px] rounded-2xl overflow-hidden relative mb-4">
                    <img src={college.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent"></div>
                    <p className="absolute bottom-4 left-4 right-4 text-sm font-bold text-white leading-tight">{college.name}</p>
                  </div>
                  <div className="text-sky-400 font-semibold h-12 flex items-center justify-center">{college.featuredCourse}</div>
                  <div className="text-orange-400 font-bold">{college.fees}</div>
                  <div className="text-white text-sm h-12 flex items-center justify-center">{college.exam}</div>
                  <div className="text-2xl font-black text-white">{college.rating}<span className="text-xs text-slate-500">/10</span></div>
                  <div className="text-slate-400 text-xs">{college.location}</div>
                  <button 
                    onClick={() => { setShowComparison(false); handleApply(college); }}
                    className="w-full py-3 bg-sky-500 rounded-xl font-bold text-xs hover:bg-sky-400"
                  >Apply Now</button>
                </div>
              ))}

              {comparisonList.length < 3 && (
                <div className="border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 gap-4">
                  <div className="text-4xl">+</div>
                  <p className="text-sm font-medium">Add another college</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Apply Form Modal (Expert) */}
      {showApplyForm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowApplyForm(false)}></div>
          <div className="relative w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <button className="absolute right-6 top-6 text-slate-400 hover:text-white" onClick={() => setShowApplyForm(false)}>✕</button>
            <h2 className="text-2xl font-bold text-white">Application Request</h2>
            <p className="mt-2 text-sm text-slate-400">
              {selectedCollege ? `Requesting more information about ${selectedCollege.name}` : "Connect with our international education agents."}
            </p>
            <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowApplyForm(false); alert('Our agent will contact you shortly!'); }}>
              <input type="text" required placeholder="Full Name" className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-sky-500 transition-colors outline-none" />
              <input type="email" required placeholder="Email Address" className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-sky-500 transition-colors outline-none" />
              <input type="tel" required placeholder="Phone Number" className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-sky-500 transition-colors outline-none" />
              <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Target College</p>
                <p className="text-xs text-sky-400 font-bold truncate">{selectedCollege?.name || "Multiple Institutions"}</p>
              </div>
              <button type="submit" className="w-full mt-4 rounded-xl bg-orange-500 py-4 text-sm font-bold text-white hover:bg-orange-400 shadow-lg shadow-orange-500/20 transition-all">
                Speak to an Agent
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
