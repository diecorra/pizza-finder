import { useState } from 'react';
import { selectAuthIsLogged, useAuth } from 'services/auth';

const useReviewCard = () => {
  const [isImgClicked, setIsImgClicked] = useState(false);
  const isLogged = useAuth(selectAuthIsLogged);
  const [_, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return {
    isLogged,
    isImgClicked,
    setIsImgClicked,
    handleOpen,
  };
};

export default useReviewCard;
