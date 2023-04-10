import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Styles
import styles from "../../../../styles/EpisodeDetails.module.css";

import episodesData from "../../../api/mock.json"

function PodcastDetails() {
  const router = useRouter();
  const [podcast, setPodcast] = useState(null);
  const [episode, setEpisode] = useState(null);
  const podcastId = router.query.podcastId;
  const episodeId = router.query.episodeId;

  useEffect(() => {
    async function fetchPodcast() {
      try {
        const podcasts = JSON.parse(localStorage.getItem("podcasts"));
        if (podcasts) {
          const podcast = podcasts.find((p) => p.podcastId === podcastId);
          setPodcast(podcast)
          const summary = podcast.summary;

          const lastUpdated = localStorage.getItem(
            `podcast_${podcastId}_updated`
          );
          const currentTime = Date.now();
          const timeElapsed = currentTime - lastUpdated;

          if (lastUpdated && timeElapsed < 24 * 60 * 60 * 1000) {
            // Si han pasado menos de 24 horas, se obtiene el podcast del Local Storage
            const podcastData = JSON.parse(
              localStorage.getItem(`podcast_${podcastId}`)
            );

            setPodcast({
              podcastId: podcastData.trackId,
              title: podcastData.trackName,
              author: podcastData.artistName,
              image: podcastData.artworkUrl600,
              summary: summary,
            });
            console.log(
              "Podcast obtenido del local storage valido hasta " +
                new Date(
                  parseInt(lastUpdated, 10) + 24 * 60 * 60 * 1000
                ).toLocaleString()
            );
          }
        } else {
          // Si han pasado más de 24 horas, se consulta la API de nuevo
          const response = await fetch(`/api/podcast?podcastId=${podcastId}`);
          const data = await response.json();
          const podcastData = data.results[0];
          setPodcast({
            podcastId: podcastData.trackId,
            title: podcastData.trackName,
            author: podcastData.artistName,
            image: podcastData.artworkUrl600,
            summary: podcastData.collectionName,
          });
          localStorage.setItem(
            `podcast_${podcastId}`,
            JSON.stringify(podcastData)
          );
          localStorage.setItem(`podcast_${podcastId}_updated`, currentTime);
          console.log(
            "Podcast obtenido de la API valido hasta " +
              new Date(currentTime + 24 * 60 * 60 * 1000).toLocaleString()
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPodcast();
    const foundEpisode = episodesData.items.find((episode) => episode.episodeId === episodeId);
    setEpisode(foundEpisode);
  }, [podcastId]);

  if (!podcast || !episode) {
    return <div>Podcast con ID {podcastId} no encontrado.</div>;
  }

  return (
    <div>
      <Header />
      <div className="ms-5 me-5">
        <Row>
          <Col md={3}>
            <Card>
              <div className={styles["podcast-image"]}>
                <Card.Img variant="top" src={podcast.image} />
              </div>
              <Card.Body>
                <div className={styles["podcast-title"]}>
                  <Card.Title>{podcast.title}</Card.Title>
                </div>
                <div className={styles["podcast-author"]}>
                  <Card.Text>by {podcast.author}</Card.Text>
                </div>
                <Card.Title>Description</Card.Title>
                <div className={styles["podcast-description"]}>
                  <Card.Text>by {podcast.summary}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9}>
            <div className={styles["episode-card"]}>
              <Card>
                <Card.Body>
                  <Card.Title>{episode.title}</Card.Title>
                  <div className={styles['episode-info']}>
                    <Card.Text>{episode.description}</Card.Text>
                    <Card.Text>{episode.extraInfo}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PodcastDetails;
