let balance = parseInt(localStorage.getItem('balance')) || 0;

function completeTask(reward, taskUrl) {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Get the date of the last claim from localStorage
    const lastClaimDate = localStorage.getItem('lastClaimDate');

    // Check if the task has already been completed today
    if (lastClaimDate === today) {
        alert('You have already claimed today\'s reward.');
        return;
    }

    // Add reward to balance
    balance += reward;
    updateBalance();

    // Store the current date as the last claim date in localStorage
    localStorage.setItem('lastClaimDate', today);
    localStorage.setItem('balance', balance);

    // Redirect to the task URL in the same tab
    window.location.href = taskUrl; // This will open the URL in the same tab
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

// Call this function when the page loads to show the current balance
updateBalance();
