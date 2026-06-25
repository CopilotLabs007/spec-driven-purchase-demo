const express = require('express');
const purchaseRequestController = require('../controllers/purchaseRequestController');

const router = express.Router();
console.log('purchaseRequestController exports:', Object.keys(purchaseRequestController));

router.post('/', purchaseRequestController.createPurchaseRequest);
router.get('/', purchaseRequestController.listPurchaseRequests);
router.get('/:id', purchaseRequestController.getPurchaseRequest);
router.put('/:id', purchaseRequestController.updatePurchaseRequestStatus);
router.delete('/:id', purchaseRequestController.deletePurchaseRequest);

module.exports = router;