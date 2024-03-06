import { Box, Card, CardContent, Chip, Grid, IconButton, Paper, Typography, styled } from "@mui/material";
import { eachDayOfInterval, endOfMonth, getDay, startOfMonth, format} from "date-fns";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from "react";
import { es } from "date-fns/locale";
import EventList from "./EventList";

export default function Calendar(): JSX.Element {
  const WEEKDAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startingDayIndex, setStartingDayIndex] = useState<number>(getDay(startOfMonth(currentDate)) - 1);
  const [endDayIndex, setEndDayIndex] = useState<number>(WEEKDAYS.length - getDay(endOfMonth(currentDate)));
  const [daysInMonth, setDaysInMonth] = useState<Date[]>(eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  }));

  const Item = styled(Card)(({ theme }) => ({
    border: `2px solid ${theme.palette.background.default}`,
    position: 'relative',
    height: 150,
  }));

  const PaperStyled = styled(Paper)(({ theme }) => ({
    border: `2px solid ${theme.palette.background.default}`,
  }));

  const ChipStyled = styled(Chip)(({ theme }) => ({
    marginTop: -20,
    position: 'relative',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  }));

  const onNextMonth = () => {
    const currentMonth = currentDate.getMonth() + 1;
    if (currentMonth === 12) {
      setCurrentDate(new Date(`01/01/${currentDate.getFullYear() + 1}`));
      return;
    }
    setCurrentDate(new Date(`${currentMonth + 1}/01/${currentDate.getFullYear()}`));
  }

  const onPrevMonth = () => {
    const currentMonth = currentDate.getMonth() + 1;
    if (currentMonth === 1) {
      setCurrentDate(new Date(`12/01/${currentDate.getFullYear() - 1}`));
      return;
    }
    setCurrentDate(new Date(`${currentMonth - 1}/01/${currentDate.getFullYear()}`));
  }

  useEffect(() => {
    setStartingDayIndex(getDay(startOfMonth(currentDate)) - 1);
    setEndDayIndex(7 - getDay(endOfMonth(currentDate)));
    setDaysInMonth(eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    }))
  }, [currentDate]);

  // Obtiene la fecha y la hora actual en la zona horaria de México
  const mexicoDate = format(new Date(), 'EEEE d \'de\' MMMM \'de\' yyyy', { locale: es });
  console.log('Fecha y hora en México:', mexicoDate);

  return (
    <Box paddingBottom={2}>
      <Box sx={{ flexGrow: 1, textAlign: 'center', mb: 1, mt: -3 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item>
            <IconButton aria-label="delete" size="small" onClick={onPrevMonth}>
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h5"> {format(currentDate, 'MMMM yyyy', { locale: es })} </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="delete" size="small" onClick={onNextMonth}>
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {WEEKDAYS.map(weekday => (
            <Grid item xs={12 / WEEKDAYS.length} key={weekday}>
              <PaperStyled sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 17 }}>
                  {weekday}
                </Typography>
              </PaperStyled>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={2}>
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <Grid item xs={12 / WEEKDAYS.length} key={`empty-${index}`}>
              <Item>
                <CardContent>
                  <ChipStyled label={index + 1} size="small" />
                </CardContent>
              </Item>
            </Grid>
          ))}
          {daysInMonth.map((day) => (
            <Grid item xs={12 / WEEKDAYS.length} key={day.getDate()}>
              <Item>
                <CardContent >
                  <ChipStyled label={day.getDate()} size="small" color="secondary" />
                  <Grid container justifyContent="center" alignItems="center">
                    {day.getDate() % 3 === 0 ? <EventList /> : null}
                  </Grid>
                </CardContent>
              </Item>
            </Grid>
          ))}
          {Array.from({ length: endDayIndex === 7 ? 0 : endDayIndex }).map((_, index) => (
            <Grid item xs={12 / WEEKDAYS.length} key={`rest-${index}`}>
            <Item>
              <CardContent>
                <ChipStyled label={index + 1} size="small" />
              </CardContent>
            </Item>
          </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
