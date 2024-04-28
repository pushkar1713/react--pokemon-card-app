import { CardGrid } from "./CardGrid";
import { FilterForm } from "./FilterForm";

export const Main = () => {
  return (
    <div className="main">
      <FilterForm />
      <CardGrid />
    </div>
  );
};
