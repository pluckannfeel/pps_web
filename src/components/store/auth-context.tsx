import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isAuthenticated: false,
    login: (token: string) => {},
    logout: () => {},
});

