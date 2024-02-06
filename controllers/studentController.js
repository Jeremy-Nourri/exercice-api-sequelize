
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const { Student } = require('../config/database');

const studentController = {
    signUp: async (req, res) => {
        try {
            const { firstName, lastName, userName, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            console.log(firstName, lastName, userName, password);

            const data = await Student.create({ firstName, lastName, userName, password: hashedPassword });

            res.status(201).json(data);
        }
        catch (error) {
            res.status(400).json({ message: "Erreur lors de la création d'un nouvel utilisateur", error: error.message });
        }
    },
}

module.exports = studentController;