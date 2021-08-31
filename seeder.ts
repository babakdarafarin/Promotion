import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { DiscountTypeSchema } from "./models/discount-type.model";
import { DiscountTypeSeeder } from "./db/seeders/discount-type.seeder";
import { RegionSchema } from "./models/region.model";
import { RegionSeeder } from "./db/seeders/region.seeder";
import { ContactChannelSchema } from "./models/contact-channel.model";
import { ContactChannelSeeder } from "./db/seeders/contact-channel.seeder";
import { GenderSchema } from "./models/gender.model";
import { LanguageSchema } from "./models/language.model";
import { GenderSeeder } from "./db/seeders/gender.seeder";
import { LanguageSeeder } from "./db/seeders/language.seeder";
import { VisitTypeSeeder } from "./db/seeders/visit-type.seeder";
import { VisitTypeSchema } from "./models/visit-type.model";
import { ConfigModule } from '@nestjs/config';
 
const ENV = process.argv[3] ? process.argv[3] : process.env.NODE_ENV

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `environments/.env.${ENV}`,
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{name: 'DiscountType', schema: DiscountTypeSchema}]),
    MongooseModule.forFeature([{name: 'Region', schema: RegionSchema}]),
    MongooseModule.forFeature([{name: 'ContactChannel', schema: ContactChannelSchema}]),
    MongooseModule.forFeature([{name: 'Gender', schema: GenderSchema}]),
    MongooseModule.forFeature([{name: 'Language', schema: LanguageSchema}]),
    MongooseModule.forFeature([{name: 'VisitType', schema: VisitTypeSchema}])
  ],
}).run([DiscountTypeSeeder, RegionSeeder, ContactChannelSeeder, GenderSeeder, LanguageSeeder, VisitTypeSeeder])