import { env } from '../env'
import { dataSource } from '../typeorm'
import { app } from './app'

dataSource
  .initialize()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`O Servdor está rodando na porta ${env.PORT}`)
      console.log('API docs available at GET /docs')
    })
  })
  .catch(error => {
    console.error('Erro ao inicializar data source:', error)
  })
