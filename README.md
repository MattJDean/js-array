<h1>ImageVault</h1>

<p>ImageVault is a web application that allows users to assign images from various sources (e.g., Unsplash, Pexels) to their own 'vault' using their email. The app demonstrates the use of JavaScript arrays, API integration, and modern front-end development techniques.</p>

<h2>Features</h2>
<ul>
  <li><strong>Image Fetching:</strong> Users can fetch random images from either Unsplash or Pexels APIs, based on their preference.</li>
  <li><strong>Image Assignment:</strong> Users can assign fetched images to their email address, creating a personal vault of images.</li>
  <li><strong>Image Interactions:</strong>
    <ul>
      <li>Mark images as favourite.</li>
      <li>View images in full-screen modal with image information.</li>
      <li>Delete images from the assigned list.</li>
    </ul>
  </li>
  <li><strong>API Integration:</strong> Images are fetched dynamically from either the Unsplash or Pexels APIs.</li>
  <li><strong>Responsive Design:</strong> The app uses responsive layouts to ensure a smooth user experience on different screen sizes.</li>
</ul>

<h2>Technologies</h2>
<ul>
  <li><strong>JavaScript (Alpine.js):</strong> Used to handle UI reactivity and manage application state.</li>
  <li><strong>Tailwind CSS:</strong> For designing a modern and responsive user interface.</li>
  <li><strong>Unsplash API & Pexels API:</strong> For fetching high-quality random images.</li>
  <li><strong>HTML/CSS:</strong> For the basic structure and styling of the app.</li>
</ul>

<h2>How It Works</h2>

<h3>Image Fetching</h3>
<p>The user can select the image source using a <strong>toggle switch</strong> (Unsplash or Pexels). Upon clicking the "Fetch Image" button, the app calls the respective API (Unsplash or Pexels), retrieves a random image, and displays it on the screen.</p>

<h3>Image Assignment</h3>
<p>The user enters an email address and assigns the fetched image to that email. All assigned images are stored in arrays, and the app allows the user to manage them (mark as favourite, view in full screen, delete).</p>

<h3>Image Vault</h3>
<p>The images are displayed in a grid layout, each with the following interactive options:</p>
<ul>
  <li><strong>Favourite:</strong> Mark an image as a favourite, which displays a star icon on the image.</li>
  <li><strong>View Full-Screen:</strong> Clicking this button opens the image in a full-screen modal, with additional image information (photographer, profile link).</li>
  <li><strong>Delete:</strong> Removes the image from the user's vault.</li>
</ul>

<h3>Image Modals</h3>
<ul>
  <li><strong>Full-Screen Modal:</strong> Users can view images in full-screen mode with a dimmed background. This modal also displays details about the image, such as the photographer's name and a link to their profile.</li>
  <li><strong>Information Modal:</strong> Opens a modal displaying detailed information about the image (description, photographer, profile link).</li>
</ul>

<h2>Methods Used</h2>
<ul>
  <li><strong>API Integration:</strong> Uses <code>fetch</code> to make API calls to Unsplash and Pexels to retrieve random images.</li>
  <li><strong>Reactivity with Alpine.js:</strong> The app is highly dynamic and reactive, thanks to Alpine.js. It manages states such as:
    <ul>
      <li>The selected image source (Unsplash or Pexels).</li>
      <li>The currently fetched image.</li>
      <li>The list of images assigned to each email.</li>
      <li>Modals for full-screen image viewing and detailed image information.</li>
    </ul>
  </li>
  <li><strong>Dynamic Image Handling:</strong> Images are stored and handled as objects containing URLs, descriptions, photographers, and profile links. The app uses this information to render the images dynamically in the UI.</li>
</ul>

<h2>Code Overview</h2>
<ul>
  <li><strong>index.html:</strong> Contains the structure of the app, with Alpine.js directives to manage user interactions and dynamically update the DOM.</li>
  <li><strong>app.js:</strong> Manages the core logic of the app, including image fetching, state management, and image assignment. The <code>fetchImage()</code> method determines which API to call (Unsplash or Pexels), and state management handles image assignment, deletion, and modal toggling.</li>
</ul>

