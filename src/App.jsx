import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsListPage from "./pages/NewsListPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<NewsListPage />} />
          <Route path="/details/:slug" element={<NewsDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
