import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Project } from '../project/project.entity';

const ds = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/oh_dev',
  entities: [Project],
  synchronize: true
});

async function run() {
  await ds.initialize();
  for (let i = 0; i < 10; i++) {
    const p = ds.getRepository(Project).create({
      title: faker.commerce.productName(),
      excerpt: faker.commerce.productDescription()
    });
    await ds.getRepository(Project).save(p);
  }
  console.log('Seed complete');
  await ds.destroy();
}
run();
