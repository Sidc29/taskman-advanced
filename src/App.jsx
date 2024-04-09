import { MainLayout } from "./components/MainLayout";
import { ThemeProvider } from "./context/ThemeProvider";

function App({ children }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  );
}

export default App;
