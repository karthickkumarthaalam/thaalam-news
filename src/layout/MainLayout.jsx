import { Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-4">
        <Outlet context={{ searchParams }} />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
