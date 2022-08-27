import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithNavigate = ({ children, ...props }) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState) => {
        navigate(appState && appState.returnTo
            ? appState.returnTo
            : window.location.pathname,
            { replace: true }
        );
    }

    return (
        <Auth0Provider
            onRedirectCallback={onRedirectCallback}
            {...props}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;