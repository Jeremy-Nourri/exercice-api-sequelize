
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const { Student } = require('../config/database');

const studentController = {
    signUp: async function (req, res) {
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
    login: async function (req, res) {
        try {
            const { userName, password } = req.body;
            const user = await Student.findOne({ where: { userName } });
            const validPassword = await bcrypt.compare(password, user.password);

            if (!user || !validPassword) {
                return res.status(401).json({ message: "Email ou/et mot de passe invalide(s)" });
            }

            const token = jwt.sign({ userdId: user.id }, process.env.RANDOM_TOKEN_SECRET, { expiresIn: "1d" });
        
            res.header('Authorization', `Bearer ${token}`).json({ message: `${userName} vous étes connecté` });
        } 
        catch (error) {
            res.status(400).json({ message: "Erreur lors de l'authentification de l'utilisateur", error: error.message });
        }
    },
    getProfile: async function (req, res) {
        try {
            const user = await Student.findOne(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du profil", error: error.message })
        }
    },
    getAllStudents: async function (req, res) {
        try {
            const students = await Student.findAll({
                attributes: { exclude: ['password'] }
            });
            if (!students) {
                return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
            }
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des données", error: error.message })
        }
    },

}

module.exports = studentController;