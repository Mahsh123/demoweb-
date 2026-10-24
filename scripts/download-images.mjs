import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES = {
  'hero-chicken.jpg': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1600&q=85',
  'bucket-promo.jpg': 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=85',
  'coorg-hills.jpg': 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85',
  
  // Categories
  'cat-buckets.jpg': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=85',
  'cat-burgers.jpg': 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=600&q=85',
  'cat-wings.jpg': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600&q=85',
  'cat-strips.jpg': 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=85',
  'cat-wraps.jpg': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=85',
  'cat-combos.jpg': 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=85',
  'cat-sides.jpg': 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=85',
  'cat-drinks.jpg': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=85',

  // Buckets
  'coorg-crunch-bucket.jpg': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=85',
  'family-feast-bucket.jpg': 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=85',
  'spicy-crunch-bucket.jpg': 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=800&q=85',

  // Burgers
  'malnad-fire-burger.jpg': 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=800&q=85',
  'kodagu-classic-burger.jpg': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85',
  'double-crunch-burger.jpg': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=85',

  // Wings
  'black-pepper-wings.jpg': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=85',
  'sticky-bbq-wings.jpg': 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=85',
  'fiery-chili-wings.jpg': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=85',

  // Strips
  'crispy-tender-box.jpg': 'https://images.unsplash.com/photo-1585325701165-351af916e540?auto=format&fit=crop&w=800&q=85',
  'guntur-spice-strips.jpg': 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=85',
  'popcorn-crunch-bites.jpg': 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=800&q=85',

  // Wraps
  'forest-pepper-wrap.jpg': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=85',
  'tandoori-crunch-wrap.jpg': 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=800&q=85',

  // Combos
  'burger-meal-combo.jpg': 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=85',
  'wings-fries-combo.jpg': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=85',
  'solo-crunch-meal.jpg': 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=800&q=85',

  // Sides
  'masala-dust-fries.jpg': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85',
  'loaded-chicken-fries.jpg': 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=85',
  'garlic-mayo-dip.jpg': 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=85',

  // Drinks
  'mango-sparkle.jpg': 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?auto=format&fit=crop&w=800&q=85',
  'coorg-cold-coffee.jpg': 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=85',
  'chilled-cola.jpg': 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=85'
};

const targetDir = path.join(process.cwd(), 'public', 'images', 'menu');
fs.mkdirSync(targetDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log(`Starting download of ${Object.keys(IMAGES).length} high quality food images...`);
  for (const [filename, url] of Object.entries(IMAGES)) {
    const dest = path.join(targetDir, filename);
    try {
      await downloadFile(url, dest);
      const stat = fs.statSync(dest);
      console.log(`Downloaded ${filename} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error downloading ${filename}: ${err.message}`);
    }
  }
  console.log('Finished downloading images.');
}

main();
