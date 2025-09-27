// This function runs once when the page loads to check if the server is alive.
async function testBackendConnection() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/health');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('✅ Backend connection is healthy:', data);
  } catch (error) {
    console.error('❌ FAILED to connect to backend on page load:', error);
  }
}

// Call the health check when the window finishes loading.
window.addEventListener('load', testBackendConnection);


// --- Main Search Logic ---

// This function runs every time the search button is clicked.
document.getElementById('submit-button').addEventListener('click', async () => {
  const queryInput = document.getElementById('query-input');
  const responseContainer = document.getElementById('response-container');
  const query = queryInput.value;

  if (!query) {
    alert('Please enter a question.');
    return;
  }

  // Show the container and display a "Thinking..." message.
  responseContainer.classList.remove('hidden');
  responseContainer.innerText = 'Thinking...';

  try {
    // Attempt to send the query to the backend.
    const response = await fetch('http://127.0.0.1:5000/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // If successful, display the AI's actual response.
    if (data.response) {
      responseContainer.innerText = data.response;
    } else {
      // Or display a backend-specific error message.
      responseContainer.innerText = data.error || 'An unknown error occurred.';
    }

  } catch (error) {
    console.error('❌ FAILED to send query:', error);
    // Display a general network or connection error message.
    responseContainer.innerText = 'Failed to connect to the server. Please try again later.';
  }
});