import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, Paper, Grid } from '@mui/material';

const Home = () => {
  const [date, setDate] = useState("");
  const [food, setFood] = useState({ name: "", calories: 0 });
  const [entries, setEntries] = useState([]);

  const handleAddFood = async () => {
    try {
      const userId = "60d0fe4f5311236168a109ca"; // Replace with a valid ObjectId string
      console.log("Adding food entry:", { userId, date, food: [food] });
      await axios.post("http://localhost:5000/api/food-entry", {
        userId,
        date,
        food: [food],
      });
      fetchEntries();
    } catch (error) {
      console.error("Error adding food entry:", error);
    }
  };

  const fetchEntries = async () => {
    try {
      const userId = "60d0fe4f5311236168a109ca"; // Replace with a valid ObjectId string
      console.log("Fetching food entries for date:", date);
      const { data } = await axios.get(
        `http://localhost:5000/api/food-entry/${date}`,
        {
          params: { userId },
        }
      );
      console.log("Fetched entries:", data);
      setEntries(data?.food || []);
    } catch (error) {
      console.error("Error fetching food entries:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Calorie Counter
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Food Name"
              value={food.name}
              onChange={(e) => setFood({ ...food, name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Calories"
              type="number"
              value={food.calories}
              onChange={(e) => setFood({ ...food, calories: +e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddFood} fullWidth>
              Add Food
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="secondary" onClick={fetchEntries} fullWidth>
              View Log
            </Button>
          </Grid>
        </Grid>
        <List style={{ marginTop: '16px' }}>
          {entries.map((entry, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${entry.name}: ${entry.calories} calories`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Home;
