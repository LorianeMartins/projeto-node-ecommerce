import { Request, Response } from "express";
import CreateCategoryService from "../../../services/CreateCategoryService";
import DeleteCategoryService from "../../../services/DeleteCategoryService";
import FindIdCategoryService from "../../../services/FindIDCategoryService";
import ListCategoryService from "../../../services/ListCategoryService";
import UpdateCategoryService from "../../../services/UpdateCategoryService";

class CategoryController {
  async create(request: Request, response: Response) {
    const data = request.body;
    const createCategoryService = new CreateCategoryService();
    const category = await createCategoryService.execute(data);
    return response.json(category);
  }

  async list(request: Request, response: Response) {
    const listCategoryService = new ListCategoryService();
    const category = await listCategoryService.execute();
    return response.json(category);
  }

  async findId(request: Request, response: Response) {
    const { id } = request.params;
    const findIdCategoryService = new FindIdCategoryService();
    const findCategory = await findIdCategoryService.execute(parseInt(id));
    return response.json(findCategory);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const deleteCategoryService = new DeleteCategoryService();
    const deleteCategory = await deleteCategoryService.execute(Number(id));
    return response.json(deleteCategory);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;
    const updateCategoryService = new UpdateCategoryService();
    const data_to_update = {
      ...data,
      id: Number(id),
    };
    const category = await updateCategoryService.execute(data_to_update);
    return response.json(category);
  }
}

export default new CategoryController();
