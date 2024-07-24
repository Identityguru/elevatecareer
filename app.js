document.getElementById('elevator-pitch-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/generate-pitch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(`Your Elevator Pitch: ${result.pitch}`);
    } catch (error) {
        console.error('Error:', error);
    }
});
