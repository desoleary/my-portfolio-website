import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { ProjectService } from './project.service'
import { Project } from './project.type'

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly service: ProjectService) {}

  @Query(() => [Project])
  projects() {
    return this.service.findAll()
  }

  @Mutation(() => Project)
  createProject(@Args('title') title: string, @Args('excerpt') excerpt: string) {
    return this.service.create({ title, excerpt })
  }
}
