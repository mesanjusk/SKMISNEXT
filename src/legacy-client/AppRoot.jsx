import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AppThemeProvider } from "./context/ThemeConfigContext.jsx";

export default function AppRoot() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppThemeProvider>
  );
}
