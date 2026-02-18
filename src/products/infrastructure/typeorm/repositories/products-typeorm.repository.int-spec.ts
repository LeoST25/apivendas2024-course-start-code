import { testDataSource } from '@/common/infrastructure/typeorm/testing/data-source'
import { ProductsTypeormRepository } from './products-typeorm.repository'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { randomUUID } from 'node:crypto'
import { ProductsDataBuilder } from '../../testing/helpers/products-data-builder'
import { Product } from '../entities/products.entity'

describe('ProductsTypeormRepository integration tests', () => {
  let ormRepository: ProductsTypeormRepository

  beforeAll(async () => {
    await testDataSource.initialize()
  })

  afterAll(async () => {
    await testDataSource.destroy()
  })

  beforeEach(async () => {
    await testDataSource.manager.query('DELETE FROM products')
    ormRepository = new ProductsTypeormRepository()
    ormRepository.productsRepository = testDataSource.getRepository('Product')
  })

  describe('findById', () => {
    it('should generate an error when product is not found', async () => {
      const id = randomUUID()
      await expect(ormRepository.findById(id)).rejects.toThrow(
        new NotFoundError(`Product not found using ID ${id}`),
      )
    })
  })

  describe('findById', () => {
    it('should finds a product by id', async () => {
      const data = ProductsDataBuilder({})
      const product = testDataSource.manager.create(Product, data)
      await testDataSource.manager.save(product)

      const result = await ormRepository.findById(product.id)
      expect(result.id).toBe(product.id)
      expect(result.name).toBe(product.name)
    })
  })
})
