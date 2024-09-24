import axios from 'axios';

const MET_API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const CHICAGO_API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const searchArtworks = async (searchTerm) => {
  try {
    const response = await axios.get(`${MET_API_BASE_URL}/search`, {
      params: {
        q: searchTerm,
        hasImages: true,
      },
    });
    return response.data.objectIDs || [];
  } catch (error) {
    console.error('Error searching artworks:', error);
    throw error;
  }
};

export const fetchArtworkDetails = async (objectID) => {
  try {
    const response = await axios.get(`${MET_API_BASE_URL}/objects/${objectID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artwork details:', error);
    throw error;
  }
};

export const searchChicagoArtworks = async (searchTerm, page = 1) => {
  try {
    const response = await axios.get(`${CHICAGO_API_BASE_URL}/search`, {
      params: {
        q: searchTerm,
        page: page,
        limit: 10, 
        fields: 'id,title,image_id',
      },
    });

    return response.data.data || [];
  } catch (error) {
    console.error('Error searching Art Institute of Chicago artworks:', error);
    throw error;
  }
};



export const fetchChicagoArtworkDetails = async (id, image_id) => {
  try {
    const response = await axios.get(`${CHICAGO_API_BASE_URL}/${id}`);

    const {
      title,
      artist_display: artistDisplayName,
      date_display: objectDate,
      medium_display: medium,
      dimensions,
    } = response.data.data;

    const imageUrl = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;

    const objectURL = `https://www.artic.edu/artworks/${id}`;

    return { 
      title, 
      artistDisplayName, 
      objectDate, 
      medium, 
      dimensions, 
      objectURL,
      imageUrl 
    };
  } catch (error) {
    console.error('Error fetching Art Institute of Chicago artwork details:', error);
    throw error;
  }
};


