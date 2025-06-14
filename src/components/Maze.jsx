import React, { useState, useEffect } from 'react';

const Maze = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [playerDirection, setPlayerDirection] = useState('right');
  
  const maze = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  const handleKeyDown = (e) => {
    const newPosition = { ...playerPosition };
    let newDirection = playerDirection;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        newPosition.y = Math.max(0, playerPosition.y - 1);
        newDirection = 'up';
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        newPosition.y = Math.min(maze.length - 1, playerPosition.y + 1);
        newDirection = 'down';
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        newPosition.x = Math.max(0, playerPosition.x - 1);
        newDirection = 'left';
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        newPosition.x = Math.min(maze[0].length - 1, playerPosition.x + 1);
        newDirection = 'right';
        break;
      default:
        return;
    }
    
    // Only move if the new position is a path (1)
    if (maze[newPosition.y][newPosition.x] === 1) {
      setPlayerPosition(newPosition);
      setPlayerDirection(newDirection);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      handleKeyDown(e);
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition, playerDirection]);

  const getPlayerStyle = () => {
    return {
      transition: 'all 0.2s ease'
    };
  };

  return (
    <div className="maze-container">
      <div className="maze-instructions">
        <h2>Maze Game</h2>
        <p>Use arrow keys or WASD to move the character through the maze!</p>
      </div>
      <div className="maze">
        {maze.map((row, y) => (
          <div key={y} className="maze-row">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`maze-cell ${cell === 0 ? 'wall' : 'path'}`}
              >
                {x === playerPosition.x && y === playerPosition.y && (
                  <div className="player" style={getPlayerStyle()}>
                    🐹
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <p>Current Position: ({playerPosition.x}, {playerPosition.y})</p>
        <p>Facing: {playerDirection}</p>
      </div>
      
      <style jsx>{`
        .maze-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: Arial, sans-serif;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }
        
        .maze-instructions {
          text-align: center;
          color: white;
          margin-bottom: 10px;
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
        
        .maze-instructions h2 {
          margin: 0 0 5px 0;
          font-size: 1.5em;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .maze {
          display: flex;
          flex-direction: column;
          border: 4px solid #333;
          background-image: url('/maze.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          border-radius: 8px;
          overflow: hidden;
          width: calc(100vw - 40px);
          height: calc(100vh - 120px);
          max-width: 90vw;
          max-height: 80vh;
        }
        
        .maze-row {
          display: flex;
          flex: 1;
        }
        
        .maze-cell {
          flex: 1;
          border: 1px solid #ddd;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc((100vh - 120px) / 7);
        }
        
        .wall {
          background: rgba(44, 62, 80, 0.8);
          border-color: #1a252f;
        }
        
        .path {
          background-color: rgba(236, 240, 241, 0.3);
        }
        
        .player {
          font-size: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          transform-origin: center;
          transition: transform 0.2s ease;
        }
        
        .controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: white;
          background: rgba(0,0,0,0.2);
          padding: 10px 20px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          z-index: 10;
        }
        
        .controls p {
          margin: 5px 0;
          font-weight: bold;
        }
        
        @media (max-width: 600px) {
          .maze-cell {
            width: 40px;
            height: 40px;
          }
          
          .player {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Maze;