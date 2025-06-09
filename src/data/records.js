import ScarletImg from '../assets/Scarlet.jfif';
import PanicImg from '../assets/wsp.jpg';
import TruckinImg from '../assets/truckin.jpg';
import ChillyImg from '../assets/chillywaterr.jfif';
import sampleAudio from '../assets/beep.mp3';

export const records = [
  {
    id: 1,
    title: 'Scarlet Begonias',
    artist: 'Grateful Dead',
    genre: ['Psychedelic', 'Jam', 'Rock'],
    price: 19.99,
    releaseDate: '1974-06-01',
    coverImageUrl: ScarletImg,
    trackList: [sampleAudio],
  },
  {
    id: 2,
    title: "Ain't Life Grand",
    artist: 'Widespread Panic',
    genre: ['Southern Rock', 'Jam'],
    price: 17.5,
    releaseDate: '1994-09-06',
    coverImageUrl: PanicImg,
    trackList: [sampleAudio],
  },
  {
    id: 3,
    title: "Truckin'",
    artist: 'Grateful Dead',
    genre: ['Classic Rock', 'Jam'],
    price: 21.0,
    releaseDate: '1970-11-01',
    coverImageUrl: TruckinImg,
    trackList: [sampleAudio]
  },
  {
    id: 4,
    title: 'Chilly Water',
    artist: 'Widespread Panic',
    genre: ['Jam'],
    price: 18.0,
    releaseDate: '1991-01-01',
    coverImageUrl: ChillyImg,
    trackList: [sampleAudio]
  }
];
