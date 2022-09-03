import React,{useEffect} from 'react';
import TrackListScreen from '../components/trackplayer/TrackListScreen';
import {musiclibrary} from '../model/data';
export default function MusicScreen() {
  const setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(musiclibrary);
  };
  useEffect(() => {
    setup();
  }, []);
  return(
    <TrackListScreen/>
  )
   
}