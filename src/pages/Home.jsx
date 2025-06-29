import LoadingBox from '../components/LoadingBox';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h3>hiiiiiii so chlosome!!!</h3> <br />
      <Link to="/pictures">
        <img
          src="/pochaco.jpeg"
          alt="Click to view pictures"
          className="hover-grow-po"
          style={{ width: '30%', cursor: 'pointer', borderRadius: '1rem'}}
        />
      </Link>
      <LoadingBox />
    </div>
  );
};  

export default HomePage;
