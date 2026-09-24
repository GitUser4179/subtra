# Subtra Architecture
## Backend - ASP.NET Core API
Feature-based organization with a controller-service architecture.

- `Subtra/Features/`: controllers, services, and DTOs grouped by feature.
- `Subtra/Entities/`: database entities.
- `Subtra/Data/`: EF Core DbContext.
- `Subtra/Migrations/`: database migrations.
## Frontend - React
Feature-based organization.

- `frontend/src/app/`: routing and providers.
- `frontend/src/pages/`: application pages.
- `frontend/src/features/`: functionality grouped by feature.
- `frontend/src/shared/`: reusable UI and utilities.