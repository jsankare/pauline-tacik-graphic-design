"use client";

import { useState, useRef, useEffect } from 'react';
import { PlusIcon, CloseIcon, DonutIcon } from '@/app/components/icons';

const ImageUpload = ({ 
	label, 
	value, 
	onChange, 
	multiple = false, 
	required = false,
	placeholder = "Cliquez pour sélectionner une image"
}) => {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState('');
	const [showExistingImages, setShowExistingImages] = useState(false);
	const [existingImages, setExistingImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const fileInputRef = useRef(null);

	// Fetch existing images when component mounts
	useEffect(() => {
		fetchExistingImages();
	}, []);

	const fetchExistingImages = async () => {
		try {
			const response = await fetch('/api/images');
			if (response.ok) {
				const images = await response.json();
				setExistingImages(images);
			}
		} catch (error) {
			console.error('Failed to fetch existing images:', error);
		}
	};

	// Normalize a value (string or object) to a usable image URL
	const getImageUrl = (img) => {
		if (!img) return '';
		if (typeof img === 'string') return img;
		if (typeof img === 'object' && img.url) return img.url;
		if (typeof img === 'object' && img.path) return img.path;
		return '';
	};

	const handleFileSelect = async (event) => {
		const files = Array.from(event.target.files);
		if (files.length === 0) return;

		setIsUploading(true);
		setUploadError('');

		try {
			const uploadPromises = files.map(async (file) => {
				const formData = new FormData();
				formData.append('file', file);

				const response = await fetch('/api/upload', {
					method: 'POST',
					body: formData
				});

				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.message || 'Erreur lors de l\'upload');
				}

				const result = await response.json();
				return result.url;
			});

			const uploadedUrls = await Promise.all(uploadPromises);

			if (multiple) {
				// For image arrays, add new images to existing ones
				const currentImages = Array.isArray(value) ? value : [];
				const newImages = [...currentImages, ...uploadedUrls];
				onChange(newImages);
			} else {
				// For single images (like thumbnails)
				onChange(uploadedUrls[0]);
			}

			// Refresh existing images list
			fetchExistingImages();
		} catch (error) {
			console.error('Upload error:', error);
			setUploadError(error.message);
		} finally {
			setIsUploading(false);
		}
	};

	const handleExistingImageSelect = (imageUrl) => {
		if (multiple) {
			// For image arrays, add new image to existing ones
			const currentImages = Array.isArray(value) ? value : [];
			if (!currentImages.includes(imageUrl)) {
				const newImages = [...currentImages, imageUrl];
				onChange(newImages);
			}
		} else {
			// For single images (like thumbnails)
			onChange(imageUrl);
		}
		setShowExistingImages(false);
	};

	const removeImage = async (indexToRemove) => {
		if (multiple && Array.isArray(value)) {
			const imageToRemove = value[indexToRemove];
			const newImages = value.filter((_, index) => index !== indexToRemove);
			onChange(newImages);
			
			// Clean up the deleted image file
			await cleanupDeletedImage(imageToRemove);
		} else {
			const imageToRemove = value;
			onChange('');
			
			// Clean up the deleted image file
			await cleanupDeletedImage(imageToRemove);
		}
	};

	const cleanupDeletedImage = async (imageUrl) => {
		const normalized = getImageUrl(imageUrl);
		if (!normalized) return;
		
		try {
			// Call cleanup API to remove the file
			await fetch('/api/upload/cleanup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ imageUrls: [normalized] })
			});
		} catch (error) {
			console.error('Failed to cleanup image:', error);
		}
	};

	const filteredExistingImages = existingImages.filter(image => 
		image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
		image.url.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const renderPreview = () => {
		if (multiple && Array.isArray(value)) {
			return (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
					{value.map((url, index) => (
						<div key={index} className="relative group">
							<img
								src={getImageUrl(url)}
								alt={`Image ${index + 1}`}
								className="w-full h-20 sm:h-24 object-cover rounded border"
							/>
							<button
								type="button"
								onClick={() => removeImage(index)}
								className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
								title="Supprimer cette image"
							>
								<CloseIcon className="w-3 h-3" />
							</button>
						</div>
					))}
				</div>
			);
		} else if (value && !multiple) {
			return (
				<div className="relative group mt-2">
					<img
						src={getImageUrl(value)}
						alt="Thumbnail"
						className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded border"
					/>
					<button
						type="button"
						onClick={() => removeImage()}
						className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
						title="Supprimer cette image"
					>
						<CloseIcon className="w-3 h-3" />
					</button>
				</div>
			);
		}
		return null;
	};

	return (
		<div>
			{label && (
				<label className="block text-sm font-medium text-gray-700 mb-2">
					{label}
					{required && <span className="text-red-500">*</span>}
				</label>
			)}
			
			<div className="space-y-3">
				{/* Upload New Image */}
				<button
					type="button"
					onClick={() => fileInputRef.current?.click()}
					disabled={isUploading}
					className="w-full flex items-center justify-center px-3 sm:px-4 py-2 border-2 border-dashed border-gray-300 rounded-sm hover:border-indigo-400 hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
				>
					<PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400 flex-shrink-0" />
					<span className="text-gray-600 truncate">
						{isUploading ? 'Upload en cours...' : placeholder}
					</span>
				</button>

				{/* Use Existing Image */}
				<button
					type="button"
					onClick={() => setShowExistingImages(!showExistingImages)}
					className="w-full flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors text-sm sm:text-base"
				>
					<DonutIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
					<span className="text-gray-600">
						{showExistingImages ? 'Masquer les images existantes' : 'Utiliser une image existante'}
					</span>
				</button>

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					multiple={multiple}
					onChange={handleFileSelect}
					className="hidden"
				/>

				{uploadError && (
					<p className="text-sm text-red-600">{uploadError}</p>
				)}

				{/* Existing Images Modal */}
				{showExistingImages && (
					<div className="border border-gray-200 rounded-sm p-4 bg-gray-50">
						<div className="mb-3">
							<input
								type="text"
								placeholder="Rechercher une image..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
							{filteredExistingImages.map((image) => (
								<button
									key={image.filename}
									onClick={() => handleExistingImageSelect(image.url)}
									className="relative group border border-gray-200 rounded overflow-hidden hover:border-indigo-400 hover:shadow-md transition-all"
									title={`Cliquer pour utiliser: ${image.filename}`}
								>
									<img
										src={image.url}
										alt={image.filename}
										className="w-full h-16 object-cover"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
										<PlusIcon className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
									</div>
									{image.isUsed && (
										<div className="absolute top-1 left-1 bg-secondary text-white text-xs px-1 py-0.5 rounded">
											{image.usageCount}
										</div>
									)}
								</button>
							))}
						</div>
						
						{filteredExistingImages.length === 0 && (
							<p className="text-center text-sm text-gray-500 py-4">
								{searchTerm ? 'Aucune image trouvée' : 'Aucune image disponible'}
							</p>
						)}
					</div>
				)}

				{renderPreview()}
			</div>
		</div>
	);
};

export default ImageUpload; 