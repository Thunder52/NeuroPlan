import { useState } from "react";
import { Stack, TextField, Typography, Box, Button } from "@mui/material";
import CustomButton from "../../component/CustomButton/CustomButton";

const PromtPage = ({ onSubmit }) => {
  const [promt, setPromt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (promt.trim() === "") return;
    onSubmit(promt);
    setPromt("");
  };

  return (
    <Stack
      id="addpromt"
      alignItems="center"
      justifyContent="center"
      mt={5}
      px={2}
      height="100vh"
    >
      <Typography color="white" fontWeight={700} fontSize={{ xs: 28, md: 44 }}>
        Add your preference here
      </Typography>

      <Box
        mt={2}
        width={{ xs: "100%", md: "80%" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack spacing={2} alignItems="flex-end">
          <TextField
            fullWidth
            multiline
            value={promt}
            placeholder="Add your prompt"
            rows={10}
            variant="outlined"
            onChange={(e) => setPromt(e.target.value)}
            sx={{
              backgroundColor: "#061C5D",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": {
                  borderColor: "#234169",
                  borderWidth: "10px",
                },
                "&:hover fieldset": {
                  borderColor: "#3f6ab7",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2", 
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "lightgray",
                opacity: 1,
              },
            }}
          />
          {/* <Button
            variant="contained"
            type="submit"
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1,
              backgroundColor:"#5EABD6"
            }}
          >
            Search
          </Button> */}
          <CustomButton />
        </Stack>
      </Box>
    </Stack>
  );
};

export default PromtPage;