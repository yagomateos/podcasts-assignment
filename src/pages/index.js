import { useState, useEffect } from "react";
import Header from "../components/Header";
import PodcastList from "../components/PodcastList";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = new Date().getTime();

    if (!lastFetchTime || currentTime - lastFetchTime >= 24 * 60 * 60 * 1000) {
      fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )
        .then((response) => response.json())
        .then((data) => {
          const newPodcasts = data.feed.entry.map((entry) => ({
            podcastId: entry.id.attributes["im:id"],
            title: entry["im:name"].label,
            author: entry["im:artist"].label,
            image: entry["im:image"][2].label,
            summary: entry["summary"].label,
          }));
          setPodcasts(newPodcasts);
          localStorage.setItem("podcasts", JSON.stringify(newPodcasts));
          localStorage.setItem("lastFetchTime", currentTime);
        })
        .catch((error) => console.error(error));
      console.log(
        "Podcasts obtenidos de la API. Validos hasta " +
          new Date(
            parseInt(lastFetchTime, 10) + 24 * 60 * 60 * 1000
          ).toLocaleString()
      );
    } else {
      const cachedPodcasts = localStorage.getItem("podcasts");
      setPodcasts(JSON.parse(cachedPodcasts));
      console.log(
        "Podcasts obtenidos del local storage. Validos hasta " +
          new Date(
            parseInt(lastFetchTime, 10) + 24 * 60 * 60 * 1000
          ).toLocaleString()
      );
    }
  }, []);

  return (
    <div>
      <Header />
      <PodcastList podcasts={podcasts} />
    </div>
  );
}

export default Home;
