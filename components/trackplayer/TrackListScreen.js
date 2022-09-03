import React, {useEffect, useState,useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Animated
} from 'react-native';
import {musiclibrary} from '../../model/data';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayerScreen from './TrackPlayerScreen';
import PlayIcon from '../../assets/play.png';
import PauseIcon from '../../assets/pause.png';
const {width, height} = Dimensions.get('window');
import storage from '@react-native-firebase/storage';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.RemotePlay,
  Event.RemotePause,
];
export default function TrackListScreen() {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const playBackState = usePlaybackState();
  const [songList, setsongList] = useState([]);
  const [songurl, setsongurl] = useState([]);
  
   const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
      storage()
        .ref('songs/')
        .listAll()
        .then(function(result) {
            result.items.forEach(function(songRef) {
              songRef.getDownloadURL().then(function(url) {
                  // songList.push(url); 
                 

                  var filename = url.split('%').pop().split('?')[0];//url.substring(url.lastIndexOf('%')+1);
                  // songurl.push( url.split('%').pop().split('?')[0]);
                  // setsongurl([]...songurl)

                  var songdata={
                    songname:filename,
                    songurl:url}
                    songList.push(songdata)
                  setsongList([...songList]);
                  
                  // console.log("file name...",filename);
                 console.log("songsssss...",songList);
                  // var url = songurl.substring(songurl.lastIndexOf('/')+1);
                  // console.log("urlllll",url)
                }).catch(function(error) {
                    // Handle any errors

                });
               
        //  console.log("fileeeeee nmaeeee iss.....",songurl)
            });
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }, []);
  
  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occurred while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      console.log(event.type);
    }
    if (event.type === Event.RemotePlay) {
      console.log(event.type);
    }
    if (event.type === Event.RemotePause) {
      console.log(event.type);
    }
  });

  const onSelectTrack = async (selectedTrack, index) => {
    setSelectedMusic(selectedTrack);
    setTimestamp(0);
    setSelectedMusicIndex(index);
    // remove TrackPlayer.skip(index);
    // playOrPause();
  };

  const togglePlayBack = async playBackState => {
    await TrackPlayer.add(songurl);
    await TrackPlayer.play();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(currentTrack, playBackState, State.Playing);
    if (currentTrack != null) {
      if (playBackState == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  useEffect(() => {
    TrackPlayer.setupPlayer();
     scrollX.addListener(({value}) => {
       //   console.log(`ScrollX : ${value} | Device Width : ${width} `);
 
       const index = Math.round(value / width);
       skipTo(index);
       setsongIndex(index);
 
       //   console.log(`Index : ${index}`);
     });
 
     return () => {
       scrollX.removeAllListeners();
       TrackPlayer.destroy();
     };
   }, []);
 

 
  const renderSingleMusic = ({item, index}) => {
    console.log("At render item",item)
    return (
      <>
       
        <Pressable onPress={() => onSelectTrack(item, index)}>
          <View>
           <Text></Text>

            <Text style={styles.musicTitle}>{item.songname}</Text>
            {/* <Text style={styles.artisteTitle}>{item.artist}</Text> */}
          </View>
        </Pressable>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={[styles.widgetContainer1, {justifyContent: 'center'}]}>
        <Text style={styles.musicTitle}>My music List</Text>
      </View>
      <FlatList
        data={songList}
        keyExtractor={item => item.name}
        renderItem={renderSingleMusic}
      />
      {selectedMusic && (
        <Pressable onPress={() => setisPlayerModalVisible(true)}>
          <View style={[styles.widgetContainer, {}]}>
            <View style={{flexDirection: 'row'}}>
            
              <View>
                <Text style={styles.widgetMusicTitle}>
                  {selectedMusic.songname}
                </Text>
               
              </View>
            </View>
            <Pressable onPress={() => togglePlayBack(playBackState)}>
              <Image
                source={ playBackState == State.Playing ? PauseIcon : PlayIcon}
                  style={{height: 30, tintColor: '#fff', width: 30}}
              />
            </Pressable>
          </View>
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#191414',
  },
  musicTitle: {
    fontSize: 22,
    color: '#191414',
    fontWeight: '500',
    marginTop: 12,
    marginHorizontal: 20,
    marginBottom: 1,
  },
  artisteTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 1,
  },
  widgetContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 60,
    width: '100%',
    // backgroundColor: '#5E5A5A',
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 60,
    width: '100%',
   backgroundColor: '#5E5A5A',
  },
  widgetMusicTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    marginTop: 12,
    marginHorizontal: 10,
    marginBottom: 1,
  },
  widgetArtisteTitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 10,
    marginBottom: 12,
    marginTop: 1,
  },
  widgetImageStyle: {
    width: 55,
    height: 60,
    marginTop: 3,
  },
  linearGradient: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shuffleButton: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  shuffleButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 40,
    alignSelf: 'center',
    backgroundColor: '#1DB954',
  },
});