# Purchase Request API Specification

## Overview
This API manages purchase requests for a simple approval workflow.

## Functional Requirements
- Users can create a purchase request.
- Users can list all purchase requests.
- Users can get a purchase request by id.
- Users can update a purchase request status.
- Users can delete a purchase request.
<!-- - Users can list purchase requests by status. -->

## Data Model
PurchaseRequest:
- id: number
- title: string
- requester: string
- amount: number
- costCenter: string
- status: string

## Status Values
- draft
- submitted
- approved
- rejected

## API Endpoints
- POST /purchase-requests
- GET /purchase-requests
- GET /purchase-requests/{id}
- PUT /purchase-requests/{id}
- DELETE /purchase-requests/{id}
<!-- - GET /purchase-requests/status/{status} -->

## Validation Rules
- title is required.
- requester is required.
- amount is required and must be greater than 0.
- costCenter is required.
- status must be one of: draft, submitted, approved, rejected.


<!-- ## Status Filter Behavior
GET /purchase-requests/status/{status} returns only purchase requests matching the status path parameter. -->


## Seed Data
Use data/purchase-requests.seed.json as initial demo data.