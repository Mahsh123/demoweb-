import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES = {
  // Chicken strips / tenders
  'crispy-tender-box.jpg': 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=85',
  // Extra dip & coleslaw images for complete sides variety
  'creamy-coleslaw.jpg': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85',
  'smoky-pepper-dip.jpg': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85',
  // Cheesy wrap
  'cheesy-zinger-wrap.jpg': 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=85'
};

const targetDir = path.join(process.cwd(), 'public', 'images', 'menu');

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
}

main();
