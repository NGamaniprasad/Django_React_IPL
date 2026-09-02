//import {
//    BrowserRouter,
//    Routes,
//    Route
//} from "react-router-dom";
//import UserRegister from "../pages/auth/UserRegister";
//import Home from "../pages/public/Home";
//import AboutIPL from "../pages/public/AboutIPL";
//import About from "../pages/public/About";
//import Contact from "../pages/public/Contact";
//import TermsOfUse from "../pages/public/TermsOfUse";
//import PrivacyPolicy from "../pages/public/PrivacyPolicy";
//import UserDashboard from "../pages/user/UserDashboard";
//import UserLogin from "../pages/auth/UserLogin";
//import Fixtures from "../pages/user/UserFixtures";
//import Teams from "../pages/user/Teams";
//import TeamDetails from "../pages/user/TeamDetails";
//import TeamPlayers from "../pages/user/TeamPlayers";
//import Statistics from "../pages/user/Statistics";
////import Fixtures from "../pages/user/Fixtures";
//import PointsTable from "../pages/user/PointsTable";
////import AdminLogin from "../pages/auth/AdminLogin";
//import AdminPlayers from "../pages/admin/AdminPlayers";
//import AdminLogin from "../pages/auth/AdminLogin";
//import AdminDashboard from "../pages/admin/AdminDashboard";
//import AdminTeams from "../pages/admin/AdminTeams";
//import AdminTeamDetails from "../pages/admin/AdminTeamDetails";
//
//import AddPlayer from "../pages/admin/AddPlayer";
////import AddPlayer from "../pages/admin/AddPlayer";
//function AppRoutes() {
//
//    return (
//        <BrowserRouter>
//
//            <Routes>
//
//                {/* Public Pages */}
//
//                <Route
//                    path="/"
//                    element={<Home />}
//                />
//
//                <Route
//                    path="/about-ipl"
//                    element={<AboutIPL />}
//                />
//
//                <Route
//                    path="/about"
//                    element={<About />}
//                />
//
//                <Route
//                    path="/contact"
//                    element={<Contact />}
//                />
//
//                <Route
//                    path="/terms"
//                    element={<TermsOfUse />}
//                />
//
//                <Route
//                    path="/privacy"
//                    element={<PrivacyPolicy />}
//                />
//
//
//                {/* Authentication */}
//
//                <Route
//    path="/login"
//    element={<UserLogin />}
///>
//                <Route
//    path="/register"
//    element={<UserRegister />}
///>
//
//
//
//                <Route
//    path="/user/dashboard"
//    element={<UserDashboard />}
///>
//<Route
//    path="/user/teams"
//    element={<Teams />}
///>
//
//<Route
//    path="/user/teams/:id"
//    element={<TeamDetails />}
///>
//
//<Route
//    path="/user/teams/:id/players"
//    element={<TeamPlayers />}
///>
//<Route
//    path="/user/statistics"
//    element={<Statistics />}
///>
//<Route
//    path="/user/points-table"
//    element={<PointsTable />}
///>
//
//<Route
//    path="/admin-login"
//    element={<AdminLogin />}
///>
//
//<Route
//    path="/admin/dashboard"
//    element={<AdminDashboard />}
///>
//<Route
//    path="/admin-login"
//    element={<AdminLogin />}
///>
//
//<Route
//    path="/admin/dashboard"
//    element={<AdminDashboard />}
///>
//<Route
//    path="/admin/teams"
//    element={<AdminTeams />}
///>
//<Route
//    path="/admin/teams/:id"
//    element={<AdminTeamDetails />}
///>
//<Route
//    path="/admin/players"
//    element={<AdminPlayers />}
///>
// <Route
//                    path="/admin/players/add"
//                    element={<AddPlayer />}
//                />
//
//            </Routes>
//
//        </BrowserRouter>
//    );
//}
//
//export default AppRoutes;

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// ================= PUBLIC =================

import Home from "../pages/public/Home";
import AboutIPL from "../pages/public/AboutIPL";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import TermsOfUse from "../pages/public/TermsOfUse";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";

// ================= AUTH =================

import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import AdminLogin from "../pages/auth/AdminLogin";

// ================= USER =================

import UserDashboard from "../pages/user/UserDashboard";
import Teams from "../pages/user/Teams";
import TeamDetails from "../pages/user/TeamDetails";
import TeamPlayers from "../pages/user/TeamPlayers";
import UserFixtures from "../pages/user/UserFixtures";
import Statistics from "../pages/user/Statistics";
import PointsTable from "../pages/user/PointsTable";

// ================= ADMIN =================

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminTeams from "../pages/admin/AdminTeams";
import AdminTeamDetails from "../pages/admin/AdminTeamDetails";
import AdminPlayers from "../pages/admin/AdminPlayers";
import AddPlayer from "../pages/admin/AddPlayer";
import EditPlayer from "../pages/admin/EditPlayer";
import AdminTournaments from "../pages/admin/AdminTournaments";
import AdminMatches from "../pages/admin/AdminMatches";
import AddTournament from "../pages/admin/AddTournament";
import EditTournament from "../pages/admin/EditTournament";
import AddMatch from "../pages/admin/AddMatch";
import EditMatch from "../pages/admin/EditMatch";
import AdminPointsTable from "../pages/admin/AdminPointsTable";
import AddPointsTable from "../pages/admin/AddPointsTable";
import EditPointsTable from "../pages/admin/EditPointsTable";
//import Statistics from "../pages/user/Statistics";
import AdminStatistics from "../pages/admin/AdminStatistics";
import EditStatistics from "../pages/admin/EditStatistics";
import AddStatistics from "../pages/admin/AddStatistics";
import ChangePassword from "../pages/user/ChangePassword";
import AdminUsers from "../pages/admin/AdminUsers";
import EditProfile from "../pages/user/EditProfile";
function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ==================================================
                    PUBLIC PAGES
                ================================================== */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about-ipl"
                    element={<AboutIPL />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/terms"
                    element={<TermsOfUse />}
                />

                <Route
                    path="/privacy"
                    element={<PrivacyPolicy />}
                />


                {/* ==================================================
                    AUTHENTICATION
                ================================================== */}

                <Route
                    path="/login"
                    element={<UserLogin />}
                />

                <Route
                    path="/register"
                    element={<UserRegister />}
                />

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />


                {/* ==================================================
                    USER
                ================================================== */}

                <Route
                    path="/user/dashboard"
                    element={<UserDashboard />}
                />

                <Route
                    path="/user/teams"
                    element={<Teams />}
                />

                <Route
                    path="/user/teams/:id"
                    element={<TeamDetails />}
                />

                <Route
                    path="/user/teams/:id/players"
                    element={<TeamPlayers />}
                />

                <Route
                    path="/user/fixtures"
                    element={<UserFixtures />}
                />

                <Route
                    path="/user/statistics"
                    element={<Statistics />}
                />


                <Route
                    path="/user/points-table"
                    element={<PointsTable />}
                />


                {/* ==================================================
                    ADMIN
                ================================================== */}

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/teams"
                    element={<AdminTeams />}
                />

                <Route
                    path="/admin/teams/:id"
                    element={<AdminTeamDetails />}
                />

                <Route
                    path="/admin/players"
                    element={<AdminPlayers />}
                />

                <Route
                    path="/admin/players/add"
                    element={<AddPlayer />}
                />
                <Route
    path="/admin/players/:id/edit"
    element={<EditPlayer />}
/>
<Route
    path="/admin/tournaments"
    element={<AdminTournaments />}
/>
<Route
    path="/admin/tournaments/add"
    element={<AddTournament />}
/>
<Route
    path="/admin/tournaments/:id/edit"
    element={<EditTournament />}
/>
<Route
    path="/admin/matches"
    element={<AdminMatches />}
/>
<Route
    path="/admin/matches/add"
    element={<AddMatch />}
/>
<Route
    path="/admin/matches/:id/edit"
    element={<EditMatch />}
/>
<Route
                    path="/admin/points-table/add"
                    element={<AddPointsTable />}
                />

                <Route
                    path="/admin/points-table/:id/edit"
                    element={<EditPointsTable />}
                />
<Route
    path="/admin/points-table"
    element={<AdminPointsTable />}
/>

<Route
    path="/admin/statistics"
    element={<AdminStatistics />}
/>
<Route
    path="/admin/statistics/:id/edit"
    element={<EditStatistics />}
/>
<Route
    path="/admin/statistics/add"
    element={<AddStatistics />}
/>
<Route
    path="/admin/users"
    element={<AdminUsers />}
/>
<Route
    path="/user/profile/edit"
    element={<EditProfile />}
/>
<Route
    path="/user/change-password"
    element={<ChangePassword />}
/>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;