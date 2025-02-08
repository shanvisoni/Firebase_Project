import { Auth } from "./components/auth";
import "./App.css";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db,auth } from "./config/firebase";
import { useEffect, useState } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitles, setUpdatedTitles] = useState({}); // ✅ Store updates per movie
  const moviesCollectionRef = collection(db, "movies");

  // Fetch movies
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  // Add a new movie
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedAnOscar: isNewMovieOscar,
        userId:auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a movie
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  // Update movie title
  const updateMovie = async (id) => {
    if (!updatedTitles[id]) {
      alert("Please enter a new title!");
      return;
    }
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitles[id] });
      getMovieList();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date"
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      {movieList.map((movie) => (
        <div key={movie.id}>
          <h3 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
            {movie.title}
          </h3>
          <p>Release Date: {movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

          {/* Input for updating title, tracking per movie */}
          <input
            placeholder="New title..."
            value={updatedTitles[movie.id] || ""}
            onChange={(e) =>
              setUpdatedTitles((prev) => ({ ...prev, [movie.id]: e.target.value }))
            }
          />
          <button onClick={() => updateMovie(movie.id)}>Update title</button>
        </div>
      ))}
    </div>
  );
}

export default App;
