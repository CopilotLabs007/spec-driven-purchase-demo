const express = require('express');
const purchaseRequestRoutes = require('./routes/purchaseRequestRoutes');

const app = express();

app.use(express.json());

app.use('/purchase-requests', purchaseRequestRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON request body' });
  }

  return res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;