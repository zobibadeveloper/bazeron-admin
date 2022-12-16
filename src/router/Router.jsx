import React, { Suspense } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import RedirectIfNotAuth from '../authGuards/RedirectIfNotAuth';
import RedirectIfAuth from '../authGuards/RedirectIfAuth';
import MainNav from '../components/MainNav/MainNav';
import Spinner from '../components/Spinner/Spinner';
import PageHome from '../containers/PageHome/PageHome';
import PageLogin from '../containers/PageLogin/PageLogin';
import useAuth from '../hooks/useAuth';
// import RedirectIfAuth from '../authGuards/RedirectIfAuth';

export const pages = [
  { path: "/", exact: true, Component: PageHome }
];


export default function Router() {
  const { isAuthenticated, isInitialized } = useAuth();
  return (
    <BrowserRouter>
      <MainNav />
      <Switch>
        {pages.map(({ Component, path, exact, Guard }) => {
          return (
            <RedirectIfNotAuth key={path} exact={!!exact} path={path} isAuthenticated={isAuthenticated} isInitialized={isInitialized}>
              {Guard ? (
                <Guard>
                  <Suspense fallback={<Spinner className="grid h-96 place-content-center" />}>
                    <Component />
                  </Suspense>
                </Guard>
              ) : (
                <Component />
              )}
            </RedirectIfNotAuth>
          );
        })}
        <RedirectIfAuth isAuthenticated={isAuthenticated} isInitialized={isInitialized} path="/login" >
          <PageLogin />
        </RedirectIfAuth>
        {/* <Route component={Page404} /> */}
      </Switch>
    </BrowserRouter>
  )
}
