import React, { useState } from "react";
import Podcast from "./Podcast";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

//Styles
import styles from "../styles/PodcastList.module.css";

const PodcastList = ({ podcasts }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <header>
      <Form className={styles["formulario"]}>
        <Badge bg="primary" className={styles["badge"]}>
          {filteredPodcasts.length}
        </Badge>
        <Form.Control
          type="text"
          placeholder="Filter Podcasts"
          value={filter}
          onChange={handleFilterChange}
        />
      </Form>

      <div className={styles["container"]}>
        <div className={styles["podcasts"]}>
          {filteredPodcasts.map((podcast, index) => (
            <Podcast key={index} podcast={podcast} />
          ))}
        </div>
      </div>
    </header>
  );
};

export default PodcastList;
