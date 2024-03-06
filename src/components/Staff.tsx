import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";
import { useEffect } from "react";

export default function Staff(): JSX.Element {
  const { setTitle } = useTitleContext();
  const users = [
    {
      name: 'Arturo',
      assignment: {
        startDate: new Date()
      }
    }
  ]
  
  useEffect(() => {
    setTitle('Personal');
  }, [setTitle]);

  return (
    <Grid container>
      { users.map(user => (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body2">
            { user.assignment.startDate.toDateString() }
          </Typography>
        </CardContent>
      </Card>
      )) }
    </Grid>
  )
}