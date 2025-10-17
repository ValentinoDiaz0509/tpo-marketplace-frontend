// MODIFIED: corrected import paths (were "../src/router/AppRouter" and "../src/App.css")
// Reason: file is inside src, so use relative imports from current folder
import AppRouter from "./router/AppRouter";
import "./App.css";

export default function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}
