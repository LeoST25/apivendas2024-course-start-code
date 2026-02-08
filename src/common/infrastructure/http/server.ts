import { app } from './app'

const port = 3333

app.listen(port, () => {
  console.log(`O Servdor está rodando na porta ${port}`)
})
