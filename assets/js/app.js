
// Image Fetch
function imageApp() {
    return {
        image: null,
        loading: false,
        email: '', 
        assignments: {},
        emailError: '',
        source: 'unsplash',
        showDeleteModal: false, 
        deleteImageId: null, 
        deleteImageEmail: null,
        isModalOpen: false,    
        modalImage: {},
        isInfoModalOpen: false,  
        infoImage: {}, 
        

        // Automatically fetch an image when the page loads
        init() {
            // Load assignments from localStorage if available
            const storedAssignments = localStorage.getItem('assignments');
            if (storedAssignments) {
                this.assignments = JSON.parse(storedAssignments);
            }
            this.fetchImage();
        },

        async fetchImage() {
            this.loading = true;

            // Fetch image from Unsplash
            if (this.source === 'unsplash') {
            try {
                const response = await fetch('https://api.unsplash.com/photos/random', {
                    headers: {
                        Authorization: `Client-ID FVPVGSG0NrVaG15-dyqGrHsSOT0Z7MQFXxf9T9hasH0`,
                    }
                });

                const data = await response.json();
                console.log('Unsplash data:', data);  // Debugging log
                this.image = {
                    url: data.urls.regular,
                    description: data.description,
                    photographer: data.user.name,
                    profileLink: data.user.links.html
                };
            } catch (error) {
                console.error('Error fetching image:', error);
            } finally {
                this.loading = false;
            }
        }
            // Fetch from Pexels
            if (this.source === 'pexels') {
                try {
                    const response = await fetch('https://api.pexels.com/v1/curated', {
                        headers: {
                            Authorization: `f6WvGmZc5dTvywmbu34RVCVYR2PMhgI6e1NyOcfPBkxvkEAx0ry07opV`,
                        }
                    });

                    const data = await response.json();
                    console.log('Pexels response:', data); // Debugging log

                    // Pick a random image from the curated list
                    const randomImage = data.photos[Math.floor(Math.random() * data.photos.length)];
                    console.log('Random Pexels image:', randomImage);  // Debugging log
                    this.image = {
                        url: randomImage.src.medium,
                        description: randomImage.alt, 
                        photographer: randomImage.photographer,
                        profileLink: randomImage.photographer_url
                    };
                } catch (error) {
                    console.error('Error fetching image from Pexels:', error);
                } finally {
                    this.loading = false;
                }
            }
        },

         // Handle favouriting an image
         handleFavourite(email, imgId) {
            console.log(`Favourited image ${imgId} for email ${email}`);
            const images = this.assignments[email];
            const image = images.find(img => img.id === imgId);
            if (image) {
                image.favourite = !image.favourite; // Toggle favorite status
            }

            // Save assignments to localStorage 
            localStorage.setItem('assignments', JSON.stringify(this.assignments));
          
        },


        // Open modal to view full-screen image
        openModal(img) {
            console.log('Opening modal for image', img);
            this.modalImage = img;
            this.isModalOpen = true;
        },

        // Function to close the modal
        closeModal() {
            this.isModalOpen = false;
            this.modalImage = {};
        },


        // Open the delete modal and set the image and email for deletion
        openDeleteModal(email, imgId) {
            this.showDeleteModal = true;
            this.deleteImageId = imgId;
            this.deleteImageEmail = email;
        },

        // Handle delete confirmation
        confirmDelete() {
            this.handleDeleteImage(this.deleteImageEmail, this.deleteImageId);
            this.cancelDelete(); // Close the modal after deletion
        },

        // Close the modal without deleting
        cancelDelete() {
            this.showDeleteModal = false;
            this.deleteImageId = null;
            this.deleteImageEmail = null;
        },

        // Handle deleting an image
        handleDeleteImage(email, imgId) {
            console.log(`Deleting image ${imgId} for email ${email}`);
            if (this.assignments[email]) {
                this.assignments[email] = this.assignments[email].filter(img => img.id !== imgId);
                if (this.assignments[email].length === 0) {
                    delete this.assignments[email];
                }
                localStorage.setItem('assignments', JSON.stringify(this.assignments));
            }

        },


        // Email Regex Validation
         isValidEmail(email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        },

        // Generate unique ID
        generateUniqueId() {
            return Math.random().toString(36).substr(2, 9); 
        },

        assignImage() {
            if (!this.email || !this.image) return;

            if (!this.isValidEmail(this.email)) {
                this.emailError = "Please enter a valid email address.";
                return;
            }

            this.emailError = ''; // Clear any previous error
            
            if (!this.assignments[this.email]) {
                this.assignments[this.email] = [];
            }

             // Generate unique ID 
            const newImage = { ...this.image, id: this.generateUniqueId() };

            this.assignments[this.email].push(newImage);

            // Save the assignments to localStorage
            localStorage.setItem('assignments', JSON.stringify(this.assignments));

            // Reset image after assignment
            this.image = null;
            this.email = '';

            // Fetch a new image after assigning the current one
            this.fetchImage();
        }
    };
}