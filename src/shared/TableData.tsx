import { TableFooter, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataApiCity } from 'model/citiesProps';
import { useNavigate } from 'react-router-dom';
import { buildCityNameFromResultComponents } from 'utils/buildCityName';
import {
  tableFooterStyle,
  tableTextFieldStyle,
  textFieldStyle,
} from 'utils/style';

export default function TableData({ data: results }: { data?: DataApiCity[] }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} className="h-auto w-80 max-w-2xl">
      <Table aria-label="simple table" stickyHeader>
        <TableHead className="bg-slate-100">
          <TableRow>
            <TableCell
              style={{ ...textFieldStyle, backgroundColor: 'whitesmoke' }}
            >
              Country
            </TableCell>
            <TableCell
              style={{ ...textFieldStyle, backgroundColor: 'whitesmoke' }}
            >
              City
            </TableCell>
            <TableCell
              style={{
                ...textFieldStyle,
                backgroundColor: 'whitesmoke',
              }}
            >
              PostCode
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((result) => (
            <TableRow
              key={result.formatted}
              className="cursor-pointer hover:bg-amber-100"
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              onClick={() =>
                navigate(
                  `/reviews/${buildCityNameFromResultComponents(
                    result.components
                  ).replace(/^_/, '')}`
                )
              }
            >
              <TableCell
                component="th"
                scope="row"
                style={{ ...tableTextFieldStyle }}
              >
                {result.components.country}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ ...tableTextFieldStyle }}
              >
                {[
                  result.components.county,
                  result.components.city,
                  result.components.town,
                  result.components.village,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ ...tableTextFieldStyle }}
              >
                {result.components.postcode}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-slate-50">
            <TableCell sx={{ ...tableFooterStyle }}>
              <Typography className="!text-sm" variant="body2" color={'black'}>
                Results: <b>{results?.length}</b>
              </Typography>
            </TableCell>
            <TableCell sx={{ ...tableFooterStyle }} />
            <TableCell sx={{ ...tableFooterStyle }} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
