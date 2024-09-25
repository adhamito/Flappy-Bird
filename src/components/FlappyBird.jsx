import React, { useEffect, useState, useRef } from 'react';
import { FaFrog, FaCoins } from 'react-icons/fa';

const FlappyBird = () => {
  const birdRef = useRef(null);
  const [birdPosition, setBirdPosition] = useState(200);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [walls, setWalls] = useState([]);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState([]);
  const gravity = 1.5;
  const wallSpeed = 5;
  const wallWidth = 40;
  const wallGap = 150;
  const birdSpeed = 50;

  const gameAreaHeight = 400;
  const birdHeight = 40;
  const coinSize = 20;

  const startGame = () => {
    setBirdPosition(200);
    setWalls([{ topHeight: 150, x: 400 }]);
    setCoins([{ x: 400, y: Math.random() * (gameAreaHeight - 50), collected: false }]);
    setScore(0);
    setIsGameRunning(true);
  };

  const handleGameOver = () => {
    setIsGameRunning(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isGameRunning && event.key === ' ') {
        setBirdPosition((prev) => Math.max(prev - birdSpeed, 0)); 
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isGameRunning]);

  useEffect(() => {
    let gameInterval;
    let gravityInterval;

    if (isGameRunning) {
      gravityInterval = setInterval(() => {
        setBirdPosition((prev) => Math.min(prev + gravity, gameAreaHeight - birdHeight)); 
      }, 20);

      gameInterval = setInterval(() => {
        setWalls((prevWalls) => {
          const newWalls = prevWalls.map(wall => ({ ...wall, x: wall.x - wallSpeed }));
          if (newWalls[0].x < -wallWidth) {
            const wallHeight = Math.random() * (gameAreaHeight - wallGap - 100) + 50;
            newWalls.shift();
            newWalls.push({ topHeight: wallHeight, x: 400 });
            setCoins((prevCoins) => [
              ...prevCoins,
              { x: 400, y: Math.random() * (gameAreaHeight - 50), collected: false }
            ]);
            setScore((prevScore) => prevScore + 1);
          }
          return newWalls;
        });

        setCoins((prevCoins) => prevCoins
          .filter(coin => coin.x > -coinSize)
          .map(coin => ({ ...coin, x: coin.x - wallSpeed }))
        );
      }, 100);
    }

    return () => {
      clearInterval(gameInterval);
      clearInterval(gravityInterval);
    };
  }, [isGameRunning]);

  useEffect(() => {
    const checkCollision = () => {
      const birdY = birdPosition;

      if (birdY < 0 || birdY + birdHeight > gameAreaHeight) {
        handleGameOver();
      }

      walls.forEach((wall) => {
        const wallLeft = wall.x;
        const wallRight = wall.x + wallWidth;

        if (wallLeft < 140 && wallRight > 100) {
          const birdTop = birdY;
          const birdBottom = birdY + birdHeight;

          if (birdTop < wall.topHeight || birdBottom > gameAreaHeight - wall.topHeight) {
            handleGameOver();
          }
        }
      });

      coins.forEach((coin) => {
        if (
          !coin.collected &&
          coin.x < 140 &&
          coin.x > 100 &&
          birdY + birdHeight > coin.y &&
          birdY < coin.y + coinSize
        ) {
          setCoins((prevCoins) => prevCoins.map(c => c === coin ? { ...c, collected: true } : c));
          setScore((prevScore) => prevScore + 2); 
        }
      });
    };

    if (isGameRunning) {
      const collisionCheckInterval = setInterval(checkCollision, 20);
      return () => clearInterval(collisionCheckInterval);
    }
  }, [isGameRunning, birdPosition, walls, coins]);

  return (
    <div className="h-screen w-screen bg-blue-300 flex flex-col justify-center items-center">
      {!isGameRunning ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Flappy Bird</h1>
          {score > 0 && <p className="text-2xl text-red-600">You Lose!</p>}
          <p className="text-lg text-white mt-2">Press Space to control the bird</p>
          <button onClick={startGame} className="mt-4 p-2 bg-green-500 text-white rounded">
            {score > 0 ? "Play Again" : "Start Game"}
          </button>
        </div>
      ) : (
        <div className="relative w-full max-w-[600px] h-[400px] bg-blue-200 border-4 border-blue-500 overflow-hidden">
          <div
            ref={birdRef}
            className="absolute"
            style={{ top: `${birdPosition}px`, left: '100px' }}
          >
            <FaFrog size={40} className="text-yellow-400" />
          </div>

          {walls.map((wall, index) => (
            <div key={index} className="absolute" style={{ left: `${wall.x}px`, width: `${wallWidth}px`, height: '100%' }}>
              <div
                className="bg-green-500"
                style={{ height: `${wall.topHeight}px`, width: `${wallWidth}px` }}
              ></div>
              <div
                className="bg-green-500"
                style={{
                  height: `${gameAreaHeight - wall.topHeight - wallGap}px`,
                  width: `${wallWidth}px`,
                  position: 'absolute',
                  top: `${wall.topHeight + wallGap}px`,
                }}
              ></div>
            </div>
          ))}

          {coins.map((coin, index) => (
            !coin.collected && (
              <div
                key={index}
                className="absolute"
                style={{ left: `${coin.x}px`, top: `${coin.y}px`, width: `${coinSize}px`, height: `${coinSize}px` }}
              >
                <FaCoins size={20} className="text-yellow-500" />
              </div>
            )
          ))}

          <div className="absolute top-2 left-2 text-2xl text-white">Score: {score}</div>
        </div>
      )}
    </div>
  );
};

export default FlappyBird;
