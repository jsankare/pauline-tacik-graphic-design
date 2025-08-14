import { config } from 'dotenv';
import { listImages, configureCloudinary } from '../lib/cloudinary.js';

// Load environment variables from .env file
config();

const testCloudinary = async () => {
    try {
        console.log('Testing Cloudinary connection...');
        
        // Debug: Check if environment variables are loaded
        console.log('Environment variables:');
        console.log('CLOUD_NAME:', process.env.CLOUD_NAME ? '✓ Set' : '✗ Not set');
        console.log('API_KEY:', process.env.API_KEY ? '✓ Set' : '✗ Not set');
        console.log('API_SECRET:', process.env.API_SECRET ? '✓ Set' : '✗ Not set');
        
        if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
            throw new Error('Missing required Cloudinary environment variables');
        }
        
        // Configure Cloudinary after environment variables are loaded
        configureCloudinary();
        
        // Test listing images
        const images = await listImages();
        console.log(`✓ Successfully connected to Cloudinary`);
        console.log(`✓ Found ${images.length} images in your Cloudinary account`);
        
        if (images.length > 0) {
            console.log('\nSample images:');
            images.slice(0, 3).forEach((image, index) => {
                console.log(`  ${index + 1}. ${image.filename} (${image.format}, ${image.width}x${image.height})`);
            });
        }
        
        console.log('\n✅ Cloudinary configuration is working correctly!');
        
    } catch (error) {
        console.error('❌ Cloudinary test failed:', error.message);
        console.log('\nPlease check:');
        console.log('1. Your environment variables (CLOUD_NAME, API_KEY, API_SECRET)');
        console.log('2. Your Cloudinary account credentials');
        console.log('3. Your internet connection');
    }
};

// Run test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    testCloudinary();
}

export default testCloudinary;
