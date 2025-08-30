import axios from "axios";
import Hero from "../../component/Hero/Hero";
import Navbar from "../../component/Navbar/Navbar";
import PromtPage from "../PromtPage/PromtPage";
import TimeTableSection from "../TimeTableSection/TimeTableSection";
import { useEffect, useState } from "react";
import ModalComponent from "../../component/ModalComponent/ModalComponent";
import Loading from "../../component/Loading/Loading";

const Home = () => {
  const [schedule, setSchedule] = useState([]);
  const [open,setOpen]=useState(false);
  const [editEntry,setEditEntry]=useState(null);
  const [isLoading,setLoading]=useState(false);
  const handleSubmit = async (promt) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/schedule",
        { promt: promt },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSchedule(res.data);
    } catch (error) {
      alert("error fetching data");
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

useEffect(() => {
  const fetchSchedule = async () => {
    const res = await axios.get("http://localhost:5000/api/schedule", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setSchedule(res.data || []);
  };
  fetchSchedule();
}, []);
  const handleClose=()=>{
    setOpen(false);
  }
  return (
    <div>
      <Navbar />
      <Hero />
      <PromtPage onSubmit={handleSubmit} />
      <TimeTableSection setOpen={setOpen} schedule={schedule} setEditEntry={setEditEntry} isLoading={isLoading}/>
      <ModalComponent open={open} handleClose={handleClose} entry={editEntry} setSchedule={setSchedule}/>
    </div>
  );
};

export default Home;
