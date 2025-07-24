import React, { useEffect, useRef, useState } from 'react';

const generateCard = (id) => {
  const names = ['Drago', 'Golem', 'Fenice', 'Lupo', 'Orco', 'Mago', 'Vampiro', 'Samurai'];
  const name = names[id % names.length] + ' #' + (id + 1);
  return {
    id,
    name,
    color: `hsl(${Math.random() * 360}, 70%, 80%)`,
  };
};

const Card = ({ card }) => (
  <div className="rounded-xl shadow-md p-4 w-40 text-center animate-fade" style={{ backgroundColor: card.color }}>
    <h2 className="text-md font-bold">{card.name}</h2>
  </div>
);

const App = () => {
  const [cards, setCards] = useState([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [tournamentWinner, setTournamentWinner] = useState(null);
  const [isFighting, setIsFighting] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(true);

  const audioRef = useRef(null);
  const fightSound = useRef(null);
  const winSound = useRef(null);

  useEffect(() => {
    const generated = Array.from({ length: 16 }, (_, i) => generateCard(i));
    setCards(generated);
  }, []);

  useEffect(() => {
    if (audioRef.current && musicPlaying) {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [musicPlaying]);

  const handleFight = () => {
    if (matchIndex >= cards.length - 1) return;
    const c1 = cards[matchIndex];
    const c2 = cards[matchIndex + 1];
    setCurrentMatch({ c1, c2 });
    setIsFighting(true);
    fightSound.current.play();

    setTimeout(() => {
      const winner = Math.random() < 0.5 ? c1 : c2;
      winSound.current.play();
      setCards((prev) => [...prev.slice(0, matchIndex), winner, ...prev.slice(matchIndex + 2)]);
      setIsFighting(false);
      setCurrentMatch(null);
      setMatchIndex((prev) => prev + 1);
      if (cards.length === 2) {
        setTournamentWinner(winner);
      }
    }, 3000);
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-4xl font-bold mb-6 animate-pulse">🥊 Gold Fist Tournament</h1>
      {tournamentWinner ? (
        <div>
          <h2 className="text-2xl mb-4 font-bold animate-fade">🏆 Vincitore Finale</h2>
          <Card card={tournamentWinner} />
        </div>
      ) : currentMatch ? (
        <div>
          <p className="text-lg font-semibold animate-fade mb-4">Il duello ha inizio!</p>
          <div className="flex justify-center gap-6 items-center animate-fade">
            <Card card={currentMatch.c1} />
            <span className="text-xl font-bold">⚡</span>
            <Card card={currentMatch.c2} />
          </div>
        </div>
      ) : (
        <button
          onClick={handleFight}
          className="mt-8 bg-green-600 px-6 py-3 text-white font-bold rounded-xl hover:bg-green-700 transition duration-300 animate-fade"
          disabled={isFighting}
        >
          {cards.length - matchIndex <= 2 ? 'Finale' : 'Avvia Prossimo Duello'}
        </button>
      )}

      <div className="mt-8">
        <button
          onClick={() => setMusicPlaying(!musicPlaying)}
          className="text-sm underline text-blue-300 hover:text-blue-100"
        >
          {musicPlaying ? '🔇 Disattiva Musica' : '🔊 Attiva Musica'}
        </button>
      </div>

      <audio ref={audioRef} src="/audio/music.mp3" loop />
      <audio ref={fightSound} src="/audio/fight.mp3" />
      <audio ref={winSound} src="/audio/win.mp3" />
    </div>
  );
};

export default App;
