// Cat Service
import axios from 'axios';
const API_BASE_URL= 'https://cataas.com/api/cats'

// Fetch a file containing a list of images (Ids etc) to be loaded.
//   - batchQty: The number of images to fetch in a batch.
//   - skip:  The position in the file to start returning items.
//   - filter: An optional category filter to apply to the images.
//             Pass a blank string ('') to retrieve all images.
export async function fetchImages(batchQty, skip, filter) {
  const response = await axios.get(API_BASE_URL, {
      params: {
          limit: batchQty,
          skip: skip,
          tags: filter
      }
  });
  return response;
}


