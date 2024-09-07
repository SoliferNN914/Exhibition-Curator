import axios from 'axios';

const MET_API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Function to search for objects based on a keyword
export const searchArtworks = async (searchTerm) => {
  try {
    const response = await axios.get(`${MET_API_BASE_URL}/search`, {
      params: {
        q: searchTerm,
        hasImages: true, // Only include artworks with images
      },
    });
    return response.data.objectIDs || []; // Returns an array of objectIDs
  } catch (error) {
    console.error('Error searching artworks:', error);
    throw error;
  }
};

// Function to fetch details of a specific artwork by its ID
export const fetchArtworkDetails = async (objectID) => {
  try {
    const response = await axios.get(`${MET_API_BASE_URL}/objects/${objectID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artwork details:', error);
    throw error;
  }
};
