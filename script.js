async function getUserData() {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter a valid GitHub username');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        if (userData.message === 'Not Found') {
            alert('User not found. Please enter a valid GitHub username.');
            return;
        }

        displayUserData(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function displayUserData(userData) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `
        <h2>${userData.name || userData.login}</h2>
        <p><strong>Username:</strong> ${userData.login}</p>
        <p><strong>ID:</strong> ${userData.id}</p>
        <p><strong>Email:</strong> ${userData.email || 'Not specified'}</p>
        <p><strong>Company:</strong> ${userData.company || 'Not specified'}</p>
        <p><strong>Bio:</strong> ${userData.bio || 'Not specified'}</p>
        <p><strong>Avatar:</strong> <img src="${userData.avatar_url}" alt="Avatar" style="width: 100px; height: 100px;"></p>
        <p><strong>Public Repositories:</strong> ${userData.public_repos}</p>
        <p><strong>Public Gists:</strong> ${userData.public_gists}</p>
        <p><strong>Followers:</strong> ${userData.followers}</p>
        <p><strong>Following:</strong> ${userData.following}</p>
        <p><strong>Created At:</strong> ${new Date(userData.created_at).toLocaleDateString()}</p>
        <p><strong>Profile URL:</strong> <a href="${userData.html_url}" target="_blank">${userData.html_url}</a></p>
    `;
}
