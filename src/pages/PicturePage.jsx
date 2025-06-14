import Cards from "../components/Cards";

const PicturePage = () => {
  return (
    <section id="pictures" className="w-7/8 min-h-screen px-4 md:px-24 py-16 md:py-32 md:ml-16">
      <div className="max-w-8xl" style={{ opacity: 1, transform: "none" }}>
        <h2 className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl py-10 text-white">pictures</h2>
          <Cards/> 
      </div>
    </section>
  );
};

export default PicturePage;