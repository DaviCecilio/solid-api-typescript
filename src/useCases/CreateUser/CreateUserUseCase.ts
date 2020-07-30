import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

// Apply S and D : Single Responsibility Principle and Dependency Inversion Principle
export class CreateUserUseCase {
  constructor (
    // Apply L : Liskov Substitution Principle
    private userRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) { }

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error("User already exists.")
    }

    const user = new User(data)

    await this.userRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Davi Cecílio',
        email: 'davim.cecilio@gmail.com'
      },
      subject: 'Test Send Mail',
      body: "<p>Test Success</p>"
    })
  }
}
