import ReleaseDate from "../../../../components/ReleaseDate/ReleaseDate";
import ProductionCountries from "../../../../components/ProductionCountries/ProductionCountries";
import ProductionCompanies from "../../../../components/ProductionCompanies/ProductionCompanies";
import Links from "../../../../components/Links/Links";

import SpokenLanguages from "../../../../components/SpokenLanguages/SpokenLanguages";
import CreatedBy from "../../../../components/CreatedBy/CreatedBy";
import Budget from "../../../../components/Budget/Budget";

const DetailsBox = (props) => {
  const { id, category, homepage, release_date, production_countries, production_companies, budget,
    spoken_languages, created_by } = props;

  return (
    <div>
      <ReleaseDate date={release_date} />
      <Budget budget={budget} />
      <ProductionCountries countries={production_countries} />
      <ProductionCompanies companies={production_companies} />
      <SpokenLanguages spokenLang={spoken_languages} />
      <CreatedBy createdBy={created_by} />
      <Links id={id} category={category} homepage={homepage} />
    </div>
  );
};

export default DetailsBox;