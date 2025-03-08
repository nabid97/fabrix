import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateLogo } from '../api/logoApi';
import { Loader, AlertCircle, Download, Shirt } from 'lucide-react';

// Logo Style options
const LOGO_STYLES = [
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'modern', name: 'Modern' },
  { id: 'abstract', name: 'Abstract' },
  { id: 'geometric', name: 'Geometric' },
  { id: 'handdrawn', name: 'Hand-drawn' },
];

// Color schemes
const COLOR_SCHEMES = [
  { id: 'monochrome', name: 'Monochrome', colors: ['#000000', '#FFFFFF'] },
  { id: 'blue', name: 'Blue', colors: ['#1E3A8A', '#3B82F6', '#93C5FD'] },
  { id: 'green', name: 'Green', colors: ['#065F46', '#10B981', '#A7F3D0'] },
  { id: 'red', name: 'Red', colors: ['#7F1D1D', '#EF4444', '#FECACA'] },
  { id: 'purple', name: 'Purple', colors: ['#4C1D95', '#8B5CF6', '#DDD6FE'] },
  { id: 'orange', name: 'Orange', colors: ['#7C2D12', '#F97316', '#FFEDD5'] },
  { id: 'custom', name: 'Custom Colors', colors: [] },
];

const LogoGeneratorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    slogan: '',
    style: 'minimalist',
    colorScheme: 'monochrome',
    customPrimaryColor: '#000000',
    customSecondaryColor: '#FFFFFF',
    customAccentColor: '#CCCCCC',
    size: 'medium',
  });

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setError(null);

    try {
      // Prepare colors array based on colorScheme
      let colors = [];
      if (formData.colorScheme === 'custom') {
        colors = [
          formData.customPrimaryColor,
          formData.customSecondaryColor,
          formData.customAccentColor,
        ];
      } else {
        const selectedScheme = COLOR_SCHEMES.find(
          (scheme) => scheme.id === formData.colorScheme
        );
        colors = selectedScheme?.colors || [];
      }

      // Prepare request payload
      const payload = {
        companyName: formData.companyName,
        industry: formData.industry,
        slogan: formData.slogan,
        style: formData.style,
        colors,
        size: formData.size,
      };

      // Call API to generate logo
      const logoUrl = await generateLogo(payload);
      setGeneratedLogo(logoUrl);
    } catch (err) {
      setError('Failed to generate logo. Please try again.');
      console.error('Logo generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    // Download logic for generated logo
    if (generatedLogo) {
      const link = document.createElement('a');
      link.href = generatedLogo;
      link.download = `${formData.companyName.replace(/\s+/g, '-').toLowerCase()}-logo.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUseInClothing = () => {
    // Save the logo to session and navigate to clothing page
    if (generatedLogo) {
      sessionStorage.setItem('generatedLogo', generatedLogo);
      navigate('/clothing?withLogo=true');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Logo Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Design Your Logo</h2>
          
          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
              <AlertCircle size={20} className="mr-2" />
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Company Name */}
              <div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g. Fashion, Technology, Food"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              {/* Slogan */}
              <div>
                <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-1">
                  Slogan or Tagline
                </label>
                <input
                  type="text"
                  id="slogan"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              {/* Logo Style */}
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Style
                </label>
                <select
                  id="style"
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {LOGO_STYLES.map((style) => (
                    <option key={style.id} value={style.id}>
                      {style.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Color Scheme */}
              <div>
                <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-700 mb-1">
                  Color Scheme
                </label>
                <select
                  id="colorScheme"
                  name="colorScheme"
                  value={formData.colorScheme}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {COLOR_SCHEMES.map((scheme) => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Custom Colors (conditionally rendered) */}
              {formData.colorScheme === 'custom' && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="customPrimaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                      Primary
                    </label>
                    <input
                      type="color"
                      id="customPrimaryColor"
                      name="customPrimaryColor"
                      value={formData.customPrimaryColor}
                      onChange={handleInputChange}
                      className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="customAccentColor" className="block text-sm font-medium text-gray-700 mb-1">
                      Accent
                    </label>
                    <input
                      type="color"
                      id="customAccentColor"
                      name="customAccentColor"
                      value={formData.customAccentColor}
                      onChange={handleInputChange}
                      className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                    />
                  </div>
                </div>
              )}
              
              {/* Logo Size */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={generating}
                  className={`w-full bg-teal-600 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-700 transition-colors flex items-center justify-center ${
                    generating ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {generating ? (
                    <>
                      <Loader size={20} className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    'Generate Logo'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Logo Preview</h2>
          
          <div className="flex flex-col items-center">
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              {generating ? (
                <div className="text-center">
                  <Loader size={40} className="animate-spin text-teal-600 mx-auto mb-4" />
                  <p className="text-gray-500">Generating your logo...</p>
                  <p className="text-xs text-gray-400 mt-2">This may take a moment</p>
                </div>
              ) : generatedLogo ? (
                <img
                  src={generatedLogo}
                  alt="Generated Logo"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <path d="M12 5v8.5M15.5 12H12m-5 0h1.5"></path>
                      <path d="M20.5 16.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v9Z"></path>
                    </svg>
                  </div>
                  <p>Your logo will appear here</p>
                </div>
              )}
            </div>
            
            {generatedLogo && (
              <div className="w-full space-y-4">
                <button
                  onClick={handleDownload}
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
                >
                  <Download size={18} className="mr-2" />
                  Download Logo
                </button>
                
                <button
                  onClick={handleUseInClothing}
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-md font-medium hover:bg-teal-700 transition-colors flex items-center justify-center"
                >
                  <Shirt size={18} className="mr-2" />
                  Use Logo in Clothing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Information Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">About Our Logo Generator</h2>
        <p className="text-gray-700 mb-4">
          Our AI-powered logo generator uses Stability AI to create unique, professional logos 
          for your business. Each logo is generated based on your inputs and customized to match 
          your brand's identity.
        </p>
        <p className="text-gray-700">
          After generating your logo, you can download it in high resolution or use it directly 
          on your custom clothing order. The generated logos are royalty-free for your business use.
        </p>
      </div>
    </div>
  );
};

export default LogoGeneratorPage;d cursor-pointer"
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
                      onChange={handleInputChange}
                      className="w-full h-10 border border-gray-300 rounded-m