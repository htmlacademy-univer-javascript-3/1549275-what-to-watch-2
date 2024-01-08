import React, {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { RouteLinks } from '../../router/consts';
import { Spinner } from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ReducerName } from '../../types/reducer-name';
import { fetchFilm } from '../../store/api-actions';
import { Page404 } from '../page-404';

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;


const PlayerPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state[ReducerName.Film].film);
  const isLoading = useAppSelector((state) => state[ReducerName.Film].isLoading);

  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState<number>(0);
  const progress = useMemo(() => Number(time) / Number(videoRef.current?.duration || 1) * 100, [time]);


  const togglePlay = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [isPlaying]);

  const toggleFullScreen = useCallback(() => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  }, []);

  const exitPlayer = useCallback(
    () => id && navigate(`/films/${id}`),
    [id, navigate]
  );

  useLayoutEffect(() => {
    let isMounted = true;

    if (isMounted && id) {
      dispatch(fetchFilm(id));
    }
    return () => {
      isMounted = false;
    };
  }, [id, dispatch]);

  function getTimeLeft() {
    if (film === null || !videoRef.current) {
      return '00:00:00';
    }
    const timeLeft = (videoRef.current?.duration || 0) - time;
    const hours = Math.floor(timeLeft / SECONDS_IN_HOUR).toString().padStart(2, '0');
    const minutes = Math.floor((timeLeft / SECONDS_IN_MINUTE) % SECONDS_IN_MINUTE).toString().padStart(2, '0');
    const seconds = Math.floor((timeLeft % SECONDS_IN_MINUTE)).toString().padStart(2, '0');
    return (hours !== '00') ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }

  if (isLoading) {
    return <Spinner view='display' />;
  }

  if (!id) {
    return <Navigate to={RouteLinks.NOT_FOUND} />;
  }

  return film ? (
    <div className="player">
      <video
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.backgroundImage}
        data-testid="video-player"
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => setTime(videoRef.current?.currentTime || 0)}
      />

      <button type="button" className="player__exit" onClick={exitPlayer}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={progress}
              max='100'
            />
            <div
              className="player__toggler"
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">-{getTimeLeft()}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" data-testid="play-button"
            className="player__play" onClick={togglePlay}
          >
            {isPlaying ? (
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#pause"></use>
              </svg>
            ) : (
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
            )}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={toggleFullScreen}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Page404 />
  );
};

export const Player = React.memo(PlayerPage);
