const fabricProducts = [
    {
      name: 'Premium Cotton Twill',
      description: 'Durable cotton twill fabric perfect for professional workwear, uniforms, and casual clothing. Features excellent color retention and comfort.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/cotton-twill-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/cotton-twill-2.jpg'
      ],
      price: 12.99,
      fabricType: 'Cotton',
      composition: '100% Cotton',
      weight: '280 GSM',
      width: 150,
      availableColors: ['White', 'Black', 'Navy', 'Khaki', 'Gray', 'Red', 'Blue'],
      styles: ['Solid', 'Professional', 'Durable'],
      minOrderLength: 10,
      careInstructions: 'Machine wash cold, tumble dry low, warm iron if needed',
      certifications: ['OEKO-TEX Standard 100']
    },
    {
      name: 'Performance Polyester',
      description: 'Moisture-wicking performance fabric ideal for athletic wear and outdoor uniforms. Features quick-dry technology and UV protection.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/performance-poly-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/performance-poly-2.jpg'
      ],
      price: 15.99,
      fabricType: 'Polyester',
      composition: '100% Polyester',
      weight: '240 GSM',
      width: 160,
      availableColors: ['White', 'Black', 'Navy', 'Red', 'Royal Blue', 'Green', 'Yellow'],
      styles: ['Performance', 'Athletic', 'Breathable'],
      minOrderLength: 10,
      careInstructions: 'Machine wash cold, tumble dry low, do not iron',
      certifications: ['bluesign®', 'OEKO-TEX Standard 100']
    },
    {
      name: 'Cotton-Poly Blend Pique',
      description: 'Classic pique fabric for polo shirts and casual wear. Offers the comfort of cotton with the durability of polyester.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/pique-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/pique-2.jpg'
      ],
      price: 14.50,
      fabricType: 'Cotton-Poly Blend',
      composition: '60% Cotton, 40% Polyester',
      weight: '220 GSM',
      width: 155,
      availableColors: ['White', 'Black', 'Navy', 'Red', 'Blue', 'Gray', 'Green'],
      styles: ['Pique', 'Knit', 'Textured'],
      minOrderLength: 10,
      careInstructions: 'Machine wash cold, tumble dry low, warm iron if needed',
      certifications: ['OEKO-TEX Standard 100']
    },
    {
      name: 'Organic Cotton Jersey',
      description: 'Soft and sustainable organic cotton jersey ideal for eco-friendly t-shirts and casual wear. Perfect for brands focused on sustainability.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/organic-jersey-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/organic-jersey-2.jpg'
      ],
      price: 18.99,
      fabricType: 'Organic Cotton',
      composition: '100% Organic Cotton',
      weight: '180 GSM',
      width: 145,
      availableColors: ['Natural', 'White', 'Black', 'Navy', 'Gray', 'Sage Green', 'Earth Brown'],
      styles: ['Jersey', 'Sustainable', 'Soft'],
      minOrderLength: 10,
      careInstructions: 'Machine wash cold with mild detergent, tumble dry low',
      certifications: ['GOTS Certified', 'OEKO-TEX Standard 100', 'Fair Trade']
    },
    {
      name: 'Technical Softshell',
      description: 'Three-layer bonded fabric with water-resistant exterior and soft fleece interior. Perfect for outdoor jackets and performance wear.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/softshell-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/softshell-2.jpg'
      ],
      price: 24.99,
      fabricType: 'Softshell',
      composition: '94% Polyester, 6% Spandex with TPU membrane',
      weight: '320 GSM',
      width: 150,
      availableColors: ['Black', 'Navy', 'Gray', 'Red', 'Blue'],
      styles: ['Technical', 'Water-Resistant', 'Stretch'],
      minOrderLength: 5,
      careInstructions: 'Machine wash cold, hang to dry, do not iron',
      certifications: ['bluesign®']
    },
    {
      name: 'Heavyweight Oxford',
      description: 'Durable Oxford cloth for business shirts and professional uniforms. Features a basket weave texture and excellent durability.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/oxford-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/oxford-2.jpg'
      ],
      price: 16.50,
      fabricType: 'Oxford',
      composition: '70% Cotton, 30% Polyester',
      weight: '190 GSM',
      width: 145,
      availableColors: ['White', 'Light Blue', 'Blue', 'Pink', 'Gray', 'Yellow'],
      styles: ['Oxford', 'Professional', 'Business'],
      minOrderLength: 10,
      careInstructions: 'Machine wash warm, tumble dry low, iron medium heat',
      certifications: ['OEKO-TEX Standard 100']
    },
    {
      name: 'Micro Fleece',
      description: 'Lightweight yet warm fleece fabric ideal for pullovers, jackets, and cold-weather corporate wear.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/fleece-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/fleece-2.jpg'
      ],
      price: 16.99,
      fabricType: 'Fleece',
      composition: '100% Polyester',
      weight: '260 GSM',
      width: 160,
      availableColors: ['Black', 'Navy', 'Gray', 'Red', 'Green', 'Blue'],
      styles: ['Fleece', 'Warm', 'Soft'],
      minOrderLength: 10,
      careInstructions: 'Machine wash cold, tumble dry low, no iron',
      certifications: ['OEKO-TEX Standard 100']
    },
    {
      name: 'Stretch Poplin',
      description: 'Lightweight poplin fabric with added stretch for comfort and mobility. Great for corporate shirts and uniforms.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/poplin-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/poplin-2.jpg'
      ],
      price: 14.99,
      fabricType: 'Poplin',
      composition: '97% Cotton, 3% Spandex',
      weight: '135 GSM',
      width: 150,
      availableColors: ['White', 'Black', 'Navy', 'Light Blue', 'Purple', 'Pink', 'Gray'],
      styles: ['Stretch', 'Lightweight', 'Business'],
      minOrderLength: 10,
      careInstructions: 'Machine wash cold, tumble dry low, warm iron if needed',
      certifications: ['OEKO-TEX Standard 100']
    },
    {
      name: 'Recycled Polyester Canvas',
      description: 'Durable canvas made from recycled plastic bottles. Sustainable choice for tote bags, outerwear, and heavy-duty applications.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/recycled-canvas-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/recycled-canvas-2.jpg'
      ],
      price: 19.99,
      fabricType: 'Recycled Polyester',
      composition: '100% Recycled Polyester',
      weight: '340 GSM',
      width: 155,
      availableColors: ['Natural', 'Black', 'Navy', 'Gray', 'Green', 'Brown'],
      styles: ['Canvas', 'Sustainable', 'Durable'],
      minOrderLength: 5,
      careInstructions: 'Machine wash cold, hang to dry, do not bleach',
      certifications: ['GRS Certified', 'OEKO-TEX Standard 100']
    },
    {
      name: 'Bamboo Blend Jersey',
      description: 'Soft and eco-friendly bamboo blend jersey with natural antibacterial properties. Perfect for premium t-shirts and comfort wear.',
      images: [
        'https://fabrix-products.s3.amazonaws.com/fabrics/bamboo-jersey-1.jpg',
        'https://fabrix-products.s3.amazonaws.com/fabrics/bamboo-jersey-2.jpg'
      ],
      price: 22.50,
      fabricType: 'Bamboo Blend',
      composition: '70% Bamboo Viscose, 30% Organic Cotton',
      weight: '200 GSM',
      width: 145,
      availableColors: ['White', 'Black', 'Natural', 'Navy', 'Sage Green', 'Soft Blue'],
      styles: ['Jersey', 'Sustainable', 'Luxury'],
      minOrderLength: 8,
      careInstructions: 'Machine wash cold with mild detergent, lay flat to dry',
      certifications: ['OEKO-TEX Standard 100']
    }
  ];
  
  export default fabricProducts;