import React, { useEffect, useReducer, useRef } from "react";
import styles from "./PopularPhotos.module.css";

interface Photo {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
  likes: number;
  views?: number;
  downloads?: number;
}

interface PopularPhotosProps {
  searchQuery: string;
}

interface State {
  photos: Photo[];
  selectedPhoto: Photo | null;
  pageNumber: number;
  loading: boolean;
  hasMore: boolean;
}

type Action =
  | { type: "SET_PHOTOS"; payload: Photo[] }
  | { type: "ADD_PHOTOS"; payload: Photo[] }
  | { type: "SET_SELECTED_PHOTO"; payload: Photo | null }
  | { type: "INCREMENT_PAGE" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_HAS_MORE"; payload: boolean }
  | { type: "RESET_STATE" };

const initialState: State = {
  photos: [],
  selectedPhoto: null,
  pageNumber: 1,
  loading: false,
  hasMore: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PHOTOS":
      return { ...state, photos: action.payload };
    case "ADD_PHOTOS":
      return { ...state, photos: [...state.photos, ...action.payload] };
    case "SET_SELECTED_PHOTO":
      return { ...state, selectedPhoto: action.payload };
    case "INCREMENT_PAGE":
      return { ...state, pageNumber: state.pageNumber + 1 };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_HAS_MORE":
      return { ...state, hasMore: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
}

const PopularPhotos: React.FC<PopularPhotosProps> = ({ searchQuery }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cache = useRef<{ [key: string]: Photo[] }>({});
  const isMainPage = !searchQuery;

  useEffect(() => {
    async function fetchData() {
      if (isMainPage && state.pageNumber > 1) return;

      const cacheKey = `${searchQuery}-${state.pageNumber}`;
      if (cache.current[cacheKey]) {
        dispatch({ type: "SET_PHOTOS", payload: cache.current[cacheKey] });
        return;
      }

      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const endpoint = searchQuery
          ? `/search/photos?query=${searchQuery}&page=${state.pageNumber}`
          : `/photos?order_by=popular&page=1`;

        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}${endpoint}&per_page=20`,
          {
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_REACT_APP_API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();
        const results = searchQuery ? data.results : data;
        
        if (state.pageNumber === 1) {
          dispatch({ type: "SET_PHOTOS", payload: results });
        } else {
          dispatch({ type: "ADD_PHOTOS", payload: results });
        }

        dispatch({ type: "SET_HAS_MORE", payload: results.length === 20 });
        cache.current[cacheKey] = results;
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    fetchData();
  }, [searchQuery, state.pageNumber, isMainPage]);

  useEffect(() => {
    function handleScroll() {
      if (isMainPage) return;
      
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100 && !state.loading && state.hasMore) {
        dispatch({ type: "INCREMENT_PAGE" });
      }
    }

    if (!isMainPage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [state.loading, state.hasMore, isMainPage]);

  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
  }, [searchQuery]);

  async function fetchPhotoDetails(photo: Photo) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/photos/${photo.id}`,
        {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_REACT_APP_API_KEY}`,
          },
        }
      );
  
      if (!response.ok) {
        const textResponse = await response.text(); 
        if (textResponse.includes("Rate Limit Exceeded")) {
          throw new Error("Limit of requests exceeded. Try again later.");
        }
        throw new Error("Can not fetch photo details");
      }
  
      const data = await response.json(); 
      dispatch({
        type: "SET_SELECTED_PHOTO",
        payload: {
          ...photo,
          likes: data.likes,
          views: data.views,
          downloads: data.downloads,
        },
      });
    } catch (error) {
      console.error("Error to fetch photos", error);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.primaryText}>
        {searchQuery ? `Results for "${searchQuery}"` : "Popular Photos"}
      </h2>
      <div className={styles.photoGrid}>
        {state.photos.map((photo) => (
          <div
            key={photo.id}
            className={styles.photoCard}
            onClick={() => fetchPhotoDetails(photo)}
          >
            <img
              className={styles.photoImage}
              src={photo.urls.small}
              alt={photo.alt_description}
            />
          </div>
        ))}
      </div>

      {state.selectedPhoto && (
        <div className={styles.modal} onClick={() => dispatch({ type: "SET_SELECTED_PHOTO", payload: null })}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              className={styles.fullImage}
              src={state.selectedPhoto.urls.full}
              alt={state.selectedPhoto.alt_description}
            />
            <div className={styles.photoStats}>
              <p>❤️ {state.selectedPhoto.likes} Likes</p>
              <p>👁️ {state.selectedPhoto.views ?? "Loading..."} Views</p>
              <p>⬇️ {state.selectedPhoto.downloads ?? "Loading..."} Downloads</p>
            </div>
            <button className={styles.closeButton} onClick={() => dispatch({ type: "SET_SELECTED_PHOTO", payload: null })}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularPhotos;