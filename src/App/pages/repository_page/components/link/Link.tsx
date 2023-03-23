import React from "react";

import s from "./Link.module.scss";
import linkImg from "@assets/images/link.svg";

type LinkProps = {
  url: string;
  text: string;
};
const Link: React.FC<LinkProps> = ({ url, text }) => {
  return (
    <div className={s.link}>
      <img src={linkImg} alt="link" />
      <span>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </span>
    </div>
  );
};

export default Link;
