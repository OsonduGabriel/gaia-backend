
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/event.service.js";

// GET all published events.
export async function getEvents(req, res, next) {
  try {
    const events = await getAllEvents();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
}

// GET one published event.
export async function getEvent(req, res, next) {
  try {
    const event = await getEventById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

// CREATE an event.
export async function createNewEvent(req, res, next) {
  try {
    const event = await createEvent(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

// UPDATE an event.
export async function editEvent(req, res, next) {
  try {
    const event = await updateEvent(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

// DELETE an event.
export async function removeEvent(req, res, next) {
  try {
    await deleteEvent(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
