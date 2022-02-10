import AppError from "../../../shared/errors/AppErrors";
import ICategoryDTO from "../dtos/ICategoryDTO";
import Category from "../infra/typeorm/entities/Category";
import CategoryRepository from "../infra/typeorm/repositories/CategoryRepository";
import FindIDCategoryService from "./FindIDCategoryService";

export default class UpdateCategoryService {
  public async execute(data: ICategoryDTO): Promise<Category> {
    const categoryRepository = new CategoryRepository();

    const findCategoryById = new FindIDCategoryService();

    if (!data.id) {
      throw new AppError("O ID não é válido.");
    }

    await findCategoryById.execute(data.id);

    const category = await categoryRepository.update(data);

    return category;
  }
}
