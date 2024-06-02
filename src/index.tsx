import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// 스플래쉬 화면 숨기기
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) {
      splash.style.display = "none";
    }
  }, 2000); // 3초 동안 스플래쉬 화면 유지
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

serviceWorkerRegistration.register();
// serviceWorkerRegistration.unregister();
