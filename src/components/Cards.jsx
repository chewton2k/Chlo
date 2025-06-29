import './Cards.css'

const Cards = () => {
  const cards = [
    { name: "disc", title: "Hey", description: "Discussion group bonding moment" },
    { name: "foreheadwteeth", title: "Forehead with Teeth", description: "Silly selfie with teeth out" },
    { name: "glasses", title: "Glasses", description: "Trying on new glasses at night" },
    { name: "helmet", title: "Helmet", description: "Ready to ride with full gear" },
    { name: "lastday", title: "Last Day", description: "Last day of finals freedom" },
    { name: "lockin", title: "Lock-In", description: "Late night lock-in memories" },
    { name: "mofusand", title: "Mofusand", description: "Favorite Mofusand plushies" },
    { name: "mybed", title: "My Bed", description: "Coziest spot in the world" },
    { name: "peace", title: "Peace", description: "Peace signs and positive vibes" },
    { name: "shoulder", title: "Shoulder", description: "Resting head on a friend's shoulder" },
    { name: "sleepingwsmiski", title: "Sleeping with Smiski", description: "Sleeping with Smiski watching over" },
    { name: "studysession", title: "Study Session", description: "Long study grind, we made it" },
    { name: "undierun", title: "Undie Run", description: "UCLA Undie Run madness" },
  ];

  return (
    <div className="cards-container">
      {cards.map(({ name, title, description }) => (
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
              <p className="title">{title || name}</p>
              <p>{description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
