import React from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";
import styles from "../styles/Podcast.module.css";

const Podcast = ({ podcast }) => {
  const { podcastId, title, author, image } = podcast;

  return (
    <Link href={`/podcast/${podcastId}`} style={{ textDecoration: "none" }}>
      <div className={styles["podcast"]}>
        <Card className={styles["card"]}>
          <div>
            <div>
              <Card.Img
                className={styles["circle-img"]}
                variant="top"
                src={image}
              />
            </div>
          </div>
          <Card.Body className={styles["card-body"]}>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{author}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
};

export default Podcast;
