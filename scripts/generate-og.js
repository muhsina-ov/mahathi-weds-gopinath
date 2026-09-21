import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const width = 1200;
const height = 630;

async function generateOG() {
  const publicDir = path.resolve("public");
  const handsPath = path.join(publicDir, "wedding-hands.jpg");

  // Read and prepare couple hands photo in an arched mask
  let couplePhotoBuffer = null;
  if (fs.existsSync(handsPath)) {
    // Resize hands to fit arch: 360 x 470
    const archW = 356;
    const archH = 466;
    const resizedHands = await sharp(handsPath)
      .resize(archW, archH, { fit: "cover", position: "center" })
      .toBuffer();

    // Create an arch PNG mask with transparent outer area and white inner arch
    const archMaskSvg = Buffer.from(`
      <svg width="${archW}" height="${archH}" viewBox="0 0 ${archW} ${archH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${archW}" height="${archH}" fill="none" />
        <path d="M 0 ${archH} 
                 L 0 178 
                 C 0 80, 79 0, 178 0 
                 C 277 0, 356 80, 356 178 
                 L 356 ${archH} 
                 Z" 
              fill="#ffffff" />
      </svg>
    `);

    const archMaskPng = await sharp(archMaskSvg)
      .png()
      .toBuffer();

    couplePhotoBuffer = await sharp(resizedHands)
      .composite([
        {
          input: archMaskPng,
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();
  }

  // Base background SVG with rich royal wine/velvet gradients
  const bgSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#140608" />
          <stop offset="35%" stop-color="#240c11" />
          <stop offset="70%" stop-color="#19070b" />
          <stop offset="100%" stop-color="#0e0406" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="72%" cy="45%" r="60%">
          <stop offset="0%" stop-color="#e2b96f" stop-opacity="0.25" />
          <stop offset="50%" stop-color="#b68235" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="archGlow" cx="22%" cy="50%" r="45%">
          <stop offset="0%" stop-color="#f5d58a" stop-opacity="0.22" />
          <stop offset="65%" stop-color="#a46d29" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
      <rect width="${width}" height="${height}" fill="url(#goldGlow)" />
      <rect width="${width}" height="${height}" fill="url(#archGlow)" />
    </svg>
  `);

  // Base SVG with luxury styling, fonts, borders, gold foil gradients, and typography
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#140608" />
        <stop offset="45%" stop-color="#240c11" />
        <stop offset="80%" stop-color="#19070b" />
        <stop offset="100%" stop-color="#0e0406" />
      </linearGradient>

      <radialGradient id="goldGlow" cx="68%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#e2b96f" stop-opacity="0.22" />
        <stop offset="45%" stop-color="#b68235" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="archGlow" cx="22%" cy="50%" r="40%">
        <stop offset="0%" stop-color="#f5d58a" stop-opacity="0.28" />
        <stop offset="60%" stop-color="#a46d29" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#fdf3cd" />
        <stop offset="28%" stop-color="#f5d07a" />
        <stop offset="65%" stop-color="#dfaa44" />
        <stop offset="100%" stop-color="#ffebb0" />
      </linearGradient>

      <linearGradient id="goldRule" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#dfaa44" stop-opacity="0" />
        <stop offset="25%" stop-color="#f5d07a" stop-opacity="0.8" />
        <stop offset="50%" stop-color="#fff0b8" stop-opacity="1" />
        <stop offset="75%" stop-color="#dfaa44" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#dfaa44" stop-opacity="0" />
      </linearGradient>

      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e8bf72" />
        <stop offset="25%" stop-color="#8f591f" />
        <stop offset="50%" stop-color="#f5d68d" />
        <stop offset="75%" stop-color="#7a4613" />
        <stop offset="100%" stop-color="#e8bf72" />
      </linearGradient>

      <!-- Drop shadow for main text -->
      <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.85" />
      </filter>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <style>
      .serif { font-family: 'Cinzel', 'Marcellus', 'Georgia', serif; }
      .sans { font-family: 'Montserrat', 'Inter', 'Segoe UI', sans-serif; }
      .cursive { font-family: 'Cormorant Garamond', 'Baskerville', 'Times New Roman', serif; }
    </style>

    <!-- Base Canvas Background is handled on base layer so photo is fully visible -->
    <!-- Soft Golden Glow in Right Corner -->
    <rect x="450" y="0" width="750" height="630" fill="url(#goldGlow)" />

    <!-- Ornate Double Gold Outer Border -->
    <rect x="24" y="24" width="1152" height="582" rx="14" fill="none" stroke="url(#goldBorder)" stroke-width="2" opacity="0.65" />
    <rect x="34" y="34" width="1132" height="562" rx="10" fill="none" stroke="url(#goldBorder)" stroke-width="1" stroke-dasharray="6,4" opacity="0.45" />

    <!-- Corner Mandala Accents -->
    <g stroke="url(#goldBorder)" fill="none" stroke-width="1.2" opacity="0.75">
      <!-- Top Left -->
      <path d="M 38 70 A 32 32 0 0 1 70 38" />
      <circle cx="50" cy="50" r="4" fill="#e8bf72" />
      <path d="M 38 90 L 90 38" stroke-dasharray="2,3" />

      <!-- Top Right -->
      <path d="M 1162 70 A 32 32 0 0 0 1130 38" />
      <circle cx="1150" cy="50" r="4" fill="#e8bf72" />
      <path d="M 1162 90 L 1110 38" stroke-dasharray="2,3" />

      <!-- Bottom Left -->
      <path d="M 38 560 A 32 32 0 0 0 70 592" />
      <circle cx="50" cy="580" r="4" fill="#e8bf72" />
      <path d="M 38 540 L 90 592" stroke-dasharray="2,3" />

      <!-- Bottom Right -->
      <path d="M 1162 560 A 32 32 0 0 1 1130 592" />
      <circle cx="1150" cy="580" r="4" fill="#e8bf72" />
      <path d="M 1162 540 L 1110 592" stroke-dasharray="2,3" />
    </g>

    <!-- Photo Arch Golden Frame (Left side x=65, y=75, w=380, h=480) -->
    <g transform="translate(65, 75)">
      <!-- Outer Arch Outline -->
      <path d="M 14 476 
               L 14 190 
               C 14 92, 95 14, 190 14 
               C 285 14, 366 92, 366 190 
               L 366 476" 
            fill="none" stroke="url(#goldBorder)" stroke-width="2.5" opacity="0.85" />

      <path d="M 22 474 
               L 22 192 
               C 22 100, 99 22, 190 22 
               C 281 22, 358 100, 358 192 
               L 358 474" 
            fill="none" stroke="#f5d68d" stroke-width="1" opacity="0.4" stroke-dasharray="4,4" />

      <!-- Arch Crown Crest Motif -->
      <path d="M 190 2 L 195 10 L 203 12 L 196 18 L 198 26 L 190 20 L 182 26 L 184 18 L 177 12 L 185 10 Z" 
            fill="#f5d07a" opacity="0.9" />
    </g>

    <!-- RIGHT CONTENT AREA (x=485 to 1130) -->
    <!-- Top Auspicious Inscription -->
    <text x="815" y="105" text-anchor="middle" class="sans" font-size="12" font-weight="600" letter-spacing="6" fill="#e8c279" opacity="0.9">
      ✦ TOGETHER WITH THEIR FAMILIES ✦
    </text>

    <!-- Couple Names -->
    <g filter="url(#goldShadow)">
      <text x="815" y="185" text-anchor="middle" class="serif" font-size="58" font-weight="600" fill="url(#goldText)" letter-spacing="1.5">
        Mahathi &amp; Gopinath
      </text>
    </g>

    <!-- Invitation Heading -->
    <text x="815" y="226" text-anchor="middle" class="cursive" font-size="21" font-style="italic" fill="#f8e5b8" opacity="0.9" letter-spacing="3">
      Request the honor of your gracious presence
    </text>

    <!-- Gold Divider Bar -->
    <line x1="560" y1="252" x2="1070" y2="252" stroke="url(#goldRule)" stroke-width="2" />
    <polygon points="815,247 820,252 815,257 810,252" fill="#ffebb0" />

    <!-- Date & Muhurtham Badge -->
    <g transform="translate(535, 275)">
      <rect x="0" y="0" width="560" height="76" rx="14" fill="#1b080c" stroke="url(#goldBorder)" stroke-width="1" opacity="0.9" />
      
      <!-- Calendar Icon & Date -->
      <text x="28" y="36" class="sans" font-size="11" font-weight="700" letter-spacing="3" fill="#d8a855">
        DATE &amp; AUSPICIOUS TIME
      </text>
      <text x="28" y="60" class="serif" font-size="20" font-weight="600" fill="#ffffff">
        Saturday, October 31, 2026
      </text>
      
      <line x1="330" y1="14" x2="330" y2="62" stroke="#e8bf72" stroke-width="1" opacity="0.3" />

      <!-- Muhurtham Highlight -->
      <text x="355" y="34" class="sans" font-size="10" font-weight="700" letter-spacing="2.5" fill="#f5ce75">
        MUHURTHAM
      </text>
      <text x="355" y="60" class="serif" font-size="22" font-weight="700" fill="url(#goldText)">
        11:52 AM
      </text>
    </g>

    <!-- Venue & Attire Section -->
    <g transform="translate(535, 370)">
      <!-- Venue Box -->
      <rect x="0" y="0" width="370" height="88" rx="12" fill="#170609" stroke="#b68235" stroke-width="1" opacity="0.65" />
      <text x="22" y="30" class="sans" font-size="10" font-weight="700" letter-spacing="2.5" fill="#e2b96f">
        VENUE
      </text>
      <text x="22" y="54" class="serif" font-size="18" font-weight="600" fill="#ffffff">
        One Trenton Events &amp; Retreat
      </text>
      <text x="22" y="74" class="sans" font-size="11" fill="#cbb493" letter-spacing="0.5">
        11391 State Hwy 121 · Trenton, TX 75490
      </text>

      <!-- Attire Badge Box -->
      <rect x="388" y="0" width="172" height="88" rx="12" fill="#200a0f" stroke="#e2b96f" stroke-width="1" opacity="0.85" />
      <text x="474" y="30" text-anchor="middle" class="sans" font-size="10" font-weight="700" letter-spacing="2" fill="#f5ce75">
        ATTIRE
      </text>
      <text x="474" y="55" text-anchor="middle" class="serif" font-size="16" font-weight="600" fill="#ffffff">
        Traditional
      </text>
      <text x="474" y="73" text-anchor="middle" class="sans" font-size="9.5" fill="#e8c279" letter-spacing="1">
        INDIAN ATTIRE
      </text>
    </g>

    <!-- Call to Action Button (Resolves "Image is missing conversion text" warning) -->
    <g transform="translate(535, 472)">
      <rect x="0" y="0" width="225" height="34" rx="17" fill="url(#goldText)" filter="url(#goldShadow)" />
      <text x="112" y="22" text-anchor="middle" class="sans" font-size="11" font-weight="700" letter-spacing="2" fill="#150508">
        VIEW INVITATION ↗
      </text>
    </g>

    <!-- Bottom Footer Ribbon -->
    <g transform="translate(535, 522)">
      <line x1="0" y1="0" x2="560" y2="0" stroke="url(#goldRule)" stroke-width="1" />
      
      <text x="0" y="24" class="sans" font-size="11.5" font-weight="600" letter-spacing="2" fill="#e8c279">
        #MahathiWedsGopinath
      </text>

      <text x="560" y="24" text-anchor="end" class="sans" font-size="11" font-weight="500" letter-spacing="1.5" fill="#caa568">
        mahathi-weds-gopinath.invitingyou.top
      </text>
    </g>
  </svg>
  `;

  // Composite background, masked couple photo, and golden overlay
  const composites = [
    {
      input: bgSvg,
      top: 0,
      left: 0,
    },
  ];

  if (couplePhotoBuffer) {
    composites.push({
      input: couplePhotoBuffer,
      top: 89,
      left: 77,
    });
  }

  composites.push({
    input: Buffer.from(svgOverlay),
    top: 0,
    left: 0,
  });

  // Base background
  const finalImage = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 18, g: 6, b: 9, alpha: 1 },
    },
  }).composite(composites);

  // Save high-quality, lightweight JPG for WhatsApp, Facebook, iMessage
  const outputJpg = path.join(publicDir, "og-image.jpg");
  await finalImage
    .clone()
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputJpg);

  // Save PNG version as well
  const outputPng = path.join(publicDir, "og-image.png");
  await finalImage
    .clone()
    .png({ compressionLevel: 8 })
    .toFile(outputPng);

  const stats = fs.statSync(outputJpg);
  console.log(`Generated og-image.jpg (${(stats.size / 1024).toFixed(1)} KB)`);
}

generateOG().catch(console.error);
