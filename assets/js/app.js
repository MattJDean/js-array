import { unsplashApi } from '/config.js';


// Import the Unsplash module
import { createApi } from 'https://cdn.jsdelivr.net/npm/unsplash-js@7/+esm';

// Unsplash API 
const unsplash = createApi({
  accessKey: unsplashApi,
});

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

$(document).ready(function() {
    // Show the About modal when the "About" button is clicked
    $('#toggleAbout').on('click', function() {
      $('#aboutModal').show();
      $('#backdrop').show();
    });
  
    // Close the About modal when the "Close" button is clicked
    $('#closeAbout').on('click', function() {
      $('#aboutModal').hide();
      $('#backdrop').hide();
    });
  
    // Close the modal if the user clicks on the backdrop
    $('#backdrop').on('click', function() {
      $('#aboutModal').hide();
      $('#backdrop').hide();
    });
  });

// Event listeners
$('#fetchImageBtn').on('click', fetchRandomImage);
$('#assignImageBtn').on('click', assignImage);
// Trigger assignImage with Enter key in the email input field
$('#emailInput').on('keypress', function (e) {
    if (e.which === 13) { 
      e.preventDefault(); 
      assignImage(); 
    }
  });

// Save assignments to localStorage
function saveAssignmentsToLocalStorage() {
  localStorage.setItem('imageAssignments', JSON.stringify(imageAssignments));
}

// Load assignments from localStorage on page load
function loadAssignmentsFromLocalStorage() {
  const storedAssignments = localStorage.getItem('imageAssignments');
  return storedAssignments ? JSON.parse(storedAssignments) : {};
}

// Display assigned images in local storage
const imageAssignments = loadAssignmentsFromLocalStorage();
$(document).ready(() => {
  displayAssignedImages();
});

// Register download with Unsplash when assigning an image
async function downloadImage(imageData) {
  try {
    await fetch(imageData.download_location, { 
      headers: { Authorization: 'Client-ID zr_LaIoOYQBaSMhqpj0WT3dALRa44Y_zGiHWuh1GQTc' } 
    });
  } catch (error) {
    console.error("Error registering download:", error);
  }
}

// Assign image to a specific email and save to localStorage
function assignImage() {
  const email = $('#emailInput').val().trim();
  const imageData = $('#assignImageBtn').data('imageData');

  if (!email || !imageData) {
    $('#emailErrorTooltip').show().text('Please enter a valid email and fetch an image first.');
    $('#emailSuccessTooltip').hide();
    return;
  }

  if (!emailPattern.test(email)) {
    $('#emailErrorTooltip').show().text('Please enter a valid email.');
    $('#emailSuccessTooltip').hide();
    return;
  }

  $('#emailErrorTooltip').hide();

  if (!imageAssignments[email]) {
    imageAssignments[email] = [];
  }

  if (imageAssignments[email].some(img => img.id === imageData.id)) {
    $('#emailErrorTooltip').show().text('This image is already assigned to this email.');
    setTimeout(() => $('#emailErrorTooltip').fadeOut(), 5000);
    $('#emailSuccessTooltip').hide();
    return;
  }

  // Assign the image and register download
  imageAssignments[email].push(imageData);
  downloadImage(imageData);
  saveAssignmentsToLocalStorage();

  displayAssignedImages();

  $('#emailSuccess').text(`Image assigned to ${email}`);
  $('#emailSuccessTooltip').show();
  setTimeout(() => $('#emailSuccessTooltip').fadeOut(), 3000);
}

// Fetch Image from Unsplash
async function fetchRandomImage() {
  try {
    $('#loadingSpinner').show();
    
    const response = await unsplash.photos.getRandom();
    
    if (response.type === 'success' && response.response) {
      const data = response.response;

      $('#placeholderMessage').hide();
      $('#randomImage').attr('src', data.urls.regular).show();
      $('#displayImage').show();

      $('#photographerLink').text(data.user.name).attr('href', data.user.links.html);
      $('#imageDescription').text(data.description || 'No description available');

      $('#assignImageBtn').data('imageData', {
        id: data.id,
        url: data.urls.regular,
        photographer: data.user.name,
        photographerLink: data.user.links.html,
        download_location: data.links.download_location
      });

      $('#assignImageBtn').prop('disabled', false);
    } else {
      console.error('Error fetching image:', response);
    }
  } catch (error) {
    console.error("Error fetching image:", error);
  } finally {
    $('#loadingSpinner').hide();
  }
}




// Assigned images section
function displayAssignedImages() {
    const container = $('#assignedImagesContainer');
    container.empty();
  
    Object.keys(imageAssignments).forEach(email => {
      const emailSection = $('<div>').addClass('mb-4');
      const emailHeader = $('<h4>').text(`${email}`);
      emailSection.append(emailHeader);
  
      imageAssignments[email].forEach((imageData, index) => {
          const imgWrapper = $('<div>').addClass('relative group w-32 h-32 mr-2 mt-2 inline-block');
    
          // Image element
          const imgElement = $('<img>')
            .attr('src', imageData.url)
            .addClass('w-full h-full object-cover rounded-md shadow-md');
    
          // Buttons container (hidden by default, appears on hover)
          const buttonsContainer = $('<div>')
            .addClass('absolute inset-0 bg-black bg-opacity-50 rounded-md flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity');
    
          // Favourite button
          const favButton = $('<button>')
            .html(imageData.isFavourite ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>')
            .addClass(imageData.isFavourite ? 'text-yellow-500 text-xl' : 'text-white text-xl')
            .on('click', () => toggleFavourite(email, index, favButton));
    
          // View full screen button
          const viewButton = $('<button>')
            .html('<i class="fas fa-expand"></i>')
            .addClass('text-white text-xl')
            .on('click', () => openFullScreenModal(imageData.url));
  
          // Info button
          const infoButton = $('<button>')
          .html('<i class="fas fa-info-circle"></i>')
          .addClass('text-white text-xl')
          .on('click', () => openInfoModal(imageData));
    
          // Delete button
          const deleteButton = $('<button>')
            .html('<i class="fas fa-trash-alt"></i>')
            .addClass('text-white text-xl')
            .on('click', () => openDeleteModal(email, index));
    
          buttonsContainer.append(favButton, viewButton, infoButton, deleteButton);
          imgWrapper.append(imgElement, buttonsContainer);
    
          // Star overlay for favourite status
          if (imageData.isFavourite) {
            const favIcon = $('<span>').html('<i class="fa-solid fa-star"></i>').addClass('absolute top-1 right-1 text-yellow-500 text-xl');
            imgWrapper.append(favIcon);
          }
    
          emailSection.append(imgWrapper);
        });
    
        container.append(emailSection);
      });
    }
  
    // Toggle favourite status 
    function toggleFavourite(email, index, favButton) {
      imageAssignments[email][index].isFavourite = !imageAssignments[email][index].isFavourite;
      favButton.html(imageAssignments[email][index].isFavourite ? '★' : '☆');
      saveAssignmentsToLocalStorage();
      displayAssignedImages();
    }
  
    // Open full screen modal
  function openFullScreenModal(imageUrl) {
      const overlay = $('<div>').attr('id', 'overlay').addClass('fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50');
    
      const modal = $('<div>').addClass('relative');
      const img = $('<img>').attr('src', imageUrl).addClass('max-w-full max-h-screen object-contain');
    
      const closeButton = $('<button>').text('X')
        .addClass('absolute top-2 right-2 text-white text-2xl')
        .on('click', () => overlay.remove());
    
      overlay.append(modal.append(img, closeButton));
      overlay.on('click', (e) => {
        if (e.target === overlay[0]) overlay.remove(); 
      });
    
      $('body').append(overlay);
    }
  
    // Open image info modal
    function openInfoModal(imageData) {
      const overlay = $('<div>').attr('id', 'infoOverlay').addClass('fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50');
    
      const modal = $('<div>').addClass('bg-white p-6 rounded shadow-lg max-w-lg w-full text-center');
    
      // Image details
      const title = $('<h4>').addClass('text-xl font-bold mb-4').text('Image Information');
      const description = $('<p>').addClass('text-gray-700 mb-2').text(`Description: ${imageData.description || 'No description available'}`);
      const photographer = $('<p>').addClass('text-gray-700 mb-2').html(`Photographer: <a href="${imageData.photographerLink}" target="_blank" class="text-blue-500 underline">${imageData.photographer}</a>`);
      const dimensions = $('<p>').addClass('text-gray-700 mb-2').text(`Dimensions: ${imageData.width} x ${imageData.height}`);
      const location = $('<p>').addClass('text-gray-700 mb-4').text(`Location: ${imageData.location}`);
    
      // Close button
      const closeButton = $('<button>').text('Close')
        .addClass('bg-gray-300 p-2 rounded mt-4')
        .on('click', () => overlay.remove());
    
      modal.append(title, description, photographer, dimensions, location, closeButton);
      overlay.append(modal);
      overlay.on('click', (e) => {
          if (e.target === overlay[0]) overlay.remove(); 
        });
  
      $('body').append(overlay);
    }
  
    // Open delete confirmation modal
  function openDeleteModal(email, index) {
      const overlay = $('<div>').attr('id', 'overlay').addClass('fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50');
    
      const modal = $('<div>').addClass('bg-white p-4 rounded shadow-lg text-center');
    
      const message = $('<p>').text('Are you sure you want to delete this image?');
      const confirmButton = $('<button>').text('Delete')
        .addClass('bg-red-500 text-white p-2 rounded mt-2')
        .on('click', () => {
          // Delete the image
          imageAssignments[email].splice(index, 1);
          
          // If last image is deleted, remove email array
          if (imageAssignments[email].length === 0) {
            delete imageAssignments[email];
          }
    
          saveAssignmentsToLocalStorage();
          displayAssignedImages();
          overlay.remove();
        });
    
      const cancelButton = $('<button>').text('Cancel')
        .addClass('bg-gray-300 p-2 rounded mt-2 ml-2')
        .on('click', () => overlay.remove());
    
      modal.append(message, confirmButton, cancelButton);
      overlay.append(modal);
      $('body').append(overlay);
    }

