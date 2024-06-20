<!-- Page content including cat grid, spinner, error box, and load more button etc. -->
<template>
  <div class="container">
    <PageHeader />
    <FilterBar class="sticky-filter-bar" 
      :filterDisabled="filterDisabled" 
      @filter="handleFilter" 
      @refresh="refreshPage">
    </FilterBar>
    <main class="main-content">
      <CatGrid :cats="cats" />
      <Spinner v-if="loading" />
      <ErrorBox v-if="ShowError"/>
      <LoadButton 
        :disabled="loadButtonDisabled" 
        :visible="loadButtonVisible"
        :text="buttonText"
        @load-more="fetchCats(filterValue)" 
        v-if="!loading && !noRecords" 
      />
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import PageHeader from '../components/PageHeader.vue';
  import PageFooter from '../components/PageFooter.vue';
  import CatGrid from '../components/CatGrid.vue';
  import LoadButton from '../components/LoadButton.vue';
  import Spinner from '../components/ActivitySpinner.vue';
  import FilterBar from '../components/DropdownFilter.vue';
  import { getRandomNumber } from '@/utils/functions'; // Adjust the path as needed
  import { fetchImages } from '@/services/catService';
  import ErrorBox from '../components/ErrorBox.vue';

  const cats = ref([]);
  const skip = ref(0); // The number or records to skip when fetching images.
  const batchQty = 10; // The number of images to fetch in one request. 
  const loading = ref(false);
  const noRecords = ref(false);
  const loadButtonDisabled = ref();
  const loadButtonVisible = ref(true); 
  const buttonText = ref(showMoreMessage);
  const filterValue = ref('');
  const recordCount = ref(0);
  const filterDisabled=ref(false); 
  const requestTimeOut = 3000; // 3 seconds, although browser implements its own! 
  const maxRecords = 120; // Max allowed images to loaded.
  const maxNumberForRandom = 1401;
  const API_BASE_URL = 'https://cataas.com/cat/';
  const ShowError = ref(false);
  const showMoreMessage = "Show more results";
  const noMoreMessage= "END OF RESULTS";
  const pageTitle = "Catsnap Gallery"

  onMounted(() => {
    initialise();
  });

  // Display some random cats (by using a random starting point for skip).
  // The default category is "All Cats".
  function initialise() {
    document.title= pageTitle;
    skip.value = getRandomNumber(maxNumberForRandom);
    fetchCats();
  }

  async function fetchCats(filter) {
    try {
      showSpinner(true);  
      EnableFilter(false);        
      let moreImagesAvailable = false;

      // Fetch the next batch of images. The response body includes a list 
      // of cats with Ids etc. Request an additional record so we can see 
      // if there is any more to collect after this batch.
      const response = await fetchImages(batchQty + 1, skip.value , filter);

      if (response.data.length > batchQty){
        moreImagesAvailable = true;
        response.data.splice(batchQty, 1); // Remove the last record 
      }
      
      // Pre-load and display the images.
      await preloadAndDisplayCats(response);
      
      // Decide the state of the "More Records" button.
      enableMoreButton(false);
      if (recordCount.value <= (maxRecords - batchQty) && moreImagesAvailable){
          enableMoreButton(true);
      }
    } catch (error) {
        const errorMsg = error.message || JSON.stringify(error);
        console.error('Error fetching cat images:', errorMsg);
        HandleShowError(true);
    } finally {
        // Regardless of errors, update the skip value to get the next batch.
        skip.value += batchQty; 
        loading.value = false;
        EnableFilter(true);
    }
  }

  // Preload and display the images asynchronously.
  // This function handles the preloading of images, ensuring that the wait 
  // spinner is shown while images are being loaded from the server.
  async function preloadAndDisplayCats(response) {
    // Create a list of image information to be requested
    const catList = response.data.map((cat) => ({
      id: cat._id,
      url: `${API_BASE_URL}${cat._id}?type=small`,
    }));
    
    // Preload the images asynchronously.
    const preloadedImages = await preloadImages(catList);
    
    // Append the preloaded images to the existing list of cats
    // Vue reactivity will respond to the changes and load the images.
    cats.value = [...cats.value, ...preloadedImages];
  }
  
  // Preload the images asynchronously
  // Input: images - An array of image objects containing image IDs and URLs
  //        timeout - Timeout duration (if required) for loading each image.
  async function preloadImages(images, timeout = requestTimeOut) {
    const preloadedImages = [];

    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        // Load the image
        const img = new Image();
        img.id = image._id;
        img.src = image.url;
        
        // The image has been loaded but we need to confirm this by checking
        // the dimensions.
        img.onload = () => {
          if (img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0) {
            recordCount.value += 1;
            preloadedImages.push(image); // Add the image to the preloaded list
            resolve();
          } else {
            reject(new Error('Image failed to load properly'));
          }
        };
        
        // The image has failed to load so reject. 
        img.onerror = (event) => {
          const errorMessage = `Image with URL ${event.target.src} failed to load`;
          reject(new Error(errorMessage));
        };

        // A timeout has been specified although browser implements its own.
        setTimeout(() => {
          const imageUrl = img.src; // Capture the URL of the image;
          reject(new Error(`Timeout occurred while loading image with URL ${imageUrl}`));
        }, timeout);
      });
    };

    // Use Promise.all to concurrently preload all images in the provided array.
    // This ensures efficient loading by initiating multiple image preload operations simultaneously.
    // Each image preload operation is handled by the loadImage function, which returns a promise.
    // If any image fails to load, the error is caught.
    await Promise.all(images.map((image) => loadImage(image).catch((error) => {
      LogError(image.url, error);
    })));

    return preloadedImages;
  }
  
  // Optional console logging.
  function LogError(url, error){
    const logErr = false; 
    if (logErr){console.error('Error preloading image:', url, error)}
  }

  // Enable or Disable the category list and refresh button.
  // Input:  True or False to enable and disable accordingly.
  function EnableFilter(value){
    filterDisabled.value=!value;
  }
  
  // Clear all the cat images and reset everything for a new request.
  function reset(){
    recordCount.value = 0;
    skip.value = 0;
    cats.value = [];
    HandleShowError(false);
    enableMoreButton(false);
  }

  // A new cat search initiated by the category list.
  // Input: value - the value for the selected category.
  // No value ('') is used for all cats.
  function handleFilter(value) {
    filterValue.value = value;
    reset();
    if (!value) { skip.value=getRandomNumber(maxNumberForRandom) }
    fetchCats(value);
  }

  // Refresh the page in reponse to the refresh button being pressed.
  // If "All Cats" is selected we will provide a new random set of images.
  function refreshPage(value) {
    reset();  
    if (!value) { skip.value=getRandomNumber(maxNumberForRandom) }
    fetchCats(value);
  }
  
  // Enable or Disable the Load More buton.
  // Input:  True or False to respectively enable and disable the button.
  // Text is updated accordingly.
  function enableMoreButton(value) {
      loadButtonDisabled.value= !value;
      buttonText.value =  value ? showMoreMessage : noMoreMessage;
  }

  // Show or hide the activity spinner
  // Input:  True or False to show and hide respectively.
  function showSpinner(value){
    loading.value = value;
  }

  // When a handled error occurs show the error box and diable the 
  // "Show more" button.
  function HandleShowError(value){
    ShowError.value = value;
    enableMoreButton(false);
  }
</script>

<style scoped>  
  html, body {
    height: 100%;
    margin: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensure container takes full viewport height */  
  }

  .main-content {
    flex: 1; /* Take up remaining space */
    overflow: auto; /* Enable scrolling if content overflows */
  }

  footer {
    background-color: #333; 
    color: white; 
    text-align: center; /* Center the content horizontally */
    padding: 10px;
  }
  
  /* Ensure the filter bar is sticky so that the users can chnage filter 
     or refresh (All Cats) without having to scroll back to the top. */
  .sticky-filter-bar {
    position: -webkit-sticky; /* For Safari */
    position: sticky;
    top: 0;
    z-index: 1000; /* Display on top of other elements */
    background-color: white;
    padding: 15px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  }
</style>
