const { VALID_STATUSES } = require('../models/purchaseRequest');

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateStatus(status) {
  return VALID_STATUSES.includes(status);
}

function validatePurchaseRequestInput(body) {
  body = body || {};

  const errors = [];

  if (!hasText(body.title)) {
    errors.push('title is required');
  }

  if (!hasText(body.requester)) {
    errors.push('requester is required');
  }

  if (body.amount === undefined || body.amount === null || body.amount === '') {
    errors.push('amount is required');
  } else if (!Number.isFinite(Number(body.amount)) || Number(body.amount) <= 0) {
    errors.push('amount must be greater than 0');
  }

  if (!hasText(body.costCenter)) {
    errors.push('costCenter is required');
  }

  if (body.status !== undefined && !validateStatus(body.status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  return errors;
}

function validateStatusUpdateInput(body) {
  body = body || {};

  const errors = [];

  if (!body.status) {
    errors.push('status is required');
  } else if (!validateStatus(body.status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  return errors;
}

function validateIdParam(id) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return ['id must be a positive integer'];
  }

  return [];
}

module.exports = {
  validatePurchaseRequestInput,
  validateStatusUpdateInput,
  validateIdParam
};