import { Box, Card, CardContent, Chip, Grid, IconButton, Paper, Typography, styled } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { eachDayOfInterval, endOfMonth, getDay, startOfMonth, format} from "date-fns";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from "react";
import { es } from "date-fns/locale";
import EventList from "./EventList";
import { useDispatch } from "react-redux";
import { getOrdersByDateRange } from "../../../store/reducers/order.reducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/client.reducer";
import React from "react";

export default function Calendar(): JSX.Element {
  const dispatch = useDispatch();
  const WEEKDAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startingDayIndex, setStartingDayIndex] = useState<number>(getDay(startOfMonth(currentDate)) - 1);
  const [endDayIndex, setEndDayIndex] = useState<number>(WEEKDAYS.length - getDay(endOfMonth(currentDate)));
  const [ordersAssigned, setOrdersAssigned] = useState<Map<number, string[]>>();
  const [daysInMonth, setDaysInMonth] = useState<Date[]>(eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  }));
  const { data: orders } = useSelector((state: RootState) => state.orders);

  const Item = styled(Card)(({ theme }) => ({
    border: `2px solid ${theme.palette.background.default}`,
    position: 'relative',
    height: 150,
  }));

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
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

  useEffect(() => {
    dispatch(getOrdersByDateRange(startOfMonth(currentDate).toDateString(), endOfMonth(currentDate).toDateString()));
  }, [currentDate, dispatch]);

  useEffect(() => {
    console.log("---->", orders)
    if(orders.length > 0) {
      const ordersMap = new Map<number, string[]>();
      orders.forEach(order => {
        const day = new Date(order.startDate).getDate();
        if(!ordersMap.has(day)) {
          ordersMap.set(day, []);
        }
        ordersMap.get(day)?.push(order.worker!.username);
      });
      setOrdersAssigned(ordersMap);
      return;
    }
    setOrdersAssigned(new Map<number, string[]>());
  }, [orders]);

  // Obtiene la fecha y la hora actual en la zona horaria de México
  // const mexicoDate = format(new Date(), 'EEEE d \'de\' MMMM \'de\' yyyy', { locale: es });
  // console.log('Fecha y hora en México:', mexicoDate);

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
          {daysInMonth.map((day) => {
            return (
              <Grid item xs={12 / WEEKDAYS.length} key={day.getDate()}>
                <Item>
                  <CardContent >
                    <HtmlTooltip title={
                        <React.Fragment>
                          <Typography color="inherit"><b>Personal Asignado</b></Typography>
                          {ordersAssigned?.get(day.getDate())?.map(assigned => (<Typography>{assigned}</Typography>)) }
                        </React.Fragment>
                      }>
                      <ChipStyled label={day.getDate()} size="small" color="secondary" />
                        <Grid container justifyContent="center" alignItems="center">
                          {ordersAssigned?.has(day.getDate()) ? <EventList names={ordersAssigned.get(day.getDate()) || []}/> : null}
                        </Grid>
                    </HtmlTooltip>
                  </CardContent>
                </Item>
              </Grid>
            )
          })}
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
