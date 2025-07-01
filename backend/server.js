express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  phone: String
});

app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/api/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

app.delete('/api/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));