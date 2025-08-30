import { Box, Button, Stack, Typography } from "@mui/material";
import Loading from "../../component/Loading/Loading";

const TimeTableSection = ({ schedule, setOpen, setEditEntry, isLoading }) => {
  return (
    isLoading ? (
      <Stack justifyContent={'center'} alignItems={'center'}><Loading /></Stack>
      
    ) : (
      <Stack
        id="plans"
        mb={2}
        p={2}
        alignItems={"center"}
        spacing={2}
        color={"white"}
      >
        <Typography fontWeight={700} fontSize={44}>
          Your Schedule
        </Typography>
        <Stack spacing={3}>
          {schedule.map((item, index) => (
            <Stack
              key={index}
              direction={"row"}
              spacing={5}
              alignItems={"center"}
            >
              <Box bgcolor={"#093FB4"} p={2} height={50} width={200}>
                <Typography>{item.time}</Typography>
              </Box>
              <Box p={2} bgcolor={"#093FB4"} height={50} width={800} >
                <Typography>{item.task}</Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => {
                  setEditEntry(item);
                  setOpen(true);
                }}
              >
                Edit
              </Button>
            </Stack>
          ))}
        </Stack>

        {schedule.length===0 && (
            <Box bgcolor={'white'} p={2} >
                <Typography color="black" fontWeight={600} fontSize={44}>No plans available please add preferences and generate plan ...</Typography>
            </Box>
        )}
      </Stack>
    )
  );
};

export default TimeTableSection;