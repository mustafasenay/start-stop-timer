import { useState, useEffect, useRef } from 'react';

function Timer() {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (timeLeft <= 0) return;
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(5 * 60);
  };

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          setIsActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
      <div className='card' style={{padding:'1rem', borderRadius:'1rem'}}>
        <h1 style={{
            fontSize: '72px',
            fontWeight: 'bold',
            textAlign:'center',
            color: timeLeft <= 60 ? '#ff4444' : '#333'
          }}>
          {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
        </h1>
        
        <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
          <button 
            onClick={startTimer}
            disabled={isActive || timeLeft <= 0}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: isActive ? '#4CAF50' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isActive || timeLeft <= 0 ? 'not-allowed' : 'pointer',
              opacity: isActive || timeLeft <= 0 ? 0.6 : 1,
              fontWeight: 'bold',
              minWidth: '100px'
            }}
          >
            {isActive ? 'Çalışıyor...' : 'Başlat'}
          </button>
          
          <button 
            onClick={pauseTimer}
            disabled={!isActive}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: !isActive ? 'not-allowed' : 'pointer',
              opacity: !isActive ? 0.6 : 1,
              fontWeight: 'bold',
              minWidth: '100px'
            }}
          >
            Durdur
          </button>
          
          <button 
            onClick={resetTimer}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              minWidth: '100px'
            }}
          >
            Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;