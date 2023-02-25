import s from "./Topic.module.scss";
type TopicProps = {
  text: string;
};

const Topic: React.FC<TopicProps> = ({ text }) => {
  return <div className={s.topic}>{text}</div>;
};

export default Topic;
