import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { HiMusicNote } from "react-icons/hi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdVerified } from "react-icons/md";

function MusicPlayer({ allSongs, onDataChange, setAllSongs, setSongNumber ,setIsPlay, currentSong, setCurrentSong}) {

  const setSongToAllPage = (song, index) => {
    setCurrentSong(song);
    onDataChange(song);
    setSongNumber(index)
    setIsPlay(true)
  };

  const [singerImage, setSingerImage] = useState("")

  useEffect(() => {
    setSingerImage(currentSong?.singer_image || currentSong?.image )
  
  }, [currentSong])
  
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(allSongs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSongNumber(result.destination.index)
    setAllSongs(items);
  };
  
  return (
    <div className="mt-10">
  <div className="flex flex-col md:flex-row px-5 md:px-10 justify-center items-center mx-auto space-y-5 md:space-y-0">
    <ul className="flex flex-wrap justify-evenly items-center w-full md:w-[55%] text-center space-y-3 md:space-y-0">
      <li className="text-base md:text-lg hover:underline cursor-pointer">Music</li>
      <li className="text-base md:text-lg hover:underline cursor-pointer">Podcast</li>
      <li className="text-base md:text-lg hover:underline cursor-pointer">Live</li>
      <li className="text-base md:text-lg hover:underline cursor-pointer">Radio</li>
    </ul>
    <div className="flex w-full md:w-[35%] flex-wrap justify-between md:justify-center items-center gap-3 bg-gray-900 opacity-70 text-white rounded-3xl p-2">
      <input
        type="text"
        className="w-full md:w-auto bg-transparent outline-none text-sm md:text-base"
        placeholder="Search by singer"
      />
      <IoSearch color="white" className="cursor-pointer" size={20} Size={25} />
    </div>
  </div>

  {
    currentSong 
    &&
    <div className="shadow-custom shadow-black m-3 md:m-5 p-3 flex flex-col md:flex-row justify-evenly items-center">
    <div className="flex flex-col gap-2 text-center md:text-left">
      <div className="flex items-center gap-2 md:gap-5 text-gray-400 justify-center md:justify-start">
        <MdVerified color="#4292ec" size={25} Size={30} />
        <h1 className="text-sm md:text-base">Verified Artist</h1>
      </div>
      <h1 className="text-2xl md:text-3xl">{currentSong?.singer}</h1>
      <h1 className="mt-3 md:mt-7 text-sm md:text-base">
        {currentSong?.monthlyView}
        <span className="ml-2 md:ml-7">monthly listeners</span>
      </h1>
    </div>
    <img src={singerImage} alt="" className="max-h-[200px] md:max-h-[300px] rounded" />
  </div>
  }

  <div className="mt-5 md:mt-10">
    <div className="flex justify-between w-full md:w-[80%] mx-auto items-center my-3 md:my-5 relative text-sm md:text-base">
      <h1>Popular</h1>
      <h1>See all</h1>
    </div>
    <div className="hidden md:flex flex-row text-gray-400 items-center justify-evenly px-4">
      <h1 className="w-[100px]">#</h1>
      <h1 className="w-[100px]">TITLE</h1>
      <h1 className="w-[100px]">PLAYING</h1>
      <h1 className="w-[100px]">TIME</h1>
      <h1 className="w-[100px]">ALBUM</h1>
    </div>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="songs">
        {(provided) => (
          <div
            className="flex flex-col text-gray-400 items-center gap-2 md:gap-4 mt-5 md:mt-8 justify-evenly px-2 md:px-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {allSongs &&
              allSongs.map((item, index) => (
                <Draggable
                  key={`${item?.song}-${index}`}
                  draggableId={`${item?.song}-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      onClick={() => setSongToAllPage(item, index)}
                      className={`${
                        currentSong && currentSong.song === item.song
                          && "bg-red-900"
                          
                      } hover:bg-red-900 rounded-md p-1 py-2 flex flex-row gap-2 md:gap-5 items-center overflow-hidden cursor-pointer`}
                    >
                      <h1 className="w-[50px] md:w-[100px] text-center md:text-left">
                        {currentSong && currentSong.song === item.song ? (
                          <div className="flex justify-center md:justify-start gap-2 items-center">
                            <span className="bg-red-500 w-1 h-14 rounded"></span>{" "}
                            <HiMusicNote color="white" size={20} Size={30} />
                          </div>
                        ) : (
                          index + 1
                        )}
                      </h1>
                      <div className="flex items-center justify-evenly gap-2 md:gap-3 w-[220px]">
                        <img src={item.image} width="40px" alt="" />
                        <h1 className="text-xs md:text-sm w-[120px]">
                          {item.song.replace(".mp3", "")}
                        </h1>
                      </div>
                      <h1 className="w-[100px] md:w-[150px] ml-2 md:ml-14 text-xs md:text-sm">{item.allView}</h1>
                      <h1 className="w-[100px] md:w-[150px] text-xs md:text-sm">{item.duration}</h1>
                      <h1 className="hidden md:block w-[100px] md:w-[150px] pl-10 text-justify text-xs md:text-sm">
                        {item.album}
                      </h1>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>
</div>

  );
}

export default MusicPlayer;
