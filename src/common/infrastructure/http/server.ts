import { env } from '../env'
import { app } from './app'

app.listen(env.PORT, () => {
  console.log(`O Servdor está rodando na porta ${env.PORT}`)
  console.log('API docs available at GET /docs')
})
