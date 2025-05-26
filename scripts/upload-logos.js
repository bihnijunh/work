const { v2: cloudinary } = require('cloudinary');

// Configuration
cloudinary.config({ 
    cloud_name: 'dmieu4ase', 
    api_key: '267975335217315', 
    api_secret: 'U4dQ8MGVgv6hHBJLqkrAg2nlGzo'
});

// Logo URLs to upload
const logos = [
    {
        url: 'https://www.zellepay.com/sites/default/files/Zelle-logo-tagline-horizontal-white-v2_1_0.png',
        public_id: 'email-logos/zelle-logo',
        name: 'Zelle Logo'
    },
    {
        url: 'https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/pp-logo-in-circle-2x.png',
        public_id: 'email-logos/paypal-header-logo',
        name: 'PayPal Header Logo'
    },
    {
        url: 'https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/footer-logo-with-crop-2x.png',
        public_id: 'email-logos/paypal-footer-logo',
        name: 'PayPal Footer Logo'
    },
    {
        url: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png',
        public_id: 'email-logos/chime-logo',
        name: 'Chime Logo'
    }
];

async function uploadLogos() {
    console.log('🚀 Starting logo upload to Cloudinary...\n');
    
    for (const logo of logos) {
        try {
            console.log(`📤 Uploading ${logo.name}...`);
            
            const uploadResult = await cloudinary.uploader.upload(logo.url, {
                public_id: logo.public_id,
                folder: '',
                overwrite: true,
                resource_type: 'image',
                format: 'png', // Convert all to PNG for consistency
                quality: 'auto:best',
                fetch_format: 'auto'
            });
            
            console.log(`✅ ${logo.name} uploaded successfully!`);
            console.log(`   📍 URL: ${uploadResult.secure_url}`);
            console.log(`   📏 Size: ${uploadResult.width}x${uploadResult.height}px`);
            console.log(`   💾 File size: ${Math.round(uploadResult.bytes / 1024)}KB\n`);
            
        } catch (error) {
            console.error(`❌ Failed to upload ${logo.name}:`, error.message);
        }
    }
    
    console.log('🎉 Logo upload process completed!');
    console.log('\n📋 Your Cloudinary URLs:');
    console.log('Zelle: https://res.cloudinary.com/dmieu4ase/image/upload/email-logos/zelle-logo.png');
    console.log('PayPal Header: https://res.cloudinary.com/dmieu4ase/image/upload/email-logos/paypal-header-logo.png');
    console.log('PayPal Footer: https://res.cloudinary.com/dmieu4ase/image/upload/email-logos/paypal-footer-logo.png');
    console.log('Chime: https://res.cloudinary.com/dmieu4ase/image/upload/email-logos/chime-logo.png');
}

// Run the upload
uploadLogos().catch(console.error);
