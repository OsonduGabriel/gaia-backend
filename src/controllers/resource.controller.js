
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from "../services/resource.service.js";

// GET all published resources.
export async function getResources(req, res, next) {
  try {
    const resources = await getAllResources();

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    next(error);
  }
}

// GET one published resource.
export async function getResource(req, res, next) {
  try {
    const resource = await getResourceById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    next(error);
  }
}

// CREATE a resource.
export async function createNewResource(req, res, next) {
  try {
    const resource = await createResource(req.body);

    res.status(201).json({
      success: true,
      message: "Resource created successfully.",
      data: resource,
    });
  } catch (error) {
    next(error);
  }
}

// UPDATE a resource.
export async function editResource(req, res, next) {
  try {
    const resource = await updateResource(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Resource updated successfully.",
      data: resource,
    });
  } catch (error) {
    next(error);
  }
}

// DELETE a resource.
export async function removeResource(req, res, next) {
  try {
    await deleteResource(req.params.id);

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
