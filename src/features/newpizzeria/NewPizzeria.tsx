import {
  Alert,
  AlertColor,
  Autocomplete,
  Button,
  Snackbar,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ClientResponseError } from 'pocketbase';
import React, { ChangeEvent, useEffect } from 'react';
import { Result } from '../../model/citiesProps';
import { Pizzeria } from '../../model/pizzeria';
import { fetchCities } from '../../services/fetchCities';
import { usePizzeriaService } from '../../services/pizzerias/usePizzeriasService';
import { buildCityNameFromResultComponents } from '../../shared/buildCityName';
import LabelComponent from './LabelComponent';

const NewPizzeria = () => {
  const [city, setCity] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [pizzeriaName, setPizzeriaName] = React.useState('');
  const [options, setOptions] = React.useState<string[]>(['']);
  const [snackbarData, setSnackbarData] = React.useState<{
    color: AlertColor | undefined;
    message: string;
    open: boolean;
  }>({ color: 'error', message: '', open: false });
  const { state, addPizzeria } = usePizzeriaService();
  const {
    data: citiesFound,
    isLoading,
    isError,
  } = useQuery<boolean, AxiosError<any, any>, Result[]>(
    [city],
    () => fetchCities(city),
    { enabled: city.length > 3 }
  );

  const onTextFieldChange = (e: any) => {
    if (e.target?.value) {
      setCity(e.target.value);
    }
  };

  console.log('citiesFound: ', citiesFound);

  const handleSave = (name: string, location: string, street: string) => {
    if (validForm(name, location, street) && citiesFound) {
      const pizzeriaInfo: Pizzeria = {
        name,
        street,
        city: buildCityNameFromResultComponents(citiesFound[0].components),
      };
      addPizzeria(pizzeriaInfo)
        .then((res) => {
          if (!(res instanceof ClientResponseError)) {
            setSnackbarData({
              color: 'success',
              message: 'Pizzeria added succesfully!',
              open: true,
            });
            clearForm();
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

  const validForm = (name: string, location: string, street: string) => {
    return name.length && location.length && street.length;
  };

  const clearForm = () => {
    setStreet('');
    setCity('');
    setPizzeriaName('');
    setOptions([]);
  };

  useEffect(() => {
    if (citiesFound) {
      setOptions(citiesFound.map((city) => city.formatted));
    }
  }, [citiesFound]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit gap-4 bg-white rounded pb-4">
      <h2 className="rounded p-4 w-full text-slate-900 text-center">
        Add New Pizzeria
      </h2>
      <form>
        <div className="flex flex-col items-center gap-2 w-[25rem] px-3">
          <LabelComponent label="Name">
            <TextField
              value={pizzeriaName}
              placeholder="type name.."
              style={textFieldStyle}
              fullWidth
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event) {
                  setPizzeriaName(event.target.value);
                }
              }}
            />
          </LabelComponent>
          <LabelComponent label="Location">
            <Autocomplete
              className="bg-indigo-300 font-bold w-[100%]"
              value={city}
              onChange={(event: any, newValue: string | null) => {
                if (newValue) {
                  setCity(newValue);
                }
              }}
              options={options}
              renderInput={(params) => (
                <TextField
                  value={city}
                  onChange={onTextFieldChange}
                  placeholder="type city.."
                  {...params}
                  style={textFieldStyle}
                />
              )}
            />
          </LabelComponent>
          <LabelComponent label="Street">
            <TextField
              value={street}
              placeholder="type street.."
              style={textFieldStyle}
              fullWidth
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event) {
                  setStreet(event.target.value);
                }
              }}
            />
          </LabelComponent>
          <div className="flex items-center justify-end w-full">
            <Button
              variant="contained"
              onClick={() => handleSave(pizzeriaName, city, street)}
              style={{
                ...textFieldStyle,
                backgroundColor: 'whitesmoke',
                minWidth: '130px',
                color: '#0F172A',
              }}
            >
              SAVE
            </Button>
          </div>
        </div>
      </form>
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
    </div>
  );
};

export default NewPizzeria;

const textFieldStyle = {
  fontFamily: 'Belanosima',
  fontSize: '1.125rem',
  backgroundColor: 'white',
};
