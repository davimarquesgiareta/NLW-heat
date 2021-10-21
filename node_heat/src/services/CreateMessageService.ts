import prismaClient  from "../prisma"
import { io } from "../app"

//gravar mensagem no banco de dados
class CreateMessageService {
    async execute (text: string, user_Id: string){

        const message = await prismaClient.message.create({
            data: {
                text,
                user_Id
            },
            include:{
                user: true
            }
        })

        const infoWS = {
            text: message.text,
            user_id: message.user_Id,
            createad_at: message.created_at,
            user:{
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        }

        io.emit("new_message", infoWS)

        return message;

    }
}

export { CreateMessageService }