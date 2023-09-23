export const textFieldStyle = {
  fontFamily: 'Belanosima',
  fontSize: '1rem',
  backgroundColor: 'white',
};

export const tableTextFieldStyle = {
  fontFamily: 'Belanosima',
  fontSize: '0.9rem',
  //backgroundColor: 'white',
  fontWeight: 'normal',
};

export const tableFooterStyle = {
  borderBottom: 'none',
  left: 0,
  bottom: 0,
  position: 'sticky',
};

export const hoverButtonColor = {
  '&:hover': {
    backgroundColor: 'whitesmoke',
  },
};

export const buttonStyle = {
  ...textFieldStyle,
  ...hoverButtonColor,
  backgroundColor: 'white',
  minWidth: '130px',
  color: '#0F172A',
};
