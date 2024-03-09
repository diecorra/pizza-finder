import { ChangeEvent, FormEvent, useState } from 'react';
import { useFetchCities } from 'services/fetchCities';

const useSearchPizzeria = ({
  searchText,
}: {
  searchText: React.MutableRefObject<HTMLInputElement | undefined>;
}) => {
  const [disableSearch, setDisableSearch] = useState(true);
  const infoUseQuery = useFetchCities(searchText.current?.value ?? '');
  const handleResearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == 'Enter') {
      infoUseQuery.refetch();
    }
  };
  const handleInputValue = (
    text: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (text.target && text.target.value.match(/.{3,}/g)) {
      setDisableSearch(false);
    } else {
      setDisableSearch(true);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!disableSearch) {
      infoUseQuery.refetch();
    }
  };
  const infoQuery = {
    isLoading: infoUseQuery.isFetching,
    isError: infoUseQuery.isError,
    data: infoUseQuery.data,
    isFetched: infoUseQuery.isFetched,
  };

  return {
    infoQuery,
    handleInputValue,
    handleSearch,
    disableSearch,
    handleResearch,
  };
};

export default useSearchPizzeria;
