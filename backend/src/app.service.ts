import { HttpException, HttpStatus, Injectable, StreamableFile } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { GOT } from "shared/types";
import { jwtContent } from "./auth/types";
import { UserService } from "./database/services/user.service";
import { MulterFile } from "fastify-file-interceptor";
import { createReadStream } from "fs";
import { join } from "path";


@Injectable()
export class AppService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async changeProfilImage(jwt: GOT.Token, file: MulterFile) {
		try {
			const data: jwtContent = await this.jwtService.verifyAsync(jwt);
			let user = await this.userService.findUnique(data.userId, data.userLogin);
			if (!user)
				throw new HttpException('Unauthorized User not found', HttpStatus.UNAUTHORIZED);
			user.urlImg = '/' + file.path;
			await this.userService.update(user.id, user);
			return file;
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	
	async getProfilImage(/*jwt: GOT.Token, */file: string/*, res: Response*/) {
		try {
			/*const data: jwtContent = await this.jwtService.verifyAsync(jwt);
			let user = await this.userService.findUnique(data.userId, data.userLogin);
			if (!user)
				throw new HttpException('Unauthorized User not found', HttpStatus.UNAUTHORIZED);*/
			const stream = createReadStream(join(process.cwd(), 'images/' + file));
			return new StreamableFile(stream);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
