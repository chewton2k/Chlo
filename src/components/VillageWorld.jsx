import React, { useState, useEffect, useRef } from 'react';

const VillageWorld = () => {
  const [playerPos, setPlayerPos] = useState({ x: 400, y: 300 });
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [currentTask, setCurrentTask] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [keys, setKeys] = useState({});
  const gameRef = useRef(null);

  const tasks = {
    piano: {
      title: "Play Piano",
      description: "Time to tickle the ivories! Press some keys and create beautiful melodies.",
      x: 150, y: 150, icon: "🎹", color: "#8B4513"
    },
    dance: {
      title: "Dance Party", 
      description: "Let's dance! Move to the rhythm and express yourself through movement.",
      x: 650, y: 180, icon: "💃", color: "#FF69B4"
    },
    baking: {
      title: "Bake Something Sweet",
      description: "Time to bake! Mix ingredients with love and create something delicious.",
      x: 200, y: 450, icon: "🧁", color: "#DEB887"
    },
    eating: {
      title: "Enjoy a Meal",
      description: "Sit down and savor a delicious meal. Good food brings people together.",
      x: 600, y: 420, icon: "🍽️", color: "#FF6347"
    },
    movies: {
      title: "Watch a Movie",
      description: "Grab some popcorn and enjoy a great film together!",
      x: 420, y: 250, icon: "🎬", color: "#4B0082"
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Movement loop
  useEffect(() => {
    const movePlayer = () => {
      if (showPopup) return;

      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 5;

        if (keys['w'] || keys['arrowup']) newY -= speed;
        if (keys['s'] || keys['arrowdown']) newY += speed;
        if (keys['a'] || keys['arrowleft']) newX -= speed;
        if (keys['d'] || keys['arrowright']) newX += speed;

        // Boundaries
        newX = Math.max(20, Math.min(780, newX));
        newY = Math.max(20, Math.min(580, newY));

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(movePlayer, 16);
    return () => clearInterval(interval);
  }, [keys, showPopup]);

  const handleTaskClick = (taskType) => {
    if (!completedTasks.has(taskType)) {
      setCurrentTask(taskType);
      setShowPopup(true);
    }
  };

  const completeTask = () => {
    if (currentTask) {
      const newCompleted = new Set(completedTasks);
      newCompleted.add(currentTask);
      setCompletedTasks(newCompleted);
      
      if (newCompleted.size === 5) {
        setTimeout(() => setShowVictory(true), 500);
      }
    }
    closePopup();
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentTask(null);
  };

  const gameContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    userSelect: 'none',
    background: `
      radial-gradient(circle at 25% 25%, #90EE90 0%, #98FB98 50%),
      radial-gradient(circle at 2px 2px, rgba(34, 139, 34, 0.4) 1px, transparent 0),
      radial-gradient(circle at 1px 1px, rgba(0, 100, 0, 0.3) 1px, transparent 0)
    `,
    backgroundSize: '100% 100%, 40px 40px, 60px 60px'
  };

  const playerStyle = {
    position: 'absolute',
    left: playerPos.x - 16,
    top: playerPos.y - 16,
    width: 32,
    height: 32,
    backgroundColor: '#FFD700',
    border: '3px solid #FFA500',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    zIndex: 20,
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    transition: 'all 0.075s ease'
  };

  const taskCounterStyle = {
    position: 'fixed',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: 'bold',
    zIndex: 30
  };

  const instructionsStyle = {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '12px',
    textAlign: 'center',
    zIndex: 30
  };

  const popupOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  };

  const popupStyle = {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '32px',
    borderRadius: '16px',
    border: '4px solid #3b82f6',
    maxWidth: '400px',
    margin: '0 16px',
    textAlign: 'center'
  };

  const popupTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#60a5fa'
  };

  const popupDescriptionStyle = {
    marginBottom: '24px',
    fontSize: '14px',
    lineHeight: '1.6'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center'
  };

  const primaryButtonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 24px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const secondaryButtonStyle = {
    backgroundColor: '#4b5563',
    color: 'white',
    padding: '8px 24px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const victoryScreenStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF69B4)',
    zIndex: 60
  };

  const victoryContentStyle = {
    textAlign: 'center',
    color: 'white'
  };

  const victoryTitleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px',
    animation: 'bounce 1s infinite'
  };

  return (
    <div ref={gameRef} style={gameContainerStyle}>
      {/* Roads */}
      <div style={{
        position: 'absolute',
        left: 0, 
        top: 280, 
        width: '100%', 
        height: 40,
        background: 'linear-gradient(to bottom, #555 0%, #777 50%, #555 100%)',
        borderTop: '2px solid #444',
        borderBottom: '2px solid #444'
      }}>
        {/* Road dashes */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: 4,
          transform: 'translateY(-50%)',
          background: 'repeating-linear-gradient(to right, #FFD700 0, #FFD700 20px, transparent 20px, transparent 40px)'
        }} />
      </div>

      {/* Vertical roads */}
      <div style={{ position: 'absolute', left: 165, top: 150, width: 20, height: 130, background: '#666' }} />
      <div style={{ position: 'absolute', left: 665, top: 180, width: 20, height: 100, background: '#666' }} />
      <div style={{ position: 'absolute', left: 215, top: 320, width: 20, height: 130, background: '#666' }} />
      <div style={{ position: 'absolute', left: 615, top: 320, width: 20, height: 100, background: '#666' }} />
      <div style={{ position: 'absolute', left: 435, top: 250, width: 20, height: 30, background: '#666' }} />

      {/* Trees */}
      {[
        {x: 50, y: 100}, {x: 350, y: 80}, {x: 750, y: 120},
        {x: 80, y: 380}, {x: 500, y: 520}, {x: 720, y: 380},
        {x: 300, y: 380}, {x: 580, y: 320}, {x: 100, y: 520}
      ].map((tree, i) => (
        <div key={i} style={{ position: 'absolute', left: tree.x, top: tree.y, fontSize: 35, zIndex: 5 }}>
          🌳
        </div>
      ))}

      {/* Task Houses */}
      {Object.entries(tasks).map(([taskType, task]) => (
        <div
          key={taskType}
          onClick={() => handleTaskClick(taskType)}
          style={{ 
            position: 'absolute',
            left: task.x, 
            top: task.y,
            zIndex: 10,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {/* House */}
          <div style={{ position: 'relative' }}>
            {/* Roof */}
            <div style={{
              width: 0, 
              height: 0,
              borderLeft: '25px solid transparent',
              borderRight: '25px solid transparent',
              borderBottom: '20px solid #8B4513',
              position: 'relative',
              left: 5
            }} />
            {/* House body */}
            <div style={{ 
              width: 60, 
              height: 50, 
              backgroundColor: task.color,
              borderRadius: '0 0 8px 8px',
              border: '2px solid #92400e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <span style={{ fontSize: 24 }}>{task.icon}</span>
              {/* Door */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 12,
                height: 25,
                backgroundColor: '#654321',
                borderRadius: '4px 4px 0 0'
              }} />
            </div>
            {/* Completed indicator */}
            {completedTasks.has(taskType) && (
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 20 }}>✅</div>
            )}
            {/* Glow for incomplete tasks */}
            {!completedTasks.has(taskType) && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                zIndex: -1,
                animation: 'pulse 2s infinite'
              }} />
            )}
          </div>
        </div>
      ))}

      {/* Player */}
      <div style={playerStyle}>
        👤
      </div>

      {/* UI Elements */}
      <div style={taskCounterStyle}>
        Tasks Completed: {completedTasks.size}/5
      </div>

      <div style={instructionsStyle}>
        Use WASD or Arrow Keys to Move • Click houses to interact
      </div>

      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: 60, left: 60, fontSize: 25, animation: 'bounce 2s infinite' }}>🌸</div>
      <div style={{ position: 'absolute', top: 120, right: 80, fontSize: 25, animation: 'bounce 2s infinite 0.5s' }}>🦋</div>
      <div style={{ position: 'absolute', bottom: 150, left: 120, fontSize: 25, animation: 'bounce 2s infinite 1s' }}>🌺</div>

      {/* Task Popup */}
      {showPopup && currentTask && (
        <div style={popupOverlayStyle}>
          <div style={popupStyle}>
            <h2 style={popupTitleStyle}>
              {tasks[currentTask].title}
            </h2>
            <p style={popupDescriptionStyle}>
              {tasks[currentTask].description}
            </p>
            <div style={buttonContainerStyle}>
              <button
                onClick={completeTask}
                style={primaryButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                Complete Task
              </button>
              <button
                onClick={closePopup}
                style={secondaryButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4b5563'}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory Screen */}
      {showVictory && (
        <div style={victoryScreenStyle}>
          <div style={victoryContentStyle}>
            <h1 style={victoryTitleStyle}>
              🎉 All Tasks Completed! 🎉
            </h1>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>You've mastered all the activities!</p>
            <p style={{ fontSize: '14px' }}>This village was made with love 💖</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default VillageWorld;