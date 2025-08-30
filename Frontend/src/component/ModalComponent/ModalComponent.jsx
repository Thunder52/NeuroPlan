import {
  Modal,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "#061C5D",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

const ModalComponent = ({ open, handleClose, entry,setSchedule }) => {
  const [time, setTime] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    if (entry) {
      setTask(entry.task);
      setTime(entry.time);
    } else {
      setTask("");
      setTime("");
    }
  }, [entry]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/editSchedule",
        { id: entry._id, time: time, task: task},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSchedule(res.data);
      handleClose();
    } catch (error) {
      alert("error getting data");
      console.log(error);
      handleClose();
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems={"center"}>
            <Typography fontWeight={500} fontSize={30}>
              Change details to change
            </Typography>
            <TextField
              fullWidth
              value={time}
              label="Time"
              onChange={(e) => setTime(e.target.value)}
              sx={{
                backgroundColor: "white",
              }}
            />
            <TextField
              fullWidth
              value={task}
              label="Task"
              onChange={(e) => setTask(e.target.value)}
              sx={{
                backgroundColor: "white",
              }}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
