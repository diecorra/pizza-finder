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
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import LabelComponent from 'features/newpizzeria/LabelComponent';
import { DataApiCity } from 'model/citiesProps';
import { Review } from 'model/review';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addReview } from 'services/auth/reviews.api';
import { fetchCities } from 'services/fetchCities';
import { getFullListOrWithFilterPizzerias } from 'services/pocketbase';
import { buildCityNameFromResultComponents } from 'utils/buildCityName';
import { buttonStyle, textFieldStyle } from 'utils/style';
import { useCloudinary } from './useCloudinary';

const NewReview = () => {
  const navigate = useNavigate();
  const { openWidget } = useCloudinary();
  const [citySelect, setCitySelect] = useState('');
  const [cityOptions, setCityOptions] = useState<any>([]);
  const [pizzeriaOptions, setPizzeriaOptions] = useState<string[]>([]);
  const [formNewReview, setFormNewReview] = useState<Review>({
    user: '',
    title: '',
    description: '',
    pizzeria: '',
    img: '',
    city: '',
    rate: 1,
  });
  const [snackbarData, setSnackbarData] = React.useState<{
    color: AlertColor | undefined;
    message: string;
    open: boolean;
  }>({ color: 'error', message: '', open: false });

  const {
    data: citiesFound,
    isLoading,
    isError,
  } = useQuery<boolean, AxiosError<any, any>, DataApiCity[]>(
    [formNewReview.city],
    () => fetchCities(formNewReview.city),
    { enabled: formNewReview.city.length > 3 }
  );

  const { data: pizzerias } = useQuery(
    [citySelect],
    () =>
      getFullListOrWithFilterPizzerias('pizzerias', {
        filter: citySelect ? `city = "${citySelect}"` : '',
      }),
    { enabled: !!citySelect }
  );

  const onCityChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setFormNewReview({ ...formNewReview, city: value });
  };

  const onPizzeriaChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    formNewReview.city
      ? setFormNewReview({ ...formNewReview, pizzeria: value })
      : setFormNewReview({ ...formNewReview, pizzeria: '' });
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
      review.city.length &&
      review.pizzeria.length
    );
  };

  const mutationAddReview = useMutation<Review, AxiosError<any, any>, Review>(
    (review: Review) => addReview(review)
  );

  const handleSendReview = (review: Review) => {
    if (validForm(review)) {
      mutationAddReview.mutate(review);
    } else {
      setSnackbarData({
        color: 'error',
        message: 'ERROR: fill in the missing fields!',
        open: true,
      });
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
    //setOptionLocation([]);
  };

  useEffect(() => {
    if (mutationAddReview.isSuccess) {
      clearForm();
      setSnackbarData({
        color: 'success',
        message: 'Review added succesfully!',
        open: true,
      });
    }
  }, [mutationAddReview.isSuccess]);

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

  useEffect(() => {
    if (citiesFound) {
      setCityOptions(citiesFound.map((city) => city.formatted));
    }
  }, [citiesFound]);

  useEffect(() => {
    if (pizzerias) {
      setPizzeriaOptions(pizzerias.map((pizzeria) => pizzeria.name));
    }
  }, [pizzerias]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit bg-white rounded pb-4">
      <div className="flex justify-center items-center ">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          className="text-primary cursor-pointer"
        />
        <h2 className="rounded p-4 w-full text-slate-900 text-center">
          How was your experience?
        </h2>
      </div>
      <form className="w-full md:w-auto px-2">
        <LabelComponent label="Name">
          <TextField
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
          />
        </LabelComponent>
        <LabelComponent label="Description">
          <TextField
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
          />
        </LabelComponent>
        <LabelComponent label="City">
          <Autocomplete
            className="text-primary font-bold w-[100%]"
            inputValue={formNewReview.city}
            onInputChange={onCityChange}
            onChange={(event: any, newValue: string | null) => {
              if (newValue && citiesFound) {
                setFormNewReview({ ...formNewReview, city: newValue });
                const cityFound = citiesFound?.find(
                  (city) => city.formatted === newValue
                );
                cityFound &&
                  setCitySelect(
                    buildCityNameFromResultComponents(cityFound.components)
                  );
              }
              if (!newValue) {
                setFormNewReview({ ...formNewReview, pizzeria: '' });
                setPizzeriaOptions([]);
              }
            }}
            options={cityOptions}
            renderInput={(params) => (
              <TextField
                placeholder="Select city"
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
        <LabelComponent label="Pizzeria">
          <Autocomplete
            className="text-primary font-bold w-[100%]"
            inputValue={formNewReview.pizzeria}
            onInputChange={onPizzeriaChange}
            onChange={(event: any, newValue: string | null) => {
              if (newValue) {
                setFormNewReview({ ...formNewReview, pizzeria: newValue });
              }
            }}
            options={pizzeriaOptions}
            renderInput={(params) => (
              <TextField
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
            style={buttonStyle}
            startIcon={<CloudUploadIcon />}
          >
            UPLOAD IMAGE
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSendReview(formNewReview)}
            style={buttonStyle}
            startIcon={<SendIcon />}
          >
            SEND REVIEW
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
