import React from "react";

import s from "./Link.module.scss";

type LinkProps = {
  url: string;
  text: string;
};
const Link: React.FC<LinkProps> = ({ url, text }) => {
  return (
    <div className={s.link}>
      <img src="/images/link.svg" alt="link" />
      <span>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </span>
    </div>
  );
};

export default Link;
