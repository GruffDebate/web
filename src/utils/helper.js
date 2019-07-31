import get from "lodash/get";
import { auth as useAuth } from "../hooks/auth";

export const isBrowser = typeof window !== `undefined`

export const dateTimeFormater = (value) => {
  if (value !== "") {
    return `${new Date(value).toLocaleDateString()} ${new Date(
      value
    ).toLocaleTimeString()}`;
  }
  return value;
};

export const hiddenCreditCardNumber = (value) => {
  let stars = "**** **** **** ";
  if (value.length == 15) {
    stars = "**** ****** *";
  } else if (value.length == 14) {
    stars = "**** ****** ";
  }
  return `${stars}${value.substring(value.length - 4)}`;
};

export const replaceAccents = (str) => {
  const ACCENTS =
    "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
  const NON_ACCENTS =
    "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";

  const strAccents = str.split("");
  const strAccentsOut = new Array();

  const strAccentsLen = strAccents.length;

  for (let y = 0; y < strAccentsLen; y++) {
    if (ACCENTS.indexOf(strAccents[y]) != -1) {
      strAccentsOut[y] = NON_ACCENTS.substr(ACCENTS.indexOf(strAccents[y]), 1);
    } else {
      strAccentsOut[y] = strAccents[y];
    }
  }

  const newString = strAccentsOut.join("");
  return newString;
};

export const userId = () => {
  const { auth, cachedAuth } = useAuth(false);
  const isAuth =
    !!get(auth, "token", false) || !!get(cachedAuth, "token", false);

  if (isAuth) {
    return get(auth, "user.id", 0) || get(cachedAuth, "user.id", 0);
  }

  return 0;
};
