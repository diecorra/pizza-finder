export const textFieldStyle = {
  fontFamily: 'Belanosima',
  fontSize: '0.9rem',
  backgroundColor: 'white',
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
