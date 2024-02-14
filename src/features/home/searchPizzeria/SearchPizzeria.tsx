import { TextField, Typography } from '@mui/material';
import { HOCData } from 'shared/HOCData';
import TableData from 'shared/TableData';
import useSearchPizzeria from './useSearchPizzeria';
import { useRef } from 'react';

const SearchPizzeria = () => {
  const searchText = useRef<HTMLInputElement>();
  const {
    infoQuery,
    handleInputValue,
    handleSearch,
    disableSearch,
    handleResearch,
  } = useSearchPizzeria({
    searchText,
  });
  return (
    <div className="flex flex-col items-center gap-3 h-full w-full">
      <form
        className="flex flex-col justify-start gap-2 min-w-[300px]"
        onSubmit={handleSearch}
      >
        <TextField
          size="small"
          className="mx-3 bg-white rounded-lg"
          name="city"
          placeholder="Search city, town.."
          inputRef={searchText}
          onKeyDown={handleResearch}
          onChange={handleInputValue}
        />
        {disableSearch ? (
          <Typography variant="caption" className="pl-1">
            Insert at least 3 character
          </Typography>
        ) : (
          <Typography variant="caption" className="pl-1">
            Press 'ENTER' for starting the research
          </Typography>
        )}
      </form>
      <HOCData infoQuery={infoQuery}>
        {infoQuery.isFetched ? (
          infoQuery.data && infoQuery.data.length > 0 ? (
            <TableData data={infoQuery.data}></TableData>
          ) : (
            <p>No results</p>
          )
        ) : null}
      </HOCData>
    </div>
  );
};

export default SearchPizzeria;
