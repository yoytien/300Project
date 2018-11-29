import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch> {/* means if..elif..else , not if..if..if */}
                <Route path="/" component={LoginPage} exact={true} />
                
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;