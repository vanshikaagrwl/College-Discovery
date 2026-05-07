import { colleges, getCollegeBySlug } from './src/lib/colleges.ts';

console.log(`Total colleges: ${colleges.length}`);
console.log('Checking slugs...');

const slugs = colleges.map(c => c.slug);
const uniqueSlugs = new Set(slugs);

console.log(`Unique slugs: ${uniqueSlugs.size}`);
console.log(`Duplicates: ${slugs.length - uniqueSlugs.size}`);

colleges.forEach(college => {
  const found = getCollegeBySlug(college.slug);
  if (!found) {
    console.log(`MISSING: ${college.slug} - ${college.name}`);
  } else if (found.id !== college.id) {
    console.log(`MISMATCH: ${college.slug} - expected ${college.id}, got ${found.id}`);
  }
});

console.log('Slug check complete.');