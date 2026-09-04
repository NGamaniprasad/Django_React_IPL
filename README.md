
# 🏏 CricketHub IPL Manager


**Manage • Track • Analyze**

---

# 1. TECHNOLOGY STACK

## Backend

* Python 3.12
* Django
* Django REST Framework
* Django ORM
* Simple JWT
* MySQL 8

## Frontend

* React.js
* JavaScript
* CSS3
* Axios
* React Router

## Development Tools

* PyCharm
* MySQL Workbench
* Postman
* Git
* GitHub

Avoid unnecessary third-party libraries.

---

# 2. APPLICATION ARCHITECTURE

Use:

```text
React.js
    ↓
Axios
    ↓
Django REST Framework
    ↓
JWT Authentication
    ↓
Role-Based Permissions
    ↓
Serializers
    ↓
Views / ViewSets
    ↓
Django ORM
    ↓
MySQL 8
```

Frontend and backend must be separate.

Recommended structure:

```text
CricketHub/
│
├── backend/
│   ├── manage.py
│   ├── config/
│   ├── accounts/
│   ├── teams/
│   ├── players/
│   ├── tournaments/
│   ├── matches/
│   ├── stats/
│   ├── media/ - Working on it 
│   └── downloads/ - Working on it 
│
├── frontend/
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── context/
│       ├── hooks/
│       ├── routes/
│       ├── assets/
│       └── utils/
│
├── README.md
├── .env.example
└── .gitignore
```

Keep the architecture simple enough for a fresher to understand and explain in interviews.

---

# 3. ROLES

There are two roles:

```text
USER
ADMIN
```

Use Django authentication + JWT + role-based authorization.

---

# 4. PUBLIC HOME PAGE

The public Home page must be **simple and professional**.

Do NOT put application features such as Teams, Players, Fixtures, Statistics, Points Table, or Downloads in the public navbar.

Public navbar:

```text
🏏 CricketHub

Home
About IPL
About
Terms of Use
Contact

User Register
Admin login
userLogin
```

The Home page should contain:

### Hero Section

```text
CRICKETHUB IPL MANAGER

Your IPL Information & Management Platform

Explore the world of IPL through a modern,
secure and organized cricket platform.

[ Register as User ]
[ Register as Admin ]
```

### About IPL

Provide a concise explanation of:

* What IPL is
* Professional T20 cricket
* Teams
* Players
* Matches
* Tournament structure

Do not copy text from IPL/BCCI websites.

### IPL Teams

Show the 10 team names:

```text
Chennai Super Kings
Mumbai Indians
Royal Challengers Bengaluru
Kolkata Knight Riders
Sunrisers Hyderabad
Rajasthan Royals
Delhi Capitals
Punjab Kings
Gujarat Titans
Lucknow Super Giants
```

Keep this section simple.

### About CricketHub

Explain:

* Purpose of the project
* What users can access after registration
* What administrators manage

### Contact

Include a simple contact form:

```text
Name
Email
Message
Submit
```

### Footer

Include:

```text
🏏 CricketHub

Home
About IPL
About
Contact
Terms of Use
Privacy Policy

© 2026 CricketHub IPL Manager.
All rights reserved.

Independent educational/portfolio project.
Not affiliated with or endorsed by IPL or BCCI.
```

---



# 5.The public website is primarily:

```text
Home
About IPL
About
Contact
Terms
Register
Login
```

---

# 6. REGISTRATION


```text
[ User Register ]

```

## User Registration

Fields:

```text
Full Name
Username
Email
Password
Confirm Password
```

After registration:

```text
User Registration
      ↓
Login
      ↓
User Dashboard
```



---

# 7. USER NAVIGATION AFTER LOGIN

After successful User Login:

```text
🏏 CricketHub

Dashboard
Teams
Fixtures
Matches
Statistics
Points Table
Tournament History
Downloads
Profile
Logout
```



---

# 8. USER DASHBOARD

Display:

```text
Welcome, <username>

Current Tournament
Total Teams
Total Matches
Current Season
```

Also show:

* Upcoming match
* Upcoming fixtures
* Points table preview
* Top batter
* Top bowler
* Most sixes
* Quick navigation
* Download section

Keep the dashboard clean and responsive.

---

# 9. USER — TEAMS

Users can:

* View teams
* View team details
* View team logo
* View captain
* View coach
* View home ground
* View city
* View team statistics


---

# 10. User PLAYER DESIGN

Users must **NOT see all players at once**.

Player access must be:

```text
User
 ↓
Teams
 ↓
Select Team
 ↓
Team Details
 ↓
Team Players
 ↓
Select Player
 ↓
Player Details
```

Example:

```text
Teams
 │
 ├── Chennai Super Kings
 │       └── Players
 │
 ├── Mumbai Indians
 │       └── Players
 │
 ├── Royal Challengers Bengaluru
 │       └── Players
 │
 ├── Kolkata Knight Riders
 │       └── Players
 │
 ├── Sunrisers Hyderabad
 │       └── Players
 │
 ├── Rajasthan Royals
 │       └── Players
 │
 ├── Delhi Capitals
 │       └── Players
 │
 ├── Punjab Kings
 │       └── Players
 │
 ├── Gujarat Titans
 │       └── Players
 │
 └── Lucknow Super Giants
         └── Players
```

Users can:

* View players belonging to a selected team
* View player profile
* View player image
* View role
* View batting information
* View bowling information
* View statistics
* View player media
* Download player information

Users cannot:

* Add players
* Edit players
* Delete players
* Reassign players

---

# 11. PLAYER DETAILS

Player profile should include:

```text
Player Image - Not Available Now
Name
Team
Role
Nationality
Jersey Number
Batting Style
Bowling Style
Matches
Runs
Wickets
Strike Rate
Batting Average
Economy
```

Roles:

```text
BATTER
BOWLER
ALL_ROUNDER
WICKET_KEEPER
```

---

# 12. USER — PLAYER MEDIA -Working On it 

Users can:

* View player images/media
* Open media
* Download permitted media

Users cannot:

* Upload media
* Edit media
* Delete media

Admins manage all media.

Use only original, licensed, public-domain, or placeholder assets.

---

# 13. USER — FIXTURES

Users can view the complete tournament fixture schedule.

Display:

```text
Match Number
Team 1
Team 2
Date
Time
Venue
Status
Season
```

Filters:

```text
Season
Team
Date
Venue
Status
```

Statuses:

```text
UPCOMING
LIVE
COMPLETED
CANCELLED
```

Users cannot modify fixtures.

---

# 14. USER — MATCHES

Users can view:

* All matches
* Upcoming matches
* Live matches
* Completed matches
* Match details
* Score
* Result
* Winner
* Venue
* Match statistics

Users cannot modify matches.

---

# 15. USER — IPL STATISTICS

Create a statistics section.

Display:

```text
Top Run Scorer
Top Wicket Taker
Highest Individual Score
Best Batting Average
Best Strike Rate
Best Bowling Figures
Best Economy
Most Sixes
Most Fours
Most Matches
Team Performance
```

Filters:

```text
Season
Team
Role
Player
```

---

# 16. USER — POINTS TABLE

Display:

```text
Position
Team
Matches Played
Wins
Losses
No Results
Points
Net Run Rate
```

Allow season/tournament selection.

Use automatic calculation where practical:

```text
Win       = 2 points
Loss      = 0 points
No Result = 1 point
```

---

# 17. USER — TOURNAMENT HISTORY

Users can browse seasons.

Example:

```text
IPL 2026
IPL 2025
IPL 2024
IPL 2023
```

Each tournament can show:

* Teams
* Fixtures
* Results
* Points table
* Statistics
* Winner
* Runner-up
* Player statistics

---

# 18. USER — DOWNLOAD CENTER -Working on it 

Users can download:

```text
Player Details
Player Statistics
Team Details
Fixtures
Match Results
Points Table
IPL Statistics
```

Formats:

```text
PDF
CSV
```

Downloads must come from backend APIs.

Do not expose unauthorized/private data.

---

# 19. USER — PROFILE

Users can:

* View own profile
* Edit own profile
* Change password
* Logout



---

# 20. ADMIN LOGIN

Admin has a separate login route:

```text
/admin-login
```

After login:

```text
ADMIN
 ↓
ADMIN DASHBOARD
```

---

# 21. ADMIN NAVIGATION

```text
Dashboard

Teams
 ├── All Teams
 ├── Add Team
 └── Manage Teams

Players
 ├── All Players
 ├── Add Player
 └── Manage Players

Matches
 ├── All Matches
 ├── Add Match
 ├── Upcoming
 └── Completed

Tournaments
 ├── All Tournaments
 ├── Add Tournament
 └── Manage Tournaments

Points Table

Users

Media

Reports

Settings

Logout
```

Unlike users, **Admin can see all players centrally** because the purpose is management.

---

# 22. ADMIN DASHBOARD

Display:

```text
Total Teams
Total Players
Total Matches
Total Users
Active Tournament
Media Count - Working on it 
Upcoming Matches
```

Quick actions:

```text
+ Add Team
+ Add Player
+ Add Match
+ Add Tournament
Manage Points Table
Manage Users
Manage Media -Working on it
```

Also show:

* Recent activity
* Recent matches
* Upcoming matches
* Points table summary
* System summary

---

# 23. ADMIN — TEAM MANAGEMENT

Admin can:

* Add team
* View team
* Edit team
* Delete team
* Upload logo
* Update captain
* Update coach
* Update home ground
* Update city
* Update founded year

---

# 24. ADMIN — PLAYER MANAGEMENT

Admin can:

* View all players
* Search players
* Filter by team
* Filter by role
* Add player
* Edit player
* Delete player
* Assign player to team
* Update statistics
* Upload player image - Not Available 
* Manage player media - Working on it 

Admin player management can use:

```text
Search
Filter by Team
Filter by Role

```

---

# 25. ADMIN — MATCH MANAGEMENT

Admin can:

* Add match
* Edit match
* Delete match
* Select tournament
* Select teams
* Select venue
* Set match date
* Set match time
* Set match number
* Update status
* Enter scores
* Set winner
* Enter result

Prevent a team from playing against itself.

---

# 26. ADMIN — TOURNAMENT MANAGEMENT

Admin can:

* Add tournament
* Edit tournament
* Delete tournament
* Set season
* Set start date
* Set end date
* Set status
* Activate tournament
* Complete tournament

Statuses:

```text
UPCOMING
ONGOING
COMPLETED
```

---

# 27. ADMIN — POINTS TABLE

Admin can:

* View points table
* Update points table where necessary
* Recalculate points
* Manage tournament standings

Prefer automatic calculation from match results.

---

# 28. ADMIN — USER MANAGEMENT

Admin can:

* View all users
* Search users
* Activate/deactivate users
* Manage roles where authorized
* Manage user accounts

Never display passwords.

---

# 29. ADMIN — MEDIA MANAGEMENT

Admin can:

* Upload media - Working on it
* Edit media
* Delete media
* Associate media with player/team/match
* Add descriptions
* Manage media type

---

# 30. ADMIN — REPORTS / DOWNLOADS - Working on it

Admin can generate/download:

```text
Player Reports
Team Reports
Fixture Reports
Match Reports
Statistics Reports
Points Table Reports
User Reports
```

Formats:

```text
PDF
CSV
```

---

# 31. DATABASE MODELS

## Team

```text
id
name
short_name
logo
captain
coach
home_ground
city
founded_year
created_at
updated_at
```

## Player

```text
id
team
name
role
nationality
date_of_birth
batting_style
bowling_style
jersey_number
matches
runs
wickets
strike_rate
batting_average
economy
created_at
updated_at
```

## Tournament

```text
id
name
season
start_date
end_date
status
created_at
updated_at
```

## Match

```text
id
tournament
team1
team2
venue
match_number
match_date
match_time
status
winner
team1_score
team2_score
result
created_at
updated_at
```

## PointsTable

```text
id
tournament
team
matches_played
wins
losses
no_results
points
net_run_rate
position
```

Prevent duplicate tournament/team entries.

## Media

```text
id
title
description
file
media_type
player
team
match
created_at
updated_at
```

---

# 32. DATABASE QUALITY

Use:

* ForeignKey
* related_name
* UniqueConstraint
* indexes
* validation
* database constraints
* timestamps

Use:

```python
select_related()
prefetch_related()
```

when appropriate.

Avoid N+1 queries.

---

# 33. AUTHENTICATION

Use Simple JWT.

Endpoints:

```text
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/refresh/
GET  /api/auth/profile/
```

Use access + refresh tokens.

Never hard-code secrets.

Use `.env`.

---

# 34. ROLE-BASED SECURITY

This is mandatory.

```text
USER
 ↓
Read-only protected application data

ADMIN
 ↓
Read + Create + Update + Delete
```

React hiding buttons is NOT security.

Django must enforce permissions.

Example:

```text
USER
POST /api/players/
       ↓
403 Forbidden
```

Admin:

```text
ADMIN
POST /api/players/
       ↓
201 Created
```

---

# 35. REACT PAGES

## Public

```text
Home
AboutIPL
About
Contact
TermsOfUse
PrivacyPolicy
UserRegister
UserLogin
AdminLogin
```

## User

```text
UserDashboard
Teams
TeamDetails
TeamPlayers
PlayerDetails
Fixtures
Matches
MatchDetails
Statistics
PointsTable
TournamentHistory
Downloads - Working on it 
Profile
```

There must be **no global User AllPlayers page**.

## Admin

```text
AdminDashboard
ManageTeams
ManagePlayers
ManageMatches
ManageTournaments
ManagePointsTable
ManageUsers
ManageMedia -Working on it
Reports
Settings
```

---

# 36. REUSABLE REACT COMPONENTS

Create reusable:

```text
Navbar
Footer
HeroSection
TeamCard
PlayerCard
MatchCard
StatsCard
PointsTable
SearchBar
FilterBar
Pagination
Modal
ConfirmationDialog
LoadingSpinner
ErrorMessage
EmptyState
ProtectedRoute
AdminRoute
```

Keep components focused and maintainable.

---

# 37. API SERVICES

Keep Axios/API logic separate:

```text
authService.js
teamService.js
playerService.js
matchService.js
tournamentService.js
statisticsService.js
downloadService.js
mediaService.js
userService.js
```

Do not scatter API URLs throughout components.

---

# 38. ROUTING

Public:

```text
/
/about-ipl
/about
/features
/contact
/terms
/privacy
/register
/admin-register
/login
/admin-login
```

User:

```text
/user/dashboard
/user/teams
/user/teams/:id
/user/teams/:id/players
/user/players/:id
/user/fixtures
/user/matches
/user/matches/:id
/user/statistics
/user/points-table
/user/history
/user/downloads
/user/profile
```

Admin:

```text
/admin/dashboard
/admin/teams
/admin/players
/admin/matches
/admin/tournaments
/admin/points-table
/admin/users
/admin/media
/admin/reports
/admin/settings
```

Protect routes appropriately.

---

# 39. SEARCH / FILTER / PAGINATION

Admin:

```text
Players
 ├── Search
 ├── Team filter
 ├── Role filter
 └── Pagination
```

Users:

```text
Teams
 └── Select team

Team Details
 └── Team's players

Fixtures
 ├── Season
 ├── Team
 ├── Date
 ├── Venue
 └── Status

Statistics
 ├── Season
 ├── Team
 ├── Role
 └── Player
```

---

# 40. ERROR HANDLING

When I provide an error or traceback:

1. Identify the exact error.
2. Explain the root cause briefly.
3. Identify the affected file.
4. Give corrected code.
5. Give exact command.
6. Tell me expected result.
7. Stop and wait.

Do not continue with unrelated development while the current error is unresolved.

---

# 41. VALIDATION

Validate:

* Required fields
* Duplicate teams
* Duplicate players where appropriate
* Same team vs itself
* Invalid dates
* Invalid scores
* Invalid roles
* Invalid tournament states
* Duplicate points-table entries
* File uploads
* Authentication data

Return proper REST API validation responses.

---

# 42. HTTP STATUS CODES

Use appropriate codes:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

---

# 43. UI/UX

Create an original professional responsive design.

Public Home:

```text
Simple
Clean
Sports-focused
Informational
```

User Dashboard:

```text
Information
Statistics
Exploration
Downloads
```

Admin Dashboard:

```text
Management
CRUD
Analytics
Reports
```

Support:

```text
Desktop
Tablet
Mobile
```

Include:

* Loading states
* Empty states
* Error states
* Confirmation dialogs
* Form validation
* Responsive tables
* Responsive cards

---

# 44. SECURITY

Implement:

* JWT
* Role-based permissions
* Password hashing
* CORS
* Secure environment variables
* Input validation
* File validation
* API authorization
* Permission checks


---

# 45. TESTING

Test: Check all 

### Authentication

```text
User registration
User login
Admin registration
Admin login
Invalid credentials
Token refresh
```

### Authorization

```text
User → can view
User → cannot CRUD

Admin → can view
Admin → can CRUD
```

### CRUD

Test:

```text
Teams
Players
Matches
Tournaments
Media
Users
```

### Business Logic

Test:

```text
Team cannot play itself
Points calculation
Duplicate records
Invalid match data
```

---

# 46. GIT/GITHUB

Use meaningful commits:

```text
Initial project setup
Configure Django and MySQL
Create database models
Configure authentication
Create team APIs
Create player APIs
Create tournament APIs
Create match APIs
Create statistics APIs
Create download APIs
Create public homepage
Create authentication pages
Create user dashboard
Create admin dashboard
Create team management
Create player management
Create match management
Create statistics UI
Create points table
Create downloads
Add validation
Add testing
Create README
```

---

# 47. README

Create a professional README containing:

```text
Project Overview
Features
User Features
Admin Features
Technology Stack
Architecture
Folder Structure
Database Design
ER Diagram
API Documentation
Authentication
Authorization
Installation
Environment Variables
Backend Setup
Frontend Setup
Running Project
Testing
Screenshots
Git Workflow
Deployment
Future Improvements
```

---

# 48. ENVIRONMENT VARIABLES

Backend:

```text
SECRET_KEY=
DEBUG=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
CORS_ALLOWED_ORIGINS=
ADMIN_REGISTRATION_CODE=
```

Frontend:

```text
VITE_API_BASE_URL=
```

Create:

```text
.env.example
```

Never commit `.env`.

---

# 49. DEVELOPMENT ORDER

- Do step by step


# 50. FINAL APPLICATION FLOW

```text
                         CRICKETHUB
                              │
                         PUBLIC HOME
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
      USER REGISTER      ADMIN REGISTER       LOGIN
          │                   │                   │
          ↓                   ↓                   ↓
       USER ROLE          ADMIN ROLE          AUTHENTICATION
          │                   │                   │
          ↓                   ↓                   │
   USER DASHBOARD      ADMIN DASHBOARD           │
          │                   │                   │
          │                   │                   │
   ┌──────┼───────┐    ┌──────┼────────┐         │
   ↓      ↓       ↓    ↓      ↓        ↓         │
 Teams Fixtures Stats Teams Players Matches       │
   │      │       │    │      │        │          │
   ↓      ↓       ↓    ↓      ↓        ↓          │
Team    Matches Points CRUD   CRUD     CRUD        │
Details          Table                             │
   │                                               │
   ↓                                               │
Team Players                                       │
   │                                               │
   ↓                                               │
Player Details                                     │
   │                                               │
   ↓                                               │
Media + Downloads                                  │
```

---



| Module                | Responsibility                            |
| --------------------- | ----------------------------------------- |
| `accounts`            | Registration, login, JWT, profiles, roles |
| `teams`               | IPL team information                      |
| `players`             | Player information and team relationships |
| `tournaments`         | Seasons/tournaments                       |
| `matches`             | Fixtures, matches, results and scores     |
| `statistics`          | Player/team statistics and points table   |
| `downloads`           | PDF/CSV generation                        |
| `media_manager`       | Player/team/match media                   |
| `frontend/components` | Reusable React UI                         |
| `frontend/pages`      | Public/User/Admin screens                 |
| `frontend/services`   | Axios API communication                   |
| `frontend/context`    | Authentication state                      |
| `frontend/routes`     | Protected routing                         |


| Feature                   | USER | ADMIN |
| ------------------------- | :--: | :---: |
| Register                  |   ✅  |   ✅   |
| Login                     |   ✅  |   ✅   |
| Own Profile               |   ✅  |   ✅   |
| Edit Own Profile          |   ✅  |   ✅   |
| Change Password           |   ✅  |   ✅   |
| View Teams                |   ✅  |   ✅   |
| Create Team               |   ❌  |   ✅   |
| Update Team               |   ❌  |   ✅   |
| Delete Team               |   ❌  |   ✅   |
| View Team Players         |   ✅  |   ✅   |
| View All Players          |   ❌  |   ✅   |
| Create Player             |   ❌  |   ✅   |
| Update Player             |   ❌  |   ✅   |
| Delete Player             |   ❌  |   ✅   |
| View Fixtures             |   ✅  |   ✅   |
| Create Fixture            |   ❌  |   ✅   |
| Update Fixture            |   ❌  |   ✅   |
| Delete Fixture            |   ❌  |   ✅   |
| View Matches              |   ✅  |   ✅   |
| Manage Matches            |   ❌  |   ✅   |
| View Statistics           |   ✅  |   ✅   |
| Manage Statistics         |   ❌  |   ✅   |
| View Points Table         |   ✅  |   ✅   |
| Manage Points Table       |   ❌  |   ✅   |
| View Tournament History   |   ✅  |   ✅   |
| Manage Tournaments        |   ❌  |   ✅   |
| View Media                |   ✅  |   ✅   |
| Upload Media              |   ❌  |   ✅   |
| Delete Media              |   ❌  |   ✅   |
| Downloads                 |   ✅  |   ✅   |
| Reports                   |   ❌  |   ✅   |
| Manage Users              |   ❌  |   ✅   |
| Activate/Deactivate Users |   ❌  |   ✅   |
| Access Admin APIs         |   ❌  |   ✅   |


src/pages/public/

Home.jsx
AboutIPL.jsx
About.jsx
Contact.jsx
TermsOfUse.jsx
PrivacyPolicy.jsx
UserRegister.jsx
AdminRegister.jsx
UserLogin.jsx
AdminLogin.jsx

src/pages/user/

UserDashboard.jsx

Teams.jsx
TeamDetails.jsx
TeamPlayers.jsx
PlayerDetails.jsx

Fixtures.jsx

Matches.jsx
MatchDetails.jsx

Statistics.jsx
PointsTable.jsx
TournamentHistory.jsx

Downloads.jsx
Profile.jsx


src/pages/admin/

AdminDashboard.jsx

ManageTeams.jsx
ManagePlayers.jsx
ManageMatches.jsx
ManageTournaments.jsx
ManagePointsTable.jsx
ManageUsers.jsx
ManageMedia.jsx
Reports.jsx
Settings.jsx


src/components/

Navbar.jsx
Footer.jsx

HeroSection.jsx

TeamCard.jsx
PlayerCard.jsx
MatchCard.jsx
StatsCard.jsx

PointsTable.jsx

SearchBar.jsx
FilterBar.jsx
Pagination.jsx

Modal.jsx
ConfirmationDialog.jsx

LoadingSpinner.jsx
ErrorMessage.jsx
EmptyState.jsx

ProtectedRoute.jsx
AdminRoute.jsx

/
├── /about-ipl
├── /about
├── /contact
├── /terms
├── /privacy
├── /register
├── /admin-register
├── /login
└── /admin-login

/user/dashboard

/user/teams
/user/teams/:id
/user/teams/:id/players
/user/players/:id

/user/fixtures

/user/matches
/user/matches/:id

/user/statistics
/user/points-table
/user/history
/user/downloads
/user/profile


/admin/dashboard

/admin/teams
/admin/players
/admin/matches
/admin/tournaments
/admin/points-table
/admin/users
/admin/media
/admin/reports
/admin/settings

POST /api/auth/register/
POST /api/auth/admin-register/
POST /api/auth/login/
POST /api/auth/admin-login/
POST /api/auth/token/refresh/
GET  /api/auth/profile/
PUT  /api/auth/profile/
POST /api/auth/change-password/

GET    /api/teams/
GET    /api/teams/{id}/
POST   /api/teams/
PUT    /api/teams/{id}/
DELETE /api/teams/{id}/

GET    /api/players/
GET    /api/players/{id}/
POST   /api/players/
PUT    /api/players/{id}/
DELETE /api/players/{id}/

GET    /api/tournaments/
GET    /api/tournaments/{id}/
POST   /api/tournaments/
PUT    /api/tournaments/{id}/
DELETE /api/tournaments/{id}/


GET    /api/matches/
GET    /api/matches/{id}/
POST   /api/matches/
PUT    /api/matches/{id}/
DELETE /api/matches/{id}/

GET /api/statistics/
GET /api/statistics/top-run-scorers/
GET /api/statistics/top-wicket-takers/
GET /api/statistics/player/{id}/
GET /api/statistics/team/{id}/

GET /api/points-table/
GET /api/points-table/{id}/
POST /api/points-table/recalculate/


GET    /api/media/
GET    /api/media/{id}/
POST   /api/media/
PUT    /api/media/{id}/
DELETE /api/media/{id}/

GET /api/downloads/players/
GET /api/downloads/teams/
GET /api/downloads/fixtures/
GET /api/downloads/matches/
GET /api/downloads/statistics/
GET /api/downloads/points-table/

GET   /api/users/
GET   /api/users/{id}/
PATCH /api/users/{id}/status/
PATCH /api/users/{id}/role/

                    API REQUEST
                         │
                         ▼
                  JWT Authentication
                         │
                ┌────────┴────────┐
                │                 │
             USER              ADMIN
                │                 │
                ▼                 ▼
             READ API        READ/WRITE API
                │                 │
                ▼                 ▼
             Allowed        Permission Check
                                  │
                                  ▼
                           CRUD Operation


                 CRICKETHUB
                     │
        ┌────────────┴────────────┐
        │                         │
     FRONTEND                  BACKEND
     React.js                  Django
        │                         │
     Pages                     Apps
     Components                APIs
     Services                  JWT
     Routing                   RBAC
        │                         │
        └────────── Axios ────────┘
                     │
                  MySQL 8

| Method | Endpoint           | Purpose      | Permission |
| ------ | ------------------ | ------------ | ---------- |
| GET    | `/api/teams/`      | List teams   | User/Admin |
| GET    | `/api/teams/{id}/` | Team details | User/Admin |
| POST   | `/api/teams/`      | Create team  | Admin      |
| PUT    | `/api/teams/{id}/` | Replace team | Admin      |
| PATCH  | `/api/teams/{id}/` | Update team  | Admin      |
| DELETE | `/api/teams/{id}/` | Delete team  | Admin      |

| Method | Endpoint                 | Permission |
| ------ | ------------------------ | ---------- |
| GET    | `/api/tournaments/`      | User/Admin |
| GET    | `/api/tournaments/{id}/` | User/Admin |
| POST   | `/api/tournaments/`      | Admin      |
| PUT    | `/api/tournaments/{id}/` | Admin      |
| PATCH  | `/api/tournaments/{id}/` | Admin      |
| DELETE | `/api/tournaments/{id}/` | Admin      |




📦 Installation
Requirements

Install the following first:

Python 3.12
Node.js
MySQL 8
Git
🐍 Backend Setup

Open terminal:

cd backend

Create virtual environment:

python -m venv venv

Activate on Windows:

venv\Scripts\activate

Install dependencies:

pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install mysqlclient
pip install django-cors-headers

Or if requirements.txt exists:

pip install -r requirements.txt
🗄️ MySQL Database

Create a MySQL database:

CREATE DATABASE crickethub;

Configure the Django database settings with:

Database Name
Username
Password
Host
Port

Example:

DB_NAME=crickethub
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
🔄 Django Migrations

Run:

python manage.py makemigrations

Then:

python manage.py migrate

Create an admin/superuser if required:

python manage.py createsuperuser
🚀 Start Django Backend

Run:

python manage.py runserver

Backend:

http://127.0.0.1:8000/

API:

http://127.0.0.1:8000/api/
⚛️ Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start React/Vite:

npm run dev

Frontend:

http://localhost:5173/
▶️ Running the Complete Project

Run backend:

cd backend
venv\Scripts\activate
python manage.py runserver

Run frontend in another terminal:

cd frontend
npm run dev

Then open:

http://localhost:5173/
⚙️ Environment Variables

Create a .env file for sensitive configuration.

Example:

SECRET_KEY=your_secret_key
DEBUG=True

DB_NAME=crickethub
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

CORS_ALLOWED_ORIGINS=http://localhost:5173

ADMIN_REGISTRATION_CODE=your_admin_code

Frontend:

VITE_API_BASE_URL=http://127.0.0.1:8000/api

Never commit the actual .env file to GitHub.

Use:

.env.example

instead.

The project specification explicitly recommends keeping database credentials, secret keys, JWT secrets and .env out of source control.

🧪 Testing

Test the following areas.

Authentication
✓ User registration
✓ User login
✓ Admin registration
✓ Admin login
✓ Invalid credentials
✓ JWT token refresh
✓ Logout
Authorization
✓ User can view data
✓ User cannot CRUD protected data
✓ Admin can view data
✓ Admin can CRUD management data
CRUD
✓ Teams
✓ Players
✓ Tournaments
✓ Matches
✓ Statistics
✓ Points Table
✓ Users
Business Logic
✓ Team cannot play itself
✓ Points calculation
✓ Duplicate records
✓ Invalid match data
✓ Invalid player data

These are the main testing categories defined for the project.

🎨 UI / UX

CricketHub follows an original responsive design.

Public Website
Clean
Modern
Informational
Sports-focused
Responsive
User Dashboard
Information
Statistics
Exploration
Downloads
Profile
Admin Dashboard
Management
CRUD
Analytics
Reports
User Management

The application should support:

Desktop
Tablet
Mobile
Loading states
Empty states
Error states
Confirmation dialogs
Form validation
Responsive tables
Responsive cards
🔒 Security

Security features include:

JWT authentication
Password hashing
Role-based authorization
Django permissions
API authorization
CORS configuration
Input validation
Environment variables
Protected admin routes
Protected user routes
Confirmation before destructive actions

Never commit:

SECRET_KEY
Database Password
JWT Secrets
.env
Admin Registration Secrets
🔁 Git Workflow

Recommended commit structure:

git init
git add .
git commit -m "Initial CricketHub project setup"



🚀 Future Improvements

Possible future enhancements:

Advanced dashboard analytics
Live match updates
Player comparison
Team comparison
Advanced statistics
Graphs and charts
Tournament history
Match scorecards
Search optimization
Pagination
Email notifications
Password reset through email
Profile picture upload
Cloud media storage
Automated deployment
Docker support
CI/CD pipeline
Automated tests
Production monitoring
💼 Resume Description


# 👨‍💻 Author
 # N Gamini Prasad

 ''' B.Tech — Computer Science & Engineering '''

# Contact

📧 Email: gamanin79@gmail.com

📜 Disclaimer

CricketHub IPL Manager is an independent educational and portfolio project.

It is created for:

Learning
Demonstration
Portfolio development
Full-stack development practice

The project is not affiliated with, sponsored by, or endorsed by the Indian Premier League or BCCI.

Use original, licensed, public-domain or placeholder assets where appropriate.

⭐ If You Like This Project

If this project helped you understand full-stack development, feel free to:

⭐ Star the repository

🍴 Fork the repository

🐛 Report issues

💡 Suggest improvements
