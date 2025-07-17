import { Injectable } from '@nestjs/common';
import {
  Client,
  PrivateKey,
  AccountId,
  ContractExecuteTransaction,
  ContractCallQuery,
  ContractFunctionParameters,
} from '@hashgraph/sdk';

@Injectable()
export class HederaService {
  private client: Client;
  private operatorKey: PrivateKey;
  private contractId: string;

  constructor() {
    this.operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);

    this.client = Client.forTestnet();
    this.client.setOperator(operatorId, this.operatorKey);

    this.contractId = process.env.PROJECT_REGISTRY_CONTRACT_ID!;
  }

  async createProject(
    projectId: string,
    ipfsHash: string,
    creatorWallet: string,
    milestoneCount: number,
  ) {
    const transaction = new ContractExecuteTransaction()
      .setContractId(this.contractId)
      .setGas(300000)
      .setFunction(
        'createProject',
        new ContractFunctionParameters()
          .addString(projectId)
          .addString(ipfsHash)
          .addUint256(milestoneCount),
      );

    const txResponse = await transaction.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);

    return {
      status: receipt.status.toString(),
      transactionId: txResponse.transactionId.toString(),
    };
  }

  async submitMilestoneProof(
    projectId: string,
    milestoneOrder: number,
    proofIpfsHash: string,
    submitterWallet: string,
  ) {
    const transaction = new ContractExecuteTransaction()
      .setContractId(this.contractId)
      .setGas(300000)
      .setFunction(
        'submitMilestoneProof',
        new ContractFunctionParameters()
          .addString(projectId)
          .addUint256(milestoneOrder)
          .addString(proofIpfsHash),
      );

    const txResponse = await transaction.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);

    return {
      status: receipt.status.toString(),
      transactionId: txResponse.transactionId.toString(),
    };
  }

  async validateMilestone(
    projectId: string,
    milestoneOrder: number,
    verdict: boolean,
    validatorWallet: string,
  ) {
    const transaction = new ContractExecuteTransaction()
      .setContractId(this.contractId)
      .setGas(300000)
      .setFunction(
        'validateMilestone',
        new ContractFunctionParameters()
          .addString(projectId)
          .addUint256(milestoneOrder)
          .addBool(verdict),
      );

    const txResponse = await transaction.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);

    return {
      status: receipt.status.toString(),
      transactionId: txResponse.transactionId.toString(),
    };
  }

  async getProject(projectId: string) {
    const query = new ContractCallQuery()
      .setContractId(this.contractId)
      .setGas(100000)
      .setFunction(
        'getProject',
        new ContractFunctionParameters().addString(projectId),
      );

    const result = await query.execute(this.client);
    return result;
  }

  async getMilestone(projectId: string, milestoneOrder: number) {
    const query = new ContractCallQuery()
      .setContractId(this.contractId)
      .setGas(100000)
      .setFunction(
        'getMilestone',
        new ContractFunctionParameters()
          .addString(projectId)
          .addUint256(milestoneOrder),
      );

    const result = await query.execute(this.client);
    return result;
  }
}
