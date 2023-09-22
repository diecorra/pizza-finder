import { TableFooter } from '@mui/material';
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

export default function TableData({ data: results }: { data?: DataApiCity[] }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} className="mb-10">
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead className="bg-slate-100">
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell>PostCode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((result) => (
            <TableRow
              key={result.formatted}
              className="hover:bg-yellow-100 cursor-pointer"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                style={{ fontSize: '0.75rem' }}
              >
                {result.components.country}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: '0.75rem' }}
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
                style={{ fontSize: '0.75rem' }}
              >
                {result.components.postcode}
              </TableCell>
            </TableRow>
          ))}
          <TableFooter>
            <TableRow>
              <TableCell
                component="footer"
                align="right"
                className="!text-primary text-2xl"
              >
                Results found: <b>{results?.length}</b>
              </TableCell>
            </TableRow>
          </TableFooter>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
