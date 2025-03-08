import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const placeholderDir = path.join(__dirname, '../../client/public/assets/placeholders');

router.get('/:width/:height', (req, res) => {
  const { width, height } = req.params;

  const widthNum = parseInt(width, 10);
  const heightNum = parseInt(height, 10);

  if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
    return res.status(400).json({ error: 'Invalid dimensions' });
  }

  if (widthNum > 2000 || heightNum > 2000) {
    return res.status(400).json({ error: 'Dimensions too large' });
  }

  const requestedDimension = `${width}x${height}`;
  const possibleSizes = ['120x60', '400x320', '600x480'];

  if (possibleSizes.includes(requestedDimension)) {
    const placeholderPath = path.join(placeholderDir, `placeholder-${requestedDimension}.png`);
    if (fs.existsSync(placeholderPath)) {
      return res.sendFile(placeholderPath);
    }
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e2e8f0"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="14"
        fill="#64748b" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${width} × ${height}
      </text>
    </svg>
  `;

  res.set('Content-Type', 'image/svg+xml');
  res.send(svg);
});

export default router;