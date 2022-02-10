import AppError from "../../../shared/errors/AppErrors";
import ProductRepository from "../../Products/infra/typeorm/ProductRepository";
import FindIdProductService from "../../Products/services/FindIdProductService";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class CreateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();

    const produtos = new ProductRepository();

    const findProductByIdService = new FindIdProductService();

    const list = data.pedido_produtos;

    let valorProduto = 0;

    const pedidoProduto = list.map(function (item) {
      if (item.quantidade <= 0) {
        throw new AppError(
          "Quantidade inválida. Informe um valor maior que 0."
        );
      }
      return item.produto_id;
    });

    for (var i = 0; i <= pedidoProduto.length - 1; i++) {
      const item = await findProductByIdService.execute(pedidoProduto[i]);
      if (data.pedido_produtos[i].quantidade > item.quantidade) {
        throw new AppError(
          "Quantidade inválida, pois está acima da capacidade de estoque."
        );
      }

      valorProduto += data.pedido_produtos[i].quantidade * item.preco;
      data.valor = valorProduto;
    }

    if (list.length === 0) {
      throw new AppError("Por favor, insira um produto para esse pedido.");
    }

    const order = await orderRepository.create(data);

    return order;
  }
}
