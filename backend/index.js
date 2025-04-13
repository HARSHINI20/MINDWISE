const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const Summary = require('./models/Summary');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/health');

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    FormDataModel.findOne({ email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                FormDataModel.create({ name, email, password })
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err));
            }
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            } else {
                res.json("No records found!");
            }
        });
});

app.get('/summary/:userId', (req, res) => {
    const { userId } = req.params;
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    Summary.find({ userId, date: { $gte: threeDaysAgo } }).populate('userId', 'name')
        .then(summaries => res.json(summaries))
        .catch(err => res.status(500).json({ error: 'Error fetching summary data' }));
});

app.get('/summary/:userId', async (req, res) => {
    const { userId } = req.params;
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    try {
        const summaries = await Summary.find({ userId, date: { $gte: threeDaysAgo } })
                                       .populate('userId', 'name')
                                       .sort({ date: -1 });

        res.json(summaries);
    } catch (error) {
        console.error('Error fetching summary data:', error);
        res.status(500).json({ error: 'Error fetching summary data' });
    }
});


app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
