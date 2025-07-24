import React, { useState } from 'react';

const generateCard = (id) => {
  const names = ['Drago', 'Golem', 'Fenice', 'Lupo', 'Orco', 'Mago', 'Vampiro', 'Samurai'];
  const name = names[id % names.length] + ' #' + (id + 1);
  return {
    id,
    name,
    hp: Math.floor(Math.random() * 100) + 50,
    attack: Math.floor(Math.random() * 50) + 10,
    defense: Math.floor(Math.random() * 50) + 10,
    color: `hsl(${Math.random() * 360}, 70%, 80%)`,
  };
};

const Card = ({ card }) => (
  <div className="rounded-xl shadow-md p-4 w-40 text-center animate-fade" style={{ backgroundColor: card.color }}>
    <h2 className="text-md font-bold">{card.name}</h2>
    <p>HP: {card.hp}</p>
    <p>ATK: {card.attack}</p>
    <p>DEF: {card.defense}</p>
  </div>
);

const Battle = ({ c1, c2, winner }) => (
  <div className="flex items-center justify-center gap-4 my-6">
    <Card card={c1} />
    <span className="text-xl font-bold">VS</span>
    <Card card={c2} />
    <span className="text-green-400 font-semibold">🏆 {winner.name}</span>
  </div>
);

const App = () => {
  const [cards, setCards] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [winner, setWinner] = useState(null);

  const startTournament = () => {
    const generated = Array.from({ length: 16 }, (_, i) => generateCard(i));
    setCards(generated);
    setRounds([generated]);
    setCurrentRound(0);
    setWinner(null);
  };

  const nextRound = () => {
    const previous = rounds[currentRound];
    if (previous.length === 1) {
      setWinner(previous[0]);
      return;
    }
    const next = [];
    for (let i = 0; i < previous.length; i += 2) {
      const chosen = Math.random() < 0.5 ? previous[i] : previous[i + 1];
      next.push(chosen);
    }
    setRounds([...rounds, next]);
    setCurrentRound(currentRound + 1);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">🥊 Gold Fist Tournament</h1>
      {rounds.length === 0 && (
        <button onClick={startTournament} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Inizia Torneo</button>
      )}
      {rounds.length > 0 && !winner && (
        <>
          <h2 className="text-xl font-semibold mb-4">Round {currentRound + 1}</h2>
          {rounds[currentRound].map((card, idx) =>
            idx % 2 === 0 ? (
              <Battle
                key={idx}
                c1={rounds[currentRound][idx]}
                c2={rounds[currentRound][idx + 1]}
                winner={rounds[currentRound + 1]?.[Math.floor(idx / 2)] || {}}
              />
            ) : null
          )}
          <button onClick={nextRound} className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4">Prossimo Round</button>
        </>
      )}
      {winner && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">🏆 Vincitore Assoluto</h2>
          <Card card={winner} />
          <button onClick={startTournament} className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-4">Ricomincia</button>
        </div>
      )}
    </div>
  );
};

export default App;
