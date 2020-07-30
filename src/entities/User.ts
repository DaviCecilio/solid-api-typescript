// O uso do Uuid foi usado para não criar uma dependência de criação de ID para o BD
import { uuid } from 'uuidv4'

export class User {
  // Acessível somente para leitura
  public readonly id: string

  public name: string
  public email: string
  public password: string

  // Utilizado o Omit para omitir o ID no retorno
  constructor (props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid();
    }
  }
}