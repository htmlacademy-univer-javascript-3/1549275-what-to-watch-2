import Catalog from '../../data/enums/catalog';

export type GenresItemProps = {
  title: Catalog;
  handleSetGenre: (newGenre: Catalog) => void;
  isActive: boolean;
}
