#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeImage(inputPath, outputPath, maxWidth) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`Original: ${metadata.width}x${metadata.height}, ${(fs.statSync(inputPath).size / 1024).toFixed(1)} KB`);

    await image
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: 85, progressive: true })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    console.log(`Optimized: ${maxWidth}px width, ${(newSize / 1024).toFixed(1)} KB`);
    console.log(`Saved: ${((fs.statSync(inputPath).size - newSize) / 1024).toFixed(1)} KB\n`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function generateWebP(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    await image.webp({ quality: 80 }).toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`WebP generated: ${(webpSize / 1024).toFixed(1)} KB (${savings}% smaller)`);
  } catch (error) {
    console.error(`Error generating WebP for ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('Optimizing images...\n');

  // Critical images that need WebP versions (prioritized by size)
  const criticalImages = [
    // Services images (highest priority - audit identified these)
    'src/assets/images/services/crisis-management.jpg',        // ~157K
    'src/assets/images/services/litigation-campaigns.jpg',     // ~116K
    'src/assets/images/services/regulatory-strategy.jpg',
    'src/assets/images/services/deal-velocity.jpg',
    'src/assets/images/services/client-experience.jpg',
    'src/assets/images/services/thought-leadership.jpg',

    // Insights images (high priority - visible on insights page)
    'src/assets/images/insights/insight-1.jpg',
    'src/assets/images/insights/insight-2.jpg',
    'src/assets/images/insights/insight-3.jpg',
    'src/assets/images/insights/insight-4.jpg',                // ~142K
    'src/assets/images/insights/insight-5.jpg',

    // Hero images
    'src/assets/images/hero/team-photo.jpg',                   // ~129K
    'src/assets/images/hero/consultation-hero.jpg',
    'src/assets/images/hero/hero-main.jpg',
    'src/assets/images/hero/lady-justice.jpg',
    'src/assets/images/hero/lady-justice-full.jpg',
    'src/assets/images/hero/lawyer-professional.jpg',

    // Contact and attorneys
    'src/assets/images/contact/support-professional.jpg',      // ~86K
    'src/assets/images/attorneys/attorney-3.jpg',
  ];

  for (const imagePath of criticalImages) {
    if (fs.existsSync(imagePath)) {
      console.log(`\nProcessing: ${path.basename(imagePath)}`);
      const webpPath = imagePath.replace(/\.jpg$/, '.webp');
      await generateWebP(imagePath, webpPath);
    }
  }

  console.log('\n✓ Image optimization complete!');
  console.log('\nWebP files generated alongside original JPEGs.');
  console.log('Update Vue components to use <picture> elements for WebP support.');
}


main().catch(console.error);
