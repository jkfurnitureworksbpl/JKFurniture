// Use environment variable for API URL, fallback based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3002/api');

const normalizeHoverTabRecord = (record, index = 0) => {
  if (!record || typeof record !== 'object') return record;

  const {
    id,
    product_id,
    key,
    name,
    subcategories,
    ...rest
  } = record;

  const resolvedId = id ?? product_id ?? key ?? index;

  return {
    id: resolvedId,
    name: name ?? rest.title ?? rest.tab_name ?? `Category ${resolvedId}`,
    subcategories: Array.isArray(subcategories) ? subcategories : [],
    ...rest,
  };
};

const normalizeProductImageRecord = (record) => {
  if (!record || typeof record !== 'object') return record;

  const { img_doc_src, doc_src, ...rest } = record;
  const imageBase64 = img_doc_src || doc_src || null;

  return {
    ...rest,
    img_doc_src: imageBase64,
  };
};

// ======================================================
// 📡 API CALLS
// ======================================================

/**
 * Fetch hover tabs from backend
 */
export const fetchHoverTabs = async () => {
  console.log("Fetching hover tabs from API...");
  try {
    const response = await fetch(`${API_BASE_URL}/hover-tabs`);
    const data = await response.json();

    console.log("Hover Tabs API Response:", data);

    if (data.success) {
      const normalized = Array.isArray(data.data)
        ? data.data.map((record, index) => normalizeHoverTabRecord(record, index))
        : [];
      console.log('🔍 API Response - Total tabs:', normalized.length);
      return normalized;
    } else {
      throw new Error(data.error || 'Failed to fetch hover tabs');
    }
  } catch (error) {
    console.error('Error fetching hover tabs:', error);
    throw error;
  }
};

/**
 * Fetch all product images
 */
export const fetchProductImages = async () => {
  console.log("Fetching product images from API...");
  try {
    const response = await fetch(`${API_BASE_URL}/product-images`);
    const data = await response.json();

    console.log("Product Images API Response:", data);
    
    if (data.success) {
      // const normalized = Array.isArray(data.data)
      //   ? data.data.map(normalizeProductImageRecord)
      //   : [];
      // console.log('🔍 Total product images normalized:', normalized.length);
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to fetch product images');
    }
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error;
  }
};

/**
 * Fetch product images by category name
 */
export const fetchProductImagesBaseOnCategory = async (categoryName) => {
  console.log(`Fetching product images for category: ${categoryName}`);
  try {
    const response = await fetch(`${API_BASE_URL}/product-images/category/${encodeURIComponent(categoryName)}`);
    const data = await response.json();

    console.log(`Product Images for '${categoryName}' API Response:`, data);

    if (data.success) {
      const normalized = Array.isArray(data.data)
        ? data.data.map(normalizeProductImageRecord)
        : [];
      console.log(`🔍 Total images for '${categoryName}':`, normalized.length);
      return normalized;
    } else {
      throw new Error(data.error || `Failed to fetch product images for category: ${categoryName}`);
    }
  } catch (error) {
    console.error(`Error fetching images for '${categoryName}':`, error);
    throw error;
  }
};
