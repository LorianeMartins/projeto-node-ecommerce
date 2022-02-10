import AppError from "../../../shared/errors/AppErrors";
import ClientRepository from "../infra/typeorm/ClientRepository";
import Client from "../infra/typeorm/entities/Client";

export default class ListOrderClientService {
  public async execute(id: number): Promise<Client | undefined> {
    const clientOrder = new ClientRepository();

    if (clientOrder === null) {
      throw new AppError(
        "O ID do cliente não foi encontrado/cliente não possui um pedido."
      );
    }

    const clientsOrder = await clientOrder.listOrderOfClient(id);

    return clientsOrder;
  }
}
