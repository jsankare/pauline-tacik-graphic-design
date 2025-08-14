import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
const configureCloudinary = () => {
  const config = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  };
  
  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Cloudinary config:', {
      cloud_name: config.cloud_name ? '✓ Set' : '✗ Not set',
      api_key: config.api_key ? '✓ Set' : '✗ Not set',
      api_secret: config.api_secret ? '✓ Set' : '✗ Not set'
    });
  }
  
  cloudinary.config(config);
};

// Auto-configure for Next.js API routes (environment variables are already loaded)
if (process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET) {
  configureCloudinary();
}

// Export the configuration function for manual use in scripts
export { configureCloudinary };

// Upload image to Cloudinary
export const uploadImage = async (fileBuffer, options = {}) => {
  try {
    // Convert buffer to base64
    const base64Image = fileBuffer.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64Image}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'pauline-tacik',
      resource_type: 'image',
      ...options
    });
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

// Delete image from Cloudinary
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

// Get all images from Cloudinary
export const listImages = async () => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'pauline-tacik/',
      max_results: 500
    });
    
    return result.resources.map(resource => ({
      filename: resource.public_id.split('/').pop(),
      url: resource.secure_url,
      public_id: resource.public_id,
      size: resource.bytes,
      createdAt: resource.created_at,
      width: resource.width,
      height: resource.height,
      format: resource.format
    }));
  } catch (error) {
    console.error('Cloudinary list error:', error);
    throw new Error('Failed to list images from Cloudinary');
  }
};

// Extract public_id from Cloudinary URL
export const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }
  
  try {
    // Extract the path after the cloud name and before the transformation parameters
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    if (uploadIndex === -1) return null;
    
    // Get everything after 'upload' and before any transformation parameters
    const pathParts = urlParts.slice(uploadIndex + 2);
    const pathWithoutTransform = pathParts[0].split('/');
    
    // Remove the version number if present (v1234567890)
    if (pathWithoutTransform[0].startsWith('v')) {
      pathWithoutTransform.shift();
    }
    
    return pathWithoutTransform.join('/');
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
};

// Check if URL is a Cloudinary URL
export const isCloudinaryUrl = (url) => {
  return url && url.includes('cloudinary.com');
};
