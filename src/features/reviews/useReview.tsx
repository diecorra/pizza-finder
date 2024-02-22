import { useQuery } from '@tanstack/react-query';
import { getFullListOrWithFilterPocketBase } from 'services/pocketbase';

const useReview = ({ id }: { id: string | undefined }) => {
  const infoUseQuery = useQuery([id], () =>
    getFullListOrWithFilterPocketBase('reviews', {
      filter: id ? `city = "${id}"` : '',
      sort: '-created',
    })
  );
  return { infoQuery: infoUseQuery };
};

export default useReview;
