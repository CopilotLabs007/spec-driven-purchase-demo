const purchaseRequestStore = require('../storage/purchaseRequestStore');
const {
  validatePurchaseRequestInput,
  validateStatusUpdateInput,
  validateIdParam
} = require('../validation/purchaseRequestValidation');

function sendValidationErrors(res, errors) {
  return res.status(400).json({ errors });
}

function listPurchaseRequests(req, res) {
  return res.json(purchaseRequestStore.getAll());
}

function getPurchaseRequest(req, res) {
  const idErrors = validateIdParam(req.params.id);

  if (idErrors.length > 0) {
    return sendValidationErrors(res, idErrors);
  }

  const purchaseRequest = purchaseRequestStore.getById(req.params.id);

  if (!purchaseRequest) {
    return res.status(404).json({ error: 'Purchase request not found' });
  }

  return res.json(purchaseRequest);
}

function createPurchaseRequest(req, res) {
  const errors = validatePurchaseRequestInput(req.body);

  if (errors.length > 0) {
    return sendValidationErrors(res, errors);
  }

  const purchaseRequest = purchaseRequestStore.create(req.body);

  return res.status(201).json(purchaseRequest);
}

function updatePurchaseRequestStatus(req, res) {
  const errors = [
    ...validateIdParam(req.params.id),
    ...validateStatusUpdateInput(req.body)
  ];

  if (errors.length > 0) {
    return sendValidationErrors(res, errors);
  }

  const purchaseRequest = purchaseRequestStore.updateStatus(req.params.id, req.body.status);

  if (!purchaseRequest) {
    return res.status(404).json({ error: 'Purchase request not found' });
  }

  return res.json(purchaseRequest);
}

function deletePurchaseRequest(req, res) {
  const idErrors = validateIdParam(req.params.id);

  if (idErrors.length > 0) {
    return sendValidationErrors(res, idErrors);
  }

  const deleted = purchaseRequestStore.deleteById(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: 'Purchase request not found' });
  }

  return res.status(204).send();
}

module.exports = {
  listPurchaseRequests,
  getPurchaseRequest,
  createPurchaseRequest,
  updatePurchaseRequestStatus,
  deletePurchaseRequest
};