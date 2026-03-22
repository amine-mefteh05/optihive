import { getItem } from "./localstorage";

export default function getDarkmode() {
  const isDarkmode = getItem<boolean>("darkMode");
  if (isDarkmode) {
    globalThis.document?.documentElement.classList.add("dark");
  } else {
    globalThis.document?.documentElement.classList.remove("dark");
  }
}
