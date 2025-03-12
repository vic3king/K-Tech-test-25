import { Module } from '@nestjs/common';
import { TemplatesService } from '@modules/templates/templates.service';
import { TemplatesRepository } from '@modules/templates/templates.repository';
import { TemplateEngineService } from '@modules/templates/template-engine.service';

@Module({
  providers: [TemplatesService, TemplatesRepository, TemplateEngineService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
