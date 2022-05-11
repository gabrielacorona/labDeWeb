const PrivateRoute = ({ component: Component, userId, token, ...rest }) => (
    <Route {...rest} render={(props) => (
        token === true
        ? <Component {...props} userId={userId} />
        : <Redirect to="/login"/>
    )} />
);

export default PrivateRoute;