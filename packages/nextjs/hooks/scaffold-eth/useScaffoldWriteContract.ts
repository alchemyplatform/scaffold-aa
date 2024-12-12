import { useState } from "react";
import { useSmartAccount } from "../useSmartAccount";
import { useSendUserOperation } from "@account-kit/react";
import { Abi, ExtractAbiFunctionNames } from "abitype";
import { Hex, encodeFunctionData } from "viem";
import { useDeployedContractInfo, useTransactor } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import {
  ContractAbi,
  ContractName,
  ScaffoldWriteContractOptions,
  ScaffoldWriteContractVariables,
} from "~~/utils/scaffold-eth/contract";

const policyId = process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID;

/**
 * this hook automatically loads (by name) the contract ABI and address from
 * the contracts present in deployedContracts.ts & externalContracts.ts
 * @param contractName - name of the contract to be written to
 */
export const useScaffoldWriteContract = <TContractName extends ContractName>(contractName: TContractName) => {
  if (!policyId) {
    throw new Error("gas policy not set!");
  }

  const { client } = useSmartAccount();
  const { sendUserOperationAsync, sendUserOperation } = useSendUserOperation({ client });

  const writeTx = useTransactor();
  const [isMining, setIsMining] = useState(false);

  const { data: deployedContractData } = useDeployedContractInfo(contractName);

  const sendContractWriteAsyncTx = async <
    TFunctionName extends ExtractAbiFunctionNames<ContractAbi<TContractName>, "nonpayable" | "payable">,
  >(
    variables: ScaffoldWriteContractVariables<TContractName, TFunctionName>,
    options?: ScaffoldWriteContractOptions,
  ) => {
    if (!client) {
      notification.error("SmartAccountClient not defined!");
      return;
    }

    if (!deployedContractData) {
      notification.error("Target Contract is not deployed, did you forget to run `yarn deploy`?");
      return;
    }

    try {
      setIsMining(true);
      const { blockConfirmations, onBlockConfirmation, ...mutateOptions } = options || {};

      const makeWriteWithParams: () => Promise<Hex> = async () => {
        const data = encodeFunctionData({
          abi: deployedContractData.abi as Abi,
          functionName: variables.functionName as string,
          args: variables.args as unknown[],
        });
        const uo = await sendUserOperationAsync({
          uo: {
            target: deployedContractData.address,
            value: BigInt(variables.value || 0),
            data,
          },
          ...mutateOptions,
        });
        return client.waitForUserOperationTransaction(uo);
      };
      const writeTxResult = await writeTx(makeWriteWithParams, { blockConfirmations, onBlockConfirmation });

      return writeTxResult;
    } catch (e: any) {
      throw e;
    } finally {
      setIsMining(false);
    }
  };

  const sendContractWriteTx = <
    TContractName extends ContractName,
    TFunctionName extends ExtractAbiFunctionNames<ContractAbi<TContractName>, "nonpayable" | "payable">,
  >(
    variables: ScaffoldWriteContractVariables<TContractName, TFunctionName>,
    options?: Omit<ScaffoldWriteContractOptions, "onBlockConfirmation" | "blockConfirmations">,
  ) => {
    if (!deployedContractData) {
      notification.error("Target Contract is not deployed, did you forget to run `yarn deploy`?");
      return;
    }

    const data = encodeFunctionData({
      abi: deployedContractData.abi as Abi,
      functionName: variables.functionName as string,
      args: variables.args as unknown[],
    });
    sendUserOperation({
      uo: {
        target: deployedContractData.address,
        value: BigInt(variables.value || 0),
        data,
      },
      ...options,
    });
  };

  return {
    isMining,
    writeContractAsync: sendContractWriteAsyncTx,
    writeContract: sendContractWriteTx,
  };
};
