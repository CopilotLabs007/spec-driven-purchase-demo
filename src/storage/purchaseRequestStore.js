const seedData = require('../../data/purchase-requests.seed.json');
const { createPurchaseRequest } = require('../models/purchaseRequest');

let purchaseRequests = seedData.map(createPurchaseRequest);
let nextId = Math.max(...purchaseRequests.map((request) => request.id), 0) + 1;

function clonePurchaseRequest(purchaseRequest) {
  return { ...purchaseRequest };
}

function getAll() {
  return purchaseRequests.map(clonePurchaseRequest);
}

function getById(id) {
  const numericId = Number(id);
  const purchaseRequest = purchaseRequests.find((request) => request.id === numericId);

  return purchaseRequest ? clonePurchaseRequest(purchaseRequest) : null;
}

function create(data) {
  const purchaseRequest = createPurchaseRequest({
    id: nextId,
    ...data
  });

  nextId += 1;
  purchaseRequests.push(purchaseRequest);

  return clonePurchaseRequest(purchaseRequest);
}

function updateStatus(id, status) {
  const numericId = Number(id);
  const purchaseRequest = purchaseRequests.find((request) => request.id === numericId);

  if (!purchaseRequest) {
    return null;
  }

  purchaseRequest.status = status;
  return clonePurchaseRequest(purchaseRequest);
}

function deleteById(id) {
  const numericId = Number(id);
  const initialLength = purchaseRequests.length;
  purchaseRequests = purchaseRequests.filter((request) => request.id !== numericId);

  return purchaseRequests.length < initialLength;
}

module.exports = {
  getAll,
  getById,
  create,
  updateStatus,
  deleteById
};