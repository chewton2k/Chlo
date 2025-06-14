import './Cards.css'

const Cards = () => {
  const imageNames = [
    "disc",
    "foreheadwteeth",
    "glasses",
    "helmet",
    "lastday",
    "lockin",
    "mofusand",
    "mybed",
    "peace",
    "shoulder",
    "sleepingwsmiski",
    "studysession",
    "undierun"
  ];

  return (
    <div className="cards-container">
      {imageNames.map((name) => (
        <div className="flip-card" key={name}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img 
                src={`/${name}.jpeg`}
                alt={name}
                className="card-image"
              />
            </div>
            <div className="flip-card-back">
              <p className="title">BACK</p>
              <p>Leave Me</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
