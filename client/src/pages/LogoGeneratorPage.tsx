// src/pages/LogoGeneratorPage.tsx
import React, { useState } from 'react';
import { generateLogo } from '../api/logoApi';

interface LogoFormData {
  companyName: string;
  industry: string;
  slogan: string;
  style: string;
  colors: string[];
  size: 'small' | 'medium' | 'large';
  customPrimaryColor: string;
  customSecondaryColor: string;
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Food & Beverage',
  'Manufacturing',
  'Entertainment',
  'Transportation',
  'Construction',
  'Agriculture',
  'Real Estate',
  'Sports',
  'Fashion',
  'Travel'
];

const styles = [
  'Modern',
  'Vintage',
  'Minimalist',
  'Bold',
  'Playful',
  'Luxury',
  'Tech',
  'Handcrafted',
  'Corporate',
  'Geometric'
];

const colorPalettes = [
  { name: 'Blue & Orange', colors: ['#1E88E5', '#FF9800'] },
  { name: 'Green & Purple', colors: ['#4CAF50', '#9C27B0'] },
  { name: 'Red & Teal', colors: ['#F44336', '#009688'] },
  { name: 'Black & Gold', colors: ['#212121', '#FFC107'] },
  { name: 'Pink & Navy', colors: ['#E91E63', '#3F51B5'] },
  { name: 'Custom Colors', colors: [] }
];

const LogoGeneratorPage: React.FC = () => {
  const [formData, setFormData] = useState<LogoFormData>({
    companyName: '',
    industry: '',
    slogan: '',
    style: '',
    colors: colorPalettes[0].colors,
    size: 'medium',
    customPrimaryColor: '#1E88E5',
    customSecondaryColor: '#FF9800'
  });
  
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0].name);
  const [generating, setGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleColorPaletteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paletteName = e.target.value;
    setSelectedPalette(paletteName);
    
    const palette = colorPalettes.find(p => p.name === paletteName);
    if (palette) {
      if (palette.name === 'Custom Colors') {
        // Keep custom colors if switching to custom palette
        setFormData({
          ...formData,
          colors: [formData.customPrimaryColor, formData.customSecondaryColor]
        });
      } else {
        // Update colors when selecting a predefined palette
        setFormData({
          ...formData,
          colors: palette.colors
        });
      }
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // If custom colors palette is selected, update the colors array
    if (selectedPalette === 'Custom Colors') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        colors: name === 'customPrimaryColor' 
          ? [value, prev.customSecondaryColor]
          : [prev.customPrimaryColor, value]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setGenerating(true);
    
    try {
      const payload = {
        companyName: formData.companyName,
        industry: formData.industry,
        slogan: formData.slogan,
        style: formData.style,
        colors: formData.colors,
        size: formData.size
      };

      // Call API to generate logo
      const logoUrl = await generateLogo(payload);
      setGeneratedLogo(logoUrl);
    } catch (err) {
      setError('Failed to generate logo. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedLogo) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = generatedLogo;
    link.download = `${formData.companyName.replace(/\s+/g, '-').toLowerCase()}-logo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">AI Logo Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Logo Generation Form */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Brand Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-1">
                  Slogan (Optional)
                </label>
                <input
                  type="text"
                  id="slogan"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your slogan or tagline"
                />
              </div>
              
              <h2 className="text-xl font-semibold mt-8 mb-6">Design Preferences</h2>
              
              <div className="mb-4">
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Style *
                </label>
                <select
                  id="style"
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Select a style</option>
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="colorPalette" className="block text-sm font-medium text-gray-700 mb-1">
                  Color Palette *
                </label>
                <select
                  id="colorPalette"
                  name="colorPalette"
                  value={selectedPalette}
                  onChange={handleColorPaletteChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {colorPalettes.map((palette) => (
                    <option key={palette.name} value={palette.name}>
                      {palette.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedPalette === 'Custom Colors' && (
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customPrimaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                      Primary
                    </label>
                    <input
                      type="color"
                      id="customPrimaryColor"
                      name="customPrimaryColor"
                      value={formData.customPrimaryColor}
                      onChange={handleCustomColorChange}
                      className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="customSecondaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                      Secondary
                    </label>
                    <input
                      type="color"
                      id="customSecondaryColor"
                      name="customSecondaryColor"
                      value={formData.customSecondaryColor}
                      onChange={handleCustomColorChange}
                      className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                    />
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Size *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <input
                      type="radio"
                      id="sizeSmall"
                      name="size"
                      value="small"
                      checked={formData.size === 'small'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="sizeSmall">Small</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="sizeMedium"
                      name="size"
                      value="medium"
                      checked={formData.size === 'medium'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="sizeMedium">Medium</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="sizeLarge"
                      name="size"
                      value="large"
                      checked={formData.size === 'large'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="sizeLarge">Large</label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? 'Generating...' : 'Generate Logo'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
        
        {/* Logo Preview */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-6">Logo Preview</h2>
            
            <div className="flex-grow flex items-center justify-center bg-gray-100 rounded-md mb-6">
              {generatedLogo ? (
                <img 
                  src={generatedLogo} 
                  alt="Generated Logo" 
                  className="max-w-full max-h-64"
                />
              ) : (
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">
                    {generating ? 'Generating your logo...' : 'Fill out the form and generate to see your logo preview'}
                  </p>
                </div>
              )}
            </div>
            
            {generatedLogo && (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Logo Information</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Company:</strong> {formData.companyName}</li>
                    <li><strong>Industry:</strong> {formData.industry}</li>
                    {formData.slogan && <li><strong>Slogan:</strong> {formData.slogan}</li>}
                    <li><strong>Style:</strong> {formData.style}</li>
                    <li><strong>Size:</strong> {formData.size}</li>
                  </ul>
                </div>
                
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-sm"
                >
                  Download Logo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoGeneratorPage;