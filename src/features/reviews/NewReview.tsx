import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import {
  Alert,
  AlertColor,
  Autocomplete,
  Button,
  Rating,
  Snackbar,
  TextField,
  Tooltip,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import LabelComponent from 'features/newpizzeria/LabelComponent';
import { Review } from 'model/review';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REVIEWS } from 'routerPath';
import { addReview } from 'services/auth/reviews.api';
import { cloudinary } from 'services/cloudinary';
import { getFullListOrWithFilterPizzerias } from 'services/pocketbase';
import { textFieldStyle } from 'utils/style';

const NewReview = () => {
  const navigate = useNavigate();
  const { openWidget } = cloudinary();
  const [pizzeriaOptions, setPizzeriaOptions] = useState<
    { id: string; label: string; value: string }[]
  >([]);
  const [formNewReview, setFormNewReview] = useState<Review>({
    user: '',
    title: '',
    description: '',
    pizzeria: '',
    img: '',
    city: '',
    rate: 1,
  });

  const isUserValid =
    formNewReview?.user?.length >= 3 && formNewReview?.user?.length <= 24;
  const isTitleValid =
    formNewReview?.title?.length >= 3 && formNewReview?.title?.length <= 24;
  const isDescriptionValid =
    formNewReview?.description?.length >= 10 &&
    formNewReview?.description?.length <= 150;
  const isRateValid = formNewReview?.rate;
  const isPizzeriaValid = formNewReview?.pizzeria?.length;

  const isValid =
    isUserValid &&
    isTitleValid &&
    isDescriptionValid &&
    isRateValid &&
    isPizzeriaValid;

  const [snackbarData, setSnackbarData] = useState<{
    color: AlertColor | undefined;
    message: string;
    open: boolean;
  }>({ color: 'error', message: '', open: false });

  const { data: pizzerias } = useQuery(
    [],
    () => getFullListOrWithFilterPizzerias('pizzerias', {}),
    { enabled: true }
  );

  const onPizzeriaChange = (
    event: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setFormNewReview({ ...formNewReview, pizzeria: value });
  };

  function uploadHandler() {
    openWidget().then((res) => {
      setFormNewReview((img) => ({ ...img, ...res }));
    });
  }

  const validForm = (review: Review) => {
    return (
      review.user.length &&
      review.title.length &&
      review.description.length &&
      review.rate &&
      review.pizzeria.length
    );
  };

  const mutationAddReview = useMutation<Review, AxiosError<any, any>, Review>(
    async (review: Review) => {
      const newReview = await addReview(review);
      navigate(`/${REVIEWS}`);
      return newReview;
    }
  );

  const handleSendReview = (review: Review) => {
    mutationAddReview.mutate(review);
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarData({
      color: 'error',
      message: '',
      open: false,
    });
  };

  const clearForm = () => {
    setFormNewReview({
      user: '',
      title: '',
      description: '',
      pizzeria: '',
      img: '',
      city: '',
      rate: 1,
    });
  };

  useEffect(() => {
    if (mutationAddReview.isError) {
      setSnackbarData({
        color: 'error',
        message: 'ERROR: Review not added!',
        open: true,
      });
      console.log(mutationAddReview.error);
    }
  }, [mutationAddReview.isError]);

  // useEffect(() => {
  //   if (mutationAddReview.isSuccess) {
  //     clearForm();
  //     setSnackbarData({
  //       color: 'success',
  //       message: 'Review added succesfully!',
  //       open: true,
  //     });
  //   }
  // }, [mutationAddReview.isSuccess]);

  useEffect(() => {
    if (pizzerias) {
      setPizzeriaOptions(
        pizzerias.map((pizzeria) => {
          return {
            id: pizzeria.id || '',
            label: `${pizzeria.name} (${pizzeria.city})`,
            value: pizzeria.name,
          };
        })
      );
    }
  }, [pizzerias]);

  return (
    <div className="flex flex-col justify-center items-center sm:w-full h-fit bg-white  rounded pb-4">
      <div className="flex justify-center items-center ">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          className="text-primary cursor-pointer"
        />
        <h2 className="rounded p-4 w-full text-slate-900 text-center">
          How was your experience?
        </h2>
      </div>
      <form className="w-full md:w-96 px-2">
        <LabelComponent label="Name">
          <TextField
            helperText={!isUserValid ? 'Fill this textfield!' : ' '}
            inputProps={{
              maxLength: 24,
            }}
            error={!isUserValid}
            value={formNewReview.user}
            placeholder="type your name"
            style={textFieldStyle}
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event) {
                setFormNewReview({
                  ...formNewReview,
                  user: event.target.value,
                });
              }
            }}
          />
        </LabelComponent>
        <LabelComponent label="Title">
          <TextField
            helperText={!isTitleValid ? 'Fill this textfield!' : ' '}
            error={!isTitleValid}
            value={formNewReview.title}
            placeholder="type title"
            style={textFieldStyle}
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event) {
                setFormNewReview({
                  ...formNewReview,
                  title: event.target.value,
                });
              }
            }}
            inputProps={{
              maxLength: 24,
            }}
          />
        </LabelComponent>
        <LabelComponent label="Description">
          <TextField
            helperText={!isDescriptionValid ? 'Fill this textfield!' : ' '}
            className={isDescriptionValid ? '' : ''}
            error={!isDescriptionValid}
            multiline
            rows={6}
            value={formNewReview.description}
            placeholder="describe your experience"
            style={textFieldStyle}
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event) {
                setFormNewReview({
                  ...formNewReview,
                  description: event.target.value,
                });
              }
            }}
            inputProps={{
              maxLength: 150,
            }}
          />
        </LabelComponent>
        <LabelComponent label="Pizzeria">
          <Autocomplete
            className="text-primary font-bold w-[100%]"
            loading={true}
            inputValue={formNewReview.pizzeria}
            onInputChange={onPizzeriaChange}
            onChange={(event: any, newValue: any | null) => {
              if (newValue) {
                setFormNewReview({
                  ...formNewReview,
                  city:
                    pizzerias?.filter(
                      (pizzeria) => pizzeria.name === newValue.value
                    )[0].city || '',
                  pizzeria: newValue.value,
                });
              }
            }}
            options={pizzeriaOptions}
            renderInput={(params) => (
              <TextField
                helperText={!isPizzeriaValid ? 'Fill this textfield!' : ' '}
                error={!isPizzeriaValid}
                placeholder="Select pizzeria"
                {...params}
                style={{
                  fontFamily: 'Belanosima',
                  fontSize: '1.125rem',
                  backgroundColor: 'white',
                }}
              />
            )}
          />
        </LabelComponent>
        <LabelComponent label="Rating">
          <Rating
            name="rate-pizzeria"
            className="w-[100%]"
            value={formNewReview.rate}
            onChange={(
              event: SyntheticEvent<Element, Event>,
              newRate: number | null
            ) => {
              if (newRate) {
                setFormNewReview({ ...formNewReview, rate: newRate });
              }
            }}
          />
        </LabelComponent>
        <div className="flex items-center justify-between w-full">
          <Button
            variant="contained"
            onClick={uploadHandler}
            className="button"
            startIcon={
              <Tooltip
                title={
                  formNewReview.img ? 'Image uploaded' : 'Image not uploaded'
                }
              >
                <CloudUploadIcon
                  style={{ color: formNewReview.img ? 'green' : 'red' }}
                />
              </Tooltip>
            }
          >
            UPLOAD IMAGE
          </Button>
          <Button
            className={
              isValid ? 'button' : 'opacity-50 pointer-events-none button'
            }
            variant="contained"
            onClick={() => handleSendReview(formNewReview)}
            startIcon={<SendIcon />}
          >
            SEND
          </Button>
        </div>
        <Snackbar
          open={snackbarData.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarData.color}
            sx={{ width: '100%' }}
          >
            {snackbarData.message}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default NewReview;
