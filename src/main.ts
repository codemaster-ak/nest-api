import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

async function main() {
    const PORT = process.env.API_PORT || 4000
    const HOST = process.env.API_HOST || '127.0.0.1'
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(PORT, () => console.log(`Starting server at http://${HOST}:${PORT}/`))
}

main().then()