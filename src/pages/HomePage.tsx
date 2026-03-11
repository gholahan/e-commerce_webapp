import HomePageGrd from "../feautures/products/components/HomePageGrd";
import SideBar from "../feautures/products/components/SideBar";

const HomePage = () => {
  return (
    <div className="flex">
      <SideBar />

      <main className="flex-1 px-4 md:px-[5vw] lg:px-[7vw] xl:px-[2vw]">
        <HomePageGrd />
      </main>
    </div>
  );
};

export default HomePage;