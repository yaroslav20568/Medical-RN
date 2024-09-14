import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { TypeModule } from './type/type.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeUserModule } from './type-user/type-user.module';
import { LibraryArticleModule } from './library-article/library-article.module';
import { ArticleItemModule } from './library-item/library-item.module';
import { DialogModule } from './dialog/dialog.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { HotlineModule } from './hotline/hotline.module';
import { QuestionModule } from './question/question.module';
import { QuestionAnswerModule } from './question-answer/question-answer.module';
import { QuestionResultModule } from './question-result/question-result.module';
import { HelpAbroadModule } from './help-abroad/help-abroad.module';

@Module({
  imports: [
		ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    LaboratoryModule,
    TypeModule,
    CountryModule,
    CityModule,
    UserModule,
    AuthModule,
    TypeUserModule,
    LibraryArticleModule,
    ArticleItemModule,
    DialogModule,
    MessageModule,
		ChatModule,
		HotlineModule,
		QuestionModule,
		QuestionAnswerModule,
		QuestionResultModule,
		HelpAbroadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
