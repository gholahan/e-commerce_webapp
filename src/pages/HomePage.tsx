import HomePageGrd from "../feautures/products/components/HomePageGrd";
import SideBar from "../feautures/products/components/SideBar";

const HomePage = () => {
  return (
    <div className="flex">
      <SideBar />

      <main className="flex-1 md:px-[3vw] lg:px-[2vw] xl:px-[2vw]">
        <HomePageGrd />
      </main>
    </div>
  );
};

export default HomePage;