import { lazy, Suspense, useEffect, useState } from "react";
import { axiosClient } from "./utils/axios";
import { IoMenu, IoClose } from "react-icons/io5";

const Listitem = lazy(() => import("./components/Listitem"));
const MusicPlayer = lazy(() => import("./components/MusicPlayer"));
const Card = lazy(() => import("./components/Card"));

function App() {
  const [allSongs, setAllSongs] = useState([]);
  const [songNumber, setSongNumber] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [cardData, setCardData] = useState({});
  const [currentSong, setCurrentSong] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // For Listitem on mobile
  const [showCard, setShowCard] = useState(false); // For Card on mobile

  const nextSong = () => {
    if (songNumber < allSongs.length - 1) {
      const nextIndex = songNumber + 1;
      setSongNumber(nextIndex);
      setCardData(allSongs[nextIndex]);
    }
  };

  const prevSong = () => {
    if (songNumber > 0) {
      const prevIndex = songNumber - 1;
      setSongNumber(prevIndex);
      setCardData(allSongs[prevIndex]);
    }
  };

  const shuffleSong = () => {
    if (allSongs.length > 0) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * allSongs.length);
      } while (randomIndex === songNumber);

      setSongNumber(randomIndex);
      setCardData(allSongs[randomIndex]);
    }
  };

  const onClickMusicPlayer = (data) => {
    setCardData(data);
  };

  const getData = async () => {
    try {
      const res = await axiosClient.get("/song/all");
      setAllSongs(res.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row pb-8 relative overflow-hidden bg-gradient-to-r from-[#0e0b0b] via-[#221111] to-[#310a0a] min-h-screen text-white text-lg gap-7">
      {/* Burger Menu Button (Mobile Only) */}
      <button
        className="absolute top-4 left-4 z-20 lg:hidden p-2 bg-gray-800 rounded-md"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? <IoClose size={25} /> : <IoMenu size={25} />}
      </button>

      {/* Sidebar Listitem */}
      <div
        className={`absolute lg:relative bg-slate-800 lg:bg-transparent  w-[70%] lg:w-[20%] h-full z-10 transition-transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        <Suspense fallback={<h1>Loading...</h1>}>
          <Listitem />
        </Suspense>
      </div>

      {/* Music Player Section */}
      <div className="w-full lg:w-[55%] bg-gradient-to-b from-[#501616] via-[#300f0f] to-[#140808]">
        <Suspense fallback={<h1>Loading...</h1>}>
          {allSongs.length > 0 ? (
            <MusicPlayer
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              setIsPlay={setIsPlay}
              setSongNumber={setSongNumber}
              setAllSongs={setAllSongs}
              onDataChange={onClickMusicPlayer}
              allSongs={allSongs}
            />
          ) : (
            <h1 className="flex items-center justify-center mx-auto h-screen">
              Loading...
            </h1>
          )}
        </Suspense>
      </div>

      {/* Card Section */}
      {cardData && isPlay && (
        <>
          {/* Toggle Card Button (Mobile Only) */}
          <button
            className="absolute right-4 top-2 z-20 lg:hidden p-2 bg-gray-800 rounded-md"
            onClick={() => setShowCard(!showCard)}
          >
            {showCard ? <IoClose size={25} /> : "Controls"}
          </button>

          <div
            className={`absolute  bg-[#501616] w-[70%] lg:w-[17%] h-[500px] bottom-0 lg:bottom-[300px] right-0 lg:right-10 z-10 rounded-md transition-transform ${
              showCard ? "translate-x-0" : "translate-x-full"
            } lg:translate-x-0 `}
          >
            <Suspense fallback={<h1>Loading...</h1>}>
              <Card
                data={cardData}
                setCurrentSong={setCurrentSong}
                nextSong={nextSong}
                isPlay={isPlay}
                prevSong={prevSong}
                shuffleSong={shuffleSong}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
