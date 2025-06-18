const users = [
    { username: 'netrunnerX', role: 'admin' },
    { username: 'reliefAdmin', role: 'contributor' }
];

function verifyUser(username) {
    return users.find(user => user.username === username);
}

module.exports = { verifyUser };
