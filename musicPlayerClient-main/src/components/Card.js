import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RxLoop } from "react-icons/rx";
import { FaShuffle } from "react-icons/fa6";
import { IoVolumeMute } from "react-icons/io5";

const MusicCard = ({ data, prevSong, nextSong, shuffleSong, isPlay , setCurrentSong}) => {
  const music_url = process.env.REACT_APP_MUSIC_URL;
  const { song, singer, description, image, album } = data;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState("0:00");
  const [loop, setLoop] = useState(false);
  const [mute, setMute] = useState(false);
  const soundRef = useRef(null);
  const song_url = `${music_url}/${song}`;

  useEffect(() => {
    soundRef.current = new Howl({
      src: [song_url],
      html5: true,
      onload: () => {
        const duration = soundRef.current.duration();
        setTotalDuration(formatTime(duration));
      },
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime("0:00");
      },
    });

    setIsPlaying(false);

    if (isPlay) {
      setIsPlaying(true);
      soundRef.current.play();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [song, song_url, isPlay]);

  useEffect(() => {
    if (!soundRef.current) return;

    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        const seek = soundRef.current.seek() || 0;
        setProgress((seek / soundRef.current.duration()) * 100);
        setCurrentTime(formatTime(seek));
      }, 500);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    setCurrentSong(data); 
  }, [data]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const togglePlayPause = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const setLoopHandle = () => {
    if (!soundRef.current) return;

    soundRef.current.loop(!loop);
    setLoop(!loop);

    if (!data.song) return;
  };
  
  const toggleMute = ()=>{
    if (!soundRef.current) return ;
    soundRef.current.mute(!mute)
    setMute(!mute)
  }
  return (
    <div className="flex flex-col relative mt-5 mx-auto justify-center gap-4 px-5 items-center">
      <h1>Now Playing</h1>

      <img src={image} alt={description} className="w-full h-48 object-cover" />
      <div className="p-4 text-center">
        <h2 className="text-md font-semibold">
          {song && song.replace(/\.mp3$/, "")}
        </h2>
        <p className="text-md text-gray-500">{singer}</p>

        {isPlaying ? (
          <div className="flex h-6 mt-4 gap-1 items-end justify-center">
            <div
              className="w-1 bg-blue-500 h-2 rounded animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1 bg-red-500 h-3 rounded animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-1 bg-green-500 h-4 rounded animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-1 bg-yellow-500 h-2 rounded animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="w-1 bg-purple-500 h-5 rounded animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-1 bg-pink-500 h-3 rounded animate-bounce"
              style={{ animationDelay: "0.6s" }}
            ></div>
            <div
              className="w-1 bg-teal-500 h-4 rounded animate-bounce"
              style={{ animationDelay: "0.7s" }}
            ></div>
            <div
              className="w-1 bg-orange-500 h-6 rounded animate-bounce"
              style={{ animationDelay: "0.8s" }}
            ></div>
            <div
              className="w-1 bg-lime-500 h-3 rounded animate-bounce"
              style={{ animationDelay: "0.9s" }}
            ></div>
            <div
              className="w-1 bg-indigo-500 h-4 rounded animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="w-1 bg-gray-500 h-5 rounded animate-bounce"
              style={{ animationDelay: "1.1s" }}
            ></div>
            <div
              className="w-1 bg-brown-500 h-2 rounded animate-bounce"
              style={{ animationDelay: "1.2s" }}
            ></div>
          </div>
        )
        :
        <div className="h-6 mt-4"></div>
      }

        <div className="flex flex-row items-center gap-4 mt-4 w-[280px]">
          <span className="text-sm">{currentTime}</span>
          <div className="flex-1">
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <span className="text-sm">{totalDuration}</span>
        </div>

        <div className="flex flex-row gap-6 mt-3 justify-center items-center mx-auto">
          <button
            className={`${loop && "bg-slate-800 rounded"} p-1`}
            onClick={setLoopHandle}
          >
            <RxLoop color="white" size={25} />
          </button>
          <button>
            <GiPreviousButton color="white" size={25} onClick={prevSong} />
          </button>
          <button
            onClick={togglePlayPause}
            className="px-3 py-2 bg-gray-800 opacity-70 text-white font-bold rounded shadow-md"
          >
            {isPlaying ? (
              <FaPause color="white" size={25} />
            ) : (
              <FaPlay color="white" size={25} />
            )}
          </button>
          <button>
            <GiNextButton color="white" size={25} onClick={nextSong} />
          </button>
          <button onClick={shuffleSong}>
            <FaShuffle color="white" size={25} />
          </button>
        </div>
      </div>

      <button className={` ${mute && "bg-slate-800 rounded"} p-1 absolute right-6 bottom-24`} onClick={toggleMute}>
        <IoVolumeMute color="white" size={30}/>
      </button>
    </div>
  );
};

export default MusicCard;
