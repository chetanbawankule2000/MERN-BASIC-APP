const express = require("express");
const Workout = require("../models/workoutModel");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

//GET all workoute
router.get("/", getWorkouts);

// Single workout
router.get("/:id", getWorkout);

//Post new workout
router.post("/", createWorkout);

// Delete workout
router.delete("/:id", deleteWorkout);

//UPDATE workout
router.patch("/:id", updateWorkout);

module.exports = router;
