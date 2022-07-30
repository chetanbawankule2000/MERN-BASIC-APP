import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutsForm from "../components/WorkoutsForm";
// import { useWorkoutsContext } from "../Hooks/useWorkoutContext";
import { useWorkoutsContext } from "../context/WorkoutsContext";
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  //   const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const json = await response.json();
      console.log("the response is ", json);

      if (response.ok) {
        // setWorkouts(json);
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutsForm />
    </div>
  );
};

export default Home;
