import {
  Alert,
  AlertColor,
  Autocomplete,
  Button,
  Rating,
  Snackbar,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ClientResponseError } from 'pocketbase';
import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from '../../model/citiesProps';
import { Review } from '../../model/review';
import { fetchCities } from '../../services/fetchCities';
import { getFullListOrWithFilterPizzerias } from '../../services/pocketbase';
import { useReviewService } from '../../services/reviews/useReviewsService';
import { buildCityNameFromResultComponents } from '../../shared/buildCityName';
import LabelComponent from '../newpizzeria/LabelComponent';

const NewReview = () => {
  const navigate = useNavigate();
  const [rate, setRate] = React.useState<number>(4);
  const [city, setCity] = React.useState('');
  const [citySelect, setCitySelect] = React.useState('');
  const [cityOptions, setCityOptions] = React.useState<any>([
    { label: 'prova', value: '' },
  ]);
  const [pizzeriaOptions, setPizzeriaOptions] = React.useState<string[]>([]);
  const [name, setName] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [pizzeria, setPizzeria] = React.useState<string>('');
  const [img, setImg] = React.useState<string>('');
  const { state, addReview } = useReviewService();
  const [snackbarData, setSnackbarData] = React.useState<{
    color: AlertColor | undefined;
    message: string;
    open: boolean;
  }>({ color: 'error', message: '', open: false });

  const {
    data: citiesFound,
    isLoading,
    isError,
  } = useQuery<boolean, AxiosError<any, any>, Result[]>(
    [city],
    () => fetchCities(city),
    { enabled: city.length > 3 }
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
    setCity(value);
  };

  const onPizzeriaChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    city ? setPizzeria(value) : setPizzeria('');
  };

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

  const handleSendReview = (review: Review) => {
    if (validForm(review)) {
      console.log(review);
      addReview(review)
        .then((res) => {
          if (!(res instanceof ClientResponseError)) {
            setSnackbarData({
              color: 'success',
              message: 'Pizzeria added succesfully!',
              open: true,
            });
            navigate('/home');
          }
        })
        .catch((err) => {
          setSnackbarData({
            color: 'error',
            message: 'ERROR: Pizzeria not added!',
            open: true,
          });
          console.log(err);
        });
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
      <h2 className="rounded p-4 w-full text-slate-900 text-center">
        How was your experience?
      </h2>
      <form className="w-80">
        <LabelComponent label="Name">
          <TextField
            value={name}
            placeholder="type your name"
            style={textFieldStyle}
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event) {
                setName(event.target.value);
              }
            }}
          />
        </LabelComponent>
        <LabelComponent label="Title">
          <TextField
            value={title}
            placeholder="type title"
            style={textFieldStyle}
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event) {
                setTitle(event.target.value);
              }
            }}
          />
        </LabelComponent>
        <LabelComponent label="Description">
          <TextField
            multiline
            rows={6}
            value={description}
            placeholder="describe your experience"
            style={textFieldStyle}
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event) {
                setDescription(event.target.value);
              }
            }}
          />
        </LabelComponent>
        <LabelComponent label="City">
          <Autocomplete
            className="text-primary font-bold w-[100%]"
            inputValue={city}
            onInputChange={onCityChange}
            onChange={(event: any, newValue: string | null) => {
              if (newValue && citiesFound) {
                setCity(newValue);
                const cityFound = citiesFound?.find(
                  (city) => city.formatted === newValue
                );
                cityFound &&
                  setCitySelect(
                    buildCityNameFromResultComponents(cityFound.components)
                  );
              }
              if (!newValue) {
                setPizzeria('');
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
            inputValue={pizzeria}
            onInputChange={onPizzeriaChange}
            onChange={(event: any, newValue: string | null) => {
              if (newValue) {
                setPizzeria(newValue);
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
            value={rate}
            onChange={(
              event: SyntheticEvent<Element, Event>,
              newRate: number | null
            ) => {
              if (newRate) {
                setRate(newRate);
              }
            }}
          />
        </LabelComponent>
        <div className="flex items-center justify-end w-full">
          <Button
            variant="contained"
            onClick={() =>
              handleSendReview({
                user: name,
                title,
                description,
                img,
                rate,
                city: citySelect,
                pizzeria,
              })
            }
            style={{
              ...textFieldStyle,
              backgroundColor: 'whitesmoke',
              minWidth: '130px',
              color: '#0F172A',
            }}
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

const textFieldStyle = {
  fontFamily: 'Belanosima',
  fontSize: '1.125rem',
  backgroundColor: 'white',
};
