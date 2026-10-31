
import {
  registerForEvent,
  getUserRegistrations,
  cancelEventRegistration,
  getEventRegistrations,
} from "../services/eventRegistration.service.js";

// Register the logged-in user for an event.
export async function createEventRegistration(req, res, next) {
  try {
    const registration = await registerForEvent(
      req.user.id,
      req.body.eventId
    );

    res.status(201).json({
      success: true,
      message: "Event registration successful.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
}

// Get the logged-in user's registrations.
export async function getMyEventRegistrations(req, res, next) {
  try {
    const registrations = await getUserRegistrations(req.user.id);

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
}

// Cancel a registration.
export async function cancelMyEventRegistration(req, res, next) {
  try {
    const registration = await cancelEventRegistration(
      req.user.id,
      req.params.registrationId
    );

    res.status(200).json({
      success: true,
      message: "Event registration cancelled successfully.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
}

// Admin: View registrations for an event.
export async function getRegistrationsForEvent(req, res, next) {
  try {
    const registrations = await getEventRegistrations(req.params.eventId);

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
}
