import React, { useState, useEffect } from 'react';

export default function UserExhibitions() {
  const [exhibition, setExhibition] = useState([]);

  useEffect(() => {
    // Get saved exhibition from session storage
    const savedExhibition = JSON.parse(sessionStorage.getItem('userExhibition')) || [];
    setExhibition(savedExhibition);
  }, []);

  const removeFromExhibition = (objectID) => {
    const updatedExhibition = exhibition.filter(artwork => artwork.objectID !== objectID);
    setExhibition(updatedExhibition);
    sessionStorage.setItem('userExhibition', JSON.stringify(updatedExhibition));
  };

  return (
    <div>
      <h2>Your Saved Exhibition</h2>
      {exhibition.length === 0 ? (
        <p>No artworks in your exhibition.</p>
      ) : (
        <div>
          {exhibition.map((artwork) => (
            <div key={artwork.objectID}>
              <img src={artwork.primaryImageSmall} alt={artwork.title} />
              <h3>{artwork.title}</h3>
              <button onClick={() => removeFromExhibition(artwork.objectID)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
