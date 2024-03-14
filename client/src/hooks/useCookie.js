import cookie from "js-cookie";

export const useCookie = () => {
  const setCookieValue = (name, value, isObject = false) => {
    const currentDateTime = new Date();
    let cookieSetOn = currentDateTime.getTime();
    cookieSetOn += 3600 * 1000;
    currentDateTime.setTime(cookieSetOn);
    value = isObject ? encodeURIComponent(JSON.stringify(value)) : value;
    cookie.set(name, value, {
      secure: true,
      expires: currentDateTime,
      sameSite: "None",
      path: "/",
    });
  };

  const getValueFromCookie = (key, isObject = false) => {
    const value = cookie.get(key);
    if (value) {
      return isObject ? JSON.parse(decodeURIComponent(value)) : value;
    }
    return null;
  };

  const removeValueFromCookie = (key) => {
    cookie.remove(key);
  };

  return { setCookieValue, getValueFromCookie, removeValueFromCookie };
};
