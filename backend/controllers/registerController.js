const bcrypt = require('bcrypt');
const  User  = require('../models/userModel'); // User მოდელი

// რეგისტრაცია
async function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    try {
        // ამოწმებთ, თუ მომხმარებელი უკვე არსებობს
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        // პაროლის ჰეშირება
        const hashedPassword = await bcrypt.hash(password, 10);

        // ახალი მომხმარებლის შექმნა
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
}

module.exports = {
    register,
};
