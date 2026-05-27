const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const creatorosRoutes = require('./routes/creatorosRoutes');

dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', creatorosRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`CreatorOS MVP running on http://localhost:${port}`);
});
