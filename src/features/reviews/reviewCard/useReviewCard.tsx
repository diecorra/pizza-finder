import { useState } from 'react';
import { selectAuthIsLogged, useAuth } from 'services/auth';

const useReviewCard = () => {
  const [isImgClicked, setIsImgClicked] = useState(false);
  const isLogged = useAuth(selectAuthIsLogged);
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen((old) => !old);

  return {
    isLogged,
    isImgClicked,
    setIsImgClicked,
    handleModal,
    open,
  };
};

export default useReviewCard;
