import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../api/gameData';

function Home() {
  const [games, setGames] = useState([]);

  const getAllGames = () => {
    getGames().then((data) => setGames(data));
  };

  useEffect(() => {
    getAllGames();
  }, []);

  const router = useRouter();

  return (
    <article className="games">
      <h1>Games</h1>
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard gameObj={game} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} onUpdate={getAllGames} />
        </section>
      ))}
    </article>
  );
}

export default Home;

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { Button } from 'react-bootstrap';
// import GameCard from '../../components/game/GameCard';
// import { getGames } from '../../api/gameData';

// function Home() {
//   const [games, setGames] = useState([]);
//   const router = useRouter();

//   const loadGames = () => {
//     getGames().then((data) => setGames(data));
//   };

//   useEffect(() => {
//     loadGames();
//   }, []);

//   return (
//     <article className="games">
//       <h1>Games</h1>
//       <Button
//         onClick={() => {
//           router.push('/games/new');
//         }}
//       >
//         Register New Game
//       </Button>
//       {games.map((game) => (
//         <section key={`game--${game.id}`} className="game">
//           <GameCard gameObj={game} onUpdate={loadGames} />
//         </section>
//       ))}
//     </article>
//   );
// }

// export default Home;
