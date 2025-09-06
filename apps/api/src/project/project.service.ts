import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private repo: Repository<Project>) {}

  findAll() {
    return this.repo.find({ order: { updatedAt: 'DESC' } });
  }

  create(data: Pick<Project, 'title' | 'excerpt'>) {
    const p = this.repo.create(data);
    return this.repo.save(p);
  }
}
