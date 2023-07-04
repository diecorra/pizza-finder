import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableProps } from '../vite-env';

export default function TableData(props: TableProps) {
  const { data: results } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead className="bg-slate-100">
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>County</TableCell>
            <TableCell>Town</TableCell>
            <TableCell>Village</TableCell>
            <TableCell>Hamlet</TableCell>
            <TableCell>Highway</TableCell>
            <TableCell>PostCode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((result) => (
            <TableRow
              key={result.formatted}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                {result.components.county}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: '0.75rem' }}
              >
                {result.components.town}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: '0.75rem' }}
              >
                {result.components.village}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: '0.75rem' }}
              >
                {result.components.hamlet}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: '0.75rem' }}
              >
                {result.components.highway}
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
