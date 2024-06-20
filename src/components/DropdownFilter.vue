  <template>
    <div class="filter-container">
      <label for="filter" class="filter-label">Category</label>
      <!-- Dropdown for filtering options -->
      <select 
        class="filter-dropdown" 
        :disabled="filterDisabled" 
        v-model="selectedOption" 
        @change="handleSelectionChange">
        <!-- Iterate over dropdown options -->
        <option v-for="(option, index) in options" 
          :key="index" :value="option.value">
          {{ option.display }}
        </option>
      </select>
      <!-- Refresh button with an icon -->
      <button 
        :disabled="filterDisabled" 
        class="btn-refresh" 
        @click="handleRefresh">
        <img src="../assets/refresh-icon.png" alt="" title="Click to refresh images" class="refresh-icon" />
      </button>    
    </div>
  </template>
  
  <script setup>
    import { ref, defineEmits, defineProps } from 'vue';
    import optionsData from '/filter-list.json'; //Dropdown options 
    
    const selectedOption = ref(''); // Default selected option to "All Cats"
    const options = ref(optionsData);
    
    // Define props for the component
    defineProps({
      filterDisabled: {
        type:Boolean,
        default: false
      }
    });

    // Define emits for custom events
    const emit = defineEmits(['filter', 'refresh']);
    
    function handleSelectionChange() {
      emit('filter', selectedOption.value); // Emit the selected value to the parent when selection changes
    }
    
    function handleRefresh() {
      emit('refresh', selectedOption.value);
    }
  </script>
  
  <style scoped>
    button{
      height:40px;
      width: 40px;
      background: transparent;
      margin-left:5px;
      border: 1px solid lightgray;
      cursor: pointer;
    }

    .refresh-icon {
      width: 24px; /* Set the width of the refresh icon */
      height: 24px; /* Set the height of the refresh icon */
      user-select: none; /* Disable text selection */
    }

    .filter-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    
    .filter-label {
      height: 40px;
      width: 85px;
      font-size: 16px;
      font-weight: 500;
      color: black;
      background-color: whitesmoke;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-right: none;
      border-radius: 4px 0 0 4px;
      display: flex;
      align-items: center; /* Vertically center the text */
      justify-content: center; /* Horizontally center the text */
      user-select: none; /* Disable text selection */  
    }

    .filter-dropdown {
      height: 40px;
      width: 210px;
      border: 1px solid #ccc;
      border-radius: 0; 
      font-size: 16px;
      padding: 0 10px; 
      text-align: left; 
      cursor: pointer;
      color:black;
      background: white;
    }

    .btn-refresh:disabled{
      background:#fafafa;
    }

    .btn-refresh:hover{
      background:whitesmoke;
    }

    .filter-dropdown:focus {
      outline: none;
    }
  </style>
  