import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";
import { trainingDBState } from "../../types/typeDataBase";

interface Props {
  role: string | undefined;
  passedTrainings: trainingDBState[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f9fafb",
    color: theme.palette.common.black,
    fontSize: 14,
  },
}));

export default function TrainingTable({ role, passedTrainings }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left">
              <span className="font-bold">DATE</span>
            </StyledTableCell>
            <StyledTableCell align="left">
              <span className="font-bold">TRAINING NAME</span>
            </StyledTableCell>
            <StyledTableCell align="left">
              <span className="font-bold">TYPE</span>
            </StyledTableCell>
            <StyledTableCell align="left">
              <span className="font-bold">
                {role === "student" ? "TRAINER NAME" : "STUDENT NAME"}
              </span>
            </StyledTableCell>
            <StyledTableCell align="left">
              <span className="font-bold">DURATION</span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passedTrainings.map((training, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell align="left" className="!border-b-[0px]">
                {training.startDate}
              </TableCell>
              <TableCell align="left" className="!border-b-[0px]">
                <span className="font-bold">{training.name}</span>
              </TableCell>
              <TableCell align="left" className="!border-b-[0px]">
                <span className="bg-primary-100 text-primary p-2 rounded-full">
                  {training.type}
                </span>
              </TableCell>
              <TableCell align="left" className="!border-b-[0px]">
                {role === "student"
                  ? training.trainers[0].firstName
                  : training.student.firstName}
              </TableCell>
              <TableCell align="left" className="!border-b-[0px]">
                {training.duration} d
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
