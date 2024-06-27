import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes , scryptSync} from 'crypto' // or can use scrypt with promisfy from util
@Injectable()
export class AuthService{
  constructor(private userService : UserService){}

  async signUp(email : string , password : string ){
    const [users] = await this.userService.find(email)
    if (users) {
      throw new BadRequestException('Ops ,, Email in use')
    }
    // Hash password
    const salt = randomBytes(8).toString('hex') // cause it returns Buffer
    const hashedPassword = await scryptSync(password , salt , 64 )
    const result = salt + '.' + hashedPassword.toString('hex')
    const user = await this.userService.createUser(email , result )
    return user
  }

  async signIn(email : string , password : string ){
    const [user] = await this.userService.find(email) // destructe
    if (!user) {
      throw new NotFoundException('user not found')
    }
    const [ salt , storedHashedPass ] = user.password.split('.') // destructe
    const passToHashed = scryptSync(password , salt , 64)
    if (storedHashedPass !== passToHashed.toString('hex') ) {
      throw new UnauthorizedException('Invalid email or password')
    }
    return user
  }
}