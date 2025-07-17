import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('validation')
export class ValidationController {
  constructor(private validationService: ValidationService) {}

  @Post('projects')
  async createProject(@CurrentUser() user: any, @Body() createProjectDto: any) {
    return this.validationService.createProject(
      user.walletAddress,
      createProjectDto.projectData,
      createProjectDto.milestones,
    );
  }

  @Post('projects/:projectId/milestones/:milestoneOrder/submit')
  async submitMilestoneProof(
    @CurrentUser() user: any,
    @Param('projectId') projectId: string,
    @Param('milestoneOrder') milestoneOrder: number,
    @Body() proofData: any,
  ) {
    return this.validationService.submitMilestoneProof(
      projectId,
      +milestoneOrder,
      proofData,
      user.walletAddress,
    );
  }

  @Post('milestones/:milestoneId/validate')
  async validateMilestone(
    @CurrentUser() user: any,
    @Param('milestoneId') milestoneId: string,
    @Body() validationDto: { verdict: boolean; comment?: string },
  ) {
    return this.validationService.validateMilestone(
      milestoneId,
      user.walletAddress,
      validationDto.verdict,
      validationDto.comment,
    );
  }

  @Get('tasks')
  async getValidationTasks(@CurrentUser() user: any) {
    return this.validationService.getValidationTasks(user.walletAddress);
  }

  @Get('milestones/:milestoneId')
  async getMilestoneDetails(@Param('milestoneId') milestoneId: string) {
    return this.validationService.getMilestoneDetails(milestoneId);
  }

  @Get('projects/:projectId/status')
  async getProjectStatus(@Param('projectId') projectId: string) {
    return this.validationService.getProjectStatus(projectId);
  }
}
