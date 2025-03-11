import { Module } from '@nestjs/common';
import { TemplatesService } from '@modules/templates/templates.service';
import { TemplatesController } from '@modules/templates/templates.controller';
import { TemplatesRepository } from '@modules/templates/templates.repository';
import { TemplateEngineService } from '@modules/templates/template-engine.service';

@Module({
  providers: [TemplatesService, TemplatesRepository, TemplateEngineService],
  controllers: [TemplatesController],
  exports: [TemplatesService],
})
export class TemplatesModule {}
