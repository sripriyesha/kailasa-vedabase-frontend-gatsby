
import { useState } from 'react';
import useCookie from 'react-use-cookie';

const useBooleanCookie = (cookieName, initialState) => {
    const [cookie, setCookie] = useCookie(cookieName, String(initialState));
    const [isCookieEnabled, setCookieEnabled] = useState(cookie === 'true');
  
    const setCookieState = (state) => {
      setCookieEnabled(state);
      setCookie(String(state));
    }
  
    return [isCookieEnabled, setCookieState];
}

export default useBooleanCookie;