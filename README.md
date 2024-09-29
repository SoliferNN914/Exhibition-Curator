# Exhibition Curator App

This **Exhibition Curator App** is built using React and allows users to search artworks, filter by creation year, and sort results alphabetically. Users can also save items in a temporary exhibition for the duration of their session. The application integrates with the Met Museum API and the Art Institute of Chicago API to display and explore artworks.

## Features

- **Search Artworks:** Users can search for artworks using keywords from multiple museum collections.
- **Filter by Year:** Filter artworks based on the creation year range.
- **Sort by Alphabet:** Sort artworks by title either in ascending or descending order.
- **Temporary Exhibition:** Users can add artworks to a temporary exhibition collection, which is saved locally for the session.
- **Responsive Design:** The app is optimized for mobile and desktop use.

- ## Live Demo

The project is hosted on **Vercel** and can be accessed through this link:

**[Exhibition Curator App](https://exhibition-curator-nu.vercel.app)**

## Technologies Used

- **Frontend:** React
- **APIs:**
  - Met Museum API
  - Art Institute of Chicago API
- **State Management:** React hooks
- **Styles:** CSS, Styled Components

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SoliferNN914/Exhibition-Curator.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Exhibition-Curator
   ```

3. **Install dependencies:**

   Ensure you have [Node.js](https://nodejs.org/en/download/) installed. Then, run the following command to install the project dependencies:

   ```bash
   npm install
   ```

4. **Start the application:**

   To start the app on your local development server:

   ```bash
   npm start
   ```

5. **Access the app:**

   Once the app is running, open your browser and go to:

   ```
   http://localhost:3000
   ```

## API Integration

- **Met Museum API:** 
  The app fetches artworks using the Met Museum API, including filters by creation date and results with images.
  
- **Art Institute of Chicago API:** 
  Artworks from the Art Institute of Chicago are fetched and displayed, with server-side date filtering applied.

## How to Use

1. **Search Artworks:**
   - Enter a keyword into the search bar to find relevant artworks.
   
2. **Filter by Year:**
   - Input a start year and end year to filter artworks created within that range.

3. **Sort Results:**
   - Use the sort options to arrange artworks alphabetically, either ascending (A-Z) or descending (Z-A).
   
4. **Save to Temporary Exhibition:**
   - Click on the artwork to add it to your temporary exhibition. This selection will persist only during your current session.

## Future Improvements

- **User Authentication:** Save exhibitions permanently by allowing users to log in and store their collections in a backend database.
- **Enhanced Filtering:** Add additional filters such as medium, artist, or museum collection.
