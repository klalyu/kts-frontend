import { Card } from "@components/Card";
import { OrgRepositoriesProps } from "@pages/org_repositories_page/OrgRepositoriesPage";
import { Link } from "wouter";

import s from "./CardList.module.scss";
import CardContent from "../card_content";

const CardList: React.FC<OrgRepositoriesProps> = ({ items }) => {
  return (
    <div className={s.cardList}>
      {items.map((repository) => (
        <Link
          key={repository.id}
          href={`/repository/${repository.org}/${repository.name}`}
        >
          <Card
            image={repository.orgAvatar}
            title={repository.name}
            subtitle={repository.description}
            content={
              <CardContent
                stars={repository.stars}
                date={repository.updatedAt}
              />
            }
          />
        </Link>
      ))}
    </div>
  );
};

export default CardList;
