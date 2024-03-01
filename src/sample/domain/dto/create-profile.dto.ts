import { IsDefined, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsString()
  genderId: string;

  @IsDefined()
  @IsString()
  createdBy: string;

  @IsDefined()
  @IsString()
  middleName: string;

  @IsDefined()
  @IsString()
  suffix: string;

  @IsDefined()
  @IsString()
  preferredName: string;

  @IsDefined()
  @IsString()
  preferredLastName: string;

  @IsDefined()
  @IsString()
  profilePic: string;

  @IsDefined()
  @IsString()
  profilePicThumb: string;

  @IsDefined()
  @IsString()
  profileType: string;

  @IsDefined()
  @IsString()
  profileIntroVideoUrl: string;
}
