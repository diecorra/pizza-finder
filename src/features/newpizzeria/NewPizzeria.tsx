import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  Alert,
  AlertColor,
  Autocomplete,
  Button,
  Snackbar,
  TextField,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DataApiCity } from 'model/citiesProps';
import { Pizzeria } from 'model/pizzeria';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { addPizzeria } from 'services/auth/pizzerias.api';
import { fetchCities } from 'services/fetchCities';
import { buildCityNameFromResultComponents } from 'utils/buildCityName';
import { buttonStyle, textFieldStyle } from 'utils/style';
import LabelComponent from './LabelComponent';

const NewPizzeria = () => {
  const [formNewPizzeria, setFormNewPizzeria] = useState<any>({
    city: '',
    street: '',
    pizzeriaName: '',
  });
  const [optionLocation, setOptionLocation] = useState<string[]>([]);
  const [snackbarData, setSnackbarData] = useState<{
    color: AlertColor | undefined;
    message: string;
    open: boolean;
  }>({ color: 'error', message: '', open: false });

  const {
    data: citiesFound,
    isLoading,
    isFetching,
    isError,
  } = useQuery<boolean, AxiosError<any, any>, DataApiCity[]>(
    [formNewPizzeria.city],
    () => fetchCities(formNewPizzeria.city)
  );

  const mutationAddPizzeria = useMutation<
    Pizzeria,
    AxiosError<any, any>,
    Pizzeria
  >((pizzeriaInfo: Pizzeria) => addPizzeria(pizzeriaInfo));

  const onTextFieldChange = (e: any) => {
    if (e.target?.value) {
      setFormNewPizzeria({ ...formNewPizzeria, city: e.target.value });
    }
  };

  const handleSave = (pizzeria: Pizzeria) => {
    if (
      validForm(pizzeria?.name, pizzeria?.city, pizzeria?.street) &&
      citiesFound
    ) {
      pizzeria.city = buildCityNameFromResultComponents(
        citiesFound[0].components
      );
      mutationAddPizzeria.mutate(pizzeria);
    } else {
      setSnackbarData({
        color: 'error',
        message: 'ERROR: fill in the missing fields!',
        open: true,
      });
    }
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

  const validForm = (name: string, location: string, street: string) => {
    return name?.length && location?.length && street?.length;
  };

  useEffect(() => {
    if (citiesFound) {
      setOptionLocation(citiesFound.map((city) => city.formatted));
    }
  }, [citiesFound]);

  useEffect(() => {
    if (mutationAddPizzeria.isSuccess) {
      clearForm();
      setSnackbarData({
        color: 'success',
        message: 'Pizzeria added succesfully!',
        open: true,
      });
    }
  }, [mutationAddPizzeria.isSuccess]);

  useEffect(() => {
    if (mutationAddPizzeria.isError) {
      setSnackbarData({
        color: 'error',
        message: 'ERROR: Pizzeria not added!',
        open: true,
      });
      console.log(mutationAddPizzeria.error);
    }
  }, [mutationAddPizzeria.isError]);

  const clearForm = () => {
    setFormNewPizzeria({ city: '', street: '', pizzeriaName: '' });
    setOptionLocation([]);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.name) {
      setFormNewPizzeria((old: any) => ({
        ...old,
        [event.target.name]: event.target.value,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto h-fit gap-4 p-8 bg-white rounded">
      <h2 className="rounded p-4 w-full text-slate-900 text-center">
        Add New Pizzeria
      </h2>
      <form>
        <div className="flex flex-col items-center gap-2  px-3">
          <LabelComponent label="Name">
            <TextField
              value={formNewPizzeria.pizzeriaName}
              name="pizzeriaName"
              placeholder="type name.."
              style={textFieldStyle}
              fullWidth
              onChange={handleOnChange}
            />
          </LabelComponent>
          <LabelComponent label="Location">
            <Autocomplete
              className="bg-indigo-300 font-bold w-full"
              value={formNewPizzeria.city}
              onChange={(event: any, newValue: string | null) => {
                if (newValue) {
                  setFormNewPizzeria((old: any) => ({
                    ...old,
                    city: newValue,
                  }));
                }
              }}
              options={optionLocation}
              renderInput={(params) => (
                <TextField
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
              value={formNewPizzeria.street}
              placeholder="type street.."
              name="street"
              style={textFieldStyle}
              fullWidth
              onChange={handleOnChange}
            />
          </LabelComponent>
          <div className="flex items-center justify-end w-full">
            <Button
              variant="contained"
              onClick={() => handleSave(formNewPizzeria)}
              style={buttonStyle}
              startIcon={<AddBoxIcon />}
            >
              ADD
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
