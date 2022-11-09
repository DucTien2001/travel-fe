import { memo } from 'react';
import classes from "./styles.module.scss";
interface SearchNotFoundProps {
  searchQuery?: string,
  className?: string,
  mess?: string,
}

// eslint-disable-next-line react/display-name
export const SearchNotFound = memo(({ searchQuery = '', mess, className, ...other }: SearchNotFoundProps) => {
  return (
    <div className={className} {...other}>
      <p className={classes.title}>
        {mess || 'Not found'}
      </p>
      {
        searchQuery && (
          <p>
          No results found for &nbsp;
          <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
          using complete words.
        </p>
        )
      }
    </div>
  );
})

export default SearchNotFound;