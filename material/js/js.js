let balance = parseInt(localStorage.getItem('balance')) || 0;

function completeTask(taskName, reward, taskUrl) {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Get the date of the last claim for this specific task from localStorage
    const lastClaimDate = localStorage.getItem('lastClaimDate_' + taskName);

    // Check if the task has already been completed today
    if (lastClaimDate === today) {
        alert(`You have already claimed today’s  ${taskName}.`);
        return;
    }

    // Add reward to balance
    balance += reward;
    updateBalance();

    // Store the current date as the last claim date for this task
    localStorage.setItem('lastClaimDate_' + taskName, today);
    localStorage.setItem('balance', balance);

    // Redirect to the task URL in the same tab
    window.location.href = taskUrl; // This will open the URL in the same tab
}
function handleTask(taskType) {
    let taskCompleted = false;
    let reward = 0;
    let buttonText = '';
    let redirectUrl = ''; // URL to redirect after completing the task

    // Check which task is being performed
    if (taskType === 'followTwitter') {
        taskCompleted = localStorage.getItem('followedTwitter') === 'true';
        reward = 100; // Reward for following Twitter
        buttonText = 'Followed';
        redirectUrl = 'https://x.com/rex_t88640'; // Link to Twitter
    } else if (taskType === 'joinCommunity') {
        taskCompleted = localStorage.getItem('joinedCommunity') === 'true';
        reward = 100; // Reward for joining the community
        buttonText = 'Joined';
        redirectUrl = 'https://t.me/s/dwarfyyrabbit'; // Link to Telegram community
    }

    // If the task is already completed, show an alert
    if (taskCompleted) {
        alert('You have already completed this task!');
        return;
    }

    // If the task is not completed, reward the user and mark the task as completed
    balance += reward;
    updateBalance();
    localStorage.setItem('balance', balance);

    // Mark the task as completed in localStorage
    if (taskType === 'followTwitter') {
        localStorage.setItem('followedTwitter', 'true');
    } else if (taskType === 'joinCommunity') {
        localStorage.setItem('joinedCommunity', 'true');
    }

    // Update button text to "Claimed"
    if (taskType === 'followTwitter') {
        document.getElementById('followButton').textContent = 'Claimed';
    } else if (taskType === 'joinCommunity') {
        document.getElementById('joinButton').textContent = 'Claimed';
    }

    // Redirect the user to the respective page after claiming the reward
    window.location.href = redirectUrl; // This will open the URL in the same tab
}


function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

// Call this function when the page loads to show the current balance
updateBalance();

