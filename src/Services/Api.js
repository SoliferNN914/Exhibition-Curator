import axios from 'axios';

const MET_API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const CHICAGO_API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const searchArtworks = async (searchTerm, startYear, endYear) => {
  console.log("met Year", startYear, endYear);
  
  try {
    const response = await axios.get(`${MET_API_BASE_URL}/search`, {
      params: {
        dateBegin: startYear || undefined,
        dateEnd: endYear || undefined,  
        fields: 'objectID,title,objectName',
        hasImages: true,
        q: searchTerm,
      },
    });
    console.log("metresponse", response.data);
    
    return response.data.objectIDs || [];
  } catch (error) {
    console.error('Error searching artworks:', error);
    throw error;
  }
};


export const fetchArtworkDetails = async (objectID) => {
  try {
    const response = await axios.get(`${MET_API_BASE_URL}/objects/${objectID}`);
    const {
      title,
      artistDisplayName,
      objectDate,
      primaryImage,
      primaryImageSmall,
      objectID: id,
      objectURL,
      medium,
      dimensions,
    } = response.data;

    let imageUrl = primaryImage || primaryImageSmall;  

    if (!imageUrl && response.data.media) {
      const iiifBase = `https://collectionapi.metmuseum.org/api/collection/v1/iiif/${id}`;
      const assetId = response.data.media.length > 0 ? response.data.media[0].asset_id : null;
      
      if (assetId) {
        imageUrl = `${iiifBase}/${assetId}/full/full/0/default.jpg`; 
      }
    }

    if (!imageUrl) {
      return null;
    }

    return {
      title,
      artistDisplayName,
      objectDate,
      imageUrl,
      objectURL,
      medium,
      dimensions,
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn(`Artwork with ID ${objectID} not found (404). Skipping.`);
      return null;
    }
    throw error;
  }
};


export const searchChicagoArtworks = async (searchTerm, page = 1, startYear, endYear) => {
  console.log("Chicago search parameters:", { searchTerm, page, startYear, endYear });
  
  let query = searchTerm;

  if (startYear || endYear) {
    let dateQuery = '';
    if (startYear && endYear) {
      dateQuery = `((date_start:>=${startYear} AND date_start:<=${endYear}) OR (date_end:>=${startYear} AND date_end:<=${endYear}) OR (date_start:<=${startYear} AND date_end:>=${endYear}))`;
    } else if (startYear) {
      dateQuery = `date_end:>=${startYear}`;
    } else if (endYear) {
      dateQuery = `date_start:<=${endYear}`;
    }
    query += ` AND ${dateQuery}`;
  }

  try {
    const response = await axios.get(`${CHICAGO_API_BASE_URL}/search`, {
      params: {
        q: query,
        fields: 'id,title,image_id,date_display,artist_title,date_start,date_end',
        page: page,
        limit: 20,
      },
    });
    
    console.log("Chicago API response:", response.data);
    
    return response.data.data || [];
  } catch (error) {
    console.error('Error searching Art Institute of Chicago artworks:', error);
    throw error;
  }
};

export const fetchChicagoArtworkDetails = async (id) => {
  try {
    const response = await axios.get(`${CHICAGO_API_BASE_URL}/${id}`, {
      params: {
        fields: 'id,title,image_id,date_display,artist_display,medium_display,dimensions,artwork_type_title,department_title,artist_title',
      },
    });

    const {
      title,
      artist_display,
      date_display,
      image_id,
      medium_display,
      dimensions,
      artwork_type_title,
      department_title,
      artist_title,
    } = response.data.data;

    const imageUrl = image_id ? `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg` : null;
    const objectURL = `https://www.artic.edu/artworks/${id}`;

    return { 
      title, 
      artistDisplayName: artist_display, 
      objectDate: date_display, 
      medium: medium_display, 
      dimensions, 
      objectURL,
      imageUrl,
      artworkType: artwork_type_title,
      department: department_title,
      artistTitle: artist_title,
    };
  } catch (error) {
    console.error('Error fetching Art Institute of Chicago artwork details:', error);
    throw error;
  }
};