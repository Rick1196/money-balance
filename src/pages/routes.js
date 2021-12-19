import { lazy } from "react";

const Login = lazy(() => import("./login"));
const Accounts = lazy(() => import("./accounts"));
export default [
  {
    element: Login,
    path: "/",
    //   children: [
    //     {
    //       index: true,
    //       element: <Home />
    //     },
    //     {
    //       path: "teams",
    //       element: <Teams />,
    //       children: [
    //         {
    //           index: true,
    //           element: <LeagueStandings />
    //         },
    //         {
    //           path: ":teamId",
    //           element: <Team />
    //         },
    //         {
    //           path: ":teamId/edit",
    //           element: <EditTeam />
    //         },
    //         {
    //           path: "new",
    //           element: <NewTeamForm />
    //         }
    //       ]
    //     }
    //   ]
  },
  {
    element: Accounts,
    path: "/accounts",
    children: [],
  },
];
