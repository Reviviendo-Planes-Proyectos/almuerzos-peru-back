import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ example: 'fernando123' })
  username: string;

  @ApiProperty({ example: 'fernando@gmail.com' })
  email: string;

  @ApiProperty({ example: 'google.com' })
  providerId: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  profilePicture?: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'fehlkfnwnqodjoqjdowqjoqdwq...' })
  token: string;

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}
