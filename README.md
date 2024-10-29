<h1>ImageVault</h1>

<p>This is my Javascript Array assessment project for the <a href="https://www.netmatters.co.uk/train-for-a-career-in-tech" target="_blank">Netmatters Scion Coalition Scheme.</a></p>
<br>
<p>ImageVault is a web application that allows users to assign images from Upsplash to their own 'vault' using their email. The app demonstrates the use of JavaScript arrays, API integration, and modern front-end development techniques.</p>

<h2>Features</h2>
<ul>
  <li><strong>Image Fetching:</strong> Users can fetch random images from the Unsplash API</li>
  <li><strong>Image Assignment:</strong> Users can assign fetched images to their email address, creating a personal vault of images.</li>
  <li><strong>Image Interactions:</strong>
    <ul>
      <li>Tag image as favourite.</li>
      <li>View image in full-screen.</li>
      <li>View image information gathered from Upsplash.</li>
      <li>Delete image.</li>
    </ul>
  </li>
  <li><strong>API Integration:</strong> Images are fetched dynamically from the Unsplash API</li>
  <li><strong>Responsive Design:</strong> The app uses responsive layouts to ensure a smooth user experience on different screen sizes.</li>
</ul>

<h2>Technologies</h2>
<ul>
  <li><strong>JavaScript/jQuery:</strong> Used to handle UI reactivity and manage application state.</li>
  <li><strong>Tailwind CSS:</strong> For designing a modern and responsive user interface.</li>
  <li><strong>Unsplash API:</strong> For fetching high-quality random images.</li>
  <li><strong>HTML/CSS:</strong> For the basic structure and styling of the app.</li>
</ul>

<h2>How It Works</h2>

<h3>Image Fetching</h3>
<p>The user clicks the <strong>Fetch Image</strong>. Upon clicking the "Fetch Image" button, the app calls the Upsplash API, retrieves a random image, and displays it on the screen.</p>

<h3>Image Assignment</h3>
<p>The user enters an email address and assigns the fetched image to that email. All assigned images are stored in arrays, and the app allows the user to manage them (mark as favourite, view in full screen, view image information and delete).</p>

<h3>Image Vault</h3>
<p>The images are displayed in a grid layout, each with the following interactive options:</p>
<ul>
  <li><strong>Favourite:</strong> Mark an image as a favourite, which displays a star icon on the image.</li>
  <li><strong>View Full-Screen:</strong> Clicking this button opens the image in a full-screen modal.</li>
  <li><strong>View Image Information:</strong> Clicking this button opens the a modal which displays information about the image gathered from Unplash.</li>
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
      <li>The currently fetched image.</li>
      <li>The list of images assigned to each email.</li>
      <li>Modals for full-screen image viewing and detailed image information.</li>
      <li>Local storage data for displaying user saved images in their array</li>
    </ul>
  </li>
  <li><strong>Dynamic Image Handling:</strong> Images are stored and handled as objects containing URLs, descriptions, photographers, and profile links. The app uses this information to render the images dynamically in the UI.</li>
</ul>

<h2>Code Overview</h2>
<ul>
  <li><strong>index.html:</strong> Contains the structure of the app, using Tailwind CSS utility classes in the markup to style the page and its componenets.</li>
  <li><strong>app.js:</strong> Manages the core logic of the app, including image fetching, state management, and image assignment. The <code>fetchImage()</code> makes an API call to Upsplash, and state management handles image assignment, deletion, and modal toggling.</li>
</ul>

