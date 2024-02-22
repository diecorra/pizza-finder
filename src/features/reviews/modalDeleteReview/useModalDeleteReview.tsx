import { useState } from 'react';
import { removeReview } from 'services/auth/reviews.api';

const useModalDeleteReview = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleDeleteReview = async (id: string) => {
    try {
      await removeReview(id);
    } catch (error) {
      console.log('Error on deleting review: ', error);
    }
  };

  return {
    handleDeleteReview,
    open,
    handleClose,
  };
};

export default useModalDeleteReview;
