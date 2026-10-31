
import {
  getAllProgrammes,
  getProgrammeById,
  createProgramme,
  updateProgramme,
  deleteProgramme,
} from "../services/programme.service.js";

// GET all published programmes.
export async function getProgrammes(req, res, next) {
  try {
    const programmes = await getAllProgrammes();

    return res.status(200).json({
      success: true,
      count: programmes.length,
      data: { programmes },
    });
  } catch (error) {
    next(error);
  }
}

// GET one published programme.
export async function getProgramme(req, res, next) {
  try {
    const programme = await getProgrammeById(req.params.id);

    if (!programme) {
      return res.status(404).json({
        success: false,
        message: "Programme not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: { programme },
    });
  } catch (error) {
    next(error);
  }
}

// POST create a programme.
export async function createNewProgramme(req, res, next) {
  try {
    const programme = await createProgramme(req.body);

    return res.status(201).json({
      success: true,
      message: "Programme created successfully.",
      data: { programme },
    });
  } catch (error) {
    next(error);
  }
}

// PATCH update a programme.
export async function editProgramme(req, res, next) {
  try {
    const programme = await updateProgramme(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Programme updated successfully.",
      data: { programme },
    });
  } catch (error) {
    next(error);
  }
}

// DELETE a programme.
export async function removeProgramme(req, res, next) {
  try {
    await deleteProgramme(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Programme deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
