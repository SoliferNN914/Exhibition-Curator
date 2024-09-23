import axios from 'axios';

const MET_API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const RIJKS_API_BASE_URL = 'https://www.rijksmuseum.nl/api/en/collection';
const Apikey = process.env.REACT_APP_RIJKS_API_KEY;

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

export const searchRijksArtworks = async (searchTerm) => {
  try {
    const response = await axios.get(`${RIJKS_API_BASE_URL}`, {
      params: {
        key: Apikey,
        q: searchTerm,
        imgonly: true,
      },
      mode: 'cors'
    });
    console.log('SearcRijksArtworks', response.data.artObjects);
    
    return response.data.artObjects || [];
  } catch (error) {
    console.error('Error searching Rijksmuseum artworks:', error);
    throw error;
  }
};


export const fetchRijksArtworkDetails = async (id) => {
  console.log('fetchdetailsID', id);
  
  try {
    const response = await axios.get(`${RIJKS_API_BASE_URL}/${id}`, {
      params: {
        key: Apikey,
      },
    });
    console.log('Artwork details:', response.data.artObject);
    return response.data.artObject;
  } catch (error) {
    console.error('Error fetching Rijksmuseum artwork details:', error);
    throw error;
  }
};