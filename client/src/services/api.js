const API_BASE_URL = 'http://localhost:3002/api';

// Fetch hover tabs from backend
export const fetchHoverTabs = async () => {
  console.log("this_ks_my_data123");
  try {
    const response = await fetch(`${API_BASE_URL}/hover-tabs`);
    const data = await response.json();

    console.log("this_ks_my_data",data);
    
        if (data.success) {
          console.log('🔍 API Response - Total tabs:', data.data.length);
          console.log('🔍 API Response - Data:', data.data);
          return data.data;
        } else {
          throw new Error(data.error || 'Failed to fetch hover tabs');
        }
  } catch (error) {
    console.error('Error fetching hover tabs:', error);
    throw error; // Re-throw the error instead of returning fallback data
  }
};

// Fetch product images from backend
export const fetchProductImages = async () => {
  console.log("Fetching product images from API...");
  try {
    const response = await fetch(`${API_BASE_URL}/product-images`);
    const data = await response.json();

    console.log("Product images API response:", data);
    
    if (data.success) {
      console.log('🔍 API Response - Total product images:', data.data.length);
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to fetch product images');
    }
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error; // Re-throw the error instead of returning fallback data
  }
};

// Fetch product images by category from backend
export const fetchProductImagesBaseOnCategory = async (categoryName) => {
  console.log(`Fetching product images for category: ${categoryName} from API...`);
  try {
    const response = await fetch(`${API_BASE_URL}/product-images/category/${encodeURIComponent(categoryName)}`);
    const data = await response.json();

    console.log(`Product images for category '${categoryName}' API response:`, data);
    
    if (data.success) {
      console.log(`🔍 API Response - Total product images for category '${categoryName}':`, data.data.length);
      return data.data;
    } else {
      throw new Error(data.error || `Failed to fetch product images for category: ${categoryName}`);
    }
  } catch (error) {
    console.error(`Error fetching product images for category '${categoryName}':`, error);
    throw error;
  }
};
