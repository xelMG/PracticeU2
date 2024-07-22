const axios = require('axios');

const API_URL = 'http://127.0.0.1:5000/password';

async function createHashedPassword(password) {
    try {
        const response = await axios.post(API_URL, { password });
        return response.data.hashed_password;
    } catch (error) {
        console.error('Error creating hashed password:', error);
        throw error;
    }
}

async function verifyPassword(password, hashedPassword) {
    try {
        const response = await axios.put(API_URL, { password, hashed_password: hashedPassword });
        return response.data.is_correct;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}

// Ejemplo de uso
(async () => {
    const password = 'mysecretpassword';
    const hashedPassword = await createHashedPassword(password);
    console.log('Hashed Password:', hashedPassword);

    const isCorrect = await verifyPassword(password, hashedPassword);
    console.log('Password is correct:', isCorrect);
})();
