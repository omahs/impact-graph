import { Reaction } from '../entities/reaction';
import { User } from '../entities/user';

export const findUsersWhoLikedProjectExcludeProjectOwner = async (
  projectId: number,
): Promise<{ walletAddress: string; email?: string }[]> => {
  return Reaction.createQueryBuilder('reaction')
    .leftJoin(User, 'user', 'reaction.userId = user.id')
    .leftJoinAndSelect('reaction.project', 'project')
    .leftJoinAndSelect(
      User,
      'projectOwner',
      'project.adminUserId = projectOwner.id',
    )
    .select(
      'LOWER(user.walletAddress) AS "walletAddress", user.email as email, projectOwner.id as ownerId',
    )
    .where(`"projectId"=:projectId`, {
      projectId,
    })
    .andWhere(`user.id != projectOwner.id`)
    .getRawMany();
};

export const findUserReactionsByProjectIds = async (
  authenticatedUserId: number,
  projectIds: number[],
) => {
  if (!authenticatedUserId) return [];

  return Reaction.createQueryBuilder('reaction')
    .where('reaction.userId = :userId', { userId: authenticatedUserId })
    .andWhere('reaction.projectId IN (:...ids)', { ids: projectIds })
    .getMany();
};
