<template>
    <div class="search-component  ">
      <input type="text"  v-model="searchTerm" :placeholder="search_label"  @input="emitSearch">
        <i class="fas fa-search"></i>

    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchComponent',
    props: {
      // Optional prop to customize placeholder text
      search_label: {
        type: String,
        default: 'Search...'
      }
    },
    data() {
      return {
        searchTerm: ''
      };
    },
    methods: {
      emitSearch() {
        // if (this.searchTerm.trim()) { // Emit only if there's a non-empty search term
          this.$emit('search', this.searchTerm);
        //   this.searchTerm = ''; // Clear search term after emit (optional behavior)
        // }
      }
    }
  };
  </script>
  
  <style scoped>
  .search-component {
    display: flex; /* Ensure consistent alignment */
    align-items: center;
    position: relative; /* Needed for absolute positioning of the icon */

    
    justify-content: left;
  }
  
  input[type="text"] {
    padding: 15px 15px;
    
    width: 100%;
    border: 2px solid rgb(55 65 81 ); /* Basic border for better visibility */
  }

  
  input[type="text"]:focus {
    
    border: 3px solid rgb(55 65 81 ); /* Basic border for better visibility */
  }


.fas.fa-search {
  position: absolute;
  top: 50%; /* Vertical centering */
  right:  40px; /* Margin from the left edge */
  transform: translateY(-50%); /* Center icon vertically */
  color: rgb(55 65 81 );
  font-size: 18px;
}
  
  button {
    margin-left: 5px;
    /* Customize button appearance as needed */
    padding: 15px 10px;
    border: 1px solid ;
    cursor: pointer;
  }
  </style>
  