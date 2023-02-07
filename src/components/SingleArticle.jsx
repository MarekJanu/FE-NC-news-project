import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "./utils/api";

export const SingleArticle = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setBody] = useState("");
  const [articleAuthor, setAuthor] = useState("");
  const [articleImg, setImg] = useState("");
  const [articleDate, setDate] = useState("");
  const [articleVotes, setVotes] = useState(0);

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const path = "articles/" + id;
  useEffect(() => {
    getArticleById(path).then(({ article }) => {
      setArticleTitle(article.title);
      setBody(article.body);
      setImg(article.article_img_url);
      setAuthor(article.author);
      setDate(article.created_at);
      setIsLoading(false);
    });
  }, [articleTitle]);
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <img src={articleImg} />
        <p>{articleTitle}</p>
        <p>
          By {articleAuthor}, publishing date: {articleDate.slice(0, 10)}
        </p>
        <p>Votes: {articleVotes}</p>
        <p>{articleBody}</p>
      </>
    );
  }
};
