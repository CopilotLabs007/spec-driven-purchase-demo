const VALID_STATUSES = ['draft', 'submitted', 'approved', 'rejected'];

function createPurchaseRequest({ id, title, requester, amount, costCenter, status = 'draft' }) {
  return {
    id: Number(id),
    title: String(title).trim(),
    requester: String(requester).trim(),
    amount: Number(amount),
    costCenter: String(costCenter).trim(),
    status
  };
}

module.exports = {
  VALID_STATUSES,
  createPurchaseRequest
};