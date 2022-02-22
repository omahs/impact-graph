import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { MyContext } from '../types/MyContext';

import { pinFile } from '../middleware/pinataUtils';
import { logger } from '../utils/logger';
import { getLoggedInUser } from '../services/authorizationServices';
import { errorMessages } from '../utils/errorMessages';

@InputType()
export class FileUploadInputType {
  // Client uploads image file
  @Field(type => GraphQLUpload)
  image: FileUpload;
}

@Resolver()
export class UploadResolver {
  @Mutation(() => String, { nullable: true })
  async upload(
    @Arg('fileUpload') image: FileUpload,
    @Ctx() ctx: MyContext,
  ): Promise<String> {
    await getLoggedInUser(ctx);
    // if (!fileUpload.image) {
    //   throw Error('Upload file failed');
    // }
    // const { filename, createReadStream, encoding } = fileUpload.image;
    const { filename, createReadStream, encoding } = image;

    try {
      const response = await pinFile(createReadStream(), filename, encoding);
      return 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash;
    } catch (e) {
      logger.error('upload() error', e);
      throw Error(errorMessages.IPFS_IMAGE_UPLOAD_FAILED);
    }
  }
}
