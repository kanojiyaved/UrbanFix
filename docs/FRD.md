# Functional Requirements Document (FRD) - UrbanFix

## 1. Introduction
This document details the functional requirements for the UrbanFix Infrastructure & Garbage Management System, outlining the behavior and capabilities of the platform.

## 2. User Roles
- **Citizen:** Can create accounts, submit issue reports (e.g., potholes or garbage, with photos/location), and view the status of their reports.
- **Government Admin:** Can view all reported issues, verify them, assign them to appropriate contractors, and monitor progress.
- **Contractor:** Can view assigned tasks, update the status of resolutions (e.g., In Progress, Completed), and upload proof of completion.

## 3. Functional Requirements

### 3.1 Authentication & Authorization
- **FR1.1:** The system shall support secure login and registration for all user roles.
- **FR1.2:** The system shall enforce role-based access control (Citizen, Government, Contractor) to restrict access to specific features.

### 3.2 Citizen Portal
- **FR2.1:** Users shall be able to select an issue type (Pothole or Garbage Collection) when submitting a report.
- **FR2.2:** Users shall be able to submit a new issue report including location data (via GPS or manual map selection) and an image.
- **FR2.3:** Users shall be able to view a history of their submitted reports and track their current resolution status.
- **FR2.4:** Users shall receive notifications when the status of their report changes.

### 3.3 Government Dashboard
- **FR3.1:** Admins shall have access to a comprehensive dashboard with a list and map view of all reported issues, indicating the issue type.
- **FR3.2:** Admins shall be able to change the status of a report (e.g., Pending, Verified, Rejected).
- **FR3.3:** Admins shall be able to assign a verified issue task to a registered contractor (e.g., City Maintenance for potholes, Waste Management Department for garbage).
- **FR3.4:** Admins shall be able to filter and sort reports based on status, location, or severity.

### 3.4 Contractor Workflow
- **FR4.1:** Contractors shall be able to view a list of tasks specifically assigned to them.
- **FR4.2:** Contractors shall be able to update the task status to "In Progress" or "Resolved".
- **FR4.3:** Contractors shall be required to submit a post-repair photo as proof of resolution before a task can be marked as completely resolved.

## 4. Non-Functional Requirements (NFR)
- **NFR1 - Performance:** The platform should load quickly, and map interactions should be smooth.
- **NFR2 - Usability:** The interface must be responsive and follow modern glassmorphism design principles as requested.
- **NFR3 - Security:** User data and uploaded images must be securely stored.
