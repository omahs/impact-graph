import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx
} from 'type-graphql'

import { MyContext } from '../types/MyContext'
import { Repository, In } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from '../entities/user'
import { Project } from '../entities/project'
import { Donation } from '../entities/donation'
import { web3 } from '../utils/web3'
import { Wallet } from '../entities/wallets';

@Resolver(of => User)
export class DonationResolver {
  constructor (
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {}

  @Query(returns => [Donation], { nullable: true })
   async donations () {
    const donation = await this.donationRepository.find()
    
    return donation
  }

  @Query(returns => [Donation], { nullable: true })
  async donationsFromWallets (
    @Ctx() ctx: MyContext,
    @Arg('fromWalletAddresses', type => [String]) fromWalletAddresses: string[]) {
    
    const fromWalletAddressesArray: string[] = fromWalletAddresses.map(o => o.toLowerCase())
    
    const donations = await this.donationRepository.find({ 
      where: {
        fromWalletAddress: In(fromWalletAddressesArray )
      }
    })
    return donations
  }

  @Query(returns => [Donation], { nullable: true })
  async donationsByDonor (@Ctx() ctx: MyContext) {
    if (!ctx.req.user) throw new Error("You must be logged in in order to register project donations");
    const userId = ctx.req.user.userId
    
    const donation = await this.donationRepository.find({ 
      where: {
        user: userId
      }
    })
    
    return donation
  }

  @Mutation(returns => Boolean)
  async saveDonation (
    @Arg('transactionId') transactionId: string,
    @Ctx() ctx: MyContext,
    @Arg('anonymous') anonymous: boolean
  ): Promise<Boolean> {
    
    const txInfo = await web3.eth.getTransaction(transactionId);
    
    if (!txInfo) throw new Error("Transaction ID not found.");
    
    const destinationProject = await Project.findOne({ walletAddress: txInfo.to?.toString() || "" });
    
    let userId
    
    //Logged in
    if(ctx.req.user && ctx.req.user.userId) {    
      userId = ctx.req.user.userId
      const originUser = await User.findOne({ id: userId })
      
      //Transaction not made with the users primary wallet
      if(originUser && originUser.walletAddress !== txInfo.from) {
        const donation = await Wallet.create({
          user: originUser,
          address: txInfo.from.toLowerCase()
        })
      }
    } else {
      const originUser = await User.findOne({ walletAddress: txInfo.from })
      
      userId = originUser ? originUser.id : null
    }
    
    if(!destinationProject) throw new Error("Transaction project was not found.");
    
    const value = txInfo.value ? Number(web3.utils.fromWei(txInfo.value)) : 0 
    
    const donation = await Donation.create({
      amount: Number(value),
      currency: 'ETH', 
      userId: userId,
      project: destinationProject,
      createdAt: new Date(),
      transactionId: transactionId,
      toWalletAddress: txInfo.to?.toString().toLowerCase(),
      fromWalletAddress: txInfo.from?.toString().toLowerCase(),
      anonymous
    })
    
    donation.save()
  
    return true
  }

}