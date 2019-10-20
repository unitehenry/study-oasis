const express = require('express');
const app = express();
const cors = require('cors');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../app/build'));

// const questionSchema = new mongoose.Schema({
//     blockstackId: String
// })

// const Question = mongoose.model('Question', questionSchema);

mongoose.connect('mongodb+srv://henry:henry5398@study-oasis-9vwyi.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB Atlas Connected.');

    app.get('', (req, res) => res.sendFile('index.html'));

    app.post('/question', (req, res) => {
        
    });

    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})