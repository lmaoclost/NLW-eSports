import { useEffect, useState } from "react";
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from "./components/CreateAdBanner";
import GameSlider from "./components/GameSlider";

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from "./components/CreateAdModal";


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="mt-16">
        {games.length > 0 ? <GameSlider gameList={games} /> : null}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
